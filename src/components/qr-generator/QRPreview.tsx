import { useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import TemplateRenderer from "./templates/TemplateRenderer";
import { templateStyles } from "./templates/template-config";

interface QRPreviewProps {
  value: string;
  fgColor: string;
  bgColor: string;
  errorLevel: "L" | "M" | "Q" | "H";
  selectedType: string;
  formData: Record<string, string>;
  selectedTemplate: string;
}

const QRPreview = ({
  value,
  fgColor,
  bgColor,
  errorLevel,
  selectedType,
  formData,
  selectedTemplate,
}: QRPreviewProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const style = templateStyles.find((s) => s.id === selectedTemplate) || templateStyles[0];

  const getSvgElement = () => qrRef.current?.querySelector("svg");

  const downloadSVG = useCallback(() => {
    const svg = getSvgElement();
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadPNG = useCallback(() => {
    const svg = getSvgElement();
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 4;
      canvas.width = 200 * scale;
      canvas.height = 200 * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Phone Mockup with Template Preview */}
      <PhoneMockup>
        <TemplateRenderer
          typeId={selectedType}
          data={formData}
          style={style}
        />
      </PhoneMockup>

      {/* QR Code (smaller, below the phone) */}
      <div
        ref={qrRef}
        className="p-3 bg-background rounded-xl border shadow-sm"
      >
        <QRCodeSVG
          value={value || "https://qryards.com"}
          size={120}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorLevel}
        />
      </div>

      {/* Download Buttons */}
      <div className="flex gap-2 w-full max-w-[200px]">
        <Button
          onClick={downloadPNG}
          className="flex-1 gradient-primary text-primary-foreground"
          size="sm"
        >
          <Download className="h-4 w-4 mr-1" />
          PNG
        </Button>
        <Button
          onClick={downloadSVG}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <Download className="h-4 w-4 mr-1" />
          SVG
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Scan to preview · Updates in real-time
      </p>
    </div>
  );
};

export default QRPreview;
