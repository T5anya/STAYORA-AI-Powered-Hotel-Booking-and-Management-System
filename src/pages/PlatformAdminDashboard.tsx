import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building,
  Users,
  CalendarCheck,
  CheckCircle,
  AlertTriangle,
  Activity,
  DollarSign,
  FileText,
  KeyRound,
  Sliders,
  Lock,
  RefreshCw,
  Search,
  ExternalLink,
  Percent,
  Check,
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Hotel } from '../types/hotel';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { AdminMasterKeyModal } from '../components/auth/AdminMasterKeyModal';
import { AnimatedChart } from '../components/common/AnimatedChart';

export const PlatformAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'escrow' | 'audit' | 'settings'>('overview');
  const [settingsSubTab, setSettingsSubTab] = useState<'master-key' | 'fees' | 'system'>('master-key');

  // Master key modal state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('stayora_admin_master_unlocked') === 'true';
  });

  // Admin stats
  const [stats, setStats] = useState<any>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchHotel, setSearchHotel] = useState<string>('');

  // Master key update form
  const [currentMasterKey, setCurrentMasterKey] = useState<string>('');
  const [newMasterKey, setNewMasterKey] = useState<string>('');
  const [confirmMasterKey, setConfirmMasterKey] = useState<string>('');
  const [showKeyText, setShowKeyText] = useState<boolean>(false);
  const [masterKeyStatus, setMasterKeyStatus] = useState<string | null>(null);
  const [masterKeyError, setMasterKeyError] = useState<string | null>(null);
  const [masterKeyLoading, setMasterKeyLoading] = useState<boolean>(false);

  // Platform settings form
  const [platformCommission, setPlatformCommission] = useState<number>(8.5);
  const [escrowHoldDays, setEscrowHoldDays] = useState<number>(2);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isUnlocked) {
      loadAdminData();
    }
  }, [user, isUnlocked]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [adminRes, hotelsRes] = await Promise.all([
        apiRequest<any>('/analytics/admin'),
        apiRequest<{ hotels: Hotel[] }>('/hotels')
      ]);
      setStats(adminRes);
      setHotels(hotelsRes.hotels || []);
    } catch (err) {
      console.error('Failed to load admin stats', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMasterKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setMasterKeyError(null);
    setMasterKeyStatus(null);

    if (newMasterKey !== confirmMasterKey) {
      setMasterKeyError('New Master Key and Confirmation do not match.');
      return;
    }

    if (newMasterKey.length < 8) {
      setMasterKeyError('Master Key must be at least 8 characters long.');
      return;
    }

    setMasterKeyLoading(true);
    try {
      await apiRequest('/admin/master-key', {
        method: 'PUT',
        body: JSON.stringify({
          currentKey: currentMasterKey,
          newKey: newMasterKey
        })
      });
      setMasterKeyStatus('Sovereign Master Key updated successfully in SQLite database.');
      setCurrentMasterKey('');
      setNewMasterKey('');
      setConfirmMasterKey('');
    } catch (err: any) {
      setMasterKeyError(err.message || 'Failed to update Master Key. Please verify your current key.');
    } finally {
      setMasterKeyLoading(false);
    }
  };

  const handleSavePlatformSettings = async () => {
    setSettingsSaved(false);
    try {
      await apiRequest('/settings/admin', {
        method: 'POST',
        body: JSON.stringify({
          settings: {
            commissionRate: platformCommission,
            escrowHoldDays,
            maintenanceMode
          }
        })
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save platform settings', err);
    }
  };

  // If not unlocked via Master Key, render high-security barrier
  if (!isUnlocked) {
    return <AdminMasterKeyModal onUnlocked={() => setIsUnlocked(true)} />;
  }

  const revenueChartData = [
    { label: 'Apr', value: 4200000 },
    { label: 'May', value: 5800000 },
    { label: 'Jun', value: 5100000 },
    { label: 'Jul', value: 6900000 },
    { label: 'Aug', value: 8200000 },
    { label: 'Sep', value: 9500000 },
    { label: 'Oct', value: 12400000 }
  ];

  const filteredHotels = hotels.filter((h) =>
    h.name.toLowerCase().includes(searchHotel.toLowerCase()) ||
    h.destination.toLowerCase().includes(searchHotel.toLowerCase()) ||
    h.city.toLowerCase().includes(searchHotel.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] pb-24 antialiased transition-colors">
      <MovingTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <BackButton label="Back to Portal Selection" fallbackUrl="/dashboard" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#122B22] text-[#C5A880] border border-[#C5A880]/30 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Sovereign Governance Active</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-2">
              Stayora Platform Administration
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pan-India luxury hospitality oversight, verified heritage registry, escrow payouts, and master security vault.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('stayora_admin_master_unlocked');
                setIsUnlocked(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-900 hover:bg-red-200 transition-colors shadow-sm"
              title="Lock Admin Vault"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Master Vault</span>
            </button>
            <button
              onClick={loadAdminData}
              className="p-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 5-Button Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#E8E1D5] dark:border-[#22352B]">
          {[
            { id: 'overview', label: '1. Global Overview', icon: Activity },
            { id: 'verification', label: '2. Hotel Registry & KYC', icon: Building },
            { id: 'escrow', label: '3. Escrow & Settlements', icon: DollarSign },
            { id: 'audit', label: '4. System Audit Trail', icon: FileText },
            { id: 'settings', label: '5. Master Settings & Vault', icon: Sliders }
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

        {/* TAB 1: Global Command Center (Scroll 1-2) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top 4 Sovereign Metric Cards */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span className="font-semibold uppercase tracking-wider">Registered Accounts</span>
                    <Users className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                    {stats.totalUsers.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Across 4 user role tiers</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span className="font-semibold uppercase tracking-wider">Partner Palaces</span>
                    <Building className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                    {stats.activeHotels.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block">42 Heritage Cities</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span className="font-semibold uppercase tracking-wider">Total Stays Booked</span>
                    <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
                    {stats.totalBookings.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Verified guest vouchers</span>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span className="font-semibold uppercase tracking-wider">Gross Platform GMV</span>
                    <DollarSign className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#C5A880]">
                    ₹{stats.grossSimulatedBookingValue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Simulated booking volume</span>
                </div>
              </div>
            )}

            {/* Animated Revenue Chart & Destination Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <AnimatedChart
                  title="Pan-India Monthly Booking GMV (₹ INR)"
                  subtitle="Simulated gross reservations across North, South, West & East royal heritage circuits"
                  data={revenueChartData}
                  type="area"
                  primaryColor="#C5A880"
                />
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Circuit Distribution</h3>
                  <span className="text-[10px] text-[#C5A880] font-bold uppercase">42 Cities</span>
                </div>

                <div className="space-y-3">
                  {[
                    { region: 'Rajasthan Heritage Circuit', count: '468 Hotels', share: '35%' },
                    { region: 'Kerala Backwaters & Spice Coast', count: '312 Hotels', share: '24%' },
                    { region: 'Himalayan High Altitude Sanctuaries', count: '286 Hotels', share: '21%' },
                    { region: 'Goa & Konkan Coastal Villas', count: '180 Hotels', share: '13%' },
                    { region: 'Central & Sacred Temple Cities', count: '103 Hotels', share: '7%' }
                  ].map((c, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{c.region}</span>
                        <span className="font-bold text-[#C5A880]">{c.share}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#22352B] overflow-hidden">
                        <div className="h-full rounded-full bg-[#122B22] dark:bg-[#C5A880]" style={{ width: c.share }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Hotel Registry & KYC Inspection (Scroll 3) */}
        {activeTab === 'verification' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-[#22352B]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
                  Verified Property Catalog ({hotels.length} Heritage Hotels)
                </h2>
                <p className="text-xs text-gray-500">Live inspection of star categories, license validations, and owner affiliations.</p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchHotel}
                  onChange={(e) => setSearchHotel(e.target.value)}
                  placeholder="Filter by hotel, destination, or city..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white outline-none focus:border-[#C5A880]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#22352B] text-gray-400 uppercase font-semibold text-[10px]">
                    <th className="py-3 px-4">Property Name</th>
                    <th className="py-3 px-4">Destination & State</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Tariff / Night</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#22352B]">
                  {filteredHotels.slice(0, 15).map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-gray-50 dark:hover:bg-[#1A2822] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#122B22] dark:text-white">
                        <div className="flex items-center gap-2">
                          <img src={hotel.heroImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-serif font-bold truncate max-w-xs">{hotel.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {hotel.destination}, {hotel.state}
                      </td>
                      <td className="py-3 px-4 text-gray-500">{hotel.category}</td>
                      <td className="py-3 px-4 font-serif font-semibold text-[#C5A880]">
                        ₹{hotel.startingPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                          ★ {hotel.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => alert(`Property ${hotel.name} verified in compliance audit.`)}
                          className="px-3 py-1 rounded-lg text-[11px] font-medium bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90"
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Escrow & Settlements (Scroll 4) */}
        {activeTab === 'escrow' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Total Escrow Balance</span>
                <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-white">₹1,84,50,000</div>
                <span className="text-[11px] text-emerald-600 font-medium">Secured in ICICI Trustee Account</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Platform Commission Accrued</span>
                <div className="font-serif text-3xl font-bold text-[#C5A880]">₹15,68,250</div>
                <span className="text-[11px] text-gray-400 font-medium">Net 8.5% platform commission</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Pending Vendor Payouts</span>
                <div className="font-serif text-3xl font-bold text-gray-700 dark:text-gray-300">₹42,10,000</div>
                <span className="text-[11px] text-blue-600 font-medium">Scheduled for batch release Friday</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">
                Escrow Settlement Ledger
              </h3>
              <div className="space-y-3">
                {[
                  { hotel: 'The Oberoi Rajvilas, Jaipur', batch: 'BATCH-2026-W44', amount: 845000, fee: 71825, status: 'Released' },
                  { hotel: 'Taj Lake Palace, Udaipur', batch: 'BATCH-2026-W44', amount: 1220000, fee: 103700, status: 'Released' },
                  { hotel: 'Wildflower Hall, Shimla', batch: 'BATCH-2026-W44', amount: 480000, fee: 40800, status: 'Pending Verification' },
                  { hotel: 'Evolve Back, Coorg', batch: 'BATCH-2026-W44', amount: 395000, fee: 33575, status: 'Released' }
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-xs">
                    <div>
                      <div className="font-bold text-[#122B22] dark:text-white">{s.hotel}</div>
                      <div className="text-[10px] text-gray-400">{s.batch}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif font-bold text-[#C5A880]">₹{s.amount.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-gray-400">Fee: ₹{s.fee.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        s.status === 'Released'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Audit Logs (Scroll 5) */}
        {activeTab === 'audit' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              System Audit & Cryptographic Log Stream
            </h2>
            <div className="divide-y divide-gray-100 dark:divide-[#22352B]">
              {(stats?.logs || []).map((log: any) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[#122B22] dark:text-white">{log.action}</span>
                    <span className="text-gray-400 text-[11px] block">{log.details}</span>
                  </div>
                  <div className="text-right text-[11px] text-gray-400">
                    <div>{log.user_email || 'System Daemon'}</div>
                    <div>{log.created_at.split('T')[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Master Settings & Security Vault (Scroll 6) - with 3 Sub-Pages */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-Tab Navigation for Settings (2-3 Pages inside settings) */}
            <div className="flex items-center gap-3 border-b border-[#E8E1D5] dark:border-[#22352B] pb-3">
              {[
                { id: 'master-key', label: '1. Master Key Security Vault', icon: KeyRound },
                { id: 'fees', label: '2. Escrow Fees & Gateways', icon: Percent },
                { id: 'system', label: '3. Global Platform Parameters', icon: Sliders }
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

            {/* Sub-Page 1: Master Key Security Vault */}
            {settingsSubTab === 'master-key' && (
              <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-6 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
                      Platform Sovereign Master Key Management
                    </h3>
                    <p className="text-xs text-gray-500">
                      This key guards administrative access to platform governance. It can only be altered from this authorized portal.
                    </p>
                  </div>
                </div>

                {masterKeyStatus && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{masterKeyStatus}</span>
                  </div>
                )}

                {masterKeyError && (
                  <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-500/30 text-red-800 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{masterKeyError}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateMasterKey} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Current Master Key
                    </label>
                    <input
                      type={showKeyText ? 'text' : 'password'}
                      required
                      value={currentMasterKey}
                      onChange={(e) => setCurrentMasterKey(e.target.value)}
                      placeholder="Enter active master key (e.g. STAYORA-ROYAL-2026)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-sm text-[#122B22] dark:text-white font-mono outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      New Master Key
                    </label>
                    <input
                      type={showKeyText ? 'text' : 'password'}
                      required
                      value={newMasterKey}
                      onChange={(e) => setNewMasterKey(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-sm text-[#122B22] dark:text-white font-mono outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Confirm New Master Key
                    </label>
                    <input
                      type={showKeyText ? 'text' : 'password'}
                      required
                      value={confirmMasterKey}
                      onChange={(e) => setConfirmMasterKey(e.target.value)}
                      placeholder="Re-type new master key"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-sm text-[#122B22] dark:text-white font-mono outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowKeyText(!showKeyText)}
                      className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white flex items-center gap-1.5"
                    >
                      {showKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showKeyText ? 'Hide Characters' : 'Reveal Characters'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={masterKeyLoading}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#0C1814] active:scale-95 transition-all shadow"
                    >
                      {masterKeyLoading ? 'Updating Key...' : 'Save New Master Key'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Sub-Page 2: Escrow Fees & Gateways */}
            {settingsSubTab === 'fees' && (
              <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
                    Escrow Commission & Payment Gateways
                  </h3>
                  <p className="text-xs text-gray-500">Configure take-rates and automated payout batch schedules.</p>
                </div>

                {settingsSaved && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs">
                    Settings synchronized with SQLite database.
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Platform Commission Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={platformCommission}
                      onChange={(e) => setPlatformCommission(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    />
                    <span className="text-[11px] text-gray-400">Standard luxury tier is 8.5% of gross reservation.</span>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Escrow Holding Period (Days After Check-Out)</label>
                    <input
                      type="number"
                      value={escrowHoldDays}
                      onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    />
                  </div>

                  <button
                    onClick={handleSavePlatformSettings}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                  >
                    Save Financial Rules
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Page 3: Global System Parameters */}
            {settingsSubTab === 'system' && (
              <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
                    Global System Emergency Flags
                  </h3>
                  <p className="text-xs text-gray-500">Control system-wide operational parameters and API throttles.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-200 dark:border-[#22352B]">
                    <div>
                      <span className="font-bold text-xs block text-[#122B22] dark:text-white">Maintenance Mode</span>
                      <span className="text-[11px] text-gray-500">Temporarily freeze new bookings for scheduled database index rebuilds.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="w-5 h-5 accent-[#C5A880]"
                    />
                  </div>

                  <button
                    onClick={handleSavePlatformSettings}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                  >
                    Save System Parameters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
