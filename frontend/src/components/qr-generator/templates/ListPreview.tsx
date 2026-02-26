import { Link as LinkIcon, Share2, Smartphone, ExternalLink } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface ListPreviewProps {
  data: Record<string, string>;
  typeId: string;
  style: TemplateStyle;
}

const socialIcons: Record<string, string> = {
  facebook: "📘",
  instagram: "📸",
  twitter: "🐦",
  linkedin: "💼",
  tiktok: "🎵",
};

const ListPreview = ({ data, typeId, style }: ListPreviewProps) => {
  let items: { label: string; value: string }[] = [];

  if (typeId === "social") {
    const keys = ["facebook", "instagram", "twitter", "linkedin", "tiktok"];
    items = keys.filter((k) => data[k]).map((k) => ({
      label: `${socialIcons[k] || ""} ${k.charAt(0).toUpperCase() + k.slice(1)}`,
      value: data[k],
    }));
  } else if (typeId === "apps") {
    if (data.ios) items.push({ label: "🍎 iOS App", value: data.ios });
    if (data.android) items.push({ label: "🤖 Android App", value: data.android });
  } else {
    for (let i = 1; i <= 3; i++) {
      if (data[`link${i}`]) {
        items.push({ label: data[`label${i}`] || `Link ${i}`, value: data[`link${i}`] });
      }
    }
  }

  if (items.length === 0) {
    items = [
      { label: "Link 1", value: "https://example.com" },
      { label: "Link 2", value: "https://example.com" },
    ];
  }

  const Icon = typeId === "social" ? Share2 : typeId === "apps" ? Smartphone : LinkIcon;
  const title = typeId === "social" ? "Social Profiles" : typeId === "apps" ? "Download App" : "My Links";

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center gap-4 pt-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <div className="w-full space-y-2">
            {items.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 text-left hover:bg-white/20 transition-colors">
                <ExternalLink className="h-4 w-4 text-white/70 shrink-0" />
                <span className="text-white text-sm font-medium truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-center py-2">
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-gray-500 text-xs">{items.length} links</p>
          </div>
          <div className="space-y-2 flex-1">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-sm">
                  {typeId === "social" ? socialIcons[Object.keys(socialIcons)[i] || ""] || "🔗" : "🔗"}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.label}</p>
                  <p className="text-gray-600 text-[10px] truncate">{item.value.replace(/^https?:\/\//, "").slice(0, 25)}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-600 ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center gap-4 pt-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-foreground font-bold text-lg">{title}</h3>
        <div className="w-full space-y-2">
          {items.map((item, i) => (
            <div key={i} className="w-full bg-white rounded-xl shadow-sm border p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm shrink-0">
                🔗
              </div>
              <span className="text-foreground text-sm font-medium truncate">{item.label}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPreview;
