import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, ArrowRight, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const dashboardPath = user?.role === 'buyer' ? '/buyer/dashboard' : '/farmer/dashboard';

  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F9F4]/95 dark:bg-[#0c140e]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-[#233327] transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#14532D] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-6 h-6 text-[#A3E635]" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#14532D] dark:text-[#4ade80] transition-colors">
                CropRescue<span className="text-[#22C55E]">.AI</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-[#647067] dark:text-gray-400 -mt-1 transition-colors">
                Agri Decision Support
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#647067] dark:text-gray-300">
            <Link
              to="/"
              className={`hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors ${
                location.pathname === '/' && !location.hash ? 'text-[#166534] dark:text-[#4ade80] font-semibold' : ''
              }`}
            >
              {t.navHome}
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors cursor-pointer"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('features')}
              className="hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors cursor-pointer"
            >
              {t.navFeatures}
            </button>
            <Link
              to="/marketplace"
              className={`hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors ${
                location.pathname === '/marketplace' ? 'text-[#166534] dark:text-[#4ade80] font-semibold' : ''
              }`}
            >
              {t.navMarketplace}
            </Link>
            <Link
              to="/market-intelligence"
              className={`hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors ${
                location.pathname === '/market-intelligence' ? 'text-[#166534] dark:text-[#4ade80] font-semibold' : ''
              }`}
            >
              {t.navMarketIntel}
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={dashboardPath}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-[#141f17] border border-gray-200 dark:border-[#233327] rounded-xl text-sm font-medium text-[#17251C] dark:text-gray-200 hover:border-[#22C55E] dark:hover:border-emerald-500 transition-colors shadow-2xs"
                >
                  <UserCircle className="w-4 h-4 text-[#166534] dark:text-emerald-400" />
                  <span>
                    {user.fullName.split(' ')[0]} ({user.role === 'farmer' ? 'Farmer' : 'Buyer'})
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-medium text-[#17251C] dark:text-gray-200 hover:text-[#166534] dark:hover:text-[#4ade80] transition-colors"
                >
                  {t.navLogin}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-2 text-sm font-medium bg-white dark:bg-[#141f17] border border-gray-200 dark:border-[#233327] text-[#17251C] dark:text-gray-200 hover:border-gray-300 dark:hover:border-emerald-600 rounded-xl transition-colors shadow-2xs"
                >
                  {t.navRegister}
                </Link>
                <Link
                  to="/calculator"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#166534] hover:bg-[#14532D] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-sm font-medium rounded-xl shadow-xs transition-all hover:gap-2"
                >
                  <span>{t.navAnalyzeCTA}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher compact />
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#17251C] dark:text-gray-200 bg-white/80 dark:bg-[#141f17] border border-gray-200 dark:border-[#233327] hover:bg-gray-100 dark:hover:bg-[#1f2f23] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-[#233327] bg-white/98 dark:bg-[#141f17]/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#17251C] dark:text-gray-200">
            <Link
              to="/"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] transition-colors"
            >
              {t.navHome}
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] transition-colors cursor-pointer"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('features')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] transition-colors cursor-pointer"
            >
              {t.navFeatures}
            </button>
            <Link
              to="/marketplace"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] transition-colors"
            >
              {t.navMarketplace}
            </Link>
            <Link
              to="/market-intelligence"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] transition-colors"
            >
              {t.navMarketIntel}
            </Link>
            <Link
              to="/calculator"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1c2c20] text-[#166534] dark:text-[#4ade80] font-semibold transition-colors"
            >
              {t.profitCalculator}
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-[#233327]">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={dashboardPath}
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#166534] dark:bg-emerald-600 text-white rounded-xl text-sm font-medium"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>
                    {user.fullName} ({t.navDashboard})
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#233327] text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#1c2c20] cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-[#233327] text-[#17251C] dark:text-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#1c2c20]"
                >
                  {t.navLogin}
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center px-4 py-2.5 bg-[#166534] dark:bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-[#14532D]"
                >
                  {t.navRegister}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
