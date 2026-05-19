import { useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import TemplateRenderer from "./templates/TemplateRenderer";
import { templateStyles } from "@/config/qrTemplates.config";
import type { QRDesignSettings } from "./CustomizationPanel";
import QRFrame from "./QRFrame";
import type QRCodeStylingLib from "qr-code-styling";
import type { CornerDotType, CornerSquareType, DotType } from "qr-code-styling/lib/types";

interface QRPreviewProps {
  value: string;
  settings: QRDesignSettings;
  selectedType: string;
  formData: Record<string, string>;
  selectedTemplate: string;
  mode?: "full" | "content" | "qr";
}

const QRPreview = ({
  value,
  settings,
  selectedType,
  formData,
  selectedTemplate,
  mode = "full",
}: QRPreviewProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStylingLib | null>(null);
  const style = templateStyles.find((s) => s.id === selectedTemplate) || templateStyles[0];

  useEffect(() => {
    if (typeof window === "undefined" || qrInstanceRef.current) return;
    import("qr-code-styling").then((mod) => {
      qrInstanceRef.current = new mod.default({
        width: 200,
        height: 200,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 2,
        },
      });
    });
  }, []);

  useEffect(() => {
    const qr = qrInstanceRef.current;
    if (!qr) return;

    const effectiveFg = settings.fgColor || "#000000";
    const effectiveBg = settings.bgColor || "#ffffff";
    const effectiveError = settings.errorLevel || "M";
    const effectiveEyeColor = settings.eyeColor || effectiveFg;

    const moduleShape = settings.moduleShape || "square";
    const dotsType: DotType =
      moduleShape === "circle" ? "dots" :
        moduleShape === "rounded" ? "rounded" :
          moduleShape === "dots" ? "extra-rounded" : "square";

    const eyeShape = settings.eyeShape || "square";
    const cornerType: CornerSquareType =
      eyeShape === "circle" ? "dot" :
        eyeShape === "rounded" ? "extra-rounded" :
          eyeShape === "leaf" ? "extra-rounded" : "square";

    const cornerDotType: CornerDotType = eyeShape === "square" ? "square" : "dot";

    qr.update({
      data: value || "https://qryards.com",
      image: settings.logo || undefined,
      dotsOptions: {
        color: effectiveFg,
        type: dotsType,
      },
      cornersSquareOptions: {
        color: effectiveEyeColor,
        type: cornerType,
      },
      cornersDotOptions: {
        color: effectiveEyeColor,
        type: cornerDotType,
      },
      backgroundOptions: {
        color: effectiveBg,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: (settings.logoSize || 20) / 100,
      },
      qrOptions: {
        errorCorrectionLevel: effectiveError,
      },
    });

    if (qrRef.current && !qrRef.current.querySelector("canvas, svg")) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [value, settings]);

  const buildQROptions = useCallback((size: number, overrides?: Partial<QRDesignSettings>) => {
    const s = { ...settings, ...overrides };
    const effectiveFg = s.fgColor || "#000000";
    const effectiveBg = s.bgColor || "#ffffff";
    const effectiveError = s.errorLevel || "M";
    const effectiveEyeColor = s.eyeColor || effectiveFg;
    const moduleShape = s.moduleShape || "square";
    const eyeShape = s.eyeShape || "square";

    const dotsType: DotType =
      moduleShape === "circle" ? "dots" :
        moduleShape === "rounded" ? "rounded" :
          moduleShape === "dots" ? "extra-rounded" : "square";

    const cornerType: CornerSquareType =
      eyeShape === "circle" ? "dot" :
        eyeShape === "rounded" ? "extra-rounded" :
          eyeShape === "leaf" ? "extra-rounded" : "square";

    const cornerDotType: CornerDotType = eyeShape === "square" ? "square" : "dot";

    return {
      width: size,
      height: size,
      data: value || "https://qryards.com",
      image: s.logo || undefined,
      dotsOptions: { color: effectiveFg, type: dotsType },
      cornersSquareOptions: { color: effectiveEyeColor, type: cornerType },
      cornersDotOptions: { color: effectiveEyeColor, type: cornerDotType },
      backgroundOptions: { color: effectiveBg },
      imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: (s.logoSize || 20) / 100 },
      qrOptions: { errorCorrectionLevel: effectiveError },
    };
  }, [value, settings]);

  const download = async (format: "png" | "jpg" | "webp" | "svg") => {
    const QRCodeStyling = (await import("qr-code-styling")).default;
    const baseName = settings.frame !== "none" ? "qrcode-framed" : "qrcode";
    const qrSize = 1000;

    if (settings.frame !== "none" && format !== "svg") {
      try {
        const qr = new QRCodeStyling({
          ...buildQROptions(qrSize),
          type: "canvas",
        });
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.style.visibility = "hidden";
        document.body.appendChild(tempContainer);
        qr.append(tempContainer);

        await new Promise<void>((resolve) => setTimeout(resolve, 300));

        const qrCanvas = tempContainer.querySelector("canvas");
        if (!qrCanvas) {
          document.body.removeChild(tempContainer);
          return;
        }

        const canvas = document.createElement("canvas");
        const padding = 60;
        const textHeight = settings.frameText ? 80 : 0;
        const bubbleTail = settings.frame === "bubble" ? 40 : 0;
        const borderWidth = settings.frame === "simple" ? 8 : 6;
        const borderRadius = settings.frame === "simple" ? 20 : 30;

        canvas.width = qrSize + padding * 2 + borderWidth * 2;
        canvas.height = qrSize + padding * 2 + borderWidth * 2 + textHeight + bubbleTail;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const fg = settings.fgColor || "#000000";
        const bg = settings.bgColor || "#ffffff";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = bg;

        const r = borderRadius;
        const w = canvas.width;
        const h = canvas.height - bubbleTail;
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.quadraticCurveTo(w, 0, w, r);
        ctx.lineTo(w, h - r);
        ctx.quadraticCurveTo(w, h, w - r, h);
        if (settings.frame === "bubble") {
          ctx.lineTo(w, h);
          ctx.lineTo(w - 50, h);
          ctx.lineTo(w - 20, h + bubbleTail);
          ctx.lineTo(w - 50, h);
          ctx.lineTo(r, h);
        } else {
          ctx.lineTo(r, h);
        }
        ctx.quadraticCurveTo(0, h, 0, h - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fill();

        if (borderWidth > 0) {
          ctx.strokeStyle = fg;
          ctx.lineWidth = borderWidth;
          ctx.stroke();
        }

        ctx.drawImage(qrCanvas, padding + borderWidth, padding + borderWidth, qrSize, qrSize);

        if (settings.frameText) {
          const textY = qrSize + padding + borderWidth + textHeight / 2 + borderWidth;
          if (settings.frame === "badge") {
            ctx.font = "bold 36px sans-serif";
            const textWidth = ctx.measureText(settings.frameText).width;
            ctx.fillStyle = fg + "22";
            ctx.fillRect(
              (canvas.width - textWidth - 30) / 2,
              textY - 22,
              textWidth + 30,
              44
            );
          }
          ctx.fillStyle = fg;
          ctx.font = "bold 36px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(settings.frameText, canvas.width / 2, textY);
        }

        const mimeType = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
        const dataUrl = canvas.toDataURL(mimeType, 1);
        const link = document.createElement("a");
        link.download = `${baseName}.${format}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.body.removeChild(tempContainer);
      } catch (err) {
        console.error("Failed to generate framed image", err);
      }
      return;
    }

    const qr = new QRCodeStyling({
      ...buildQROptions(qrSize),
      type: format === "svg" ? "svg" : "canvas",
    });
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.visibility = "hidden";
    document.body.appendChild(tempContainer);
    qr.append(tempContainer);

    await new Promise<void>((resolve) => setTimeout(resolve, 300));

    if (format === "svg") {
      const svgEl = tempContainer.querySelector("svg");
      if (svgEl) {
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${baseName}.svg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } else {
      const canvas = tempContainer.querySelector("canvas");
      if (canvas) {
        const mimeType = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
        const dataUrl = canvas.toDataURL(mimeType, 1);
        const link = document.createElement("a");
        link.download = `${baseName}.${format}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    document.body.removeChild(tempContainer);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {(mode === "full" || mode === "content") && (
        <PhoneMockup>
          <TemplateRenderer
            typeId={selectedType}
            data={formData}
            style={style}
          />
        </PhoneMockup>
      )}

      {(mode === "full" || mode === "qr") && (
        <>
          <div ref={frameRef} className="bg-transparent inline-block">
            {settings.frame !== "none" ? (
              <QRFrame settings={settings}>
                <div className="p-1 bg-background rounded-xl outline-none">
                  <div ref={qrRef} className="overflow-hidden bg-transparent" />
                </div>
              </QRFrame>
            ) : (
              <div className="p-3 bg-background rounded-xl border shadow-sm outline-none">
                <div ref={qrRef} className="overflow-hidden" />
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full max-w-[280px]">
            <Button
              onClick={() => download("png")}
              className="flex-1 gradient-primary text-primary-foreground"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              PNG
            </Button>
            <Button
              onClick={() => download("jpg")}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              JPG
            </Button>
            <Button
              onClick={() => download("svg")}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              SVG
            </Button>
          </div>
        </>
      )}

      <p className="text-xs text-muted-foreground text-center">
        {mode === "content" ? "Preview content on mobile" : "Scan to preview · Updates in real-time"}
      </p>
    </div>
  );
};

export default QRPreview;
