

# QRYards — QR Code Generator & Digital Toolbox

## Overview
A sleek, modern QR code generator web app inspired by qrfy.com. Fully frontend-based with client-side QR generation, rich customization options, and a polished landing page — all branded as **QRYards**.

---

## Page 1: Landing Page / Home
- **Navigation bar** with QRYards logo, links (Products, Resources, FAQ), and Register/Login buttons (placeholder/non-functional for now)
- **Hero section** featuring the interactive QR code generator widget front and center (just like qrfy.com)
- **"How it works"** section: 3 steps — Choose content → Customize design → Download
- **QR Code Types showcase**: Grid of all supported types with icons and descriptions
- **Features highlight section**: "Your all-in-one marketing platform" with feature cards (customization, analytics mention, dynamic QR, etc.)
- **Testimonials / social proof** section
- **FAQ accordion** section
- **Footer** with links (Terms, Privacy, Support, social media icons)

## QR Code Generator Widget (Core Feature)
This is the heart of the app, embedded on the landing page:

### Step 1: Choose Content Type
Tab bar with all 20+ QR code types:
- **Website/URL** — enter a URL
- **Text** — free-form text
- **PDF** — upload or link to PDF
- **Images** — link to image gallery
- **vCard Plus** — full contact card with photo, phone, email, address
- **Video** — YouTube/Vimeo URL or direct link
- **List of Links** — multiple URLs with labels
- **Business** — company info page
- **Menu** — restaurant/café menu
- **Coupon** — discount code with details
- **MP3** — audio file link
- **Apps** — app store links (iOS + Android)
- **Wi-Fi** — network name, password, encryption type
- **Landing Page** — mini landing page content
- **Event** — event name, date, location, description
- **vCard** — simple contact card
- **Feedback** — feedback form link
- **Playlist** — music playlist link
- **Email** — pre-filled email (to, subject, body)
- **WhatsApp** — pre-filled WhatsApp message
- **SMS** — pre-filled SMS message
- **Social Media** — links to social profiles
- **2D Barcode** — standard barcode data

Each type shows a relevant input form.

### Step 2: Design & Customize
Tabbed customization panel:
- **Frame** — choose from decorative frame styles around the QR code
- **Shape** — dot style (squares, rounded, dots, etc.) and eye/corner patterns
- **Colors** — foreground color, background color, gradient options
- **Logo** — upload a logo to place in the center of the QR code
- **Error Correction Level** — Low, Medium, Quartile, High

### Step 3: Live Preview & Download
- Real-time QR code preview that updates as you type/customize
- Download button with format options: **PNG, SVG, PDF**

---

## Design & Style
- **Color scheme**: Modern blue primary (similar to qrfy.com) with clean white backgrounds
- **Typography**: Clean sans-serif, bold headlines
- **Animations**: Smooth fade-ins, hover effects on cards and buttons, subtle scale transitions
- **Responsive**: Fully responsive — mobile-first grid that adapts to tablet and desktop
- **Gen-Z energy**: Vibrant accent colors, playful micro-interactions, rounded corners

## Technical Approach
- Client-side QR code generation using a JavaScript QR library (no server needed)
- All data stays in the browser — no backend, no user accounts
- React with Tailwind CSS for styling
- Component-based architecture for each QR type's input form

