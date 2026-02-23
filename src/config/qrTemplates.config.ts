export type TemplateCategory =
    | "business"
    | "marketing"
    | "events"
    | "restaurant"
    | "minimal"
    | "social";

export interface TemplateStyle {
    id: string;
    name: string;
    category: TemplateCategory;
    colors: {
        bg: string; // Gradient from-to string or solid color hex
        accent: string;
        text: string;
        secondary: string;
    };
    qrConfig: {
        fgColor: string;
        bgColor: string;
        eyeColor?: string;
        eyeShape?: "square" | "circle" | "rounded" | "leaf";
        moduleShape?: "square" | "circle" | "rounded" | "dots";
        logoEnabled?: boolean;
        logoSize?: number;
        errorLevel?: "L" | "M" | "Q" | "H";
        frame?: "none" | "simple" | "badge" | "bubble";
    };
}

export const templateStyles: TemplateStyle[] = [
    // Minimal
    {
        id: "minimal-clean",
        name: "Clean White",
        category: "minimal",
        colors: {
            bg: "bg-white",
            accent: "bg-black/10",
            text: "text-gray-900",
            secondary: "text-gray-500",
        },
        qrConfig: {
            fgColor: "#000000",
            bgColor: "#FFFFFF",
            moduleShape: "square",
            eyeShape: "square",
        },
    },
    {
        id: "minimal-dark",
        name: "Dark Mode",
        category: "minimal",
        colors: {
            bg: "bg-zinc-950",
            accent: "bg-white/10",
            text: "text-zinc-100",
            secondary: "text-zinc-400",
        },
        qrConfig: {
            fgColor: "#FFFFFF",
            bgColor: "#09090b", // zinc-950
            moduleShape: "rounded",
            eyeShape: "rounded",
        },
    },

    // Business
    {
        id: "business-blue",
        name: "Corporate Blue",
        category: "business",
        colors: {
            bg: "from-blue-600 to-indigo-700",
            accent: "bg-white/20",
            text: "text-white",
            secondary: "text-blue-100",
        },
        qrConfig: {
            fgColor: "#1e40af", // blue-800
            bgColor: "#eff6ff", // blue-50
            moduleShape: "square",
            eyeShape: "square",
            logoEnabled: true,
        },
    },
    {
        id: "business-gold",
        name: "Executive Gold",
        category: "business",
        colors: {
            bg: "from-amber-700 to-yellow-600",
            accent: "bg-white/20",
            text: "text-white",
            secondary: "text-amber-100",
        },
        qrConfig: {
            fgColor: "#78350f", // amber-900
            bgColor: "#fffbeb", // amber-50
            moduleShape: "rounded",
            eyeShape: "rounded",
        },
    },

    // Marketing
    {
        id: "marketing-vibrant",
        name: "Vibrant Gradient",
        category: "marketing",
        colors: {
            bg: "from-pink-500 via-red-500 to-yellow-500",
            accent: "bg-white/30",
            text: "text-white",
            secondary: "text-white/80",
        },
        qrConfig: {
            fgColor: "#db2777", // pink-600
            bgColor: "#ffffff",
            moduleShape: "dots",
            eyeShape: "circle",
        },
    },
    {
        id: "marketing-purple",
        name: "Digital Purple",
        category: "marketing",
        colors: {
            bg: "from-purple-600 to-indigo-600",
            accent: "bg-white/20",
            text: "text-white",
            secondary: "text-purple-100",
        },
        qrConfig: {
            fgColor: "#4c1d95", // purple-900
            bgColor: "#f3e8ff", // purple-100
            moduleShape: "rounded",
            eyeShape: "leaf",
        },
    },

    // Events
    {
        id: "event-dark",
        name: "Night Life",
        category: "events",
        colors: {
            bg: "bg-slate-900",
            accent: "bg-fuchsia-500/30",
            text: "text-fuchsia-50",
            secondary: "text-slate-400",
        },
        qrConfig: {
            fgColor: "#d946ef", // fuchsia-500
            bgColor: "#0f172a", // slate-900
            moduleShape: "rounded",
            eyeShape: "rounded",
            errorLevel: "H",
        },
    },
    {
        id: "event-wedding",
        name: "Wedding",
        category: "events",
        colors: {
            bg: "bg-stone-50",
            accent: "bg-stone-200",
            text: "text-stone-800",
            secondary: "text-stone-500",
        },
        qrConfig: {
            fgColor: "#57534e", // stone-600
            bgColor: "#fafaf9", // stone-50
            moduleShape: "dots",
            eyeShape: "leaf",
        }
    },

    // Restaurant
    {
        id: "restaurant-menu",
        name: "Menu",
        category: "restaurant",
        colors: {
            bg: "from-orange-500 to-red-600",
            accent: "bg-white/20",
            text: "text-white",
            secondary: "text-orange-50",
        },
        qrConfig: {
            fgColor: "#c2410c", // orange-700
            bgColor: "#fff7ed", // orange-50
            moduleShape: "rounded",
            eyeShape: "rounded",
        }
    },

    // Social
    {
        id: "social-connect",
        name: "Social Connect",
        category: "social",
        colors: {
            bg: "from-sky-400 to-blue-500",
            accent: "bg-white/30",
            text: "text-white",
            secondary: "text-sky-50",
        },
        qrConfig: {
            fgColor: "#0284c7",
            bgColor: "#ffffff",
            moduleShape: "dots",
            eyeShape: "circle",
        }
    }
];

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; label: string }[] = [
    { id: "minimal", label: "Minimal" },
    { id: "business", label: "Business" },
    { id: "marketing", label: "Marketing" },
    { id: "events", label: "Events" },
    { id: "restaurant", label: "Restaurant" },
    { id: "social", label: "Social" },
];
