import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Users,
  Compass,
  Star,
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Layers,
  HeartHandshake,
  QrCode,
  UtensilsCrossed,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { HotelCard } from '../components/hotel/HotelCard';
import { HotelSlider } from '../components/hotel/HotelSlider';
import { CompareModal } from '../components/hotel/CompareModal';
import { CITIES_CATALOG } from '../data/catalogGenerator';
import { MovingTicker } from '../components/common/MovingTicker';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Widget form state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 4);

  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(nextWeek.toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All');

  // Comparison modal
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadHotels() {
      try {
        const res = await apiRequest<{ hotels: Hotel[] }>('/hotels');
        setHotels(res.hotels || []);
      } catch (err) {
        console.error('Failed to load hotels', err);
      } finally {
        setLoading(false);
      }
    }
    loadHotels();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', String(guests));
    if (category && category !== 'All') params.set('category', category);
    navigate(`/explore?${params.toString()}`);
  };

  const categories = [
    { name: 'Luxury Heritage', count: '18 Palaces', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mountain Retreat', count: '14 Sanctuaries', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Coastal Villa', count: '22 Ocean Fronts', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
    { name: 'Wellness Sanctuary', count: '12 Ayurvedic Havens', image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=600&q=80' }
  ];

  const faqs = [
    {
      q: 'What is Stayora’s Best Rate Guarantee & Cancellation Policy?',
      a: 'Stayora works directly with heritage estates, boutique retreats, and luxury palace chains. We guarantee the lowest direct rates with zero hidden charges. Most properties include complimentary cancellation up to 48 hours prior to your scheduled check-in.'
    },
    {
      q: 'How does Group Booking and Split Payments work?',
      a: 'Stayora makes group vacations effortless. Once an organizer sets up a group stay, our engine calculates each guest’s exact share. Every member receives a direct payment link and can pay their contribution via simulated UPI or Card, while the organizer monitors live progress.'
    },
    {
      q: 'How does Express QR Check-In function at partner hotels?',
      a: 'Upon confirming your reservation, a secure encrypted QR pass is generated on your dashboard and tax invoice. Front desk staff scan this code upon arrival to instantly verify your suite details and hand over your physical or digital keycard in under 60 seconds.'
    },
    {
      q: 'Can I order Room Service and dining from my phone during my stay?',
      a: 'Yes. In the Customer Dashboard, navigate to Food & Room Service. You can browse the hotel chef’s artisanal menu, customize dietary preferences, and track your kitchen order progress in real-time.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Luxury Background Wallpaper with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            alt="Stayora Luxury Stays"
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F4] dark:from-[#0C1310] via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Curated Hospitality Network</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Stay Smarter.<br />
            <span className="italic font-normal text-[#C5A880]">Travel Better.</span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Discover royal heritage palaces, secluded mountain havens, and private coastal villas across India with instant QR check-in and intelligent split payments.
          </p>

          {/* SEARCH WIDGET CARD */}
          <div className="mt-8 p-3 sm:p-4 rounded-3xl bg-white/95 dark:bg-[#141F1A]/95 backdrop-blur-xl border border-white/40 dark:border-[#24362E] shadow-2xl text-left">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Destination */}
              <div className="p-3 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5]/70 dark:border-[#22352B]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Destination or Hotel
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880] shrink-0" />
                  <input
                    type="text"
                    list="home-cities"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Jaipur, Udaipur, Goa, Shimla..."
                    className="w-full bg-transparent border-none text-xs font-semibold text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                  />
                  <datalist id="home-cities">
                    {CITIES_CATALOG.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.state} · {c.category}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Dates */}
              <div className="p-3 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5]/70 dark:border-[#22352B]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Check-in / Check-out
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880] shrink-0" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent border-none text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="p-3 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5]/70 dark:border-[#22352B]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Guests & Rooms
                </label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880] shrink-0" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-transparent border-none text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
                  >
                    <option value={1}>1 Guest · 1 Room</option>
                    <option value={2}>2 Guests · 1 Room</option>
                    <option value={3}>3 Guests · 1 Room</option>
                    <option value={4}>4 Guests · 2 Rooms</option>
                    <option value={6}>6 Guests · Group Retreat</option>
                  </select>
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 rounded-2xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Stays</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MOVING TICKER - Positioned elegantly between Hero and Signature Sanctuaries */}
      <MovingTicker />

      {/* 2. INTERACTIVE DESTINATION & HOTEL CAROUSEL SLIDER - CURATED 8 PREMIER HOTELS */}
      <section id="signature-sanctuaries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
              Signature Sanctuaries · 8 Curated Jewels
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
              Curated Masterpieces of Indian Luxury
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B5E3C] dark:text-[#C5A880] hover:underline"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {hotels.length > 0 && <HotelSlider hotels={hotels.slice(0, 8)} />}
      </section>

      {/* 3. EXPERIENCE CATEGORIES */}
      <section id="travel-atmosphere" className="bg-[#F4EFE6]/70 dark:bg-[#101814]/60 py-20 border-y border-[#E8E1D5] dark:border-[#1E2B25] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
              Travel by Atmosphere
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Choose Your Signature Setting
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4]">
              From ancient royal havelis to quiet Himalayan ridge chalets, every Stayora property guarantees exemplary service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[11px] text-[#C5A880] font-semibold uppercase tracking-wider">{cat.count}</p>
                  <h3 className="font-serif text-xl font-bold">{cat.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3B. SOVEREIGN EXPERIENCES & LIFESTYLE PILLARS */}
      <section className="bg-[#122B22] text-[#FBF9F4] py-20 border-y border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#C5A880]">
                Beyond Accommodation
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Curated Sovereign Experiences
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-light">
                Private aviation, royal palace dining on gold plate, wildlife tracking with naturalists, and lifetime patronage privileges.
              </p>
            </div>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95"
            >
              <span>Explore All Curations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Royal Experiences',
                desc: 'Solar barge champagne cruises, vintage Rolls-Royce rallies, and desert star gazing.',
                path: '/experiences',
                image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80',
                badge: 'Bespoke Curations'
              },
              {
                title: 'Royal Gastronomy',
                desc: 'Michelin-starred master chefs, Belgian crystal ceilings, and Awadhi charcoal cooking.',
                path: '/dining',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
                badge: 'Haute Cuisine'
              },
              {
                title: 'Private Aviation & Fleet',
                desc: 'Pilatus PC-24 jets and twin helicopters landing directly on palace helipads.',
                path: '/aviation',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80',
                badge: 'Door-To-Helipad'
              },
              {
                title: 'Privilege Club',
                desc: 'Amber, Jade, and Kohinoor tiers with heritage restoration endowment credits.',
                path: '/privilege',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
                badge: 'Patron Circle'
              }
            ].map((pillar, idx) => (
              <Link
                key={idx}
                to={pillar.path}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] border border-[#C5A880]/30 shadow-xl flex flex-col justify-end p-6 hover:-translate-y-1.5 transition-all duration-300"
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A880] text-[#0C1310] uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A880] pt-1">
                    <span>Discover More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED HOTELS GRID WITH REAL BACKEND DATA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
              Verified Handpicked Stays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
              Top Ranked Residences This Season
            </h2>
          </div>
          <Link
            to="/explore"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-[#22352B] text-xs font-semibold text-[#122B22] dark:text-[#FBF9F4] hover:bg-gray-50 dark:hover:bg-[#1A2620] transition-colors"
          >
            <span>Explore All Stays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl h-80 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.slice(0, 6).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} featured={hotel.featured} />
            ))}
          </div>
        )}
      </section>

      {/* 5. GROUP BOOKING & SPLIT PAYMENTS SPOTLIGHT */}
      <section className="bg-[#122B22] text-[#FBF9F4] py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs font-semibold tracking-wider uppercase">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Seamless Group Travel</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Travel Together.<br />
                <span className="text-[#C5A880] italic font-normal">Split Without the Friction.</span>
              </h2>

              <p className="text-sm text-[#A0B6AA] leading-relaxed">
                Planning a reunion with family or a retreat with friends? Stayora lets you reserve multiple luxury suites together with automated per-member payment splitting, real-time contribution tracking, and individual digital QR check-in passes.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Automated equal or custom per-member bill split</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Direct UPI & card simulated payment portal for each attendee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Live dashboard showing paid members and pending reminders</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/group-booking"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C5A880] hover:bg-[#D4AF37] text-[#122B22] font-semibold text-sm transition-all shadow-lg"
                >
                  <span>Plan a Group Retreat</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="rounded-3xl bg-[#1A382D] border border-[#2B5445] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2B5445]">
                <div>
                  <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-bold">Group Pass</span>
                  <h4 className="font-serif text-lg font-bold">Rajasthan Winter Heritage Retreat</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
                  3 of 4 Paid (75%)
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Total Group Tariff (2 Suites · 3 Nights)</span>
                  <span className="font-mono font-bold text-white">₹93,260</span>
                </div>
                <div className="w-full bg-[#122B22] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C5A880] h-full w-[75%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#A0B6AA]">
                  <span>Collected: ₹69,945</span>
                  <span>Remaining: ₹23,315</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#122B22]/80 border border-[#2B5445] space-y-2 text-xs">
                <div className="flex justify-between items-center text-white">
                  <span>Tanya Agarwal (Organizer)</span>
                  <span className="text-emerald-400 font-semibold">✓ Paid ₹23,315</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Aarav Mehta</span>
                  <span className="text-emerald-400 font-semibold">✓ Paid ₹23,315</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Simran Kaur</span>
                  <span className="text-amber-400 font-semibold">⏱ Payment Pending</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Kabir Roy</span>
                  <span className="text-emerald-400 font-semibold">✓ Paid ₹23,315</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-[#F4EFE6]/60 dark:bg-[#101814]/60 py-20 border-t border-[#E8E1D5] dark:border-[#1E2B25]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
              Clear Hospitality Answers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-[#122B22] dark:text-[#FBF9F4]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#5A6860] dark:text-[#9DAEA4] leading-relaxed border-t border-gray-100 dark:border-[#22352B] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare Modal */}
      <CompareModal isOpen={compareModalOpen} onClose={() => setCompareModalOpen(false)} />
    </div>
  );
};
