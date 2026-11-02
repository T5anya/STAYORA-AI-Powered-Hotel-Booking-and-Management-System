import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
  ChevronDown,
  LogOut,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { UserRole } from '../../types/hotel';

interface NavbarProps {
  onOpenCompare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCompare }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { favorites, compareList } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Signature Stays', sectionId: 'signature-sanctuaries' },
    { label: 'Atmospheres', sectionId: 'travel-atmosphere' },
    { label: 'Explore Hotels', path: '/explore' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Dining', path: '/dining' },
    { label: 'Privilege Club', path: '/privilege' },
    { label: 'Group Stays', path: '/group-booking' }
  ];

  const handleNavClick = (link: { label: string; path?: string; sectionId?: string }, e: React.MouseEvent) => {
    if (link.sectionId) {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${link.sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(link.sectionId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    }
  };

  const getRoleLabel = (r?: UserRole) => {
    if (r === 'owner') return 'Hotel Manager';
    if (r === 'staff') return 'Operations Staff';
    if (r === 'admin') return 'Platform Admin';
    return 'Guest Customer';
  };

  const getPortalLabel = (r?: UserRole) => {
    if (r === 'owner') return 'Hotel Manager Portal';
    if (r === 'staff') return 'Staff Operations Portal';
    if (r === 'admin') return 'Platform Admin Portal';
    return 'My Guest Portal';
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'owner') return '/owner/dashboard';
    if (user.role === 'staff') return '/staff/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/dashboard';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F4]/95 dark:bg-[#0C1310]/95 backdrop-blur-md shadow-md border-b border-[#E8E1D5]/70 dark:border-[#1E2B25]'
          : 'bg-[#FBF9F4]/80 dark:bg-[#0C1310]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#122B22] to-[#1F4A3B] dark:from-[#245342] dark:to-[#122B22] flex items-center justify-center text-[#C5A880] shadow-lg group-hover:scale-105 transition-transform duration-200 border border-[#C5A880]/30">
              <span className="font-serif font-bold text-2xl tracking-wider">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#122B22] dark:text-[#FBF9F4] leading-tight">
                STAYORA
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#8B5E3C] dark:text-[#C5A880]">
                Stay Smarter · Travel Better
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.sectionId) {
                return (
                  <button
                    key={link.label}
                    onClick={(e) => handleNavClick(link, e)}
                    className="text-sm font-medium transition-colors text-[#5A6860] dark:text-[#9DAEA4] hover:text-[#122B22] dark:hover:text-[#FBF9F4] flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-y-0.5 transition-all text-[#C5A880]">↓</span>
                  </button>
                );
              }

              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path!}
                  className={`text-sm font-medium transition-colors hover:text-[#122B22] dark:hover:text-[#FBF9F4] ${
                    active
                      ? 'text-[#122B22] dark:text-[#FBF9F4] font-semibold border-b-2 border-[#C5A880] pb-1'
                      : 'text-[#5A6860] dark:text-[#9DAEA4]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Compare Bar Button (if items selected) */}
            {compareList.length > 0 && onOpenCompare && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#C5A880]/15 text-[#8B5E3C] dark:text-[#D4AF37] hover:bg-[#C5A880]/25 transition-colors border border-[#C5A880]/30"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare ({compareList.length})</span>
              </button>
            )}

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="relative p-2 text-[#5A6860] dark:text-[#9DAEA4] hover:text-[#122B22] dark:hover:text-[#FBF9F4] transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-[#C5A880] fill-[#C5A880]/30' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#8B5E3C] text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-[#5A6860] dark:text-[#9DAEA4] hover:text-[#122B22] dark:hover:text-[#FBF9F4] transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>


            {/* Dashboard / Profile Button or Sign In / Join */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#122B22] text-[#FBF9F4] hover:bg-[#1A382D] dark:bg-[#1E2E26] dark:hover:bg-[#25392F] transition-colors text-xs font-medium shadow-sm border border-[#C5A880]/30"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#122B22] flex items-center justify-center font-bold text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="max-w-[110px] truncate font-semibold">{user.fullName.split(' ')[0]}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#C5A880] font-bold">
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 opacity-70 ml-0.5" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#24362E] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-2.5 border-b border-[#E8E1D5]/60 dark:border-[#24362E]">
                      <p className="text-xs font-semibold text-[#122B22] dark:text-[#FBF9F4] truncate">{user.fullName}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[10px] font-bold text-[#8B5E3C] dark:text-[#D4AF37]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Role: {getRoleLabel(user.role)}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-[#122B22] dark:text-[#FBF9F4] hover:bg-[#F4EFE6] dark:hover:bg-[#1C2A24] font-medium transition-colors"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#8B5E3C] dark:text-[#C5A880]" />
                        <span>{getPortalLabel(user.role)}</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[#E8E1D5]/60 dark:border-[#24362E]">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Securely</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#122B22] dark:text-[#FBF9F4] hover:text-[#8B5E3C] px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#122B22] text-[#FBF9F4] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:text-[#122B22] transition-colors shadow-sm"
                >
                  Join Stayora
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-[#5A6860] dark:text-[#9DAEA4]"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 text-[#122B22] dark:text-[#FBF9F4]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F4] dark:bg-[#0C1310] border-b border-[#E8E1D5] dark:border-[#1E2B25] px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              if (link.sectionId) {
                return (
                  <button
                    key={link.label}
                    onClick={(e) => {
                      handleNavClick(link, e);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-left text-[#122B22] dark:text-[#FBF9F4] hover:bg-[#F4EFE6] dark:hover:bg-[#141F1A] flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-[#C5A880] font-mono">Section ↓</span>
                  </button>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path!}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#122B22] dark:text-[#FBF9F4] hover:bg-[#F4EFE6] dark:hover:bg-[#141F1A]"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E8E1D5] dark:border-[#1E2B25] flex flex-col gap-2.5">
            {user ? (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#24362E]">
                  <p className="text-xs font-bold text-[#122B22] dark:text-[#FBF9F4] truncate">{user.fullName}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[10px] font-bold text-[#8B5E3C] dark:text-[#D4AF37]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{getRoleLabel(user.role)}</span>
                  </div>
                </div>

                <Link
                  to={getDashboardPath()}
                  className="w-full text-center py-2.5 rounded-xl bg-[#122B22] text-[#FBF9F4] hover:bg-[#1A382D] dark:bg-[#C5A880] dark:text-[#122B22] font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Open {getPortalLabel(user.role)}</span>
                </Link>

                <button
                  onClick={logout}
                  className="w-full py-2 text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-xl border border-gray-300 dark:border-[#24362E] text-xs font-semibold text-[#122B22] dark:text-[#FBF9F4]"
                >
                  Sign In to Account
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-xl bg-[#122B22] text-[#FBF9F4] dark:bg-[#C5A880] dark:text-[#122B22] text-xs font-semibold"
                >
                  Register New Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
