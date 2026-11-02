import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { Hotel } from '../../types/hotel';
import { useFavorites } from '../../context/FavoritesContext';

interface HotelCardProps {
  hotel: Hotel;
  featured?: boolean;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, featured = false }) => {
  const { isFavorite, toggleFavorite, isComparing, addToCompare, removeFromCompare } = useFavorites();
  const favorite = isFavorite(hotel.id);
  const comparing = isComparing(hotel.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(hotel);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (comparing) {
      removeFromCompare(hotel.id);
    } else {
      addToCompare(hotel);
    }
  };

  return (
    <div
      className={`group relative rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5]/80 dark:border-[#22352B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
        featured ? 'ring-1 ring-[#C5A880]/50' : ''
      }`}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 dark:bg-[#141F1A]/90 text-[#122B22] dark:text-[#C5A880] backdrop-blur-sm shadow-sm">
            {hotel.category}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompareClick}
              aria-label="Compare hotel"
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                comparing
                  ? 'bg-[#C5A880] text-[#122B22]'
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFavoriteClick}
              aria-label="Save to favorites"
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                favorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{hotel.city}, {hotel.state}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{hotel.rating}</span>
            <span className="text-[10px] text-gray-300">({hotel.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4] group-hover:text-[#8B5E3C] transition-colors truncate">
              {hotel.name}
            </h3>
            {hotel.verified && (
              <CheckCircle2 className="w-4 h-4 text-[#2E6F56] dark:text-[#4ADE80] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#5A6860] dark:text-[#9DAEA4] line-clamp-2 leading-relaxed mb-4">
            {hotel.tagline || hotel.description}
          </p>

          {/* Clean metadata amenities without pill-enclosures */}
          <div className="flex items-center gap-2 text-xs text-[#7A9A8B] mb-4">
            <span>{hotel.amenities[0] || 'Swimming Pool'}</span>
            <span aria-hidden="true">·</span>
            <span>{hotel.amenities[1] || 'Spa & Wellness'}</span>
            {hotel.amenities[2] && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{hotel.amenities[2]}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-[#E8E1D5]/60 dark:border-[#22352B] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider block">From</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                ₹{hotel.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-500">/ night</span>
            </div>
          </div>
          <Link
            to={`/hotels/${hotel.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] text-xs font-semibold transition-all duration-200 group-hover:gap-2 shadow-sm"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
