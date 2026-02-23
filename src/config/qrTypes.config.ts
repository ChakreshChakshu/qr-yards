import {
    Globe, Type, FileText, Image as ImageIcon, UserPlus, Video, List, Building2,
    UtensilsCrossed, Tag, Music, Smartphone, Wifi, LayoutTemplate, CalendarDays,
    Contact, MessageSquare, ListMusic, Mail, MessageCircle, Share2,
    ScanBarcode, ThumbsUp, type LucideIcon
} from "lucide-react";

export interface QRField {
    name: string;
    label: string;
    type: 'text' | 'url' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time' | 'hidden' | 'number' | 'password';
    placeholder?: string;
    options?: string[];
    required?: boolean;
}

export interface QRTypeConfig {
    id: string;
    label: string;
    icon: LucideIcon;
    description: string;
    fields: QRField[];
    encode: (data: Record<string, string>) => string;
}

export const qrTypes: QRTypeConfig[] = [
    {
        id: 'url', label: 'Website', icon: Globe,
        description: 'Link to any website or webpage',
        fields: [
            { name: 'url', label: 'Website URL', type: 'url', placeholder: 'https://example.com', required: true }
        ],
        encode: (d) => {
            let url = d.url || '';
            if (url && !/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }
            return url;
        }
    },
    {
        id: 'pdf', label: 'PDF', icon: FileText,
        description: 'Link to a PDF document',
        fields: [
            { name: 'url', label: 'PDF URL', type: 'url', placeholder: 'https://example.com/document.pdf', required: true }
        ],
        encode: (d) => d.url || ''
    },
    {
        id: 'image', label: 'Image', icon: ImageIcon,
        description: 'Show an image',
        fields: [
            { name: 'url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/image.jpg', required: true }
        ],
        encode: (d) => d.url || ''
    },
    {
        id: 'video', label: 'Video', icon: Video,
        description: 'YouTube or video link',
        fields: [
            { name: 'url', label: 'Video URL', type: 'url', placeholder: 'https://youtube.com/watch?v=...', required: true }
        ],
        encode: (d) => d.url || ''
    },
    {
        id: 'text', label: 'Text', icon: Type,
        description: 'Display plain text',
        fields: [
            { name: 'text', label: 'Your Text', type: 'textarea', placeholder: 'Enter your text here...', required: true }
        ],
        encode: (d) => d.text || ''
    },
    {
        id: 'wifi', label: 'Wi-Fi', icon: Wifi,
        description: 'Connect to Wi-Fi network',
        fields: [
            { name: 'ssid', label: 'Network Name (SSID)', type: 'text', placeholder: 'MyNetwork', required: true },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'Network password' },
            { name: 'encryption', label: 'Encryption', type: 'select', options: ['WPA/WPA2', 'WEP', 'None'], required: true }
        ],
        encode: (d) => {
            const enc = d.encryption === 'None' ? 'nopass' : d.encryption === 'WEP' ? 'WEP' : 'WPA';
            return `WIFI:T:${enc};S:${d.ssid || ''};P:${d.password || ''};;`;
        }
    },
    {
        id: 'vcard', label: 'vCard', icon: Contact,
        description: 'Share contact details',
        fields: [
            { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', required: true },
            { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1234567890' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Company Inc.' },
            { name: 'url', label: 'Website', type: 'url', placeholder: 'https://example.com' }
        ],
        encode: (d) => {
            let v = 'BEGIN:VCARD\nVERSION:3.0\n';
            v += `N:${d.lastName || ''};${d.firstName || ''};;;\n`;
            v += `FN:${d.firstName || ''} ${d.lastName || ''}\n`;
            if (d.phone) v += `TEL:${d.phone}\n`;
            if (d.email) v += `EMAIL:${d.email}\n`;
            if (d.organization) v += `ORG:${d.organization}\n`;
            if (d.url) v += `URL:${d.url}\n`;
            v += 'END:VCARD';
            return v;
        }
    },
    {
        id: 'social', label: 'Social Media', icon: Share2,
        description: 'Link to social profiles',
        fields: [
            { name: 'facebook', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/yourpage' },
            { name: 'instagram', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/yourprofile' },
            { name: 'twitter', label: 'X (Twitter) URL', type: 'url', placeholder: 'https://x.com/yourhandle' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
        ],
        encode: (d) => {
            // For simplicity, just combining them or picking the first valid one if strictly QR. 
            // But typically a "Social" QR links to a landing page with all links.
            // Since this is a static generator without backend storage for landing pages (yet), 
            // maybe we just encode a text list or similar?
            // The user wants "Social links" as "Link to social profiles".
            // Let's encode as a text list for now, or maybe just the first link if only one is provided?
            // A better way is to use a landing page (like Linktree), but we don't have that yet.
            // Let's stick to the previous implementation which was a list of text.
            const links: string[] = [];
            if (d.facebook) links.push(`Facebook: ${d.facebook}`);
            if (d.instagram) links.push(`Instagram: ${d.instagram}`);
            if (d.twitter) links.push(`X: ${d.twitter}`);
            if (d.linkedin) links.push(`LinkedIn: ${d.linkedin}`);
            return links.join('\n') || '';
        }
    },
    // Extra types from previous implementation to keep parity
    {
        id: 'email', label: 'Email', icon: Mail,
        description: 'Send an email',
        fields: [
            { name: 'to', label: 'Recipient', type: 'email', placeholder: 'hello@example.com', required: true },
            { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Hello' },
            { name: 'body', label: 'Message', type: 'textarea', placeholder: 'Type your message...' }
        ],
        encode: (d) => `mailto:${d.to}?subject=${encodeURIComponent(d.subject || '')}&body=${encodeURIComponent(d.body || '')}`
    },
    {
        id: 'sms', label: 'SMS', icon: MessageSquare,
        description: 'Send an SMS',
        fields: [
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1234567890', required: true },
            { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Hello...' }
        ],
        encode: (d) => `SMSTO:${d.phone}:${d.message || ''}`
    },
    {
        id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle,
        description: 'WhatsApp message',
        fields: [
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '1234567890', required: true },
            { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Hello...' }
        ],
        encode: (d) => `https://wa.me/${d.phone}?text=${encodeURIComponent(d.message || '')}`
    },
    {
        id: 'event', label: 'Event', icon: CalendarDays,
        description: 'Event details',
        fields: [
            { name: 'title', label: 'Event Title', type: 'text', placeholder: 'My Event', required: true },
            { name: 'startDate', label: 'Start Date', type: 'date', required: true },
            { name: 'startTime', label: 'Start Time', type: 'time' },
            { name: 'endDate', label: 'End Date', type: 'date' },
            { name: 'endTime', label: 'End Time', type: 'time' },
            { name: 'location', label: 'Location', type: 'text', placeholder: '123 Main St' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Details...' }
        ],
        encode: (d) => {
            const fmt = (date: string, time: string) => {
                if (!date) return '';
                return date.replace(/-/g, '') + (time ? 'T' + time.replace(/:/g, '') + '00' : '');
            };
            let e = 'BEGIN:VCALENDAR\nBEGIN:VEVENT\n';
            e += `SUMMARY:${d.title || ''}\n`;
            const s = fmt(d.startDate, d.startTime);
            if (s) e += `DTSTART:${s}\n`;
            const en = fmt(d.endDate || d.startDate, d.endTime);
            if (en) e += `DTEND:${en}\n`;
            if (d.location) e += `LOCATION:${d.location}\n`;
            if (d.description) e += `DESCRIPTION:${d.description}\n`;
            e += 'END:VEVENT\nEND:VCALENDAR';
            return e;
        }
    }
];
