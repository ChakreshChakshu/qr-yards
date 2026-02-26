import { useMemo } from 'react';
import { QrCode, ScanFace, Fingerprint, Aperture, Layers } from 'lucide-react';

/* ─── CSS keyframes injected once ─────────────────────────────────────── */
const STYLE = `
@keyframes marquee-ltr {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-rtl {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-ltr {
  animation: marquee-ltr linear infinite;
  will-change: transform;
}
.marquee-rtl {
  animation: marquee-rtl linear infinite;
  will-change: transform;
}
`;

/* ─── Data ─────────────────────────────────────────────────────────────── */
const ITEM_TYPES = [
    { type: 'qr', color: 'text-blue-500', Icon: QrCode },
    { type: 'qr', color: 'text-green-500', Icon: ScanFace },
    { type: 'qr', color: 'text-orange-500', Icon: Fingerprint },
    { type: 'qr', color: 'text-indigo-500', Icon: Aperture },
    { type: 'qr', color: 'text-red-500', Icon: Layers },
] as const;

type ItemType = (typeof ITEM_TYPES)[number];

const generateRow = (length: number): ItemType[] =>
    Array.from({ length }).map(
        () => ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)]
    );

/* ─── Card ─────────────────────────────────────────────────────────────── */
const CardItem = ({ item }: { item: ItemType }) => {
    const { Icon, color } = item;
    return (
        <div className="w-38 h-38 rounded-3xl shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-gray-100 p-3 flex flex-col relative overflow-hidden border border-slate-100">
            <div className="flex justify-between w-full">
                <div className="w-7 h-7 border-4 border-slate-800 rounded-lg" />
                <div className="w-7 h-7 border-4 border-slate-800 rounded-lg" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-gray-400 shadow-md rounded-xl flex items-center justify-center z-10">
                    <Icon className={`w-6 h-6 ${color}`} strokeWidth={2.5} />
                </div>
                <div className="absolute inset-4 border-2 border-dashed border-slate-300 opacity-40 rounded-lg" />
            </div>
            <div className="flex justify-between w-full mt-auto">
                <div className="w-7 h-7 border-4 border-slate-800 rounded-lg" />
                <div className="w-7 h-7 bg-slate-800 rounded-lg scale-50" />
            </div>
        </div>
    );
};

/* ─── Marquee Row ───────────────────────────────────────────────────────
   We duplicate items so the strip is 2× wide.
   The animation always scrolls exactly 50% (= one copy), then resets
   seamlessly — no hitch, no JS, pure GPU.
──────────────────────────────────────────────────────────────────────── */
const MarqueeRow = ({
    items,
    direction = 'ltr',
    duration = 40,
}: {
    items: ItemType[];
    direction?: 'ltr' | 'rtl';
    duration?: number;
}) => {
    // Duplicate once → the CSS animation scrolls exactly the first half
    const doubled = [...items, ...items];

    return (
        <div className="overflow-hidden w-full py-3">
            <div
                className={direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl'}
                style={{
                    animationDuration: `${duration}s`,
                    display: 'flex',
                    gap: '1.5rem',      /* gap-6 */
                    width: 'max-content',
                }}
            >
                {doubled.map((item, i) => (
                    <CardItem key={i} item={item} />
                ))}
            </div>
        </div>
    );
};

/* ─── Background ────────────────────────────────────────────────────────── */
export default function QRMarqueeBackground() {
    const rows = useMemo(
        () => [
            generateRow(12),
            generateRow(12),
            generateRow(12),
            generateRow(12),
            generateRow(12),
        ],
        []
    );

    return (
        <>
            {/* Inject keyframes once */}
            <style>{STYLE}</style>

            <div className="relative w-full h-full overflow-hidden bg-linear-to-br from-secondary/20 via-background to-background">
                {/* Subtle light streaks */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 mix-blend-overlay">
                    <div className="absolute -top-40 -left-40 w-96 h-[200%] bg-white/30 rotate-45 blur-3xl" />
                    <div className="absolute top-20 left-40 w-32 h-[200%] bg-white/40 rotate-45 blur-2xl" />
                </div>

                {/* Tilted marquee strip */}
                <div className="absolute w-[160%] h-[160%] -left-[30%] -top-[30%] flex flex-col justify-center -rotate-15 origin-center">
                    <MarqueeRow items={rows[0]} direction="ltr" duration={45} />
                    <MarqueeRow items={rows[1]} direction="rtl" duration={55} />
                    <MarqueeRow items={rows[2]} direction="ltr" duration={40} />
                    <MarqueeRow items={rows[3]} direction="rtl" duration={60} />
                    <MarqueeRow items={rows[4]} direction="ltr" duration={50} />
                </div>
            </div>
        </>
    );
}
