import {
  Globe, Type, FileText, Image as ImageIcon, UserPlus, Video, List, Building2,
  UtensilsCrossed, Tag, Music, Smartphone, Wifi, LayoutTemplate, CalendarDays,
  Contact, MessageSquare, ListMusic, Mail, MessageCircle, Share2,
  ScanBarcode, ThumbsUp, type LucideIcon
} from "lucide-react";

export interface QRField {
  name: string;
  label: string;
  type: 'text' | 'url' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time' | 'number' | 'password';
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
    encode: (d) => d.url || ''
  },
  {
    id: 'text', label: 'Text', icon: Type,
    description: 'Any plain text content',
    fields: [
      { name: 'text', label: 'Your Text', type: 'textarea', placeholder: 'Enter your text here...', required: true }
    ],
    encode: (d) => d.text || ''
  },
  {
    id: 'email', label: 'Email', icon: Mail,
    description: 'Pre-filled email message',
    fields: [
      { name: 'to', label: 'Recipient Email', type: 'email', placeholder: 'hello@example.com', required: true },
      { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Email subject' },
      { name: 'body', label: 'Message', type: 'textarea', placeholder: 'Email body...' }
    ],
    encode: (d) => {
      const params: string[] = [];
      if (d.subject) params.push(`subject=${encodeURIComponent(d.subject)}`);
      if (d.body) params.push(`body=${encodeURIComponent(d.body)}`);
      return `mailto:${d.to || ''}${params.length ? '?' + params.join('&') : ''}`;
    }
  },
  {
    id: 'sms', label: 'SMS', icon: MessageSquare,
    description: 'Pre-filled SMS message',
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1234567890', required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message...' }
    ],
    encode: (d) => `SMSTO:${d.phone || ''}:${d.message || ''}`
  },
  {
    id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle,
    description: 'Pre-filled WhatsApp message',
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '1234567890 (without +)', required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Hello! I would like to...' }
    ],
    encode: (d) => `https://wa.me/${d.phone || ''}${d.message ? '?text=' + encodeURIComponent(d.message) : ''}`
  },
  {
    id: 'wifi', label: 'Wi-Fi', icon: Wifi,
    description: 'Wi-Fi network credentials',
    fields: [
      { name: 'ssid', label: 'Network Name (SSID)', type: 'text', placeholder: 'MyNetwork', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Network password' },
      { name: 'encryption', label: 'Encryption', type: 'select', options: ['WPA/WPA2', 'WEP', 'None'] }
    ],
    encode: (d) => {
      const enc = d.encryption === 'None' ? 'nopass' : d.encryption === 'WEP' ? 'WEP' : 'WPA';
      return `WIFI:T:${enc};S:${d.ssid || ''};P:${d.password || ''};;`;
    }
  },
  {
    id: 'vcard', label: 'vCard', icon: Contact,
    description: 'Simple contact card',
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
    id: 'vcard-plus', label: 'vCard Plus', icon: UserPlus,
    description: 'Detailed contact card with full info',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
      { name: 'phone', label: 'Work Phone', type: 'tel', placeholder: '+1234567890' },
      { name: 'mobile', label: 'Mobile', type: 'tel', placeholder: '+1987654321' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
      { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Company Inc.' },
      { name: 'title', label: 'Job Title', type: 'text', placeholder: 'CEO' },
      { name: 'street', label: 'Street', type: 'text', placeholder: '123 Main St' },
      { name: 'city', label: 'City', type: 'text', placeholder: 'New York' },
      { name: 'url', label: 'Website', type: 'url', placeholder: 'https://example.com' }
    ],
    encode: (d) => {
      let v = 'BEGIN:VCARD\nVERSION:3.0\n';
      v += `N:${d.lastName || ''};${d.firstName || ''};;;\n`;
      v += `FN:${d.firstName || ''} ${d.lastName || ''}\n`;
      if (d.phone) v += `TEL;TYPE=WORK:${d.phone}\n`;
      if (d.mobile) v += `TEL;TYPE=CELL:${d.mobile}\n`;
      if (d.email) v += `EMAIL:${d.email}\n`;
      if (d.organization) v += `ORG:${d.organization}\n`;
      if (d.title) v += `TITLE:${d.title}\n`;
      if (d.street || d.city) v += `ADR:;;${d.street || ''};${d.city || ''};;;;\n`;
      if (d.url) v += `URL:${d.url}\n`;
      v += 'END:VCARD';
      return v;
    }
  },
  {
    id: 'event', label: 'Event', icon: CalendarDays,
    description: 'Event with date and location',
    fields: [
      { name: 'title', label: 'Event Name', type: 'text', placeholder: 'Annual Conference', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'startTime', label: 'Start Time', type: 'time' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'endTime', label: 'End Time', type: 'time' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Convention Center, NYC' },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Event details...' }
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
    id: 'images', label: 'Images', icon: ImageIcon,
    description: 'Link to an image gallery',
    fields: [
      { name: 'url', label: 'Image Gallery URL', type: 'url', placeholder: 'https://example.com/gallery', required: true }
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
    id: 'mp3', label: 'MP3', icon: Music,
    description: 'Audio file link',
    fields: [
      { name: 'url', label: 'Audio URL', type: 'url', placeholder: 'https://example.com/audio.mp3', required: true }
    ],
    encode: (d) => d.url || ''
  },
  {
    id: 'apps', label: 'Apps', icon: Smartphone,
    description: 'App Store links',
    fields: [
      { name: 'ios', label: 'iOS App Store URL', type: 'url', placeholder: 'https://apps.apple.com/...' },
      { name: 'android', label: 'Google Play URL', type: 'url', placeholder: 'https://play.google.com/...' }
    ],
    encode: (d) => d.ios || d.android || ''
  },
  {
    id: 'links', label: 'Link List', icon: List,
    description: 'Multiple links with labels',
    fields: [
      { name: 'link1', label: 'Link 1', type: 'url', placeholder: 'https://example.com', required: true },
      { name: 'label1', label: 'Label 1', type: 'text', placeholder: 'My Website' },
      { name: 'link2', label: 'Link 2', type: 'url', placeholder: 'https://example2.com' },
      { name: 'label2', label: 'Label 2', type: 'text', placeholder: 'My Blog' },
      { name: 'link3', label: 'Link 3', type: 'url', placeholder: 'https://example3.com' },
      { name: 'label3', label: 'Label 3', type: 'text', placeholder: 'My Store' }
    ],
    encode: (d) => {
      const links: string[] = [];
      for (let i = 1; i <= 3; i++) {
        if (d[`link${i}`]) links.push(`${d[`label${i}`] || `Link ${i}`}: ${d[`link${i}`]}`);
      }
      return links.join('\n') || '';
    }
  },
  {
    id: 'business', label: 'Business', icon: Building2,
    description: 'Business information card',
    fields: [
      { name: 'name', label: 'Business Name', type: 'text', placeholder: 'Acme Inc.', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1234567890' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'info@acme.com' },
      { name: 'url', label: 'Website', type: 'url', placeholder: 'https://acme.com' },
      { name: 'address', label: 'Address', type: 'text', placeholder: '123 Business Ave' }
    ],
    encode: (d) => {
      let v = 'BEGIN:VCARD\nVERSION:3.0\n';
      v += `ORG:${d.name || ''}\nFN:${d.name || ''}\n`;
      if (d.phone) v += `TEL:${d.phone}\n`;
      if (d.email) v += `EMAIL:${d.email}\n`;
      if (d.url) v += `URL:${d.url}\n`;
      if (d.address) v += `ADR:;;${d.address};;;;\n`;
      v += 'END:VCARD';
      return v;
    }
  },
  {
    id: 'menu', label: 'Menu', icon: UtensilsCrossed,
    description: 'Restaurant or café menu',
    fields: [
      { name: 'url', label: 'Menu URL', type: 'url', placeholder: 'https://example.com/menu', required: true },
      { name: 'restaurant', label: 'Restaurant Name', type: 'text', placeholder: 'Bella Cucina' }
    ],
    encode: (d) => d.url || ''
  },
  {
    id: 'coupon', label: 'Coupon', icon: Tag,
    description: 'Discount code or offer',
    fields: [
      { name: 'title', label: 'Offer Title', type: 'text', placeholder: '20% Off Everything!', required: true },
      { name: 'code', label: 'Coupon Code', type: 'text', placeholder: 'SAVE20' },
      { name: 'description', label: 'Details', type: 'textarea', placeholder: 'Valid until Dec 31...' },
      { name: 'url', label: 'Redemption URL', type: 'url', placeholder: 'https://shop.example.com' }
    ],
    encode: (d) => {
      let t = d.title || '';
      if (d.code) t += `\nCode: ${d.code}`;
      if (d.description) t += `\n${d.description}`;
      if (d.url) t += `\n${d.url}`;
      return t;
    }
  },
  {
    id: 'landing', label: 'Landing Page', icon: LayoutTemplate,
    description: 'Mini landing page link',
    fields: [
      { name: 'url', label: 'Landing Page URL', type: 'url', placeholder: 'https://example.com/promo', required: true }
    ],
    encode: (d) => d.url || ''
  },
  {
    id: 'feedback', label: 'Feedback', icon: ThumbsUp,
    description: 'Feedback or survey form',
    fields: [
      { name: 'url', label: 'Feedback Form URL', type: 'url', placeholder: 'https://forms.google.com/...', required: true }
    ],
    encode: (d) => d.url || ''
  },
  {
    id: 'playlist', label: 'Playlist', icon: ListMusic,
    description: 'Music playlist link',
    fields: [
      { name: 'url', label: 'Playlist URL', type: 'url', placeholder: 'https://open.spotify.com/playlist/...', required: true }
    ],
    encode: (d) => d.url || ''
  },
  {
    id: 'social', label: 'Social Media', icon: Share2,
    description: 'Social profile links',
    fields: [
      { name: 'facebook', label: 'Facebook', type: 'url', placeholder: 'https://facebook.com/yourpage' },
      { name: 'instagram', label: 'Instagram', type: 'url', placeholder: 'https://instagram.com/yourprofile' },
      { name: 'twitter', label: 'X (Twitter)', type: 'url', placeholder: 'https://x.com/yourhandle' },
      { name: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
      { name: 'tiktok', label: 'TikTok', type: 'url', placeholder: 'https://tiktok.com/@yourhandle' }
    ],
    encode: (d) => {
      const links: string[] = [];
      if (d.facebook) links.push(`Facebook: ${d.facebook}`);
      if (d.instagram) links.push(`Instagram: ${d.instagram}`);
      if (d.twitter) links.push(`X: ${d.twitter}`);
      if (d.linkedin) links.push(`LinkedIn: ${d.linkedin}`);
      if (d.tiktok) links.push(`TikTok: ${d.tiktok}`);
      return links.join('\n') || '';
    }
  },
  {
    id: 'barcode', label: '2D Barcode', icon: ScanBarcode,
    description: 'Standard barcode data',
    fields: [
      { name: 'data', label: 'Barcode Data', type: 'text', placeholder: '1234567890', required: true }
    ],
    encode: (d) => d.data || ''
  }
];