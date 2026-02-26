import { Type, ScanBarcode, FileText } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface TextPreviewProps {
  data: Record<string, string>;
  typeId: string;
  style: TemplateStyle;
}

const TextPreview = ({ data, typeId, style }: TextPreviewProps) => {
  const text = data.text || data.data || "Your content here...";
  const isBarcode = typeId === "barcode";
  const Icon = isBarcode ? ScanBarcode : Type;
  const title = isBarcode ? "Barcode Data" : "Text Content";

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            {isBarcode ? (
              <div className="text-center">
                <div className="flex justify-center gap-[2px] mb-2">
                  {text.split("").slice(0, 12).map((_, i) => (
                    <div key={i} className="w-[3px] bg-white/70 rounded-full" style={{ height: `${20 + Math.random() * 20}px` }} />
                  ))}
                </div>
                <p className="text-white/70 font-mono text-sm tracking-widest">{text}</p>
              </div>
            ) : (
              <p className="text-white/80 text-sm leading-relaxed">{text}</p>
            )}
          </div>
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm">
            <FileText className="h-4 w-4 inline mr-1" />
            Copy Text
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Icon className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="text-white font-bold text-base">{title}</h3>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-4">
            {isBarcode ? (
              <div className="text-center py-4">
                <div className="flex justify-center gap-[2px] mb-3">
                  {text.split("").slice(0, 12).map((_, i) => (
                    <div key={i} className="w-[3px] bg-white/50 rounded-full" style={{ height: `${20 + Math.random() * 20}px` }} />
                  ))}
                </div>
                <p className="text-violet-400 font-mono text-sm tracking-widest">{text}</p>
              </div>
            ) : (
              <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
            )}
          </div>
          <button className="w-full py-3 bg-violet-500 rounded-xl text-white font-bold text-sm">
            Copy
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-foreground font-bold text-lg">{title}</h3>
        <div className="w-full bg-white rounded-2xl shadow-sm border p-4">
          {isBarcode ? (
            <div className="text-center">
              <div className="flex justify-center gap-[2px] mb-2">
                {text.split("").slice(0, 12).map((_, i) => (
                  <div key={i} className="w-[3px] bg-foreground/60 rounded-full" style={{ height: `${20 + Math.random() * 20}px` }} />
                ))}
              </div>
              <p className="text-foreground font-mono text-sm tracking-widest">{text}</p>
            </div>
          ) : (
            <p className="text-foreground text-sm leading-relaxed">{text}</p>
          )}
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm">
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default TextPreview;
