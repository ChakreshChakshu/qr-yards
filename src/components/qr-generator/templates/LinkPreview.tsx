import { Globe, FileText, Video, Music, LayoutTemplate, ThumbsUp, ListMusic, UtensilsCrossed, Image as ImageIcon } from "lucide-react";
import type { TemplateStyle } from "./template-config";

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
  const displayUrl = url.replace(/^https?:\/\//, "").slice(0, 30);
  const restaurant = data.restaurant;

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">{restaurant || label}</h3>
            <p className="text-white/60 text-xs mt-1 break-all">{displayUrl}</p>
          </div>
          <div className="w-full mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="h-2 w-3/4 bg-white/30 rounded-full mb-2" />
            <div className="h-2 w-1/2 bg-white/20 rounded-full mb-3" />
            <div className="h-16 w-full bg-white/10 rounded-xl" />
          </div>
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm mt-2">
            Open {label}
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{restaurant || label}</h3>
              <p className="text-gray-500 text-[10px] break-all">{displayUrl}</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 flex-1">
            <div className="h-24 bg-white/5 rounded-xl mb-3 flex items-center justify-center">
              <Icon className="h-10 w-10 text-gray-600" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </div>
          </div>
          <button className="w-full py-3 bg-emerald-500 rounded-xl text-white font-bold text-sm">
            Visit →
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="text-foreground font-bold text-lg">{restaurant || label}</h3>
          <p className="text-muted-foreground text-xs mt-1 break-all">{displayUrl}</p>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 border">
          <div className="h-2 w-3/4 bg-gray-200 rounded-full mb-2" />
          <div className="h-2 w-1/2 bg-gray-100 rounded-full mb-3" />
          <div className="h-16 w-full bg-gray-50 rounded-xl" />
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm">
          Open {label}
        </button>
      </div>
    </div>
  );
};

export default LinkPreview;
