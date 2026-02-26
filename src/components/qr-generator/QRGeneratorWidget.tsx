import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentTypeSelector from "./ContentTypeSelector";
import QRContentForm from "./QRContentForm";
import CustomizationPanel, { type QRDesignSettings } from "./CustomizationPanel";
import TemplateSelector from "./TemplateSelector";
import QRPreview from "./QRPreview";
import { qrTypes } from "./qr-types";

import { templateStyles } from "@/config/qrTemplates.config";

const steps = [
  { id: 1, title: "Select Type" },
  { id: 2, title: "Add Content" },
  { id: 3, title: "Customize Design" },
];

const QRGeneratorWidget = () => {
  const [selectedType, setSelectedType] = useState("url");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedTemplate, setSelectedTemplate] = useState("minimal-clean");
  const [step, setStep] = useState(1);

  const [designSettings, setDesignSettings] = useState<QRDesignSettings>({
    fgColor: "#000000",
    bgColor: "#ffffff",
    eyeColor: "#000000",
    moduleShape: "square",
    eyeShape: "square",
    logo: null,
    logoSize: 20,
    frame: "none",
    frameText: "SCAN ME",
    errorLevel: "M",
  });

  const updateDesignSettings = useCallback((updates: Partial<QRDesignSettings>) => {
    setDesignSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type);
    setFormData({});
  }, []);

  const handleTemplateSelect = useCallback((templateId: string) => {
    setSelectedTemplate(templateId);
    const style = templateStyles.find(s => s.id === templateId);
    if (style && style.qrConfig) {
      updateDesignSettings(style.qrConfig);
    }
  }, [updateDesignSettings]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const qrValue = useMemo(() => {
    const typeConfig = qrTypes.find((t) => t.id === selectedType);
    if (!typeConfig) return "";
    const encoded = typeConfig.encode(formData);
    return encoded || "https://qryards.com";
  }, [selectedType, formData]);

  return (
    <div className="flex flex-col h-full card-3d overflow-hidden">
      {/* Steps Header — fixed height */}
      <div className="shrink-0 border-b bg-secondary/30 p-4">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={cn(
                "flex items-center gap-2",
                step === s.id ? "text-foreground" : step > s.id ? "text-muted-foreground" : "text-muted-foreground/50"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                  step === s.id ? "border-primary bg-primary text-primary-foreground" :
                    step > s.id ? "border-primary/50 bg-primary/5 text-primary/50" : "border-muted-foreground/30"
                )}>
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className="font-medium text-sm hidden sm:block">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "h-[2px] w-12 mx-4 rounded-full",
                  step > s.id ? "bg-primary/50" : "bg-muted-foreground/20"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid md:grid-cols-[1fr_380px]">
        {/* Left Panel - Controls (scrollable) */}
        <div className="flex flex-col overflow-hidden md:border-r">
          {/* Scrollable content area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Choose QR Code Type</h3>
                  <p className="text-muted-foreground text-sm">Select the type of content you want to share with your QR code.</p>
                </div>
                <ContentTypeSelector
                  selectedType={selectedType}
                  onSelectType={handleTypeChange}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enter Content</h3>
                  <p className="text-muted-foreground text-sm">Fill in the details for your {selectedType.toUpperCase()} QR code.</p>
                </div>
                <QRContentForm
                  selectedType={selectedType}
                  formData={formData}
                  onFormDataChange={setFormData}
                />
                <TemplateSelector
                  selectedStyle={selectedTemplate}
                  onSelectStyle={handleTemplateSelect}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 h-full">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customize Design</h3>
                  <p className="text-muted-foreground text-sm">Adjust the colors and style of your QR code.</p>
                </div>
                <CustomizationPanel
                  settings={designSettings}
                  updateSettings={updateDesignSettings}
                />
              </div>
            )}
          </div>{/* end scrollable */}

          {/* Navigation — always visible at bottom */}
          <div className="shrink-0 flex justify-between p-4 border-t bg-background/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="gap-2">
                NextStep <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button disabled className="gap-2 opacity-100 bg-primary/10 text-primary hover:bg-primary/10">
                <Check className="w-4 h-4" /> Ready to Download
              </Button>
            )}
          </div>
        </div>

        {/* Right Panel - Preview (scrollable) */}
        <div className="overflow-y-auto p-6 bg-secondary/10 flex flex-col items-center border-l bg-linear-to-br from-secondary/30 to-background/50">
          <div className="sticky top-6 w-full max-w-[300px] flex flex-col items-center gap-4">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
              {step === 3 ? "QR Preview" : "Content Preview"}
            </div>
            <QRPreview
              value={qrValue}
              settings={designSettings}
              selectedType={selectedType}
              formData={formData}
              selectedTemplate={selectedTemplate}
              mode={step === 3 ? "qr" : "content"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorWidget;
