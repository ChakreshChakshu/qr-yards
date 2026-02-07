import { CalendarDays, MapPin, Clock } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface EventPreviewProps {
  data: Record<string, string>;
  style: TemplateStyle;
}

const EventPreview = ({ data, style }: EventPreviewProps) => {
  const title = data.title || "Event Name";
  const location = data.location || "";
  const description = data.description || "";
  const startDate = data.startDate || "";
  const startTime = data.startTime || "";

  const formatDate = (d: string) => {
    if (!d) return "";
    try {
      return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short", month: "short", day: "numeric", year: "numeric",
      });
    } catch { return d; }
  };

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
            {startDate && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-3 w-3 text-white/50" />
                <p className="text-white/70 text-xs">{formatDate(startDate)} {startTime && `at ${startTime}`}</p>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3 w-3 text-white/50" />
                <p className="text-white/70 text-xs">{location}</p>
              </div>
            )}
          </div>
          {description && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-white/50 text-[10px] mb-1">About</p>
              <p className="text-white/80 text-xs leading-relaxed">{description}</p>
            </div>
          )}
          <div className="mt-auto space-y-2">
            <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-center py-4">
            {startDate && (
              <div className="inline-flex flex-col items-center bg-amber-500/20 rounded-2xl px-6 py-3 mb-3">
                <span className="text-amber-400 text-2xl font-bold">
                  {startDate ? new Date(startDate + "T00:00:00").getDate() : ""}
                </span>
                <span className="text-amber-400/70 text-xs">
                  {startDate ? new Date(startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short" }) : ""}
                </span>
              </div>
            )}
            <h3 className="text-white font-bold text-lg">{title}</h3>
          </div>
          <div className="space-y-3">
            {startTime && (
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="text-white text-xs">{startTime}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                <span className="text-white text-xs">{location}</span>
              </div>
            )}
            {description && (
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-gray-500 text-[10px] mb-1">Details</p>
                <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
              </div>
            )}
          </div>
          <button className="w-full py-3 bg-amber-500 rounded-xl text-white font-bold text-sm mt-auto">
            RSVP Now
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-primary/10 p-4 text-center">
            <CalendarDays className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-foreground font-bold text-lg">{title}</h3>
          </div>
          <div className="p-4 space-y-3">
            {startDate && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <p className="text-foreground text-xs">{formatDate(startDate)} {startTime && `at ${startTime}`}</p>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <p className="text-foreground text-xs">{location}</p>
              </div>
            )}
            {description && (
              <p className="text-muted-foreground text-xs leading-relaxed border-t pt-3">{description}</p>
            )}
          </div>
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm mt-auto">
          Add to Calendar
        </button>
      </div>
    </div>
  );
};

export default EventPreview;
