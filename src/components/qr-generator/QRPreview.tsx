import { useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRPreviewProps {
  value: string;
  fgColor: string;
  bgColor: string;
  errorLevel: "L" | "M" | "Q" | "H";
}

const QRPreview = ({ value, fgColor, bgColor, errorLevel }: QRPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getSvgElement = () => containerRef.current?.querySelector("svg");

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
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
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
      <div ref={containerRef} className="p-4 bg-background rounded-xl border shadow-sm">
        <QRCodeSVG
          value={value || "https://qryards.com"}
          size={200}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorLevel}
        />
      </div>

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