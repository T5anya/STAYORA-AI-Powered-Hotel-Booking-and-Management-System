import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Coupon } from '../types/hotel';
import { apiRequest } from '../api/client';
import { BackButton } from '../components/common/BackButton';

export const Offers: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await apiRequest<{ coupons: Coupon[] }>('/coupons');
        setCoupons(res.coupons || []);
      } catch (err) {
        console.error('Failed to load coupons', err);
      }
    }
    loadOffers();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <BackButton label="Back to Discover" fallbackUrl="/" />
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
          Exclusive Stayora Privileges
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
          Member Tariffs & Offers
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4]">
          Apply these verified privilege codes at reservation checkout for instant deductions on our heritage suites and luxury villas.
        </p>
      </div>

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#C5A880]/40 p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A880]/20 text-[#8B5E3C] dark:text-[#C5A880]">
                  {coupon.discountPercentage}% OFF
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Max ₹{coupon.maxDiscount.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                  {coupon.code}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              <div className="text-[11px] text-gray-400 space-y-0.5 pt-2 border-t border-gray-100 dark:border-[#22352B]">
                <p>Min booking value: ₹{coupon.minBookingValue.toLocaleString('en-IN')}</p>
                <p>Valid through: {coupon.validUntil}</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleCopy(coupon.code)}
                className="w-full py-2.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code: {coupon.code}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#122B22] text-[#FBF9F4] text-center space-y-4 shadow-xl">
        <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto animate-pulse" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Ready to experience unmatched regal hospitality?
        </h2>
        <p className="text-xs sm:text-sm text-[#A0B6AA] max-w-lg mx-auto">
          Choose your dream palace or coastal sanctuary and redeem your privilege offer right now.
        </p>
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A880] text-[#122B22] hover:bg-[#D4AF37] font-semibold text-xs transition-colors shadow-md"
          >
            <span>Explore Partner Palaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
