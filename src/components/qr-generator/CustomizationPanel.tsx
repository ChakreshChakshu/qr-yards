import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomizationPanelProps {
  fgColor: string;
  bgColor: string;
  errorLevel: "L" | "M" | "Q" | "H";
  onFgColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
  onErrorLevelChange: (level: "L" | "M" | "Q" | "H") => void;
}

const errorLevels: { value: "L" | "M" | "Q" | "H"; label: string }[] = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
];

const CustomizationPanel = ({
  fgColor,
  bgColor,
  errorLevel,
  onFgColorChange,
  onBgColorChange,
  onErrorLevelChange,
}: CustomizationPanelProps) => {
  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
        Customize
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm">QR Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => onFgColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg border cursor-pointer bg-transparent"
            />
            <span className="text-xs text-muted-foreground font-mono">{fgColor}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">Background</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => onBgColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg border cursor-pointer bg-transparent"
            />
            <span className="text-xs text-muted-foreground font-mono">{bgColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm">Error Correction</Label>
        <div className="flex flex-wrap gap-2">
          {errorLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onErrorLevelChange(level.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                errorLevel === level.value
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;