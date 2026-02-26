import { Globe, FileText, Video, Music, LayoutTemplate, ThumbsUp, ListMusic, UtensilsCrossed, Image as ImageIcon } from "lucide-react";
import type { TemplateStyle } from "@/config/qrTemplates.config";
import { cn } from "@/lib/utils";

interface LinkPreviewProps {
  data: Record<string, string>;
  typeId: string;
  style: TemplateStyle;
}

const typeIcons: Record<string, typeof Globe> = {
  url: Globe,
  pdf: FileText,
  video: Video,
  mp3: Music,
  landing: LayoutTemplate,
  feedback: ThumbsUp,
  playlist: ListMusic,
  menu: UtensilsCrossed,
  images: ImageIcon,
};

const typeLabels: Record<string, string> = {
  url: "Website",
  pdf: "PDF Document",
  video: "Video",
  mp3: "Audio",
  landing: "Landing Page",
  feedback: "Feedback",
  playlist: "Playlist",
  menu: "Menu",
  images: "Gallery",
};

const LinkPreview = ({ data, typeId, style }: LinkPreviewProps) => {
  const Icon = typeIcons[typeId] || Globe;
  const label = typeLabels[typeId] || "Link";
  const url = data.url || data.link || "https://example.com";
  // simple display url
  const displayUrl = url.replace(/^https?:\/\//, "").slice(0, 30);
  const restaurant = data.restaurant;

  // Determine layout variant based on category
  const layoutVariant = style.category === "minimal"
    ? "classic"
    : style.category === "events"
      ? "bold"
      : "modern";

  const isGradient = style.colors.bg.includes("from-");
  const bgClass = isGradient
    ? `bg-linear-to-br ${style.colors.bg}`
    : style.colors.bg;

  // Helper for button styling
  const buttonStyle = {
    // For gradient backgrounds, white/transparent buttons look good
    // For solid backgrounds, maybe primary colors? 
    // We'll stick to a generic "contrast" approach
    background: style.id.includes("minimal") ? "#000" : "rgba(255,255,255,0.2)",
    color: style.id.includes("minimal") ? "#fff" : "white",
  };

  if (layoutVariant === "modern") {
    return (
      <div className={cn("min-h-full p-5 flex flex-col", bgClass)}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
            <Icon className={cn("h-8 w-8", style.colors.text)} />
          </div>
          <div className="text-center">
            <h3 className={cn("font-bold text-lg", style.colors.text)}>{restaurant || label}</h3>
            <p className={cn("text-xs mt-1 break-all opacity-80", style.colors.text)}>{displayUrl}</p>
          </div>
          <div className="w-full mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
            <div className="h-2 w-3/4 bg-current opacity-30 rounded-full mb-2" />
            <div className="h-2 w-1/2 bg-current opacity-20 rounded-full mb-3" />
            <div className="h-16 w-full bg-current opacity-10 rounded-xl" />
          </div>
          <button
            className="w-full py-3 rounded-xl font-semibold text-sm mt-2 backdrop-blur-sm transition-all hover:bg-white/30"
            style={{
              backgroundColor: style.colors.accent.startsWith("bg-") ? undefined : style.colors.accent, // handle distinct if needed
              // fallback
              background: "rgba(255,255,255,0.2)",
              color: "inherit"
            }}
          >
            <span className={cn(style.colors.text)}>Open {label}</span>
          </button>
        </div>
      </div>
    );
  }

  if (layoutVariant === "bold") {
    return (
      <div className={cn("min-h-full p-5 flex flex-col", bgClass)}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Icon className={cn("h-6 w-6", style.colors.text)} />
            </div>
            <div>
              <h3 className={cn("font-bold text-base", style.colors.text)}>{restaurant || label}</h3>
              <p className={cn("text-[10px] break-all opacity-70", style.colors.text)}>{displayUrl}</p>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
            <div className="h-24 bg-white/5 rounded-xl mb-3 flex items-center justify-center">
              <Icon className={cn("h-10 w-10 opacity-50", style.colors.text)} />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </div>
          </div>
          <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm shadow-lg transform active:scale-95 transition-all">
            Visit →
          </button>
        </div>
      </div>
    );
  }

  // Classic / Minimal
  return (
    <div className={cn("min-h-full p-5 flex flex-col", bgClass)}>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
          <Icon className="h-10 w-10 text-gray-900" />
        </div>
        <div className="text-center">
          <h3 className={cn("font-bold text-lg", style.colors.text)}>{restaurant || label}</h3>
          <p className={cn("text-xs mt-1 break-all opacity-60", style.colors.text)}>{displayUrl}</p>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="h-2 w-3/4 bg-gray-200 rounded-full mb-2" />
          <div className="h-2 w-1/2 bg-gray-100 rounded-full mb-3" />
          <div className="h-16 w-full bg-gray-50 rounded-xl" />
        </div>
        <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm shadow-md hover:bg-black transition-colors">
          Open {label}
        </button>
      </div>
    </div>
  );
};

export default LinkPreview;
