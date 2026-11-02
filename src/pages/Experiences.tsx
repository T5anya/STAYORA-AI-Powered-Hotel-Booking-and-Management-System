import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Star,
  CheckCircle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { ImageSlider } from '../components/common/ImageSlider';

export const Experiences: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inquiryModal, setInquiryModal] = useState<any | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
      title: 'Private Champagne Sunset over Lake Pichola',
      subtitle: 'Board the Maharana’s 150-year-old ceremonial solar barge with royal canapés and personal sitar maestro.',
      location: 'Udaipur, Rajasthan',
      badge: 'Royal Bespoke Signature'
    },
    {
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
      title: 'Himalayan Sunrise Meditation & Tea Tasting',
      subtitle: 'Private dawn excursion to Glenburn Estate ridge overlooking Kanchenjunga with first-flush Darjeeling teas.',
      location: 'Darjeeling, West Bengal',
      badge: 'Wellness & Mindfulness'
    },
    {
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
      title: 'Ranthambore Royal Tiger Tracking',
      subtitle: 'Exclusive open-top custom 4x4 safari led by veteran wildlife naturalists and pad-print trackers.',
      location: 'Sawai Madhopur, Rajasthan',
      badge: 'Wildlife Conservation'
    }
  ];

  const categories = ['All', 'Royal Heritage', 'Culinary & Wine', 'Nature & Safari', 'Wellness & Spirit', 'Art & Craft'];

  const experiencesList = [
    {
      id: 'exp-01',
      title: 'Thar Desert Stargazing & Candlelit Dunes Dinner',
      category: 'Royal Heritage',
      location: 'Jaisalmer, Rajasthan',
      duration: '6 Hours',
      guests: '2 - 8 Guests',
      price: 24500,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      rating: 4.98,
      reviews: 142,
      description: 'Journey into private secluded dunes via vintage open jeep. Enjoy a live performance by Manganiyar folk maestros, private telescope astronomy, and charcoal grilled royal delicacies.',
      highlights: ['Private astronomer with Celestron telescope', 'Six-course Mewari feast', 'Vintage open Jeep transfer', 'Live Manganiyar ballad']
    },
    {
      id: 'exp-02',
      title: 'Vintage Rolls-Royce & Royal Palace Heritage Rally',
      category: 'Royal Heritage',
      location: 'Jaipur, Rajasthan',
      duration: '4 Hours',
      guests: '2 - 4 Guests',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      rating: 4.95,
      reviews: 98,
      description: 'Chauffeured in a restored 1938 Rolls-Royce Phantom III through the Pink City gates, culminating in private access to the Maharaja’s private inner courtyard for English High Tea.',
      highlights: ['1938 Rolls-Royce with liveried chauffeur', 'Private access to City Palace inner sanctum', 'Curated English High Tea', 'Personal palace historian']
    },
    {
      id: 'exp-03',
      title: 'Backwater Spices & Masterclass with Syrian Christian Matriarchs',
      category: 'Culinary & Wine',
      location: 'Kumarakom, Kerala',
      duration: '5 Hours',
      guests: '2 - 6 Guests',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      rating: 4.97,
      reviews: 115,
      description: 'Cruise along the emerald canals of Vembanad Lake to a 200-year-old heritage Tharavadu estate. Pick organic cardamoms and black peppers, followed by clay-pot duck roast and toddy-steamed appams.',
      highlights: ['Private wooden country boat cruise', 'Heritage Tharavadu organic farm tour', 'Four hands clay-pot cooking class', 'Tasting menu paired with estate brew']
    },
    {
      id: 'exp-04',
      title: 'Ganga Aarti Private Wooden Bajra & Vedic Blessing',
      category: 'Wellness & Spirit',
      location: 'Varanasi, Uttar Pradesh',
      duration: '3.5 Hours',
      guests: '2 - 10 Guests',
      price: 16000,
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviews: 210,
      description: 'Witness the incandescent dusk ritual at Dashashwamedh Ghat from your private hand-carved mahogany bajra boat. Receive a bespoke Vedic mantra blessing from senior temple scholars.',
      highlights: ['Exclusive mid-river boat anchorage', 'Personal Vedic Sanskrit scholar', '108 lotus petal offering ceremony', 'Scented rosewater & Banarasi sweets']
    },
    {
      id: 'exp-05',
      title: 'Kashmir Valley Saffron Harvest & Walnut Grove Feast',
      category: 'Nature & Safari',
      location: 'Pampore & Srinagar, Kashmir',
      duration: '7 Hours',
      guests: '2 - 6 Guests',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      rating: 4.96,
      reviews: 86,
      description: 'Walk through purple saffron flower beds in the morning mist. Harvest delicate red stigmas alongside fourth-generation farmers and dine on Kashmiri Wazwan under ancient walnut canopies.',
      highlights: ['Saffron stigma harvesting masterclass', 'Seated 14-dish traditional Wazwan', 'Private shikara transfer with silk cushions', 'Artisan Pashmina spinning showcase']
    },
    {
      id: 'exp-06',
      title: 'Ancient Kalaripayattu Combat & Ayurvedic Marma Healing',
      category: 'Wellness & Spirit',
      location: 'Kovalam, Kerala',
      duration: '4 Hours',
      guests: '1 - 4 Guests',
      price: 19500,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      rating: 4.92,
      reviews: 74,
      description: 'Step into an earthen underground Kalari arena. Experience a private demonstration of 3,000-year-old martial movements, followed by a personalized Marma pressure-point rejuvenation therapy.',
      highlights: ['Private demonstration by Gurukkal masters', '90-minute customized herbal oil Marma therapy', 'Organic cold-pressed herbal potions', 'Consultation with chief Vaidya']
    }
  ];

  const filteredExperiences = selectedCategory === 'All'
    ? experiencesList
    : experiencesList.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] antialiased transition-colors">
      <MovingTicker />

      {/* Hero Section & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to Discover" fallbackUrl="/" />
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
              Stayora Signature Curations
            </span>
          </div>
        </div>

        {/* Parallax Hero Slider */}
        <ImageSlider slides={heroSlides} heightClass="h-[440px] sm:h-[520px]" />
      </div>

      {/* Section 1: Editorial Introduction & Philosophy (Scroll 1-2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#122B22]/5 dark:bg-[#C5A880]/15 text-[#122B22] dark:text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privilege Access Beyond Velvet Ropes</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#122B22] dark:text-white leading-tight">
              Bespoke Experiences Crafted For The Discerning Traveler
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              India’s majesty lies not merely in what you see, but in doors unlocked solely for you. From private access to the sealed chambers of Mewar palaces to dawn tiger tracks with royal naturalists, every Stayora experience is orchestrated with discretion, safety, and peerless authenticity.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#C5A880]">100%</span>
                <p className="text-xs text-gray-500 mt-0.5">Private & Unhurried</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#C5A880]">42</span>
                <p className="text-xs text-gray-500 mt-0.5">Heritage Destinations</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#C5A880]">24/7</span>
                <p className="text-xs text-gray-500 mt-0.5">Personal Concierge</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] dark:border-[#22352B] group">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
                alt="Palace Experience"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs text-[#C5A880] uppercase tracking-wider font-semibold">Special Privilege</span>
                <h3 className="font-serif text-xl font-bold">Maharaja’s Private Garden Picnic</h3>
                <p className="text-xs text-gray-300 mt-1">Available exclusively to guests residing in Palace Suites.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Filterable Experiences Directory (Scroll 3-4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Handcrafted Portfolio</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-white mt-1">
              Select Your Royal Encounter
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#122B22] text-[#FBF9F4] dark:bg-[#C5A880] dark:text-[#0C1310] shadow-md'
                    : 'bg-white dark:bg-[#141F1A] text-gray-600 dark:text-gray-300 hover:bg-[#F3EEE4] dark:hover:bg-[#1F2E27] border border-[#E8E1D5] dark:border-[#22352B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md">
                  {exp.category}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/80 text-[#122B22] dark:text-[#C5A880] shadow">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span>{exp.rating}</span>
                </div>
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 drop-shadow">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exp.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{exp.guests}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Booking */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Per Experience</span>
                    <span className="font-serif text-lg font-bold text-[#122B22] dark:text-[#C5A880]">
                      ₹{exp.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setInquiryModal(exp)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#122B22] text-[#FBF9F4] dark:bg-[#C5A880] dark:text-[#0C1310] hover:bg-[#0C1814] dark:hover:bg-[#D4AF37] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Concierge Master Protocol (Scroll 5-6) */}
      <section className="bg-[#122B22] text-[#FBF9F4] py-20 border-t border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Uncompromising Standard</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">The Stayora White-Glove Guarantee</h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Every private journey adheres to strict safety protocols, confidential non-disclosure policies for high-profile patrons, and seamless coordination with your hotel butler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0C1814]/80 border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Vetted Local Artisans & Historians</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Led strictly by certified historians, master naturalists, and multi-generational craftsmen whose families served royal courts.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0C1814]/80 border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Private Vehicle Fleet</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                All transfers utilize sanitized Mercedes-Benz Maybach, customized Toyota Vellfire, or vintage Rolls-Royce vehicles with chilled bottled water and cold towels.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0C1814]/80 border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Flexible Weather Guarantee</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                In the rare event of unfavorable weather or lake conditions, experiences are seamlessly rescheduled or converted into an indoor private salon tasting.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37] shadow-xl hover:shadow-[#C5A880]/30 transition-all duration-200"
            >
              <span>Explore Palaces Offering These Curations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {inquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl space-y-6 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#22352B]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider">Concierge Reservation</span>
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">
                  {inquiryModal.title}
                </h3>
              </div>
              <button
                onClick={() => { setInquiryModal(null); setInquirySubmitted(false); }}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">Reservation Request Logged</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Your dedicated Royal Experience Butler will confirm timing, dietary preferences, and billing directly with your room reservation within 2 hours.
                </p>
                <button
                  onClick={() => { setInquiryModal(null); setInquirySubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] mt-4"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setInquirySubmitted(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      defaultValue="2026-12-15"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Guests</label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white">
                      <option value="2">2 Guests (Couple)</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dietary & Accessibility Notes</label>
                  <textarea
                    rows={3}
                    placeholder="E.g., Vegetarian, Jain, celebratory anniversary cake, champagne preference..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif text-sm font-bold text-[#C5A880]">
                    Total: ₹{inquiryModal.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#0C1814] active:scale-95 transition-all shadow"
                  >
                    Confirm Concierge Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
