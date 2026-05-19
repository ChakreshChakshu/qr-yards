import { useState } from "react";
import { qrTypes } from "./qr-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QRContentFormProps {
  selectedType: string;
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
}

const isValidUrl = (value: string) => {
  if (!value) return true;
  try {
    new URL(value.startsWith("http") ? value : `https://${value}`);
    return true;
  } catch {
    return false;
  };
};

const QRContentForm = ({ selectedType, formData, onFormDataChange }: QRContentFormProps) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const typeConfig = qrTypes.find((t) => t.id === selectedType);
  if (!typeConfig) return null;

  const handleChange = (name: string, value: string) => {
    onFormDataChange({ ...formData, [name]: value });
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <typeConfig.icon className="h-5 w-5 text-primary" />
        <h3 className="font-display font-semibold text-lg">{typeConfig.label}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{typeConfig.description}</p>

      <div className="space-y-3">
        {typeConfig.fields.map((field) => {
          const isUrlField = field.type === "url";
          const showUrlError = isUrlField && touched[field.name] && formData[field.name] && !isValidUrl(formData[field.name]);

          return (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name} className="text-sm">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  className={`resize-none ${showUrlError ? "border-destructive" : ""}`}
                  rows={3}
                />
              ) : field.type === "select" ? (
                <Select
                  value={formData[field.name] || field.options?.[0] || ""}
                  onValueChange={(value) => handleChange(field.name, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  className={showUrlError ? "border-destructive" : ""}
                />
              )}

              {showUrlError && (
                <p className="text-xs text-destructive">Please enter a valid URL</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QRContentForm;
