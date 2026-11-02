import React from 'react';
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/hotel';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole | UserRole[];
}

function normalizeRole(r?: string): string {
  const s = (r || '').toLowerCase().trim();
  if (s === 'hotel_owner') return 'owner';
  if (s === 'hotel_staff') return 'staff';
  if (s === 'platform_admin') return 'admin';
  return s;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = React.useState(3);

  const getRoleDashboard = (r?: string) => {
    const role = normalizeRole(r);
    if (role === 'owner') return '/owner/dashboard';
    if (role === 'staff') return '/staff/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/customer/dashboard';
  };

  // Normalize allowedRoles to an array if specified
  const rawRoles = allowedRoles ? (Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]) : null;
  const isUnauthorized = user && rawRoles && !rawRoles.map(normalizeRole).includes(normalizeRole(user.role));

  // Automated redirect timer to user's authorized dashboard
  React.useEffect(() => {
    if (!isUnauthorized || !user) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(getRoleDashboard(user.role), { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isUnauthorized, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center bg-[#FBF9F4] dark:bg-[#0C1310] px-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#C5A880]/30 border-t-[#C5A880] animate-spin" />
        <p className="font-serif text-sm text-[#122B22] dark:text-[#C5A880] mt-4 font-semibold tracking-wide">
          Verifying Security & Role Clearance...
        </p>
      </div>
    );
  }

  // Not logged in -> Redirect to login with intended destination preserved
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role validation check: access forbidden for this portal
  if (isUnauthorized) {
    const roleLabels: Record<string, string> = {
      customer: 'Guest Customer',
      owner: 'Hotel Owner / Manager',
      staff: 'Hotel Operations Staff',
      admin: 'Platform Super Administrator'
    };

    const allowedNames = rawRoles.map((r) => roleLabels[normalizeRole(r)] || r).join(' or ');
    const userRoleName = roleLabels[normalizeRole(user.role)] || user.role;
    const targetDashboard = getRoleDashboard(user.role);

    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-[#FBF9F4] dark:bg-[#0C1310]">
        <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#141F1A] border border-red-200 dark:border-red-900/40 p-8 shadow-2xl space-y-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 dark:text-red-400">
              Access Restricted · Role Authorization Enforced
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
              Insufficient Portal Permissions
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
              This portal is restricted to authorized <strong className="text-[#122B22] dark:text-white">{allowedNames}</strong>.
              You cannot access another role's portal.
            </p>
          </div>

          {/* Current credentials box */}
          <div className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0E1612] border border-[#E8E1D5] dark:border-[#22352B] text-xs text-left space-y-1">
            <div className="flex justify-between text-gray-500 text-[11px]">
              <span>Signed In As:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{user.email}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[11px]">
              <span>Assigned Role:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{userRoleName}</span>
            </div>
            <div className="pt-1 text-[11px] text-gray-400 italic">
              Redirecting to your authorized dashboard in {countdown}s...
            </div>
          </div>

          {/* Action options */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate(targetDashboard, { replace: true })}
              className="w-full py-3 rounded-xl bg-[#122B22] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:hover:bg-[#D4AF37] text-white dark:text-[#122B22] font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>Go to My Authorized Dashboard ({userRoleName})</span>
            </button>

            <button
              onClick={async () => {
                await logout();
                navigate('/login', { replace: true });
              }}
              className="w-full py-3 rounded-xl border border-gray-300 dark:border-[#22352B] text-gray-700 dark:text-gray-200 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-[#1E2B25] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-red-500" />
              <span>Sign Out & Log In with Another Account</span>
            </button>

            <Link
              to="/"
              className="inline-block text-xs text-gray-400 hover:text-[#122B22] dark:hover:text-[#FBF9F4] transition-colors pt-1"
            >
              ← Back to Stayora Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const RoleBasedRoute = ProtectedRoute;
