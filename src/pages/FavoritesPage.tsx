import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { HotelCard } from '../components/hotel/HotelCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-current" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
            Personal Wishlist
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
          Saved Sanctuaries ({favorites.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4] mt-0.5">
          Your saved palace retreats, villas, and suites for easy comparison and booking.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-4">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-gray-700 dark:text-gray-300">
            No saved favorites yet
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Click the heart icon on any hotel card or details page to bookmark it in your personal collection.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] font-semibold text-xs"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};
