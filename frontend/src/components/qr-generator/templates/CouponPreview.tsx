import { Tag, Scissors, Gift } from "lucide-react";
import type { TemplateStyle } from "./template-config";

interface CouponPreviewProps {
  data: Record<string, string>;
  style: TemplateStyle;
}

const CouponPreview = ({ data, style }: CouponPreviewProps) => {
  const title = data.title || "Special Offer!";
  const code = data.code || "SAVE20";
  const description = data.description || "";

  if (style.id === "modern") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-bold text-xl text-center">{title}</h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-full border border-dashed border-white/30">
            <p className="text-white/50 text-[10px] text-center mb-1">YOUR CODE</p>
            <p className="text-white text-2xl font-bold text-center tracking-widest">{code}</p>
          </div>
          {description && (
            <p className="text-white/60 text-xs text-center">{description}</p>
          )}
          <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm">
            Redeem Now
          </button>
        </div>
      </div>
    );
  }

  if (style.id === "bold") {
    return (
      <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Scissors className="h-8 w-8 text-amber-400" />
          <div className="w-full bg-white/5 rounded-2xl overflow-hidden border border-dashed border-white/10">
            <div className="bg-amber-500/20 p-4 text-center">
              <h3 className="text-white font-bold text-lg">{title}</h3>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-500 text-[10px] mb-1">PROMO CODE</p>
              <p className="text-amber-400 text-2xl font-bold tracking-widest">{code}</p>
              {description && (
                <p className="text-gray-400 text-xs mt-3">{description}</p>
              )}
            </div>
          </div>
          <button className="w-full py-3 bg-amber-500 rounded-xl text-white font-bold text-sm">
            Apply Coupon
          </button>
        </div>
      </div>
    );
  }

  // Classic
  return (
    <div className={`min-h-full bg-gradient-to-br ${style.colors.bg} p-5 flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-full bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="bg-primary/10 p-4 text-center">
            <Tag className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-foreground font-bold text-lg">{title}</h3>
          </div>
          <div className="p-4 text-center border-t border-dashed">
            <p className="text-muted-foreground text-[10px] mb-1">COUPON CODE</p>
            <p className="text-primary text-2xl font-bold tracking-widest">{code}</p>
            {description && (
              <p className="text-muted-foreground text-xs mt-3">{description}</p>
            )}
          </div>
        </div>
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold text-sm">
          Redeem Now
        </button>
      </div>
    </div>
  );
};

export default CouponPreview;
