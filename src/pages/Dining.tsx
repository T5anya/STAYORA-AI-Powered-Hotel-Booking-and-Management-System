import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Wine,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { ImageSlider } from '../components/common/ImageSlider';

export const Dining: React.FC = () => {
  const [activeCuisine, setActiveCuisine] = useState<string>('All');
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [tableReserved, setTableReserved] = useState(false);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
      title: 'Sheesh Mahal: Dining Under 100,000 Belgian Crystals',
      subtitle: 'Open-air marble terrace dining with panoramic views of Lake Pichola and the illuminated City Palace.',
      location: 'The Leela Palace, Udaipur',
      badge: 'Michelin Recommended'
    },
    {
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
      title: 'Royal Dum Pukht & Awadhi Charcoal Slow-Cooking',
      subtitle: 'Sealed dough pots cooked over fragrant coals with cardamom, rose water, and 24-karat edible gold vark.',
      location: 'ITC Grand Chola, Chennai',
      badge: 'Culinary Masterpiece'
    },
    {
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=80',
      title: 'Cliff-Edge Coastal Seafood by Lantern Light',
      subtitle: 'Fresh Arabian Sea tiger prawns and red snapper tossed in roasted coastal kokum and crushed coconut cream.',
      location: 'Taj Fort Aguada, Goa',
      badge: 'Oceanfront Dining'
    }
  ];

  const restaurants = [
    {
      id: 'rest-01',
      name: 'Suvarna Mahal',
      hotel: 'Rambagh Palace, Jaipur',
      cuisine: 'Royal Indian (Mewar, Awadh, Hyderabad, Punjab)',
      chef: 'Executive Chef Raghuveer Singh',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      timing: '7:00 PM - 11:30 PM',
      dressCode: 'Royal Formal / Elegant Ethnic',
      priceForTwo: 18000,
      rating: 4.98,
      signatureDishes: ['Laal Maas cooked in Mathania red chilies', 'Dhungar Murgh with clove smoke', 'Kesari Phirni with silver leaf'],
      description: 'Once the private dining banquet hall of the Maharaja of Jaipur. Italian crystal chandeliers, high Florentine ceiling frescoes, and dining served strictly on pure 22k gold-plated tableware.'
    },
    {
      id: 'rest-02',
      name: 'Sheesh Mahal Rooftop',
      hotel: 'The Leela Palace, Udaipur',
      cuisine: 'Contemporary Indian & Rajasthani Heritage',
      chef: 'Chef Manoj Sharma',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      timing: '6:30 PM - 11:00 PM',
      dressCode: 'Smart Casual / Resort Chic',
      priceForTwo: 16500,
      rating: 4.96,
      signatureDishes: ['Gatte ke Gatte with Truffle Cream', 'Dal Baati Churma cooked in cow ghee', 'Smoked Pistachio Halwa'],
      description: 'An open-air pavilion surrounded by glowing lanterns reflected upon the gentle waters of Lake Pichola. Ambient sitar and tabla ragas accompany every course.'
    },
    {
      id: 'rest-03',
      name: 'Karavalli',
      hotel: 'The Gateway Hotel, Bangalore',
      cuisine: 'South Coastal (Mangalore, Coorg, Malabar, Goa)',
      chef: 'Master Chef Naren Thimmaiah',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      timing: '12:30 PM - 3:00 PM & 7:00 PM - 11:00 PM',
      dressCode: 'Smart Casual',
      priceForTwo: 9500,
      rating: 4.95,
      signatureDishes: ['Tiger Prawn Roast with Byadagi chilies', 'Koli Barthad (Coorg country chicken)', 'Elaneer Payasam (tender coconut pudding)'],
      description: 'Built like an authentic Mangalorean courtyard home with antique wooden pillars and cascading water fountains. Recreates ancient recipes sourced from grandmother kitchens along the Konkan coast.'
    },
    {
      id: 'rest-04',
      name: 'Wild Orchid Pavilion',
      hotel: 'Wildflower Hall, Shimla',
      cuisine: 'Pan-Asian & Himalayan Highland Wild Game',
      chef: 'Chef Anand Thakur',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      timing: '7:00 PM - 10:30 PM',
      dressCode: 'Warm Evening Elegant',
      priceForTwo: 12500,
      rating: 4.92,
      signatureDishes: ['Wild Morel Mushroom Risotto with cedar oil', 'Slow-Braised Himalayan Lamb', 'Apple Tarte Tatin with local Shimla apples'],
      description: 'Glass-enclosed heated conservatory overlooking cedar forests and snow-capped Himalayan peaks. Features an open fireplace and curated biodynamic wine pairings.'
    }
  ];

  const wineExperiences = [
    {
      title: 'Sommelier’s Royal Cellar Tour',
      duration: '90 Mins',
      price: 12000,
      desc: 'Taste 5 vintage Grand Crus accompanied by aged artisanal cheeses in an 18th-century underground palace vault.'
    },
    {
      title: 'Heritage Single Malt Tasting',
      duration: '60 Mins',
      price: 14500,
      desc: 'Curated selection of rare Indian cask finishes (Amrut, Paul John, Rampur, Indri) with hand-rolled chocolates.'
    },
    {
      title: 'Maharani’s High Tea & Scone Salon',
      duration: '120 Mins',
      price: 6500,
      desc: 'Afternoon ritual featuring silver samovars, first-flush Darjeeling Muscatel, saffron tea, and warm clotted cream scones.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] antialiased transition-colors">
      <MovingTicker />

      {/* Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to Discover" fallbackUrl="/" />
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
              Haute Cuisine & Royal Kitchens
            </span>
          </div>
        </div>

        {/* Hero Slider */}
        <ImageSlider slides={heroSlides} heightClass="h-[440px] sm:h-[520px]" />
      </div>

      {/* Section 1: Philosophy & Heritage Kitchens (Scroll 1-2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#581825]/10 dark:bg-[#C5A880]/15 text-[#581825] dark:text-[#C5A880]">
              <Flame className="w-3.5 h-3.5" />
              <span>Ancestral Recipes Sealed In Copper Handis</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#122B22] dark:text-white leading-tight">
              A Symphony of Royal Palates & Culinary Artistry
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Indian royal gastronomy was an imperial state secret — guarded recipes with secret spice proportions known only to the royal Khansamas. At Stayora’s partner hotels, these historical techniques have been painstakingly revived with organic estate harvests and world-class sommelier pairings.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#581825] dark:text-[#C5A880]">18</span>
                <p className="text-xs text-gray-500 mt-0.5">Awarded Restaurants</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#581825] dark:text-[#C5A880]">100%</span>
                <p className="text-xs text-gray-500 mt-0.5">Farm & Sea Sourced</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#581825] dark:text-[#C5A880]">2,400+</span>
                <p className="text-xs text-gray-500 mt-0.5">Vintage Cellar Bottles</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#581825] dark:text-[#C5A880] font-bold block">
                Exclusive Chef Table Program
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-white">
                Reserve the Maharaja’s Silver Table
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                Enjoy a live 8-course degustation curated personally by the Executive Chef with bespoke wine pairings for up to 8 guests.
              </p>
              <div className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span>Advance Notice Required</span>
                  <span className="text-[#581825] dark:text-[#C5A880] font-bold">24 Hours</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Degustation Tariff</span>
                  <span className="font-serif font-bold text-[#122B22] dark:text-white">₹14,500 / Person</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTable({ name: "Maharaja's Private Silver Table", hotel: "Rambagh Palace" })}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#581825] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#3E1019] dark:hover:bg-[#D4AF37] active:scale-95 transition-all shadow-md"
              >
                Inquire For Chef Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Signature Restaurants Directory (Scroll 3-4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#581825] dark:text-[#C5A880] font-bold">Fine Dining Directory</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-white mt-1">
              Sanctuaries of Pure Flavor
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {restaurants.map((rest) => (
            <div
              key={rest.id}
              className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                  {rest.hotel}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/80 text-[#122B22] dark:text-[#C5A880] shadow">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span>{rest.rating}</span>
                </div>
                <div className="absolute bottom-3 left-4 text-xs text-white/90 drop-shadow">
                  {rest.cuisine}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{rest.timing}</span>
                    <span className="text-[11px] font-semibold text-[#581825] dark:text-[#C5A880]">{rest.dressCode}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white group-hover:text-[#C5A880] transition-colors">
                    {rest.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 font-light leading-relaxed">
                    {rest.description}
                  </p>
                </div>

                {/* Signatures */}
                <div className="space-y-1 pt-3 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Signatures</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rest.signatureDishes.map((dish, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-gray-700 dark:text-gray-300">
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Average For Two</span>
                    <span className="font-serif text-lg font-bold text-[#122B22] dark:text-[#C5A880]">
                      ₹{rest.priceForTwo.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTable(rest)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#581825] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#3E1019] dark:hover:bg-[#D4AF37] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Reserve Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Cellar & Sommelier Salons (Scroll 5-6) */}
      <section className="bg-[#0C1310] text-[#E8ECE9] py-20 border-t border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Cellars & Salons</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Private Wine & Spirits Masterclasses</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Curated under the guidance of court sommeliers and Master of Wine consultants. Unravel terroir stories through private vertical tastings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wineExperiences.map((wine, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#141F1A] border border-[#22352B] space-y-4 hover:border-[#C5A880]/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#581825]/40 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{wine.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{wine.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#22352B]">
                  <span className="text-xs text-gray-400">{wine.duration}</span>
                  <span className="font-serif text-base font-bold text-[#C5A880]">₹{wine.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37] transition-all shadow-xl"
            >
              <span>Explore All Hotels with Fine Dining</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Table Reservation Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl space-y-6 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#22352B]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#581825] dark:text-[#C5A880] tracking-wider">Table Reservation</span>
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">
                  {selectedTable.name}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedTable(null); setTableReserved(false); }}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {tableReserved ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">Table Reserved with Concierge</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Your table reservation has been prioritized. The Maître d’ will hold your private table with fresh orchid arrangements.
                </p>
                <button
                  onClick={() => { setSelectedTable(null); setTableReserved(false); }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#581825] dark:bg-[#C5A880] text-white dark:text-[#0C1310] mt-4"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setTableReserved(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Reservation Date</label>
                    <input
                      type="date"
                      required
                      defaultValue="2026-12-15"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Time Slot</label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white">
                      <option value="19:30">7:30 PM (Dinner)</option>
                      <option value="20:30">8:30 PM (Peak Dinner)</option>
                      <option value="21:30">9:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Seating Preference</label>
                  <select className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white">
                    <option value="jharokha">Lakeside Jharokha Window</option>
                    <option value="terrace">Open-Air Lantern Terrace</option>
                    <option value="salon">Private Intimate Salon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dietary Restrictions & Special Occasions</label>
                  <textarea
                    rows={2}
                    placeholder="Anniversary celebration, strict Jain, gluten-free..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">Zero cancellation fee up to 6h prior</span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#581825] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#3E1019] active:scale-95 transition-all shadow"
                  >
                    Confirm Table Reservation
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
