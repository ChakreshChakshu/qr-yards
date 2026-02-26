import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
  return (
    <div className="relative mx-auto w-[260px] h-[520px] select-none">
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-foreground/90 shadow-2xl" />
      
      {/* Screen bezel */}
      <div className="absolute inset-[3px] rounded-[2.3rem] bg-background overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-medium text-foreground/70 z-10">
          <span>9:41</span>
          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-20 h-[22px] bg-foreground/90 rounded-full" />
          <div className="flex items-center gap-1">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" className="opacity-70">
              <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
              <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
              <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
            </svg>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor" className="opacity-70">
              <rect x="0" y="1" width="16" height="8" rx="1.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
              <rect x="1.5" y="2.5" width="11" height="5" rx="0.5" />
              <rect x="17" y="3" width="2" height="4" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1">
          <div className="w-[100px] h-[4px] rounded-full bg-foreground/20" />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
