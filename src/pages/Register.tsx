import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/hotel';
import { BackButton } from '../components/common/BackButton';

export const Register: React.FC = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [propertyName, setPropertyName] = useState('The Oberoi Rajvilas');
  const [staffDepartment, setStaffDepartment] = useState('Front Desk Receptionist');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const assignedHotelId = role === 'owner' || role === 'staff' ? 'hotel-01' : undefined;
      const assignedStaffRole = role === 'staff' ? staffDepartment : undefined;
      const registeredUser = await register(fullName, email, password, role, assignedHotelId, assignedStaffRole);
      
      // Strict 1-to-1 role redirect
      if (registeredUser.role === 'owner') {
        navigate('/owner/dashboard', { replace: true });
      } else if (registeredUser.role === 'staff') {
        navigate('/staff/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center px-4 space-y-4">
      <div className="w-full max-w-md">
        <BackButton label="Back to Login" fallbackUrl="/login" />
      </div>

      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#122B22] text-[#C5A880] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-md">
            S
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            Create a Stayora Account
          </h1>
          <p className="text-xs text-gray-500">Each account is bound to its registered role portal</p>
        </div>

        {/* Instant Google Account Registration */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={async () => {
              try {
                setLoading(true);
                await loginWithGoogle('tanyaagr229@gmail.com', 'Tanya Agarwal');
                navigate('/dashboard', { replace: true });
              } catch (err: any) {
                setErrorMsg(err.message || 'Google registration failed.');
              } finally {
                setLoading(false);
              }
            }}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-[#24362E] bg-white dark:bg-[#101814] hover:bg-gray-50 dark:hover:bg-[#17221D] text-gray-800 dark:text-gray-100 font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow-sm hover:border-[#C5A880]/60 active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign up instantly with Google Account</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 dark:border-[#22352B] w-full" />
            <span className="bg-white dark:bg-[#141F1A] px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              or register with email
            </span>
            <div className="border-t border-gray-200 dark:border-[#22352B] w-full" />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-xs text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Select Your Intended Account Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                  role === 'customer'
                    ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#122B22] dark:text-[#C5A880] font-bold shadow-sm'
                    : 'border-gray-200 dark:border-[#22352B] text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="text-[11px]">Guest</div>
                <div className="text-[9px] opacity-75 font-normal">Customer Portal</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                  role === 'owner'
                    ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#122B22] dark:text-[#C5A880] font-bold shadow-sm'
                    : 'border-gray-200 dark:border-[#22352B] text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="text-[11px]">Hotel Manager</div>
                <div className="text-[9px] opacity-75 font-normal">Owner Portal</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('staff')}
                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                  role === 'staff'
                    ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#122B22] dark:text-[#C5A880] font-bold shadow-sm'
                    : 'border-gray-200 dark:border-[#22352B] text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="text-[11px]">Hotel Staff</div>
                <div className="text-[9px] opacity-75 font-normal">Staff Ops Portal</div>
              </button>
            </div>

            <div className="mt-2 p-2.5 rounded-xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] text-[11px] text-gray-600 dark:text-gray-400">
              {role === 'customer' && (
                <span>✦ <strong>Guest Customer Access:</strong> Luxury booking marketplace, QR check-in pass, room service orders, and group split payments.</span>
              )}
              {role === 'owner' && (
                <span>✦ <strong>Hotel Manager Access:</strong> Property inventory, RevPAR business intelligence, AI pricing engine, and review sentiment analytics.</span>
              )}
              {role === 'staff' && (
                <span>✦ <strong>Hotel Operations Access:</strong> Front desk QR arrival verification, real-time room readiness, housekeeping, and maintenance.</span>
              )}
            </div>
          </div>

          {/* Conditional Role-Specific Fields */}
          {role === 'owner' && (
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Managed Property / Hotel</label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="e.g. The Oberoi Rajvilas, Jaipur"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                />
              </div>
            </div>
          )}

          {role === 'staff' && (
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Operations Department</label>
              <select
                value={staffDepartment}
                onChange={(e) => setStaffDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              >
                <option value="Front Desk Receptionist">Front Desk Receptionist</option>
                <option value="Housekeeping Supervisor">Housekeeping Supervisor</option>
                <option value="Concierge & Guest Relations">Concierge & Guest Relations</option>
                <option value="Food & Beverage Manager">Food & Beverage Manager</option>
              </select>
            </div>
          )}

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Legal Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
          >
            <span>
              {loading
                ? 'Creating Account...'
                : role === 'owner'
                ? 'Register as Hotel Manager'
                : role === 'staff'
                ? 'Register as Hotel Staff'
                : 'Register as Guest Customer'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#8B5E3C] dark:text-[#C5A880] hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
