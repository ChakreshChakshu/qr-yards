import { Mail, MessageSquare, MessageCircle, Send } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface MessagePreviewProps {
  data: Record<string, string>;
  typeId: string;
  style: TemplateStyle;
}

const MessagePreview = ({ data, typeId, style }: MessagePreviewProps) => {
  const isEmail = typeId === "email";
  const isWhatsApp = typeId === "whatsapp";
  const recipient = isEmail ? data.to || "hello@example.com" : data.phone || "+1234567890";
  const subject = data.subject || "";
  const message = data.message || data.body || "Your message here...";
  const Icon = isEmail ? Mail : isWhatsApp ? MessageCircle : MessageSquare;
  const appName = isEmail ? "Email" : isWhatsApp ? "WhatsApp" : "SMS";
  const appColor = isWhatsApp ? "bg-green-500" : isEmail ? "bg-blue-500" : "bg-indigo-500";

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${appColor} rounded-xl flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{appName}</h3>
              <p className="text-white/50 text-[10px]">New message</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-xs">To:</span>
              <span className="text-white text-xs">{recipient}</span>
            </div>
            {subject && (
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-xs">Subject:</span>
                <span className="text-white text-xs">{subject}</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-3">
              <p className="text-white/80 text-xs leading-relaxed">{message}</p>
            </div>
          </div>
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2">
            <Send className="h-4 w-4" />
            Send {appName}
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{recipient}</h3>
              <p className="text-gray-500 text-[10px]">{appName}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-2">
            {subject && (
              <div className="self-start bg-white/5 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                <p className="text-gray-400 text-[10px] mb-1">Subject</p>
                <p className="text-white text-xs">{subject}</p>
              </div>
            )}
            <div className="self-end bg-emerald-500/20 rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
              <p className="text-white text-xs leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2">
            <div className="flex-1 bg-white/5 rounded-lg px-3 py-2">
              <p className="text-gray-600 text-xs">Type a message...</p>
            </div>
            <button className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-3 border-b">
          <div className={`w-10 h-10 ${appColor} rounded-full flex items-center justify-center`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-foreground font-bold text-sm">{appName}</h3>
            <p className="text-muted-foreground text-[10px]">to {recipient}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-3 flex-1">
          {subject && (
            <div>
              <p className="text-muted-foreground text-[10px]">Subject</p>
              <p className="text-foreground text-xs font-medium">{subject}</p>
            </div>
          )}
          <div className={subject ? "border-t pt-3" : ""}>
            <p className="text-foreground text-xs leading-relaxed">{message}</p>
          </div>
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePreview;
