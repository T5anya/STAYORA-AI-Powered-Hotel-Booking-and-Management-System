import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  CheckCircle2,
  Heart,
  Layers,
  Shield,
  Clock,
  Sparkles,
  Users,
  Maximize2,
  Check,
  Calendar,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Hotel, Room, Review } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useFavorites } from '../context/FavoritesContext';
import { BookingModal } from '../components/booking/BookingModal';
import { BackButton } from '../components/common/BackButton';

export const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Review Form
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  const { isFavorite, toggleFavorite, isComparing, addToCompare, removeFromCompare } = useFavorites();

  useEffect(() => {
    async function loadDetail() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await apiRequest<{ hotel: Hotel; rooms: Room[]; reviews: Review[] }>(`/hotels/${id}`);
        setHotel(res.hotel);
        setRooms(res.rooms || []);
        setReviews(res.reviews || []);
        if (res.hotel?.images && res.hotel.images.length > 0) {
          setSelectedImage(res.hotel.images[0]);
        } else if (res.hotel?.heroImage) {
          setSelectedImage(res.hotel.heroImage);
        }
      } catch (err) {
        console.error('Failed to load hotel detail', err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-40 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Property Not Found</h2>
        <Link to="/explore" className="text-xs text-[#8B5E3C] underline">Return to Stays</Link>
      </div>
    );
  }

  const favorite = isFavorite(hotel.id);
  const comparing = isComparing(hotel.id);

  const handleOpenBooking = (room: Room) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submittingReview) return;
    setSubmittingReview(true);
    try {
      await apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          hotelId: hotel.id,
          rating: newRating,
          comment: newComment
        })
      });
      setReviewSuccess('Thank you for sharing your experience. Your review is now published!');
      setNewComment('');
      // Reload reviews
      const updated = await apiRequest<{ reviews: Review[] }>(`/hotels/${hotel.id}`);
      setReviews(updated.reviews || []);
    } catch (err: any) {
      alert(err.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <BackButton label="Back to Hotels" fallbackUrl="/explore" />
      </div>

      {/* 1. Header Information */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 text-[#8B5E3C] dark:text-[#C5A880]">
              {hotel.category}
            </span>
            {hotel.verified && (
              <span className="flex items-center gap-1 text-xs text-[#2E6F56] dark:text-[#4ADE80] font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Stayora Sanctuary</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            {hotel.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A6860] dark:text-[#9DAEA4]">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{hotel.address}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-gray-900 dark:text-gray-100">{hotel.rating}</span>
              <span>({hotel.reviewsCount} verified stays)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => comparing ? removeFromCompare(hotel.id) : addToCompare(hotel)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
              comparing
                ? 'bg-[#C5A880] text-[#122B22] border-[#C5A880]'
                : 'border-gray-300 dark:border-[#22352B] text-gray-700 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{comparing ? 'In Compare List' : 'Compare Hotel'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(hotel)}
            aria-label="Save to favorites"
            className={`p-2.5 rounded-xl border transition-colors ${
              favorite
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800'
                : 'border-gray-300 dark:border-[#22352B] text-gray-700 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. High-Res Image Gallery Lightbox */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Feature Image */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-800 shadow-md">
          <img
            src={selectedImage || hotel.heroImage}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Thumbnail Stack */}
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
          {(hotel.images && hotel.images.length > 0 ? hotel.images : [hotel.heroImage]).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`rounded-2xl overflow-hidden aspect-[16/10] border-2 transition-all ${
                selectedImage === img
                  ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 scale-[0.98]'
                  : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Gallery view ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Property Overview & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              About the Sanctuary
            </h3>
            <p className="text-sm text-[#5A6860] dark:text-[#9DAEA4] leading-relaxed whitespace-pre-line">
              {hotel.description}
            </p>
          </div>

          {/* Signature Amenities */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Signature Experiences & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {hotel.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBF9F4] dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B]"
                >
                  <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="p-6 rounded-3xl bg-[#F4EFE6]/60 dark:bg-[#101814] border border-[#E8E1D5] dark:border-[#1E2B25] space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#8B5E3C] dark:text-[#C5A880]" />
              <span>Sanctuary Policies & Timings</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">Check-in / Check-out</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {hotel.policies.checkInTime} / {hotel.policies.checkOutTime}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Cancellation Policy</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {hotel.policies.cancellationPolicy}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Rate & Booking Anchor Box */}
        <div>
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-5">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block">Tariff Starts From</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#C5A880]">
                  ₹{hotel.startingPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-500">/ night + taxes</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Best Rate & Free Cancellation Guarantee</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Unlock instant 20% discount with code <span className="font-bold text-[#8B5E3C] dark:text-[#C5A880]">STAYORA20</span> at reservation checkout.
              </p>
            </div>

            <a
              href="#suites"
              className="w-full py-3.5 rounded-2xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Choose Available Suite</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Available Rooms & Suites Section */}
      <section id="suites" className="pt-8 space-y-6">
        <div className="border-t border-[#E8E1D5] dark:border-[#22352B] pt-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
            Suites & Villas
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
            Available Accommodations
          </h2>
        </div>

        <div className="space-y-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
            >
              {/* Room Image */}
              <div className="w-full md:w-64 rounded-2xl overflow-hidden aspect-[16/10] shrink-0 bg-gray-100">
                <img
                  src={room.images[0] || hotel.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Room Specs */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                      {room.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {room.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Up to {room.capacityAdults} Adults, {room.capacityChildren} Children</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{room.sizeSqFt} sq ft ({room.bedType})</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 dark:border-[#22352B] gap-4">
                  <div>
                    <span className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#C5A880]">
                      ₹{room.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-500"> / night</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(room)}
                    disabled={room.status === 'Unavailable' || room.status === 'Maintenance'}
                    className="px-6 py-2.5 rounded-xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] text-xs font-semibold transition-all disabled:opacity-40"
                  >
                    Reserve Suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Verified Guest Reviews & Sentiment */}
      <section className="pt-8 space-y-6">
        <div className="border-t border-[#E8E1D5] dark:border-[#22352B] pt-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
            Guest Chronicles
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
            Verified Experiences & Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#FBF9F4] dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#122B22] dark:text-[#FBF9F4]">{rev.userName}</h4>
                  <span className="text-[11px] text-gray-400">{rev.userCity || 'Verified Guest'} · {rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>
              <p className="text-xs text-[#5A6860] dark:text-[#9DAEA4] leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Leave a review form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4]">
            Share Your Experience
          </h3>
          {reviewSuccess && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{reviewSuccess}</p>
          )}
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Rating:</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="px-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              >
                <option value={5}>5 Stars - Perfection</option>
                <option value={4}>4 Stars - Wonderful</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Subpar</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tell fellow guests about the butler service, culinary offerings, gardens, and comfort..."
              className="w-full p-3 text-xs rounded-2xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100 focus:outline-none"
            />
            <button
              type="submit"
              disabled={submittingReview || !newComment.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] text-xs font-semibold disabled:opacity-40"
            >
              {submittingReview ? 'Publishing...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          hotel={hotel}
          room={selectedRoom}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};
