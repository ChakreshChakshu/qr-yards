import { useState, useMemo, useCallback } from "react";
import ContentTypeSelector from "./ContentTypeSelector";
import QRContentForm from "./QRContentForm";
import CustomizationPanel from "./CustomizationPanel";
import TemplateSelector from "./TemplateSelector";
import QRPreview from "./QRPreview";
import { qrTypes } from "./qr-types";

const QRGeneratorWidget = () => {
  const [selectedType, setSelectedType] = useState("url");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fgColor, setFgColor] = useState("#6366F1");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type);
    setFormData({});
  }, []);

  const qrValue = useMemo(() => {
    const typeConfig = qrTypes.find((t) => t.id === selectedType);
    if (!typeConfig) return "";
    const encoded = typeConfig.encode(formData);
    return encoded || "https://qryards.com";
  }, [selectedType, formData]);

  return (
    <div className="max-w-5xl mx-auto rounded-2xl border bg-card shadow-glow overflow-hidden">
      <div className="p-4 md:p-6 border-b bg-secondary/30">
        <ContentTypeSelector
          selectedType={selectedType}
          onSelectType={handleTypeChange}
        />
      </div>

      <div className="grid md:grid-cols-[1fr,340px]">
        <div className="p-4 md:p-6 space-y-6 md:border-r">
          <QRContentForm
            selectedType={selectedType}
            formData={formData}
            onFormDataChange={setFormData}
          />
          <TemplateSelector
            selectedStyle={selectedTemplate}
            onSelectStyle={setSelectedTemplate}
          />
          <CustomizationPanel
            fgColor={fgColor}
            bgColor={bgColor}
            errorLevel={errorLevel}
            onFgColorChange={setFgColor}
            onBgColorChange={setBgColor}
            onErrorLevelChange={setErrorLevel}
          />
        </div>

        <div className="p-4 md:p-6 flex flex-col items-center justify-start bg-secondary/20">
          <QRPreview
            value={qrValue}
            fgColor={fgColor}
            bgColor={bgColor}
            errorLevel={errorLevel}
            selectedType={selectedType}
            formData={formData}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorWidget;
