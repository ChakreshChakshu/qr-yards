import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import TemplateRenderer from "./templates/TemplateRenderer";
import { templateStyles } from "@/config/qrTemplates.config";
import type { QRDesignSettings } from "./CustomizationPanel";
import QRFrame from "./QRFrame";
import * as htmlToImage from "html-to-image";
import type QRCodeStylingLib from "qr-code-styling";
import type { CornerDotType, CornerSquareType, DotType } from "qr-code-styling/lib/types";

interface QRPreviewProps {
  value: string;
  settings?: QRDesignSettings; // Make optional for backward compatibility if needed, but best to enforce
  // Fallback props (deprecated but maybe passed by parent temporarily)
  fgColor?: string;
  bgColor?: string;
  errorLevel?: "L" | "M" | "Q" | "H";

  selectedType: string;
  formData: Record<string, string>;
  selectedTemplate: string;
  mode?: "full" | "content" | "qr";
}

const QRPreview = ({
  value,
  settings,
  fgColor,
  bgColor,
  errorLevel,
  selectedType,
  formData,
  selectedTemplate,
  mode = "full",
}: QRPreviewProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStylingLib | null>(null);
  const style = templateStyles.find((s) => s.id === selectedTemplate) || templateStyles[0];

  // Initialize QR Code Styling instance
  useEffect(() => {
    if (typeof window !== "undefined" && !qrCode) {
      import("qr-code-styling").then((mod) => {
        const QRCodeStylingLib = mod.default;
        const qr = new QRCodeStylingLib({
          width: 200,
          height: 200,
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 2
          }
        });
        setQrCode(qr);
      });
    }
  }, [qrCode]);

  // Update QR Code options
  useEffect(() => {
    if (!qrCode) return;

    // Use settings or fallbacks
    const effectiveFg = settings?.fgColor || fgColor || "#000000";
    const effectiveBg = settings?.bgColor || bgColor || "#ffffff";
    const effectiveError = settings?.errorLevel || errorLevel || "M";
    const effectiveEyeColor = settings?.eyeColor || effectiveFg;

    // Map shapes
    const moduleShape = settings?.moduleShape || "square";
    // Map internal shape names to library types
    // Library types: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
    const dotsType: DotType =
      moduleShape === "circle" ? "dots" :
        moduleShape === "rounded" ? "rounded" :
          moduleShape === "dots" ? "extra-rounded" : "square";

    const eyeShape = settings?.eyeShape || "square";
    // Library cornersSquare types: 'dot' | 'square' | 'extra-rounded'
    const cornerType: CornerSquareType =
      eyeShape === "circle" ? "dot" :
        eyeShape === "rounded" ? "extra-rounded" :
          eyeShape === "leaf" ? "extra-rounded" : "square"; // leaf fallback

    // Library cornersDot types: 'dot' | 'square'
    const cornerDotType: CornerDotType = eyeShape === "square" ? "square" : "dot";

    qrCode.update({
      data: value || "https://qryards.com",
      image: settings?.logo || undefined,
      dotsOptions: {
        color: effectiveFg,
        type: dotsType
      },
      cornersSquareOptions: {
        color: effectiveEyeColor,
        type: cornerType
      },
      cornersDotOptions: {
        color: effectiveEyeColor,
        type: cornerDotType
      },
      backgroundOptions: {
        color: effectiveBg,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: (settings?.logoSize || 20) / 100
      },
      qrOptions: {
        errorCorrectionLevel: effectiveError
      }
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [qrCode, value, settings, fgColor, bgColor, errorLevel]);

  const download = async (extension: "png" | "svg") => {
    if (settings?.frame && settings.frame !== "none" && frameRef.current) {
      // Use html-to-image for custom frames
      try {
        const dataUrl =
          extension === "svg"
            ? await htmlToImage.toSvg(frameRef.current)
            : await htmlToImage.toPng(frameRef.current);
        const link = document.createElement("a");
        link.download = `qrcode-framed.${extension}`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to generate image with frame", err);
      }
    } else if (qrCode) {
      // Fallback to library for standard qr codes
      qrCode.download({
        name: "qrcode",
        extension: extension
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Phone Mockup with Template Preview */}
      {(mode === "full" || mode === "content") && (
        <PhoneMockup>
          <TemplateRenderer
            typeId={selectedType}
            data={formData}
            style={style}
          />
        </PhoneMockup>
      )}

      {/* QR Code and Download Buttons */}
      {(mode === "full" || mode === "qr") && (
        <>
          <div ref={frameRef} className="bg-transparent inline-block">
            {settings && settings.frame !== "none" ? (
              <QRFrame settings={settings}>
                <div
                  className="p-1 bg-background rounded-xl outline-none"
                >
                  <div ref={qrRef} className="overflow-hidden bg-transparent" />
                </div>
              </QRFrame>
            ) : (
              <div
                className="p-3 bg-background rounded-xl border shadow-sm outline-none"
              >
                <div ref={qrRef} className="overflow-hidden" />
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full max-w-[200px]">
            <Button
              onClick={() => download("png")}
              className="flex-1 gradient-primary text-primary-foreground"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              PNG
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
