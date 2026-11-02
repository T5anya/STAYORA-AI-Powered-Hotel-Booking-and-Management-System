import React, { useState, useEffect } from 'react';
import {
  Wrench,
  UtensilsCrossed,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  BedDouble,
  Sliders,
  User,
  Shield,
  FileText,
  Building,
  Check,
  ArrowRight
} from 'lucide-react';
import { HousekeepingTask, MaintenanceTask, FoodOrder } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';

export const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'briefing' | 'housekeeping' | 'maintenance' | 'dining' | 'settings'>('briefing');
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'pin' | 'sops'>('profile');

  const [housekeeping, setHousekeeping] = useState<HousekeepingTask[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceTask[]>([]);
  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Settings form states
  const [staffName, setStaffName] = useState(user?.fullName || 'Vikramaditya Rathore');
  const [floorSector, setFloorSector] = useState('East Palace Wing - Royal Tent Enclave');
  const [quickPin, setQuickPin] = useState('4829');
  const [handoverNote, setHandoverNote] = useState('All VIP floral arrangements completed in Villa 101 for 3:00 PM check-in.');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    loadStaffData();
  }, [user]);

  const loadStaffData = async () => {
    setLoading(true);
    try {
      const [hkRes, mtRes, foodRes] = await Promise.all([
        apiRequest<{ tasks: HousekeepingTask[] }>('/operations/housekeeping'),
        apiRequest<{ tasks: MaintenanceTask[] }>('/operations/maintenance'),
        apiRequest<{ orders: FoodOrder[] }>('/food/orders')
      ]);

      setHousekeeping(hkRes.tasks || []);
      setMaintenance(mtRes.tasks || []);
      setFoodOrders(foodRes.orders || []);
    } catch (err) {
      console.error('Failed to load staff data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(null);
    try {
      await apiRequest('/settings/staff', {
        method: 'POST',
        body: JSON.stringify({
          settings: {
            staffName,
            floorSector,
            quickPin,
            handoverNote
          }
        })
      });
      setSavedNotice('Duty shift parameters & handover note saved.');
      setTimeout(() => setSavedNotice(null), 3000);
    } catch (err) {
      setSavedNotice('Failed to save settings.');
    }
  };

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
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Palace Operations Roster</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-2">
              Staff Service Terminal
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live suite turn-down dispatch, engineering work orders, royal dining delivery queues, and shift handover.
            </p>
          </div>

          <button
            onClick={loadStaffData}
            className="p-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* 5-Button Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#E8E1D5] dark:border-[#22352B]">
          {[
            { id: 'briefing', label: '1. Shift Briefing', icon: Clock },
            { id: 'housekeeping', label: '2. Turn-Down & Rooms', icon: BedDouble },
            { id: 'maintenance', label: '3. Maintenance Tickets', icon: Wrench },
            { id: 'dining', label: '4. In-Room Dining Dispatch', icon: UtensilsCrossed },
            { id: 'settings', label: '5. Duty Handover & SOPs', icon: Sliders }
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

        {/* TAB 1: Shift Briefing (Scroll 1-2) */}
        {activeTab === 'briefing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Active Turn-Down Tasks</span>
                <div className="font-serif text-3xl font-bold text-[#C5A880]">{housekeeping.length} Suites</div>
                <span className="text-[11px] text-amber-600 font-semibold">2 VIP Express Cleans</span>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Kitchen Tickets Active</span>
                <div className="font-serif text-3xl font-bold text-[#122B22] dark:text-white">{foodOrders.length} Orders</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Average delivery 18 mins</span>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-1">
                <span className="text-xs text-gray-400 uppercase font-semibold">Engineering Items</span>
                <div className="font-serif text-3xl font-bold text-gray-700 dark:text-gray-300">{maintenance.length} Reported</div>
                <span className="text-[11px] text-blue-600 font-semibold">All non-critical</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Duty Handover Log From Previous Shift</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                "{handoverNote}"
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Housekeeping (Scroll 3) */}
        {activeTab === 'housekeeping' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              Suite Turn-Down & Sanitization Board
            </h2>
            <div className="space-y-3">
              {housekeeping.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-xs"
                >
                  <div>
                    <span className="font-bold text-sm text-[#122B22] dark:text-white">Room {task.roomNumber}</span>
                    <span className="text-gray-400 block text-[11px]">{task.notes}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {task.status}
                    </span>
                    <button
                      onClick={() => alert(`Marked Room ${task.roomNumber} as Inspected & Ready.`)}
                      className="px-3 py-1 rounded-lg bg-emerald-700 text-white font-semibold text-xs"
                    >
                      Mark Ready
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Maintenance (Scroll 4) */}
        {activeTab === 'maintenance' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              Engineering & HVAC Tickets
            </h2>
            <div className="space-y-3">
              {maintenance.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-xs"
                >
                  <div>
                    <span className="font-bold text-sm text-[#122B22] dark:text-white">Room {m.roomNumber}</span>
                    <span className="text-gray-400 block text-[11px]">{m.issue}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      {m.status}
                    </span>
                    <button
                      onClick={() => alert(`Ticket for Room ${m.roomNumber} marked Resolved.`)}
                      className="px-3 py-1 rounded-lg bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] font-semibold text-xs"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Dining (Scroll 5) */}
        {activeTab === 'dining' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">
              In-Room Dining Kitchen Tickets
            </h2>
            <div className="space-y-3">
              {foodOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] text-xs"
                >
                  <div>
                    <span className="font-bold text-sm text-[#122B22] dark:text-white">Room {order.roomNumber}</span>
                    <span className="text-gray-400 block text-[11px]">Order #{order.orderNumber} • ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {order.status}
                    </span>
                    <button
                      onClick={() => alert(`Order ${order.orderNumber} marked Delivered to Room ${order.roomNumber}`)}
                      className="px-3 py-1 rounded-lg bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] font-semibold text-xs"
                    >
                      Deliver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Staff Settings & Duty Handover with 3 Sub-Pages (Scroll 6) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-[#E8E1D5] dark:border-[#22352B] pb-3">
              {[
                { id: 'profile', label: '1. Staff Profile & Sector', icon: User },
                { id: 'pin', label: '2. Terminal Quick-PIN', icon: Shield },
                { id: 'sops', label: '3. Handover Notes & SOPs', icon: FileText }
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

            {/* Sub-Page 1: Profile */}
            {settingsSubTab === 'profile' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Staff Roster Identity</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Staff Officer Name</label>
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned Property Sector</label>
                  <input
                    type="text"
                    value={floorSector}
                    onChange={(e) => setFloorSector(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Save Shift Sector
                </button>
              </form>
            )}

            {/* Sub-Page 2: Terminal PIN */}
            {settingsSubTab === 'pin' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Terminal Quick PIN</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">4-Digit Security PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={quickPin}
                    onChange={(e) => setQuickPin(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Save PIN
                </button>
              </form>
            )}

            {/* Sub-Page 3: Handover & SOPs */}
            {settingsSubTab === 'sops' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Shift Handover Memorandum</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Handover Notes for Incoming Shift</label>
                  <textarea
                    rows={4}
                    value={handoverNote}
                    onChange={(e) => setHandoverNote(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                >
                  Post Handover Memo
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
