import React from 'react';
import { X, Check, Star, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare } = useFavorites();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Hotel Comparison Matrix
            </h2>
            <p className="text-xs text-[#5A6860] dark:text-[#9DAEA4]">
              Evaluating {compareList.length} properties across tariffs, guest ratings, policies, and signature amenities
            </p>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2B25] text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {compareList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">No hotels selected for comparison.</p>
            <p className="text-xs text-gray-400 mt-1">
              Click the layers icon on any hotel card to add it to your comparison matrix.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto py-6 flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E1D5] dark:border-[#22352B]">
                  <th className="p-3 w-40 text-gray-400 font-semibold uppercase tracking-wider">Property</th>
                  {compareList.map((hotel) => (
                    <th key={hotel.id} className="p-3 min-w-[220px]">
                      <div className="relative rounded-xl overflow-hidden mb-3 aspect-[16/10]">
                        <img src={hotel.heroImage} alt={hotel.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeFromCompare(hotel.id)}
                          aria-label="Remove from compare"
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#122B22] dark:text-[#FBF9F4] leading-snug">
                        {hotel.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">{hotel.city}, {hotel.state}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]/60 dark:divide-[#22352B]">
                {/* Nightly Price */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Nightly Rate</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3 font-serif font-bold text-base text-[#122B22] dark:text-[#C5A880]">
                      ₹{h.startingPrice.toLocaleString('en-IN')} <span className="text-xs font-normal text-gray-500">/ night</span>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Guest Rating</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-900 dark:text-gray-100">{h.rating} / 5</span>
                        <span className="text-[11px] text-gray-400">({h.reviewsCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Category</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3 text-gray-800 dark:text-gray-200">
                      {h.category}
                    </td>
                  ))}
                </tr>

                {/* Cancellation Policy */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Cancellation</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3 text-gray-700 dark:text-gray-300">
                      {h.policies?.cancellationPolicy || 'Free cancellation 48h prior'}
                    </td>
                  ))}
                </tr>

                {/* Key Amenities */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Signature Amenities</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3 space-y-1">
                      {h.amenities.slice(0, 5).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="p-3 font-semibold text-gray-600 dark:text-gray-400">Select & Book</td>
                  {compareList.map((h) => (
                    <td key={h.id} className="p-3">
                      <Link
                        to={`/hotels/${h.id}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] font-semibold hover:opacity-90 transition-opacity"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
