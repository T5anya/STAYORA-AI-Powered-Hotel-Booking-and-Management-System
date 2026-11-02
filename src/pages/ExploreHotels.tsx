import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Grid,
  List,
  Star,
  Check,
  RefreshCw,
  Building,
  ChevronLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import { Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { HotelCard } from '../components/hotel/HotelCard';
import { CompareModal } from '../components/hotel/CompareModal';
import { CITIES_CATALOG } from '../data/catalogGenerator';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';

export const ExploreHotels: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Search input & AI Natural Language Query
  const [destination, setDestination] = useState<string>(searchParams.get('destination') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('minPrice')) || 10000);
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 90000);
  const [rating, setRating] = useState<number>(Number(searchParams.get('rating')) || 0);
  const [sortBy, setSortBy] = useState<string>('recommended');

  // Selected Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 16;

  // AI Natural Language Search Prompt
  const [nlQuery, setNlQuery] = useState<string>('');
  const [nlLoading, setNlLoading] = useState<boolean>(false);
  const [interpretedFeedback, setInterpretedFeedback] = useState<string | null>(null);

  // Compare modal
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allAmenities = [
    'Outdoor Swimming Pool',
    'Ayurvedic Spa & Wellness',
    'Fine Dining Restaurant',
    'High-Speed Wi-Fi',
    'Free Valet Parking',
    'Fitness Center',
    '24/7 Butler Service',
    'Airport Limousine Service'
  ];

  const categories = [
    'All',
    'Luxury Heritage',
    'Mountain Retreat',
    'Coastal Villa',
    'Wellness Sanctuary',
    'Business Prime'
  ];

  const popularCities = [
    'All Cities',
    'Jaipur',
    'Udaipur',
    'Goa',
    'Shimla',
    'Manali',
    'Rishikesh',
    'Coorg',
    'Munnar',
    'Alleppey',
    'New Delhi',
    'Mumbai',
    'Varanasi',
    'Agra'
  ];

  useEffect(() => {
    fetchHotels();
  }, [searchParams, sortBy]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      const destParam = searchParams.get('destination') || destination;
      const catParam = searchParams.get('category') || category;
      const minP = searchParams.get('minPrice') || String(minPrice);
      const maxP = searchParams.get('maxPrice') || String(maxPrice);
      const rat = searchParams.get('rating') || String(rating);

      if (destParam) q.set('destination', destParam);
      if (catParam && catParam !== 'All') q.set('category', catParam);
      if (minP) q.set('minPrice', minP);
      if (maxP) q.set('maxPrice', maxP);
      if (Number(rat) > 0) q.set('rating', rat);

      const res = await apiRequest<{ hotels: Hotel[] }>(`/hotels?${q.toString()}`);
      let list = res.hotels || [];

      // Filter by selected amenities on client
      if (selectedAmenities.length > 0) {
        list = list.filter((h) =>
          selectedAmenities.every((amenity) => h.amenities.includes(amenity))
        );
      }

      // Sort
      if (sortBy === 'price_asc') {
        list.sort((a, b) => a.startingPrice - b.startingPrice);
      } else if (sortBy === 'price_desc') {
        list.sort((a, b) => b.startingPrice - a.startingPrice);
      } else if (sortBy === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      }

      setHotels(list);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching hotels', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (cityName: string) => {
    const val = cityName === 'All Cities' ? '' : cityName;
    setDestination(val);
    const p = new URLSearchParams(searchParams);
    if (val) p.set('destination', val);
    else p.delete('destination');
    setSearchParams(p);
  };

  const handleApplyFilters = () => {
    const p = new URLSearchParams();
    if (destination) p.set('destination', destination);
    if (category && category !== 'All') p.set('category', category);
    if (minPrice) p.set('minPrice', String(minPrice));
    if (maxPrice) p.set('maxPrice', String(maxPrice));
    if (rating > 0) p.set('rating', String(rating));
    setSearchParams(p);
    setMobileFilterOpen(false);
  };

  const handleClearFilters = () => {
    setDestination('');
    setCategory('All');
    setMinPrice(10000);
    setMaxPrice(90000);
    setRating(0);
    setSelectedAmenities([]);
    setInterpretedFeedback(null);
    setSearchParams(new URLSearchParams());
  };

  // AI Natural Language Search Execution
  const handleNLSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim() || nlLoading) return;
    setNlLoading(true);
    try {
      const res = await apiRequest<{ filters: any; interpretedQuery: string }>('/ai/parse-nl-search', {
        method: 'POST',
        body: JSON.stringify({ query: nlQuery })
      });

      const f = res.filters;
      if (f.destination) setDestination(f.destination);
      if (f.maxPrice) setMaxPrice(f.maxPrice);
      if (f.category) setCategory(f.category);
      if (f.amenities) setSelectedAmenities(f.amenities);

      setInterpretedFeedback(
        `Interpreted: ${f.destination || 'All destinations'} · Max ₹${f.maxPrice?.toLocaleString('en-IN') || 'Any'} · ${f.category || 'All styles'}`
      );

      const p = new URLSearchParams();
      if (f.destination) p.set('destination', f.destination);
      if (f.maxPrice) p.set('maxPrice', String(f.maxPrice));
      if (f.category) p.set('category', f.category);
      setSearchParams(p);
    } catch (err) {
      console.error('NL Search failed', err);
    } finally {
      setNlLoading(false);
    }
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(hotels.length / pageSize));
  const paginatedHotels = hotels.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] antialiased transition-colors pb-24">
      <MovingTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-4">
          <BackButton label="Back to Previous Page" fallbackUrl="/" />
          <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
            Pan-India Network · 42 Destinations · 1,300+ Verified Stays
          </span>
        </div>

        {/* Title & AI Search Bar */}
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
              Luxury Stays, Palaces & Mountain Sanctuaries
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Filter by private pool, helipad transfer, star category, price per night, and royal destination.
            </p>
          </div>

          {/* AI Natural Language Search Input */}
          <form onSubmit={handleNLSearch} className="relative">
          <div className="flex items-center rounded-2xl bg-white dark:bg-[#141F1A] border border-[#C5A880]/50 shadow-md p-2 focus-within:ring-2 focus-within:ring-[#C5A880]">
            <div className="pl-3 pr-2 text-[#C5A880]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="Try AI search: 'Find a palace in Jaipur with outdoor pool and spa under ₹30,000'..."
              className="w-full bg-transparent border-none text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={nlLoading}
              className="px-5 py-2.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-xs font-semibold hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1.5"
            >
              {nlLoading ? (
                <span>Parsing...</span>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>AI Filter</span>
                </>
              )}
            </button>
          </div>
          {interpretedFeedback && (
            <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{interpretedFeedback}</span>
            </div>
          )}
        </form>

        {/* Quick City Horizontal Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 shrink-0 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#C5A880]" />
            Cities:
          </span>
          {popularCities.map((c) => {
            const isSelected = (!destination && c === 'All Cities') || destination.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => handleSelectCity(c)}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] shadow-sm'
                    : 'bg-white dark:bg-[#141F1A] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#22352B] hover:border-[#C5A880]'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5] dark:border-[#22352B]">
            <h3 className="font-serif font-bold text-base text-[#122B22] dark:text-[#FBF9F4] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880]" />
              <span>Refine Stays</span>
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Destination Dropdown & Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Select City ({CITIES_CATALOG.length} Available)
            </label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                const p = new URLSearchParams(searchParams);
                if (e.target.value) p.set('destination', e.target.value);
                else p.delete('destination');
                setSearchParams(p);
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#C5A880] mb-2"
            >
              <option value="">All 40 Cities (1,280 Hotels)</option>
              {CITIES_CATALOG.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name} ({city.state}) · {city.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Or type city name..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Category Tabs */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Atmosphere & Style
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    const p = new URLSearchParams(searchParams);
                    if (c && c !== 'All') p.set('category', c);
                    else p.delete('category');
                    setSearchParams(p);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-medium ${
                    category === c
                      ? 'bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22]'
                      : 'bg-gray-100 dark:bg-[#1A2620] text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Nightly Budget Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              <span>Max Nightly Tariff</span>
              <span className="font-mono text-[#8B5E3C] dark:text-[#C5A880]">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={15000}
              max={90000}
              step={2500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#122B22] dark:accent-[#C5A880]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>₹15,000</span>
              <span>₹90,000+</span>
            </div>
          </div>

          {/* Minimum Guest Rating */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Minimum Rating
            </label>
            <div className="flex items-center gap-2">
              {[0, 4.5, 4.8, 4.9].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(r)}
                  className={`flex-1 py-1 text-xs rounded-lg font-semibold border ${
                    rating === r
                      ? 'bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] border-transparent'
                      : 'border-gray-200 dark:border-[#22352B] text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Included Amenities
            </label>
            <div className="space-y-1.5">
              {allAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="rounded accent-[#122B22] dark:accent-[#C5A880]"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full py-2.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
        </aside>

        {/* RESULTS REGION */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar: Count, Sort, Grid/List view */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E1D5] dark:border-[#22352B] gap-4">
            <div className="text-xs text-[#5A6860] dark:text-[#9DAEA4]">
              Found <span className="font-bold text-gray-900 dark:text-gray-100">{hotels.length}</span> luxury properties
              {destination && (
                <span> in <strong className="text-gray-900 dark:text-gray-100">{destination}</strong></span>
              )}
              {totalPages > 1 && (
                <span className="ml-2 font-medium">(Page {currentPage} of {totalPages})</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#141F1A] text-xs text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                <option value="recommended">Stayora Recommendation Score</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Guest Rating</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border border-gray-200 dark:border-[#22352B] p-0.5 bg-gray-50 dark:bg-[#141F1A]">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-[#22352B] text-[#122B22] dark:text-white shadow-sm' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-[#22352B] text-[#122B22] dark:text-white shadow-sm' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid / List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="rounded-2xl h-80 bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : hotels.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] p-8 space-y-4">
              <Building className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-gray-800 dark:text-gray-200">
                No matching sanctuaries found
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try widening your price range or clearing some amenities to view more available palaces and retreats.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2 rounded-xl bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                {paginatedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} featured={hotel.featured} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
                  <span className="text-xs text-gray-500">
                    Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, hotels.length)} of {hotels.length} luxury stays
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 dark:border-[#22352B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#1E2B25] transition-colors"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Number Pills */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 5 && currentPage > 3) {
                        pageNum = Math.min(currentPage - 2 + i, totalPages - 4 + i);
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22]'
                              : 'border border-gray-200 dark:border-[#22352B] hover:bg-gray-50 dark:hover:bg-[#1E2B25]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-1 text-xs text-gray-400">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold border border-gray-200 dark:border-[#22352B] hover:bg-gray-50 dark:hover:bg-[#1E2B25]`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 dark:border-[#22352B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#1E2B25] transition-colors"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

      {/* Compare Modal */}
      <CompareModal isOpen={compareModalOpen} onClose={() => setCompareModalOpen(false)} />
    </div>
  );
};
