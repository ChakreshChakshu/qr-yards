import React from "react";
import { cn } from "@/lib/utils";
import { type QRDesignSettings } from "./CustomizationPanel";

interface QRFrameProps {
    settings: QRDesignSettings;
    children: React.ReactNode;
}

const QRFrame = ({ settings, children }: QRFrameProps) => {
    const { frame, frameText, fgColor, bgColor } = settings;

    if (frame === "none") {
        return <>{children}</>;
    }

    // Common wrapper with padding based on frame type
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-4 transition-all duration-300",
                frame === "simple" && "border-[3px] rounded-xl pb-0",
                frame === "badge" && "rounded-t-2xl rounded-b-md px-3 pt-3 pb-0 shadow-sm",
                frame === "bubble" && "rounded-2xl rounded-br-none p-4 pb-0 shadow-sm relative"
            )}
            style={{
                backgroundColor: bgColor,
                borderColor: fgColor,
            }}
        >
            {/* Background for badge/bubble could be slightly different, but let's stick to simple borders and backgrounds matching QR */}

            {/* Inner QR Container */}
            <div className="bg-white rounded-lg p-1">
                {children}
            </div>

            {/* Frame Text Container */}
            {frameText && (
                <div
                    className={cn(
                        "w-full text-center font-bold tracking-wider uppercase mt-2 mb-2 px-2",
                        frame === "simple" && "text-sm",
                        frame === "badge" && "text-xs py-1 rounded-sm bg-black/10 mx-1",
                        frame === "bubble" && "text-sm"
                    )}
                    style={{ color: fgColor }}
                >
                    {frameText}
                </div>
            )}

            {/* Bubble Tail */}
            {frame === "bubble" && (
                <div
                    className="absolute -bottom-3 right-0 w-6 h-6"
                    style={{
                        backgroundColor: bgColor,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)"
                    }}
                />
            )}
        </div>
    );
};

export default QRFrame;
