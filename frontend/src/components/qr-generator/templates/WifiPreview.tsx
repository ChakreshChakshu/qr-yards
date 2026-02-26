import { Wifi, Lock, Unlock, Signal } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface WifiPreviewProps {
  data: Record<string, string>;
  style: TemplateStyle;
}

const WifiPreview = ({ data, style }: WifiPreviewProps) => {
  const ssid = data.ssid || "Network Name";
  const password = data.password || "";
  const encryption = data.encryption || "WPA/WPA2";
  const isOpen = encryption === "None";

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Wifi className="h-10 w-10 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-xl">{ssid}</h3>
            <div className="flex items-center gap-1 justify-center mt-1">
              {isOpen ? <Unlock className="h-3 w-3 text-white/50" /> : <Lock className="h-3 w-3 text-white/50" />}
              <span className="text-white/50 text-xs">{encryption}</span>
            </div>
          </div>
          {password && (
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-white/50 text-xs mb-1">Password</p>
              <p className="text-white font-mono text-sm tracking-wider">{password}</p>
            </div>
          )}
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Signal className={`h-4 w-4 ${i <= 3 ? "text-white" : "text-white/30"}`} />
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm">
            Connect to Wi-Fi
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <Wifi className="h-7 w-7 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{ssid}</h3>
              <p className="text-gray-500 text-xs">{encryption}</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-[10px] mb-1">Network</p>
              <p className="text-white text-sm font-medium">{ssid}</p>
            </div>
            {password && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-[10px] mb-1">Password</p>
                <p className="text-cyan-400 font-mono text-sm">{password}</p>
              </div>
            )}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-[10px] mb-1">Security</p>
              <div className="flex items-center gap-2">
                {isOpen ? <Unlock className="h-4 w-4 text-yellow-400" /> : <Lock className="h-4 w-4 text-emerald-400" />}
                <p className="text-white text-sm">{isOpen ? "Open Network" : encryption}</p>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold text-sm">
            Connect
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
          <Wifi className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-foreground font-bold text-xl">{ssid}</h3>
        <div className="w-full bg-white rounded-2xl shadow-sm border p-4 space-y-3">
          <div>
            <p className="text-muted-foreground text-[10px]">Network Name</p>
            <p className="text-foreground text-sm font-medium">{ssid}</p>
          </div>
          {password && (
            <div>
              <p className="text-muted-foreground text-[10px]">Password</p>
              <p className="text-foreground font-mono text-sm">{password}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-[10px]">Security</p>
            <div className="flex items-center gap-1">
              {isOpen ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              <p className="text-foreground text-sm">{encryption}</p>
            </div>
          </div>
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm">
          Connect to Wi-Fi
        </button>
      </div>
    </div>
  );
};

export default WifiPreview;
