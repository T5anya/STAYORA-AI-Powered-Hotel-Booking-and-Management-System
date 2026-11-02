import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Sparkles,
  Shield,
  Star,
  CheckCircle2,
  Gift,
  ArrowRight,
  Compass,
  Award,
  Zap,
  Clock,
  Heart
} from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { ImageSlider } from '../components/common/ImageSlider';

export const PrivilegeClub: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'amber' | 'jade' | 'kohinoor'>('kohinoor');
  const [nightsSpent, setNightsSpent] = useState<number>(14);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80',
      title: 'The Stayora Privilege Club',
      subtitle: 'Where patronage meets legacy. Unlock guaranteed room upgrades, private cellar allocations, and personal butlers.',
      location: 'Exclusive Patron Circle',
      badge: 'Lifetime Sovereign Heritage'
    },
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
      title: 'Kohinoor Sovereign Tier Privileges',
      subtitle: 'Complimentary private airport limousine, dedicated 24/7 Chief Concierge, and invitation to royal salon galas.',
      location: 'Pan-India Access',
      badge: 'Top Tier Distinction'
    }
  ];

  const tiers = [
    {
      id: 'amber',
      name: 'Amber Member',
      qualifier: 'Complimentary Upon Registration',
      color: '#B87333',
      bgGradient: 'from-[#B87333]/20 via-[#B87333]/5 to-transparent',
      borderColor: 'border-[#B87333]/40',
      perks: [
        '5% instant tariff reduction across 42 heritage destinations',
        'Early 12:00 PM check-in upon room availability',
        'Welcome spiced cold-pressed herbal beverage on arrival',
        'Access to Stayora AI Personal Concierge 24/7',
        'Earn 1 Stayora Sovereign Credit per ₹100 spent'
      ]
    },
    {
      id: 'jade',
      name: 'Jade Aristocrat',
      qualifier: '10 Nights or ₹2,50,000 Annual Spend',
      color: '#0C5E45',
      bgGradient: 'from-[#0C5E45]/20 via-[#0C5E45]/5 to-transparent',
      borderColor: 'border-[#0C5E45]/40',
      perks: [
        '12% preferred member tariff on all luxury suites',
        'Guaranteed 2:00 PM late check-out without surcharges',
        'One-category room upgrade at check-in (subject to availability)',
        'Daily Royal Breakfast for 2 guests included at all properties',
        'Complimentary laundry of 4 garments per stay',
        'Earn 1.5 Stayora Sovereign Credits per ₹100 spent'
      ]
    },
    {
      id: 'kohinoor',
      name: 'Kohinoor Sovereign',
      qualifier: '25 Nights or ₹6,00,000 Annual Spend / By Invitation',
      color: '#D4AF37',
      bgGradient: 'from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent',
      borderColor: 'border-[#D4AF37]',
      perks: [
        '20% exclusive member tariff on royal suites & villas',
        'Guaranteed 4:00 PM late check-out & 9:00 AM early check-in',
        'Guaranteed two-tier room upgrade into Presidential or Royal Tent Suites',
        'Complimentary one-way Mercedes-Benz airport or helipad transfer',
        'Dedicated Royal Chief Butler assigned to your travel party',
        'Annual invitation to the Maharana Heritage Gala dinner in Udaipur',
        'Earn 2.5 Stayora Sovereign Credits per ₹100 spent'
      ]
    }
  ];

  // Estimated credits & savings calculation
  const avgSpendPerNight = 28000;
  const totalSpend = nightsSpent * avgSpendPerNight;
  const creditsEarned = Math.round(
    nightsSpent >= 25 ? (totalSpend / 100) * 2.5 : nightsSpent >= 10 ? (totalSpend / 100) * 1.5 : (totalSpend / 100) * 1.0
  );
  const estimatedSavings = Math.round(
    nightsSpent >= 25 ? totalSpend * 0.20 : nightsSpent >= 10 ? totalSpend * 0.12 : totalSpend * 0.05
  );

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] antialiased transition-colors">
      <MovingTicker />

      {/* Header & Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to Discover" fallbackUrl="/" />
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
              Stayora Sovereign Loyalty Circle
            </span>
          </div>
        </div>

        {/* Hero Slider */}
        <ImageSlider slides={heroSlides} heightClass="h-[440px] sm:h-[500px]" />
      </div>

      {/* Section 1: Philosophy & Heritage Endowment (Scroll 1-2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#8C6D3B] dark:text-[#D4AF37]">
              <Crown className="w-3.5 h-3.5" />
              <span>Privilege Rooted In Cultural Preservation</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#122B22] dark:text-white leading-tight">
              More Than A Club. A Legacy Of Sovereign Hospitality.
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Unlike generic airline points, Stayora Privilege Club is modeled upon historical Indian royal patronage. 2% of every rupee spent by members goes directly into the <strong>Stayora Heritage Restoration Endowment</strong>, funding the restoration of historic stepwells, temple murals, and endangered craft traditions.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">₹1.4 Cr+</span>
                <p className="text-xs text-gray-500 mt-0.5">Heritage Grants Funded</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">38</span>
                <p className="text-xs text-gray-500 mt-0.5">Restored Haveli Sites</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">100%</span>
                <p className="text-xs text-gray-500 mt-0.5">Discreet Recognition</p>
              </div>
            </div>
          </div>

          {/* Interactive Tier Calculator */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block">
                Privilege Calculator
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-white">
                Calculate Your Annual Sovereign Return
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                Adjust your expected annual stays across Stayora properties to preview your tier standing and savings.
              </p>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Annual Stays Planned</span>
                  <span className="font-serif text-sm text-[#D4AF37]">{nightsSpent} Nights</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={nightsSpent}
                  onChange={(e) => setNightsSpent(Number(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Projected Membership Tier</span>
                  <span className="font-bold text-[#D4AF37]">
                    {nightsSpent >= 25 ? 'Kohinoor Sovereign' : nightsSpent >= 10 ? 'Jade Aristocrat' : 'Amber Member'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Tariff Savings</span>
                  <span className="font-serif font-bold text-[#122B22] dark:text-white">₹{estimatedSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sovereign Credits Earned</span>
                  <span className="font-serif font-bold text-emerald-600 dark:text-emerald-400">{creditsEarned.toLocaleString('en-IN')} Pts</span>
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#0C1814] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Join Privilege Club Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Membership Tier Triptych (Scroll 3-4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Three Sovereign Degrees</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-white">
            Ascend Through The Royal Orders
          </h2>
          <p className="text-xs text-gray-500 font-light">
            Every level unlocks progressively deeper privileges, customized amenities, and guaranteed room choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const isKohinoor = tier.id === 'kohinoor';
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl bg-white dark:bg-[#141F1A] border ${
                  isKohinoor ? 'border-[#D4AF37] shadow-2xl scale-102' : 'border-[#E8E1D5] dark:border-[#22352B] shadow-sm'
                } p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1`}
              >
                {isKohinoor && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#D4AF37] text-[#0C1310] shadow-md">
                    Most Prestigious
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#C5A880]" />
                    <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-white">{tier.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{tier.qualifier}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E8E1D5] dark:border-[#22352B] flex-1">
                  {tier.perks.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  <Link
                    to="/register"
                    className={`w-full py-3 rounded-xl text-xs font-semibold text-center block transition-all ${
                      isKohinoor
                        ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#0C1310] shadow-lg'
                        : 'bg-[#122B22] hover:bg-[#0C1814] dark:bg-[#22352B] dark:hover:bg-[#2B4237] text-white'
                    }`}
                  >
                    Activate {tier.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Concierge Guarantee & Heritage Society (Scroll 5-6) */}
      <section className="bg-[#122B22] text-[#FBF9F4] py-20 border-t border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Unrivaled Personal Attention</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Your Personal Royal Household Envoy</h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Jade and Kohinoor patrons are paired with a single point of contact — an executive concierge who records your pillow firmness preferences, favorite estate tea harvests, and dietary nuances across all Stayora destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0C1814] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Guaranteed Stays Even When Sold Out</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Kohinoor members enjoy guaranteed room reservations with 48 hours notice, even during peak Diwali, New Year, and royal wedding festivals.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0C1814] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Heritage Society Invitation</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Meet royal lineage patrons, architectural conservationists, and renowned historians at exclusive quarterly salon receptions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0C1814] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Bespoke Royal Welcome Amenities</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Artisanal brass gift chests containing organic Kashmiri saffron, pure Mysore sandalwood soaps, and single-estate chocolates in your suite upon every arrival.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37] transition-all shadow-xl"
            >
              <span>Explore Member-Exclusive Palaces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
