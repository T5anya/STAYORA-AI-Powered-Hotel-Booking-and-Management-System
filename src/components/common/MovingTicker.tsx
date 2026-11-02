import React from 'react';
import { Sparkles, Crown, Compass, Sun, Shield, Award, Gem, Flame } from 'lucide-react';

export const MovingTicker: React.FC = () => {
  const tickerItems = [
    { tag: 'ROYAL PRIVILEGE', icon: Crown, text: 'Complimentary Heritage Champagne & Butler Welcome on Palatial Arrivals' },
    { tag: 'SPRING 2027', icon: Sparkles, text: 'Taj Lake Palace Udaipur: Jharokha Grand Lake Suites Now Open for Advance Booking' },
    { tag: 'PRIVATE EXPEDITION', icon: Compass, text: 'Ranthambore Tiger Sanctuary: Chartered Open-Top 4x4 & Lead Naturalist Included' },
    { tag: 'COASTAL HAVEN', icon: Sun, text: 'Goa Ocean Villas: Private Beach Cabana, Sunset Catamaran Sailing & Private Chef' },
    { tag: 'ENTERPRISE RBAC', icon: Shield, text: 'Master Key Authentication & Strict Role-Isolated Portals Active Across 42 Destinations' },
    { tag: 'PRIVILEGE CLUB', icon: Award, text: 'Guaranteed 4:00 PM Late Check-Out & Suite Upgrades for Jade & Kohinoor Patrons' },
    { tag: 'MICHELIN DINING', icon: Flame, text: 'Chef-Curated Royal Thali & Artisanal Dining Service Delivered Directly to Your Suite' },
    { tag: 'CHARTER FLEET', icon: Gem, text: 'Private Twin-Turboprop Air Transfers Direct to Luxury Heritage Estates' }
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-[#07130F] via-[#10241D] to-[#07130F] text-[#FBF9F4] border-y-2 border-[#C5A880]/35 shadow-xl overflow-hidden py-4 sm:py-5 select-none my-6">
      {/* Edge gradient fades for luxury theatrical reveal */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07130F] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07130F] to-transparent z-10" />

      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 text-sm sm:text-base tracking-wide font-medium">
              <Icon className="w-5 h-5 text-[#C5A880] shrink-0 filter drop-shadow-[0_0_6px_rgba(197,168,128,0.5)] animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#D4AF37] border border-[#C5A880]/30">
                {item.tag}
              </span>
              <span className="text-[#FBF9F4] font-serif sm:font-sans font-semibold tracking-wide drop-shadow-sm">
                {item.text}
              </span>
              <span className="text-[#C5A880] font-serif text-lg mx-6 select-none opacity-80">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
