import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  QrCode,
  Download,
  XCircle,
  UtensilsCrossed,
  Heart,
  User,
  Clock,
  CheckCircle,
  Building,
  ArrowRight,
  AlertCircle,
  Sliders,
  ShieldCheck,
  CreditCard,
  Crown,
  Users,
  Compass,
  Sparkles,
  Lock,
  Smartphone,
  Save,
  Check
} from 'lucide-react';
import { Booking, FoodItem, FoodOrder, Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { InvoiceModal } from '../components/booking/InvoiceModal';
import { HotelCard } from '../components/hotel/HotelCard';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { AnimatedChart } from '../components/common/AnimatedChart';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'group' | 'dining' | 'privilege' | 'settings'>('bookings');
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<Booking | null>(null);

  // Group split state
  const [groupBookings, setGroupBookings] = useState<any[]>([]);

  // Food Service state
  const [menu, setMenu] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [targetRoom, setTargetRoom] = useState<string>('Villa 101');
  const [orderingFood, setOrderingFood] = useState<boolean>(false);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  // Settings form states
  const [fullName, setFullName] = useState(user?.fullName || 'Tanya Agarwal');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [pillowType, setPillowType] = useState('Goose Down Firm');
  const [dietary, setDietary] = useState('Vegetarian / Jain on Request');
  const [preferredTemp, setPreferredTemp] = useState('22°C (Air conditioned)');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [settingsSaveMsg, setSettingsSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    loadCustomerData();
  }, [user]);

  const loadCustomerData = async () => {
    setLoading(true);
    try {
      const [bookRes, foodRes, ordersRes] = await Promise.all([
        apiRequest<{ bookings: Booking[] }>('/customer/bookings'),
        apiRequest<{ menu: FoodItem[] }>('/food/menu'),
        apiRequest<{ orders: FoodOrder[] }>('/food/orders')
      ]);

      setBookings(bookRes.bookings || []);
      setMenu(foodRes.menu || []);
      setOrders(ordersRes.orders || []);
    } catch (err) {
      console.error('Failed to load customer data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaveMsg(null);
    try {
      await apiRequest('/settings/user', {
        method: 'POST',
        body: JSON.stringify({
          settings: {
            fullName,
            phone,
            pillowType,
            dietary,
            preferredTemp,
            twoFactorEnabled
          }
        })
      });
      setSettingsSaveMsg('Your Royal Guest Preferences & Security Profile have been securely updated.');
      setTimeout(() => setSettingsSaveMsg(null), 4000);
    } catch (err: any) {
      setSettingsSaveMsg('Failed to update settings. Please retry.');
    }
  };

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const handlePlaceOrder = async () => {
    const items = Object.entries(cart).map(([itemId, quantity]) => {
      const food = menu.find((m) => m.id === itemId);
      return {
        id: itemId,
        name: food ? food.name : 'Delicacy',
        price: food ? food.price : 500,
        quantity,
        isVegetarian: food ? food.isVegetarian : true
      };
    });

    if (items.length === 0) return;

    setOrderingFood(true);
    setOrderNotice(null);

    try {
      await apiRequest('/food/order', {
        method: 'POST',
        body: JSON.stringify({
          hotelId: 'hotel-01',
          roomNumber: targetRoom,
          items,
          specialInstructions: 'Prepared fresh with royal copper handi presentation.'
        })
      });
      setCart({});
      setOrderNotice('Your Royal In-Room Dining Order has been dispatched to the palace kitchen!');
      const ordersRes = await apiRequest<{ orders: FoodOrder[] }>('/food/orders');
      setOrders(ordersRes.orders || []);
    } catch (err: any) {
      setOrderNotice(err.message || 'Failed to place order.');
    } finally {
      setOrderingFood(false);
    }
  };

  const customerSpendData = [
    { label: 'Jan', value: 34000 },
    { label: 'Feb', value: 48000 },
    { label: 'Mar', value: 12000 },
    { label: 'Apr', value: 92000 },
    { label: 'May', value: 54000 },
    { label: 'Jun', value: 78000 },
    { label: 'Jul', value: 110000 }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] pb-24 antialiased transition-colors">
      <MovingTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <BackButton label="Back to Explore Hotels" fallbackUrl="/explore" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#122B22] text-[#C5A880] border border-[#C5A880]/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Patron Guest Portal</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-[#FBF9F4] mt-2">
              Welcome, {user?.fullName || 'Esteemed Patron'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage active palatial reservations, group split itineraries, royal in-room dining, and sovereign privileges.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#0C1814] active:scale-95 transition-all shadow"
            >
              <span>Book Another Palace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5-Button Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#E8E1D5] dark:border-[#22352B]">
          {[
            { id: 'bookings', label: '1. Stays & Itineraries', icon: Calendar },
            { id: 'group', label: '2. Group Escrow & Splits', icon: Users },
            { id: 'dining', label: '3. In-Room Dining & Butler', icon: UtensilsCrossed },
            { id: 'privilege', label: '4. Privilege Pass & Rewards', icon: Crown },
            { id: 'settings', label: '5. Guest Settings & KYC', icon: Sliders }
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

        {/* TAB 1: Stays & Itineraries (Scroll 1-2) */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            {bookings.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
                <Building className="w-12 h-12 text-[#C5A880] mx-auto opacity-70" />
                <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">No Active Reservations</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Discover our portfolio of 42 palatial destinations across India and reserve your royal retreat today.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37]"
                >
                  Explore Palaces
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking: any) => {
                  const total = Number(booking.totalAmount ?? booking.total_amount ?? 0);
                  const ref = booking.bookingReference || booking.booking_reference || booking.id;
                  const status = booking.bookingStatus || booking.booking_status || 'Confirmed';
                  const hotelName = booking.hotelName || booking.hotel_name || 'Stayora Luxury Sanctuary';
                  const hotelCity = booking.hotelCity || booking.hotel_city || '';
                  const roomNumber = booking.roomNumber || booking.room_number || '';
                  const roomType = booking.roomType || booking.room_type || '';
                  const checkIn = booking.checkInDate || booking.check_in_date || '';
                  const checkOut = booking.checkOutDate || booking.check_out_date || '';

                  return (
                    <div
                      key={booking.id}
                      className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#C5A880] font-bold">{ref}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {status}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">{hotelName}</h3>
                        <p className="text-xs text-gray-500">{hotelCity} • Room {roomNumber} ({roomType})</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-100 dark:border-[#22352B] grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Check-In</span>
                          <span className="font-semibold text-[#122B22] dark:text-white">{checkIn}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">Check-Out</span>
                          <span className="font-semibold text-[#122B22] dark:text-white">{checkOut}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5] dark:border-[#22352B]">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Total Tariff</span>
                          <span className="font-serif text-lg font-bold text-[#C5A880]">
                            ₹{total.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedInvoiceBooking(booking)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Group Escrow & Splits (Scroll 3) */}
        {activeTab === 'group' && (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-[#22352B]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#122B22] dark:text-white">Group Stays & Split Escrow</h2>
                <p className="text-xs text-gray-500">Coordinate multi-room weddings, celebrations, and corporate retreats with automated split billing.</p>
              </div>
              <Link
                to="/group-booking"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37]"
              >
                Create New Group Split
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">Active Group Retreat</span>
                  <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Rajasthan Winter Heritage Retreat</h3>
                  <p className="text-xs text-gray-500">The Oberoi Rajvilas, Jaipur • 4 Members</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Escrow Confirmed
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B]">
                  <span className="text-[10px] text-gray-400 block">Total Group Cost</span>
                  <span className="font-serif font-bold text-[#C5A880]">₹93,260</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B]">
                  <span className="text-[10px] text-gray-400 block">Amount Paid</span>
                  <span className="font-serif font-bold text-emerald-600">₹69,945</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B]">
                  <span className="text-[10px] text-gray-400 block">Pending Escrow</span>
                  <span className="font-serif font-bold text-amber-600">₹23,315</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B]">
                  <span className="text-[10px] text-gray-400 block">Per Person Share</span>
                  <span className="font-serif font-bold text-[#122B22] dark:text-white">₹23,315</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: In-Room Dining & Butler (Scroll 4) */}
        {activeTab === 'dining' && (
          <div className="space-y-6 animate-fade-in">
            {orderNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{orderNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Menu Items */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Royal In-Room Dining Menu</h3>
                  <span className="text-xs text-gray-400">Available 24/7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menu.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${item.isVegetarian ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-xs font-bold text-[#122B22] dark:text-white">{item.name}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{item.description}</p>
                        <span className="font-serif text-xs font-semibold text-[#C5A880]">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {cart[item.id] ? (
                          <div className="flex items-center gap-2 bg-[#FBF9F4] dark:bg-[#0C1310] px-2 py-1 rounded-lg border border-gray-200 dark:border-[#22352B] text-xs">
                            <button onClick={() => removeFromCart(item.id)} className="font-bold text-gray-500 px-1">-</button>
                            <span className="font-bold">{cart[item.id]}</span>
                            <button onClick={() => addToCart(item.id)} className="font-bold text-[#C5A880] px-1">+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow-sm"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Active Room Order</h3>

                <div>
                  <label className="block text-[11px] text-gray-400 uppercase font-semibold mb-1">Target Suite</label>
                  <input
                    type="text"
                    value={targetRoom}
                    onChange={(e) => setTargetRoom(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>

                <div className="divide-y divide-gray-100 dark:divide-[#22352B] text-xs space-y-1">
                  {Object.entries(cart).map(([id, qty]) => {
                    const food = menu.find((m) => m.id === id);
                    if (!food) return null;
                    return (
                      <div key={id} className="pt-2 flex justify-between">
                        <span>{food.name} x {qty}</span>
                        <span className="font-serif font-bold text-[#C5A880]">₹{(food.price * qty).toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderingFood || Object.keys(cart).length === 0}
                  className="w-full py-3 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] disabled:opacity-50 hover:opacity-90 shadow transition-all"
                >
                  {orderingFood ? 'Sending Order...' : 'Dispatch Butler & Chef'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Privilege Pass & Rewards (Scroll 5) */}
        {activeTab === 'privilege' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#122B22] text-[#FBF9F4] border border-[#C5A880]/30 shadow-xl space-y-2">
                <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-bold">Privilege Tier</span>
                <div className="font-serif text-2xl font-bold flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#C5A880]" />
                  <span>Jade Aristocrat</span>
                </div>
                <p className="text-xs text-gray-300">12% instant member reduction on all royal suites.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Sovereign Credits</span>
                <div className="font-serif text-2xl font-bold text-[#C5A880]">2,850 Credits</div>
                <p className="text-xs text-gray-500">Worth ₹14,250 in fine dining and spa services.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Heritage Endowment</span>
                <div className="font-serif text-2xl font-bold text-emerald-600">₹4,200 Contributed</div>
                <p className="text-xs text-gray-500">Directly restored 2 stepwell arches in Bundi.</p>
              </div>
            </div>

            <AnimatedChart
              title="Annual Luxury Travel Expenditure (₹ INR)"
              subtitle="Your verified stays across Rajasthan, Kerala, and Himachal circuits"
              data={customerSpendData}
              type="area"
              primaryColor="#C5A880"
            />
          </div>
        )}

        {/* TAB 5: Settings with 3 Sub-Pages (Scroll 6) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-Tabs (2-3 Pages of settings) */}
            <div className="flex items-center gap-3 border-b border-[#E8E1D5] dark:border-[#22352B] pb-3">
              {[
                { id: 'profile', label: '1. Royal Identity & KYC', icon: User },
                { id: 'security', label: '2. Security & 2FA', icon: Lock },
                { id: 'preferences', label: '3. Curated Travel Taste', icon: Sparkles }
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

            {settingsSaveMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{settingsSaveMsg}</span>
              </div>
            )}

            {/* Sub-Page 1: Profile & KYC */}
            {settingsSubTab === 'profile' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Royal Patron Identity & Contact</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Registered Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'customer@stayora.com'}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Direct Mobile Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                  >
                    Save Contact Details
                  </button>
                </div>
              </form>
            )}

            {/* Sub-Page 2: Security & 2FA */}
            {settingsSubTab === 'security' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Security & Multi-Factor Protection</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-gray-200 dark:border-[#22352B]">
                  <div>
                    <span className="font-bold text-xs block text-[#122B22] dark:text-white">Two-Factor Authentication (2FA)</span>
                    <span className="text-[11px] text-gray-500">Require SMS or Authenticator verification for new booking authorizations.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="w-5 h-5 accent-[#C5A880]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                  >
                    Update Security Controls
                  </button>
                </div>
              </form>
            )}

            {/* Sub-Page 3: Curated Travel Taste */}
            {settingsSubTab === 'preferences' && (
              <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#122B22] dark:text-white">Bespoke Suite & Culinary Preferences</h3>
                <p className="text-xs text-gray-500">These settings are transmitted automatically to your butler upon check-in.</p>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pillow Menu Preference</label>
                  <select
                    value={pillowType}
                    onChange={(e) => setPillowType(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  >
                    <option value="Goose Down Firm">Goose Down Firm</option>
                    <option value="Hypoallergenic Silk">Hypoallergenic Silk</option>
                    <option value="Organic Buckwheat & Lavender">Organic Buckwheat & Lavender</option>
                    <option value="Memory Foam Ergonomic">Memory Foam Ergonomic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dietary Code</label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Room Temperature Target</label>
                  <input
                    type="text"
                    value={preferredTemp}
                    onChange={(e) => setPreferredTemp(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:opacity-90 shadow"
                  >
                    Save Suite Preferences
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Invoice Modal */}
        {selectedInvoiceBooking && (
          <InvoiceModal
            booking={selectedInvoiceBooking}
            isOpen={Boolean(selectedInvoiceBooking)}
            onClose={() => setSelectedInvoiceBooking(null)}
          />
        )}
      </div>
    </div>
  );
};
