export interface TemplateStyle {
  id: string;
  name: string;
  colors: {
    bg: string;
    accent: string;
    text: string;
    secondary: string;
  };
}

export const templateStyles: TemplateStyle[] = [
  {
    id: "modern",
    name: "Modern",
    colors: {
      bg: "from-indigo-500 to-purple-600",
      accent: "bg-white/20",
      text: "text-white",
      secondary: "text-white/70",
    },
  },
  {
    id: "classic",
    name: "Classic",
    colors: {
      bg: "from-slate-50 to-gray-100",
      accent: "bg-primary/10",
      text: "text-foreground",
      secondary: "text-muted-foreground",
    },
  },
  {
    id: "bold",
    name: "Bold",
    colors: {
      bg: "from-gray-900 to-gray-800",
      accent: "bg-emerald-500/20",
      text: "text-white",
      secondary: "text-gray-400",
    },
  },
];

// Map QR types to template categories
export type TemplateCategory =
  | "link"
  | "contact"
  | "message"
  | "wifi"
  | "event"
  | "list"
  | "coupon"
  | "text";

export const typeToCategory: Record<string, TemplateCategory> = {
  url: "link",
  pdf: "link",
  video: "link",
  mp3: "link",
  landing: "link",
  feedback: "link",
  playlist: "link",
  menu: "link",
  images: "link",
  text: "text",
  barcode: "text",
  email: "message",
  sms: "message",
  whatsapp: "message",
  wifi: "wifi",
  vcard: "contact",
  "vcard-plus": "contact",
  business: "contact",
  event: "event",
  links: "list",
  social: "list",
  apps: "list",
  coupon: "coupon",
};
