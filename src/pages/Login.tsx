import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BackButton } from '../components/common/BackButton';

export const Login: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'admin' ? 'admin' : queryParams.get('tab') === 'partner' ? 'partner' : 'customer';

  const [activeTab, setActiveTab] = useState<'customer' | 'partner' | 'admin'>(initialTab);
  const [email, setEmail] = useState('tanyaagr229@gmail.com');
  const [password, setPassword] = useState('Password@123');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Update fields when tab changes
  useEffect(() => {
    setErrorMsg(null);
    if (activeTab === 'admin') {
      setEmail('admin@stayora.com');
      setPassword('Password@123');
    } else if (activeTab === 'partner') {
      setEmail('owner@stayora.com');
      setPassword('Password@123');
    } else {
      setEmail('tanyaagr229@gmail.com');
      setPassword('Password@123');
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      const fromPath = (location.state as any)?.from?.pathname;
      if (fromPath && (
        (loggedUser.role === 'customer' && fromPath.startsWith('/dashboard')) ||
        (loggedUser.role === 'owner' && fromPath.startsWith('/owner')) ||
        (loggedUser.role === 'staff' && fromPath.startsWith('/staff')) ||
        (loggedUser.role === 'admin' && fromPath.startsWith('/admin'))
      )) {
        navigate(fromPath, { replace: true });
      } else {
        if (loggedUser.role === 'owner') navigate('/owner/dashboard', { replace: true });
        else if (loggedUser.role === 'staff') navigate('/staff/dashboard', { replace: true });
        else if (loggedUser.role === 'admin') navigate('/admin/dashboard', { replace: true });
        else navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (selectedEmail: string, name: string = 'Tanya Agarwal') => {
    setErrorMsg(null);
    setGoogleLoading(true);
    try {
      const user = await loginWithGoogle(selectedEmail, name);
      setShowGoogleModal(false);
      const fromPath = (location.state as any)?.from?.pathname;
      if (fromPath && !fromPath.startsWith('/admin') && !fromPath.startsWith('/owner') && !fromPath.startsWith('/staff')) {
        navigate(fromPath, { replace: true });
      } else {
        if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
        else if (user.role === 'owner') navigate('/owner/dashboard', { replace: true });
        else if (user.role === 'staff') navigate('/staff/dashboard', { replace: true });
        else navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4 space-y-4">
      <div className="w-full max-w-md">
        <BackButton label="Back to Home" fallbackUrl="/" />
      </div>

      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#122B22] text-[#C5A880] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-md border border-[#C5A880]/30">
            S
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
            Sign In to Stayora
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select your account type to access your dedicated role portal
          </p>
        </div>

        {/* Portal Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#F4EFE6] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B]">
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'customer'
                ? 'bg-white dark:bg-[#1A2620] text-[#122B22] dark:text-[#C5A880] shadow-sm'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Guest
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'partner'
                ? 'bg-white dark:bg-[#1A2620] text-[#122B22] dark:text-[#C5A880] shadow-sm'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Hotel Partner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-[#122B22] text-[#C5A880] shadow-md border border-[#C5A880]/40'
                : 'text-purple-600 dark:text-purple-400 hover:text-purple-700'
            }`}
          >
            <KeyRound className="w-3 h-3 text-[#C5A880]" />
            <span>Admin</span>
          </button>
        </div>

        {/* HOW TO LOGIN AS PLATFORM ADMIN GUIDANCE */}
        {activeTab === 'admin' && (
          <div className="p-4 rounded-2xl bg-[#122B22]/10 dark:bg-[#08120E] border border-[#C5A880]/50 space-y-2.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B5E3C] dark:text-[#C5A880] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>How to Log In as Platform Administrator</span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              Platform Admin accounts cannot be registered publicly. To access the master platform controls:
            </p>
            <ol className="text-[11px] text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside font-mono">
              <li>Use provisioned Admin Email: <strong className="text-[#122B22] dark:text-[#C5A880]">admin@stayora.com</strong></li>
              <li>Use Master Password: <strong className="text-[#122B22] dark:text-[#C5A880]">Password@123</strong></li>
              <li>Click <strong>Sign In to Platform Admin</strong> below</li>
            </ol>
            <div className="pt-1 flex items-center justify-between text-[10px] text-[#8B5E3C] dark:text-[#D4AF37]">
              <span>Master Key Protected</span>
              <span className="font-mono bg-[#C5A880]/20 px-2 py-0.5 rounded border border-[#C5A880]/30 font-bold">
                STAYORA-ROYAL-2026
              </span>
            </div>
          </div>
        )}

        {/* GOOGLE ACCOUNT SIGN IN BUTTON */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            disabled={googleLoading}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-[#24362E] bg-white dark:bg-[#101814] hover:bg-gray-50 dark:hover:bg-[#17221D] text-gray-800 dark:text-gray-100 font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow-sm hover:border-[#C5A880]/60 active:scale-[0.99]"
          >
            {/* Official Google G Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Signing in with Google...' : 'Continue with Google Account'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 dark:border-[#22352B] w-full" />
            <span className="bg-white dark:bg-[#141F1A] px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              or use credentials
            </span>
            <div className="border-t border-gray-200 dark:border-[#22352B] w-full" />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-xs text-red-600 border border-red-200 dark:border-red-900/50 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm ${
              activeTab === 'admin'
                ? 'bg-[#122B22] text-[#C5A880] border border-[#C5A880]/50'
                : 'bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22]'
            }`}
          >
            <span>
              {loading
                ? 'Verifying Authority...'
                : activeTab === 'admin'
                ? 'Sign In to Platform Admin Portal'
                : 'Sign In to Stayora'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-[#8B5E3C] dark:text-[#C5A880] hover:underline">
            Register as Customer or Hotel Partner
          </Link>
        </p>
      </div>

      {/* GOOGLE ACCOUNT SELECTION MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#24362E] shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-semibold text-sm text-[#122B22] dark:text-[#FBF9F4]">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select an account to proceed to Stayora Hospitality
            </p>

            <div className="space-y-2">
              {/* Active Google Account Tanya Agarwal */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn('tanyaagr229@gmail.com', 'Tanya Agarwal')}
                className="w-full p-3 rounded-2xl border border-[#C5A880] bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#122B22] text-[#C5A880] font-bold text-xs flex items-center justify-center">
                    T
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#122B22] dark:text-[#FBF9F4]">Tanya Agarwal</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">tanyaagr229@gmail.com</div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880]" />
              </button>

              {/* Or enter any custom Google email */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  Or use another Google account:
                </span>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612] text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customGoogleEmail) {
                        handleGoogleSignIn(customGoogleEmail, customGoogleEmail.split('@')[0]);
                      }
                    }}
                    disabled={!customGoogleEmail}
                    className="px-3 py-2 rounded-xl bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] text-xs font-semibold disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 text-center">
              Secured with Google OAuth single-sign-on protocol
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
