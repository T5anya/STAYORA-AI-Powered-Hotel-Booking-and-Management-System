import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Compass, Search, Sparkles } from 'lucide-react';
import { apiRequest } from '../api/client';
import { CITIES_CATALOG, CityMeta } from '../data/catalogGenerator';
import { BackButton } from '../components/common/BackButton';

interface DestinationItem extends CityMeta {
  propertiesCount?: number;
  startingPrice?: number;
}

export const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationItem[]>(CITIES_CATALOG);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await apiRequest<{ destinations: DestinationItem[] }>('/destinations');
        if (res && res.destinations && res.destinations.length > 0) {
          setDestinations(res.destinations);
        }
      } catch (err) {
        console.warn('Using client catalog for destinations', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  const categories = [
    'All',
    'Luxury Heritage',
    'Mountain Retreat',
    'Coastal Villa',
    'Wellness Sanctuary',
    'Business Prime'
  ];

  const filtered = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <BackButton label="Back to Previous Page" fallbackUrl="/" />
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#8B5E3C] dark:text-[#C5A880] text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Pan-India Luxury Network · 40 Iconic Cities</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
          Destinations of Distinction
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4] max-w-xl mx-auto">
          Explore 40 iconic destinations across India, each featuring 30+ verified luxury hotels, palaces, and bespoke suites.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state (e.g. Jaipur, Kerala, Goa)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#141F1A] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
            />
          </div>

          <span className="text-xs font-medium text-gray-500">
            Showing <strong className="text-gray-900 dark:text-gray-100">{filtered.length}</strong> of {destinations.length} destinations
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] shadow-sm'
                  : 'bg-white dark:bg-[#141F1A] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#22352B] hover:border-[#C5A880]'
              }`}
            >
              {cat === 'All' ? 'All 40 Destinations' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((dest) => (
          <div
            key={dest.name}
            className="group rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-semibold uppercase tracking-wider border border-white/20">
                {dest.category}
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-bold">{dest.state} · {dest.region} India</span>
                <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#8B5E3C] dark:text-[#C5A880]">{dest.tagline}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-[#22352B] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block">
                    {dest.propertiesCount || 32} Luxury Properties
                  </span>
                  <span className="text-[10px] text-gray-400">
                    From ₹{(dest.startingPrice || dest.basePrice).toLocaleString('en-IN')}/night
                  </span>
                </div>
                <Link
                  to={`/explore?destination=${encodeURIComponent(dest.name)}`}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#122B22]/5 dark:bg-[#FBF9F4]/10 hover:bg-[#122B22] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-[#122B22] text-xs font-bold text-[#122B22] dark:text-[#C5A880] transition-colors"
                >
                  <span>Explore Stays</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
