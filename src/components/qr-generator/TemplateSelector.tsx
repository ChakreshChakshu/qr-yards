import { useState } from "react";
import { templateStyles, TEMPLATE_CATEGORIES, type TemplateStyle } from "@/config/qrTemplates.config";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

const TemplateSelector = ({ selectedStyle, onSelectStyle }: TemplateSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState("minimal");

  const filteredStyles = templateStyles.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Template Style
        </h4>
        <span className="text-[10px] text-muted-foreground">
          {templateStyles.length} templates
        </span>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filteredStyles.map((style: TemplateStyle) => {
          const isActive = selectedStyle === style.id;
          // Determine background style (gradient or plain color)
          const bgStyle = style.colors.bg.startsWith("from-")
            ? `linear-gradient(135deg, var(--tw-gradient-stops))`
            : "";

          return (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={cn(
                "group flex flex-col items-center gap-2 p-1.5 rounded-xl transition-all duration-200",
                isActive
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background bg-secondary/50"
                  : "hover:bg-secondary/30 border border-transparent hover:border-border/50"
              )}
            >
              <div
                className={cn(
                  "w-full aspect-4/5 rounded-lg relative overflow-hidden shadow-sm",
                  !bgStyle && style.colors.bg // if not gradient, apply bg class
                )}
                style={bgStyle ? { backgroundImage: bgStyle } : {}}
              >
                {/* Provide gradient classes if needed for the style object to work with tailwind arbitrary values if passed directly, 
                     but here we rely on the class being strictly "bg-..." or "from-..." 
                     If it's "from-...", we need to apply those classes to the element. 
                 */}
                <div className={cn("absolute inset-0", style.colors.bg)} />

                {/* Mini phone mockup */}
                <div className="absolute inset-x-3 top-3 bottom-0 rounded-t-lg bg-white/20 backdrop-blur-[2px] border border-white/10">
                  <div className="mt-3 mx-2 space-y-1.5">
                    <div className={cn("h-1.5 w-3/4 rounded-full opacity-60", style.colors.text.replace('text-', 'bg-'))} />
                    <div className={cn("h-1.5 w-1/2 rounded-full opacity-40", style.colors.text.replace('text-', 'bg-'))} />
                  </div>
                  {/* Mini QR */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-black/80 rounded-[2px]" />
                  </div>
                </div>
              </div>

              <span className={cn(
                "text-[10px] font-medium truncate w-full text-center",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {style.name}
              </span>
            </button>
          );
        })}
      </div>
    </div >
  );
};

export default TemplateSelector;
