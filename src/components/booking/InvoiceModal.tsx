import React from 'react';
import { X, Printer, Download, CheckCircle, Shield } from 'lucide-react';
import { Booking } from '../../types/hotel';

interface InvoiceModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl p-6 sm:p-10 animate-in fade-in zoom-in-95 max-h-[95vh] overflow-y-auto print:max-w-full print:p-0 print:border-none print:shadow-none">
        {/* Top Controls (Hidden on print) */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-[#22352B] print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Simulated Payment Settled</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#122B22] text-[#FBF9F4] text-xs font-semibold hover:bg-[#1A382D] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2B25] text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="pt-6 space-y-8 text-gray-900 dark:text-gray-100">
          {/* Brand & Reference */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#122B22] text-[#C5A880] flex items-center justify-center font-serif font-bold text-lg">
                  S
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#122B22] dark:text-[#FBF9F4]">
                  STAYORA
                </span>
              </div>
              <p className="text-[11px] text-[#8B5E3C] uppercase tracking-wider font-semibold mt-1">
                Luxury Hospitality Network · Official Tax Invoice
              </p>
              <p className="text-xs text-gray-500 mt-0.5">GSTIN: 08AAACS1234F1Z8</p>
            </div>

            <div className="sm:text-right space-y-1 text-xs">
              <p className="text-gray-500 uppercase tracking-wider text-[10px]">Booking Reference</p>
              <p className="font-mono text-base font-bold text-[#122B22] dark:text-[#C5A880]">
                {booking.bookingReference}
              </p>
              <p className="text-gray-500">Date: {new Date(booking.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          {/* Guest & Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] text-xs">
            <div>
              <p className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] mb-1">Guest Details</p>
              <p className="font-bold text-sm text-[#122B22] dark:text-[#FBF9F4]">{booking.customerName}</p>
              <p className="text-gray-600 dark:text-gray-400">{booking.customerEmail}</p>
              <p className="text-gray-600 dark:text-gray-400">{booking.customerPhone}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] mb-1">Hotel Property</p>
              <p className="font-bold text-sm text-[#122B22] dark:text-[#FBF9F4]">{booking.hotelName}</p>
              <p className="text-gray-600 dark:text-gray-400">{booking.roomType} · Room {booking.roomNumber}</p>
              <p className="text-gray-500">Check-in: {booking.checkInDate} · Check-out: {booking.checkOutDate} ({booking.nights} nights)</p>
            </div>
          </div>

          {/* Table of Charges */}
          <div className="border border-gray-200 dark:border-[#22352B] rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-[#101915] border-b border-gray-200 dark:border-[#22352B] text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Nights</th>
                  <th className="p-3 text-right">Tariff / Night</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#22352B]">
                <tr>
                  <td className="p-3 font-medium">
                    {booking.roomType || (booking as any).room_type} Accommodations ({booking.adults} Adults, {booking.children || 0} Children)
                  </td>
                  <td className="p-3 text-center">{booking.nights || 1}</td>
                  <td className="p-3 text-right font-mono">₹{Number(booking.roomPricePerNight ?? (booking as any).room_price_per_night ?? 0).toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right font-mono font-semibold">₹{Number(booking.subtotal || 0).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-500" colSpan={3}>Hospitality GST (12%)</td>
                  <td className="p-3 text-right font-mono">₹{Number(booking.taxAmount ?? (booking as any).tax_amount ?? 0).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-500" colSpan={3}>Resort & Butler Service Fee</td>
                  <td className="p-3 text-right font-mono">₹{Number(booking.serviceFee ?? (booking as any).service_fee ?? 0).toLocaleString('en-IN')}</td>
                </tr>
                {Number(booking.discountAmount ?? (booking as any).discount_amount ?? 0) > 0 && (
                  <tr className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    <td className="p-3" colSpan={3}>Privilege Coupon ({booking.couponCode || (booking as any).coupon_code || 'STAYORA'})</td>
                    <td className="p-3 text-right font-mono">-₹{Number(booking.discountAmount ?? (booking as any).discount_amount ?? 0).toLocaleString('en-IN')}</td>
                  </tr>
                )}
                <tr className="bg-gray-50 dark:bg-[#101915] font-serif text-base font-bold text-[#122B22] dark:text-[#FBF9F4]">
                  <td className="p-3" colSpan={3}>Total Paid (Simulated)</td>
                  <td className="p-3 text-right text-[#122B22] dark:text-[#C5A880]">
                    ₹{Number(booking.totalAmount ?? (booking as any).total_amount ?? 0).toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QR Code & Check-in Pass Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B]">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-gray-100">
                <Shield className="w-4 h-4 text-[#C5A880]" />
                <span>Express Front Desk QR Verification</span>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Present this digital pass or printed invoice upon arrival at {booking.hotelName}. The front desk receptionist will scan this encrypted code to issue your electronic keycard immediately.
              </p>
              <p className="text-[11px] text-gray-400 font-mono">
                Transaction ID: {booking.transactionId || 'TXN-DEMO-99128'} · Method: {booking.paymentMethod || 'UPI'}
              </p>
            </div>

            {/* SVG QR Code */}
            <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 shrink-0">
              <svg className="w-28 h-28" viewBox="0 0 100 100">
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
          </div>
        </div>
      </div>
    </div>
  );
};
