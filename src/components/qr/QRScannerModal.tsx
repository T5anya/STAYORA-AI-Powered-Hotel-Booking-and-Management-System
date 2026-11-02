import React, { useState } from 'react';
import { X, QrCode, Search, CheckCircle, AlertCircle, User, Calendar, Building, LogIn, LogOut } from 'lucide-react';
import { Booking } from '../../types/hotel';
import { apiRequest } from '../../api/client';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, onStatusUpdated }) => {
  const [referenceInput, setReferenceInput] = useState<string>('STY-RAJ-88421');
  const [verifiedBooking, setVerifiedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (refToVerify?: string) => {
    const target = refToVerify || referenceInput;
    if (!target) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await apiRequest<{ booking: Booking; verified: boolean }>('/bookings/verify-qr', {
        method: 'POST',
        body: JSON.stringify({ reference: target })
      });
      setVerifiedBooking(res.booking);
    } catch (err: any) {
      setVerifiedBooking(null);
      setErrorMsg(err.message || 'Verification failed. No matching booking record found.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: 'Checked In' | 'Checked Out') => {
    if (!verifiedBooking) return;
    setLoading(true);
    try {
      await apiRequest(`/bookings/${verifiedBooking.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      setVerifiedBooking((prev) => prev ? { ...prev, bookingStatus: status } : null);
      setSuccessMsg(`Guest successfully ${status.toLowerCase()}! Room status and housekeeping synchronized.`);
      if (onStatusUpdated) onStatusUpdated();
    } catch (err: any) {
      setErrorMsg(err.message || 'Status update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#122B22] text-[#C5A880]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-[#FBF9F4]">
                Staff Express QR Check-In
              </h3>
              <p className="text-xs text-gray-500">Scan digital pass or enter booking reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2B25] text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input & Verification */}
        <div className="py-5 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value.toUpperCase())}
              placeholder="e.g. STY-RAJ-88421"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-[#22352B] bg-white dark:bg-[#0E1612] font-mono tracking-wider font-semibold text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </div>

          {/* Quick presets for immediate one-click testing */}
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span>Quick test:</span>
            <button
              onClick={() => {
                setReferenceInput('STY-RAJ-88421');
                handleVerify('STY-RAJ-88421');
              }}
              className="underline text-[#8B5E3C] dark:text-[#C5A880] hover:opacity-80"
            >
              STY-RAJ-88421 (Tanya)
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Verified Booking Card */}
          {verifiedBooking && (
            <div className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B5E3C] dark:text-[#C5A880]">
                    Verified Guest Record
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#122B22] dark:text-[#FBF9F4] mt-0.5">
                    {verifiedBooking.customerName}
                  </h4>
                  <p className="text-xs text-gray-500">{verifiedBooking.customerPhone}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    verifiedBooking.bookingStatus === 'Checked In'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : verifiedBooking.bookingStatus === 'Checked Out'
                      ? 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {verifiedBooking.bookingStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-[#22352B]">
                <div>
                  <span className="text-gray-400 block text-[10px]">Room Allocation</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{verifiedBooking.roomNumber}</span>
                  <span className="text-[11px] text-gray-500 block truncate">{verifiedBooking.roomType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Stay Window</span>
                  <span>{verifiedBooking.checkInDate} to {verifiedBooking.checkOutDate}</span>
                  <span className="text-[11px] text-gray-500 block">({verifiedBooking.nights} nights)</span>
                </div>
              </div>

              {/* Operational Action Buttons */}
              <div className="pt-2 flex gap-2">
                {verifiedBooking.bookingStatus === 'Confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus('Checked In')}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Check In Guest (Activate Key)</span>
                  </button>
                )}

                {verifiedBooking.bookingStatus === 'Checked In' && (
                  <button
                    onClick={() => handleUpdateStatus('Checked Out')}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Check Out & Trigger Cleaning</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
