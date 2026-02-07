import { templateStyles, type TemplateStyle } from "./templates/template-config";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

const stylePreviewColors: Record<string, { from: string; to: string; accent: string }> = {
  modern: { from: "#6366F1", to: "#9333EA", accent: "#ffffff33" },
  classic: { from: "#F8FAFC", to: "#F1F5F9", accent: "#6366F120" },
  bold: { from: "#1F2937", to: "#111827", accent: "#10B98130" },
};

const TemplateSelector = ({ selectedStyle, onSelectStyle }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Template Style
      </h4>
      <div className="flex gap-2">
        {templateStyles.map((style: TemplateStyle) => {
          const preview = stylePreviewColors[style.id];
          const isActive = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 flex-1",
                isActive
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "hover:bg-secondary/50"
              )}
            >
              <div
                className="w-full h-14 rounded-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${preview.from}, ${preview.to})`,
                }}
              >
                {/* Mini phone mockup */}
                <div className="absolute inset-x-3 top-2 bottom-1 rounded-md bg-white/10 backdrop-blur-[1px]">
                  <div className="mt-2 mx-1.5 space-y-1">
                    <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: preview.accent }} />
                    <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: preview.accent }} />
                  </div>
                </div>
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {style.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
