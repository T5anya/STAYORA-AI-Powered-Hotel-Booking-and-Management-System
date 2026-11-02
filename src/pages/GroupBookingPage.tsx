import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  CreditCard,
  QrCode,
  Share2,
  CheckCircle,
  Clock,
  Plus,
  Building,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { GroupBooking, Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { BackButton } from '../components/common/BackButton';

export const GroupBookingPage: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<GroupBooking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // New Group Modal / Form
  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState('hotel-01');
  const [checkIn, setCheckIn] = useState('2026-12-05');
  const [checkOut, setCheckOut] = useState('2026-12-08');
  const [guestCount, setGuestCount] = useState(4);
  const [roomsCount, setRoomsCount] = useState(2);
  const [totalCost, setTotalCost] = useState(93260);

  // Invitation copy notice
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [groupsRes, hotelsRes] = await Promise.all([
        apiRequest<{ groups: GroupBooking[] }>('/group-bookings'),
        apiRequest<{ hotels: Hotel[] }>('/hotels')
      ]);
      setGroups(groupsRes.groups || []);
      setHotels(hotelsRes.hotels || []);
    } catch (err) {
      console.error('Failed to load group bookings', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const share = Math.round(totalCost / Math.max(1, guestCount));
      const demoMembers = [
        { id: 'm1', name: user?.fullName || 'Tanya Agarwal', email: user?.email || 'tanyaagr229@gmail.com', shareAmount: share, paymentStatus: 'Paid', paidAt: new Date().toISOString() },
        { id: 'm2', name: 'Aarav Mehta', email: 'aarav@example.com', shareAmount: share, paymentStatus: 'Paid', paidAt: new Date().toISOString() },
        { id: 'm3', name: 'Simran Kaur', email: 'simran@example.com', shareAmount: share, paymentStatus: 'Pending' },
        { id: 'm4', name: 'Kabir Roy', email: 'kabir@example.com', shareAmount: share, paymentStatus: 'Paid', paidAt: new Date().toISOString() }
      ];

      await apiRequest('/group-bookings', {
        method: 'POST',
        body: JSON.stringify({
          name: groupName || 'Exclusive Group Vacation',
          hotelId: selectedHotelId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guestCount,
          roomsCount,
          totalCost,
          members: demoMembers,
          splitType: 'equal_split'
        })
      });

      setIsCreating(false);
      setGroupName('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to create group booking.');
    }
  };

  const handlePayShare = async (groupId: string, memberEmail: string) => {
    try {
      const res = await apiRequest(`/group-bookings/${groupId}/pay-share`, {
        method: 'POST',
        body: JSON.stringify({ memberEmail })
      });
      alert(res.message);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Payment simulation failed.');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(`Join our Stayora retreat! Use group code: ${code}`);
    setCopyFeedback(code);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <BackButton label="Back to Discover" fallbackUrl="/" />
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E8E1D5] dark:border-[#22352B] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
            Split-Payment Group Stays
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
            Group Retreats & Travel Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4] mt-1 max-w-2xl">
            Coordinate luxury villa stays and palace retreats with family or colleagues. Every member pays their individual share directly with automated bill reconciliation.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] font-semibold text-xs transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Group Stay</span>
        </button>
      </div>

      {/* CREATE GROUP MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
            <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Organize a Group Retreat
            </h3>

            <form onSubmit={handleCreateGroup} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Group Trip Title</label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Royal Diwali Family Reunion"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Select Property</label>
                <select
                  value={selectedHotelId}
                  onChange={(e) => setSelectedHotelId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                >
                  {hotels.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.city}) — From ₹{h.startingPrice.toLocaleString('en-IN')}/night
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Guest Count</label>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Suites</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Budget (₹)</label>
                  <input
                    type="number"
                    step={1000}
                    value={totalCost}
                    onChange={(e) => setTotalCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] text-gray-700 dark:text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] font-semibold"
                >
                  Create & Calculate Splits
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTIVE GROUP TRIPS */}
      <div className="space-y-8">
        {groups.map((group) => {
          const members = group.members || [];
          const paidCount = members.filter((m) => m.paymentStatus === 'Paid').length;
          const totalMembers = members.length;
          const percentage = totalMembers > 0 ? Math.round((paidCount / totalMembers) * 100) : 0;
          const remainingAmount = group.totalCost - group.amountPaid;

          return (
            <div
              key={group.id}
              className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Group Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#22352B] gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8B5E3C] dark:text-[#C5A880] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-md">
                      {group.groupCode}
                    </span>
                    <span className="text-xs text-gray-500">Organizer: {group.organizerName}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-1">
                    {group.name}
                  </h3>
                  <p className="text-xs text-[#5A6860] dark:text-[#9DAEA4]">{group.hotelName} · {group.checkInDate} to {group.checkOutDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyCode(group.groupCode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 dark:border-[#22352B] text-xs font-semibold hover:bg-gray-50 dark:hover:bg-[#1E2B25]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copyFeedback === group.groupCode ? 'Copied Link!' : 'Share Pass'}</span>
                  </button>
                </div>
              </div>

              {/* Progress & Summary Bar */}
              <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Split Reconciliations: {paidCount} of {totalMembers} members have completed simulated payments ({percentage}%)
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{group.amountPaid.toLocaleString('en-IN')} / ₹{group.totalCost.toLocaleString('en-IN')} Settled
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Suites Reserved: {group.roomsCount}</span>
                  <span>Balance Outstanding: ₹{remainingAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Members Payment Ledger */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Member Payment Status
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {members.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#111A16] border border-gray-200 dark:border-[#22352B] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{m.name}</p>
                        <p className="text-[11px] text-gray-500">{m.email}</p>
                        <p className="font-mono text-[#8B5E3C] dark:text-[#C5A880] mt-0.5">
                          Share: ₹{m.shareAmount.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div>
                        {m.paymentStatus === 'Paid' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px] flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Paid</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePayShare(group.id, m.email)}
                            className="px-3 py-1.5 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] text-[11px] font-semibold hover:opacity-90 transition-opacity"
                          >
                            Pay Share (Demo)
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
