import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Hotel } from '../../types/hotel';
import { useFavorites } from '../../context/FavoritesContext';

interface HotelSliderProps {
  hotels: Hotel[];
}

export const HotelSlider: React.FC<HotelSliderProps> = ({ hotels }) => {
  // Curate exactly 8 premier luxury sanctuary hotels in the interactive slider
  const sliderHotels = (hotels || []).slice(0, 8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const total = sliderHotels.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (!sliderHotels || sliderHotels.length === 0) return null;

  const current = sliderHotels[currentIndex] || sliderHotels[0];
  const favorite = isFavorite(current.id);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border border-[#C5A880]/30 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel with smooth crossfade */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full">
        {sliderHotels.map((h, idx) => (
          <div
            key={h.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={h.heroImage}
              alt={h.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </div>
        ))}
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white pointer-events-none">
        {/* Top bar in slider */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A880] text-[#122B22] shadow-sm">
              Featured Sanctuary
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md text-white/90 border border-white/10">
              {current.category}
            </span>
          </div>

          <button
            onClick={() => toggleFavorite(current)}
            aria-label="Save to favorites"
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
              favorite ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Hero Card in slider */}
        <div className="max-w-2xl pointer-events-auto space-y-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#C5A880] font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{current.city}, {current.state}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">{current.rating}</span>
              <span className="text-gray-300">({current.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {current.name}
          </h2>

          <p className="text-sm sm:text-base text-gray-200 line-clamp-2 font-light leading-relaxed">
            {current.tagline || current.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div>
              <span className="text-[11px] text-gray-300 uppercase tracking-wider block">From</span>
              <span className="font-serif text-2xl font-bold text-[#C5A880]">
                ₹{current.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-300"> / night</span>
            </div>

            <Link
              to={`/hotels/${current.id}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A880] text-[#122B22] hover:bg-[#D4AF37] font-semibold text-sm transition-all duration-200 shadow-lg hover:gap-3"
            >
              <span>View Property</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={prevSlide}
          aria-label="Previous hotel"
          className="p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next hotel"
          className="p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {sliderHotels.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
