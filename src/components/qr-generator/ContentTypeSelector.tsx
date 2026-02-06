import { qrTypes } from "./qr-types";
import { cn } from "@/lib/utils";

interface ContentTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ContentTypeSelector = ({ selectedType, onSelectType }: ContentTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {qrTypes.map((type) => {
        const Icon = type.icon;
        const isActive = selectedType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
              isActive
                ? "gradient-primary text-primary-foreground shadow-sm"
                : "bg-background text-muted-foreground hover:text-foreground hover:bg-background/80 border"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContentTypeSelector;