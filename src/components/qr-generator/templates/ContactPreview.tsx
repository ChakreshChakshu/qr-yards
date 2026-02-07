import { User, Phone, Mail, Globe, Building2, MapPin, Briefcase } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface ContactPreviewProps {
  data: Record<string, string>;
  typeId: string;
  style: TemplateStyle;
}

const ContactPreview = ({ data, typeId, style }: ContactPreviewProps) => {
  const name = typeId === "business"
    ? data.name || "Business Name"
    : `${data.firstName || "John"} ${data.lastName || "Doe"}`;
  const phone = data.phone || data.mobile || "";
  const email = data.email || "";
  const org = data.organization || data.name || "";
  const title = data.title || "";
  const website = data.url || "";
  const address = data.address || (data.street ? `${data.street}, ${data.city || ""}` : "");

  const infoItems = [
    { icon: Phone, value: phone, label: "Phone" },
    { icon: Mail, value: email, label: "Email" },
    { icon: Building2, value: org, label: "Company" },
    { icon: Briefcase, value: title, label: "Title" },
    { icon: Globe, value: website, label: "Website" },
    { icon: MapPin, value: address, label: "Address" },
  ].filter((i) => i.value);

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center gap-4 pt-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">{name}</h3>
            {title && <p className="text-white/70 text-xs">{title}</p>}
            {org && <p className="text-white/50 text-xs">{org}</p>}
          </div>
          <div className="w-full space-y-2 mt-2">
            {infoItems.slice(0, 4).map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <item.icon className="h-4 w-4 text-white/70 shrink-0" />
                <span className="text-white text-xs truncate">{item.value}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm mt-auto">
            Save Contact
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{name}</h3>
              {title && <p className="text-emerald-400 text-xs">{title}</p>}
              {org && <p className="text-gray-500 text-xs">{org}</p>}
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 space-y-3">
            {infoItems.slice(0, 5).map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px]">{item.label}</p>
                  <p className="text-white text-xs truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-emerald-500 rounded-xl text-white font-bold text-sm mt-auto">
            Add to Contacts
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center gap-4 pt-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="text-foreground font-bold text-lg">{name}</h3>
          {title && <p className="text-muted-foreground text-xs">{title}</p>}
          {org && <p className="text-muted-foreground/70 text-xs">{org}</p>}
        </div>
        <div className="w-full bg-white rounded-2xl shadow-sm border p-4 space-y-3">
          {infoItems.slice(0, 5).map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-muted-foreground text-[10px]">{item.label}</p>
                <p className="text-foreground text-xs truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm mt-auto">
          Save Contact
        </button>
      </div>
    </div>
  );
};

export default ContactPreview;
