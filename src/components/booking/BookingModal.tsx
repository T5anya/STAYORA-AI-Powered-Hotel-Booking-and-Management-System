import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Tag,
  ArrowRight,
  Download,
  Building,
  Loader2
} from 'lucide-react';
import { Hotel, Room, Booking } from '../../types/hotel';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { InvoiceModal } from './InvoiceModal';

interface BookingModalProps {
  hotel: Hotel;
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  hotel,
  room,
  isOpen,
  onClose,
  onBookingSuccess
}) => {
  const { user } = useAuth();

  // Dates: default to tomorrow and 3 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDefault = new Date();
  checkoutDefault.setDate(checkoutDefault.getDate() + 4);

  const [checkInDate, setCheckInDate] = useState<string>(tomorrow.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState<string>(checkoutDefault.toISOString().split('T')[0]);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>(user?.fullName || '');
  const [guestPhone, setGuestPhone] = useState<string>(user?.phone || '+91 98765 43210');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Payment & Promo Code state
  const [couponCode, setCouponCode] = useState<string>('STAYORA20');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('STAYORA20');
  const [discountAmount, setDiscountAmount] = useState<number>(5000);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState<boolean>(false);

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [simulatedUpiId, setSimulatedUpiId] = useState<string>('tanya@okhdfcbank');

  // Flow states
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [processingStatus, setProcessingStatus] = useState<string>('Connecting to secure payment portal...');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Nights calculation
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  // Pricing math strictly mirrored with server
  const subtotal = room.pricePerNight * nights;
  const taxAmount = Math.round(subtotal * 0.12);
  const serviceFee = 1500;
  const totalAmount = Math.max(0, subtotal + taxAmount + serviceFee - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setValidatingCoupon(true);
    setCouponError(null);
    try {
      const res = await apiRequest<{ valid: boolean; discount: number; description: string; error?: string }>(
        '/coupons/validate',
        {
          method: 'POST',
          body: JSON.stringify({ code: couponCode, amount: subtotal })
        }
      );
      if (res.valid) {
        setAppliedCoupon(couponCode.toUpperCase());
        setDiscountAmount(res.discount);
      } else {
        setCouponError(res.error || 'Coupon not applicable.');
      }
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon.');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleConfirmReservation = async () => {
    setErrorMsg(null);
    if (!user) {
      setErrorMsg('Please sign in or select a demo user to confirm your booking.');
      return;
    }

    setStep('processing');
    setProcessingStatus('Verifying real-time suite availability & lock...');

    try {
      // Step 1: simulated bank handshake animation
      await new Promise((r) => setTimeout(r, 800));
      setProcessingStatus(`Authorizing ${paymentMethod} simulated payment of ₹${totalAmount.toLocaleString('en-IN')}...`);
      await new Promise((r) => setTimeout(r, 1000));
      setProcessingStatus('Securing cryptographic booking QR code and invoice...');

      const res = await apiRequest<{ booking: Booking }>('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          hotelId: hotel.id,
          roomId: room.id,
          checkInDate,
          checkOutDate,
          adults,
          children,
          customerPhone: guestPhone,
          couponCode: appliedCoupon,
          paymentMethod,
          specialRequests
        })
      });

      setConfirmedBooking(res.booking);
      setStep('confirmed');
      if (onBookingSuccess) onBookingSuccess(res.booking);
    } catch (err: any) {
      setStep('details');
      setErrorMsg(err.message || 'Failed to process reservation.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E8E1D5] dark:border-[#22352B] bg-[#FBF9F4] dark:bg-[#0E1612]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#122B22] text-[#C5A880] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4]">
                  Reserve {room.name}
                </h3>
                <p className="text-xs text-gray-500">{hotel.name} · {hotel.city}</p>
              </div>
            </div>
            {step !== 'processing' && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#1E2B25] text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* STEP 1: BOOKING & PAYMENT DETAILS */}
          {step === 'details' && (
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Date Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkInDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Check-out Date ({nights} {nights === 1 ? 'night' : 'nights'})
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Adult Guests (Max {room.capacityAdults})
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                  >
                    {Array.from({ length: room.capacityAdults }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Children (Under 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                  >
                    {[0, 1, 2].map((n) => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Phone & Requests */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Contact Phone Number (For Instant QR Pass)
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Quiet garden wing, late checkout, feather pillows"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Promo Code section */}
              <div className="p-3 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Apply Privilege Promo Code</span>
                  </div>
                  {appliedCoupon && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ Code {appliedCoupon} Active
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter STAYORA20 or WELCOME10"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-[#22352B] bg-white dark:bg-[#141F1A] uppercase tracking-wider font-semibold text-gray-900 dark:text-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validatingCoupon}
                    className="px-4 py-1.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {validatingCoupon ? 'Validating...' : 'Apply'}
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#111A16] border border-gray-100 dark:border-[#22352B] space-y-2 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>₹{room.pricePerNight.toLocaleString('en-IN')} × {nights} Nights</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Hospitality GST (12%)</span>
                  <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Resort Facility & Butler Fee</span>
                  <span>₹{serviceFee.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Privilege Coupon Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200 dark:border-[#22352B] flex justify-between font-serif text-base font-bold text-[#122B22] dark:text-[#FBF9F4]">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Simulated Payment Method Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select Simulated Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#122B22] dark:text-[#C5A880] font-bold'
                        : 'border-gray-200 dark:border-[#22352B] text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <div className="text-xs font-semibold">UPI Portal</div>
                    <div className="text-[10px] opacity-70">GPay, PhonePe, BHIM</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#122B22] dark:text-[#C5A880] font-bold'
                        : 'border-gray-200 dark:border-[#22352B] text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <div className="text-xs font-semibold">Demo Card</div>
                    <div className="text-[10px] opacity-70">Visa / Mastercard</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'NetBanking'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#122B22] dark:text-[#C5A880] font-bold'
                        : 'border-gray-200 dark:border-[#22352B] text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <div className="text-xs font-semibold">Net Banking</div>
                    <div className="text-[10px] opacity-70">HDFC, ICICI, SBI</div>
                  </button>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={simulatedUpiId}
                      onChange={(e) => setSimulatedUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
                    />
                  </div>
                )}
              </div>

              {/* Confirm CTA */}
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="w-full py-3.5 rounded-2xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Authorize Simulated Payment · ₹{totalAmount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PROCESSING SIMULATION */}
          {step === 'processing' && (
            <div className="p-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#C5A880] animate-spin mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                Processing Demo Payment
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                {processingStatus}
              </p>
              <div className="pt-2 text-[11px] text-[#C5A880] font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Simulated PCI-DSS 256-Bit Sandbox Security</span>
              </div>
            </div>
          )}

          {/* STEP 3: BOOKING CONFIRMED & QR PASS */}
          {step === 'confirmed' && confirmedBooking && (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#8B5E3C] dark:text-[#C5A880] uppercase tracking-widest">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
                  We look forward to welcoming you!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Reference: <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{confirmedBooking.bookingReference}</span>
                </p>
              </div>

              {/* Quick Summary Card with QR Code */}
              <div className="p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                <div className="space-y-1 text-xs">
                  <p className="font-serif font-bold text-base text-[#122B22] dark:text-[#FBF9F4]">{confirmedBooking.hotelName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{confirmedBooking.roomType} ({confirmedBooking.roomNumber})</p>
                  <p className="text-gray-500">{confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate} ({confirmedBooking.nights} nights)</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                    Simulated Payment Paid: ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* SVG QR Code */}
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      {/* Simple high-contrast geometric QR pattern */}
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="24" height="24" fill="#122B22" />
                      <rect x="14" y="14" width="16" height="16" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="#122B22" />
                      <rect x="66" y="10" width="24" height="24" fill="#122B22" />
                      <rect x="70" y="14" width="16" height="16" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="#122B22" />
                      <rect x="10" y="66" width="24" height="24" fill="#122B22" />
                      <rect x="14" y="70" width="16" height="16" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="#122B22" />
                      {/* Data Dots */}
                      <rect x="42" y="14" width="8" height="8" fill="#122B22" />
                      <rect x="46" y="30" width="8" height="8" fill="#122B22" />
                      <rect x="22" y="44" width="8" height="8" fill="#122B22" />
                      <rect x="54" y="44" width="8" height="8" fill="#122B22" />
                      <rect x="74" y="44" width="8" height="8" fill="#122B22" />
                      <rect x="42" y="66" width="8" height="8" fill="#122B22" />
                      <rect x="66" y="74" width="8" height="8" fill="#122B22" />
                      <rect x="82" y="82" width="8" height="8" fill="#122B22" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-mono">
                    Scan for Fast Check-In
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowInvoice(true)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-[#22352B] text-[#122B22] dark:text-[#FBF9F4] text-xs font-semibold hover:bg-gray-50 dark:hover:bg-[#1E2B25] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Tax Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-xs font-semibold hover:opacity-90"
                >
                  Return to Stays
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {showInvoice && confirmedBooking && (
        <InvoiceModal
          booking={confirmedBooking}
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </>
  );
};
