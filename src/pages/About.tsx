import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div>
        <BackButton label="Back to Previous Page" fallbackUrl="/" />
      </div>

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
          The Stayora Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#122B22] dark:text-[#FBF9F4] leading-tight">
          Where Regal Grandeur Meets Intelligent Technology
        </h1>
        <p className="text-sm sm:text-base text-[#5A6860] dark:text-[#9DAEA4] font-light leading-relaxed">
          Stayora was founded on a singular conviction: luxury travel should be both transcendent and seamless. We unite authentic heritage preservation with modern software architecture—bringing transparent group payments, express QR check-ins, and property intelligence to India's most extraordinary hotels.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#122B22] text-[#C5A880] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            100% In-Person Audited
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every palace, hill chalet, and coastal villa is vetted by our hospitality specialists. No stock listings or unverified properties.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#122B22] text-[#C5A880] flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            Frictionless Group Travel
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Pioneering automated split payment ledgers and unified group itinerary passes, eliminating awkward debt settling between travel companions.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#122B22] text-[#C5A880] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            Live Operational Intelligence
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our property engine empowers hoteliers with real-time room readiness synchronization, AI dynamic pricing, and instant front desk QR passes.
          </p>
        </div>
      </div>
    </div>
  );
};
