import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Building,
  Calendar,
  DollarSign,
  Sparkles,
  BedDouble,
  CheckCircle,
  AlertCircle,
  Wrench,
  UtensilsCrossed,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sliders,
  ShieldCheck,
  CreditCard,
  Percent,
  Check,
  ArrowRight,
  Clock,
  FileText
} from 'lucide-react';
import { KPIStats, Room, HousekeepingTask, AIPricingSuggestion, Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { AnimatedChart } from '../components/common/AnimatedChart';

export const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'settlement' | 'operations' | 'settings'>('overview');
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'banking' | 'pricing-rules'>('profile');

  const [kpi, setKpi] = useState<KPIStats | null>(null);
  const [hotelName, setHotelName] = useState<string>('The Oberoi Rajvilas');
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [housekeeping, setHousekeeping] = useState<HousekeepingTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Settings form states
  const [propertyTitle, setPropertyTitle] = useState('The Oberoi Rajvilas');
  const [bankAccount, setBankAccount] = useState('HDFC0001234 - 50100492817291');
  const [gstin, setGstin] = useState('08AAACT0123A1Z5');
  const [weekendMarkup, setWeekendMarkup] = useState<number>(20);
  const [minNights, setMinNights] = useState<number>(1);
  const [cancellationPolicy, setCancellationPolicy] = useState('Full refund up to 72 hours prior to arrival');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    loadOwnerData();
  }, [user]);

  const loadOwnerData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, hotelRes, tasksRes] = await Promise.all([
        apiRequest<{ kpi: KPIStats; hotelName: string; revenueTrend: any[] }>('/analytics/owner'),
        apiRequest<{ rooms: Room[] }>('/hotels/hotel-01'),
        apiRequest<{ tasks: HousekeepingTask[] }>('/operations/housekeeping')
      ]);

      setKpi(analyticsRes.kpi);
      setHotelName(analyticsRes.hotelName || 'The Oberoi Rajvilas');
      setRevenueTrend(analyticsRes.revenueTrend || []);
      setRooms(hotelRes.rooms || []);
      setHousekeeping(tasksRes.tasks || []);
    } catch (err) {
      console.error('Failed to load owner data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(null);
    try {
      await apiRequest('/settings/hotel', {
        method: 'POST',
        body: JSON.stringify({
          entityId: 'hotel-01',
          settings: {
            propertyTitle,
            bankAccount,
            gstin,
            weekendMarkup,
            minNights,
            cancellationPolicy
          }
        })
      });
      setSavedNotice('Commercial hotel settings saved successfully.');
      setTimeout(() => setSavedNotice(null), 3000);
    } catch (err: any) {
      setSavedNotice('Failed to save settings.');
    }
  };

  const ownerChartData = revenueTrend.map((r) => ({
    label: r.day,
    value: r.revenue
  }));

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] pb-24 antialiased transition-colors">
      <MovingTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <BackButton label="Back to Portals" fallbackUrl="/dashboard" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#122B22] text-[#C5A880] border border-[#C5A880]/30 shadow-sm">
                <Building className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Hotel Owner Operations</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-2">
              {hotelName} Control Center
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live RevPAR analytics, suite inventory yield management, automated escrow payouts, and operational dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadOwnerData}
              className="p-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 5-Button Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#E8E1D5] dark:border-[#22352B]">
          {[
            { id: 'overview', label: '1. Revenue & RevPAR', icon: TrendingUp },
            { id: 'rooms', label: '2. Suite Inventory', icon: BedDouble },
            { id: 'settlement', label: '3. Escrow & Bank Payouts', icon: DollarSign },
            { id: 'operations', label: '4. Operations & Housekeeping', icon: Wrench },
            { id: 'settings', label: '5. Commercial Settings', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#122B22] text-[#FBF9F4] dark:bg-[#C5A880] dark:text-[#0C1310] shadow-md scale-102'
                    : 'bg-white dark:bg-[#141F1A] text-gray-600 dark:text-gray-400 hover:bg-[#F3EEE4] dark:hover:bg-[#1B2922] border border-[#E8E1D5] dark:border-[#22352B]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880] dark:text-[#0C1310]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Revenue & RevPAR (Scroll 1-2) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {kpi && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Revenue (Month)</span>
                  <div className="font-serif text-3xl font-bold text-[#C5A880]">
                    ₹{kpi.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">+18.4% vs last cycle</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Current Occupancy</span>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-white">
                    {kpi.occupancyRate}%
                  </div>
                  <span className="text-[11px] text-gray-500">{kpi.occupiedRooms} of {kpi.totalRooms} suites occupied</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Average Daily Rate (ADR)</span>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-white">
                    ₹{kpi.adr.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-gray-500">Per room night realized</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">RevPAR Metric</span>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-white">
                    ₹{kpi.revPar.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Top tier for Jaipur</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <AnimatedChart
                  title="Daily Revenue Trend (₹ INR)"
                  subtitle="Trailing 7-day room and dining revenue"
                  data={ownerChartData.length > 0 ? ownerChartData : [
                    { label: 'Mon', value: 54000 },
                    { label: 'Tue', value: 62000 },
                    { label: 'Wed', value: 78000 },
                    { label: 'Thu', value: 95000 },
                    { label: 'Fri', value: 142000 },
                    { label: 'Sat', value: 168000 },
                    { label: 'Sun', value: 125000 }
                  ]}
                  type="area"
                  primaryColor="#C5A880"
                />
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Today's Roster</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-100 dark:border-[#22352B]">
                    <span>Expected VIP Arrivals</span>
                    <span className="font-bold text-emerald-600">3 Partys</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-100 dark:border-[#22352B]">
                    <span>Scheduled Departures</span>
                    <span className="font-bold text-gray-500">2 Partys</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-100 dark:border-[#22352B]">
                    <span>Suites In Turn-Down</span>
                    <span className="font-bold text-amber-600">4 Suites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Suite Inventory (Scroll 3) */}
        {activeTab === 'rooms' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-6 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              Suite Inventory & Live Status Control
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#C5A880]">Room {room.roomNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      room.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#122B22] dark:text-white">{room.name}</h4>
                    <span className="text-[11px] text-gray-500">{room.roomType} • {room.bedType}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-[#22352B] text-xs">
                    <span className="font-serif font-bold text-[#C5A880]">₹{room.pricePerNight.toLocaleString('en-IN')}/night</span>
                    <button
                      onClick={() => alert(`Status toggled for Room ${room.roomNumber}`)}
                      className="text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Escrow & Payouts (Scroll 4) */}
        {activeTab === 'settlement' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-6 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              Financial Escrow & Direct Payouts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-200 dark:border-[#22352B] space-y-1">
                <span className="text-[11px] text-gray-400 uppercase font-semibold">Available for Sweep</span>
                <div className="font-serif text-2xl font-bold text-emerald-600">₹8,45,000</div>
                <span className="text-[10px] text-gray-500">Auto-sweeps to HDFC Bank</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-200 dark:border-[#22352B] space-y-1">
                <span className="text-[11px] text-gray-400 uppercase font-semibold">In Escrow (Active Stays)</span>
                <div className="font-serif text-2xl font-bold text-[#C5A880]">₹3,20,000</div>
                <span className="text-[10px] text-gray-500">Releases upon guest check-out</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-200 dark:border-[#22352B] space-y-1">
                <span className="text-[11px] text-gray-400 uppercase font-semibold">YTD Tax Withheld</span>
                <div className="font-serif text-2xl font-bold text-gray-700 dark:text-gray-300">₹1,95,400</div>
                <span className="text-[10px] text-gray-500">TDS 194C / GST filed</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Operations & Housekeeping (Scroll 5) */}
        {activeTab === 'operations' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-6 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              Operations & Housekeeping Queue
            </h2>
            <div className="space-y-3">
              {housekeeping.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-xs"
                >
                  <div>
                    <span className="font-bold text-[#122B22] dark:text-white">Room {task.roomNumber}</span>
                    <span className="text-gray-400 block text-[11px]">{task.notes}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      task.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {task.status}
                    </span>
                    <button
                      onClick={() => alert(`Task ${task.id} status updated.`)}
                      className="px-3 py-1 rounded-lg bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] font-semibold"
                    >
                      Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Commercial Settings with 3 Sub-Pages (Scroll 6) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-[#E8E1D5] dark:border-[#22352B] pb-3">
              {[
                { id: 'profile', label: '1. Property Classification & Profile', icon: Building },
                { id: 'banking', label: '2. Banking & GST Settlement', icon: CreditCard },
                { id: 'pricing-rules', label: '3. Dynamic Yield & Cancellations', icon: Percent }
              ].map((sub) => {
                const Icon = sub.icon;
                const isSubActive = settingsSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSettingsSubTab(sub.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSubActive
                        ? 'bg-[#C5A880] text-[#0C1310] shadow'
                        : 'bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {savedNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{savedNotice}</span>
              </div>
            )}

            {/* Sub-Page 1: Property Profile */}
            {settingsSubTab === 'profile' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Property Identity & Tourism Ministry Certification</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Official Heritage Title</label>
                  <input
                    type="text"
                    value={propertyTitle}
                    onChange={(e) => setPropertyTitle(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Owner Email</label>
                  <input
                    type="text"
                    disabled
                    value={user?.email || 'owner@stayora.com'}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-gray-100 dark:bg-gray-800 text-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Save Property Details
                </button>
              </form>
            )}

            {/* Sub-Page 2: Banking & GST */}
            {settingsSubTab === 'banking' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Bank Account & GSTIN Details</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Settlement Bank & Account</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Save Banking Details
                </button>
              </form>
            )}

            {/* Sub-Page 3: Dynamic Yield Rules */}
            {settingsSubTab === 'pricing-rules' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Dynamic Rate Rules & Minimum Stays</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Weekend Surge Markup (%)</label>
                  <input
                    type="number"
                    value={weekendMarkup}
                    onChange={(e) => setWeekendMarkup(Number(e.target.value))}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cancellation Terms</label>
                  <input
                    type="text"
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Save Commercial Rules
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
