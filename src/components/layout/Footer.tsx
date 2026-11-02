import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Sparkles, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#122B22] text-[#FBF9F4] pt-16 pb-12 border-t border-[#1C3D31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#244A3C]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880] text-[#122B22] flex items-center justify-center font-serif font-bold text-xl shadow-md">
                S
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF9F4]">
                  STAYORA
                </span>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880]">
                  Stay Smarter · Travel Better
                </p>
              </div>
            </div>
            <p className="text-sm text-[#A0B6AA] max-w-sm leading-relaxed">
              India’s premier AI-powered luxury hotel marketplace and property intelligence system. Handpicked heritage palaces, mountain retreats, and private coastal sanctuaries.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#C5A880]">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>100% Verified Properties</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Best Rate Guarantee</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C5A880]">Curated Stays</h4>
            <ul className="space-y-2 text-sm text-[#A0B6AA]">
              <li>
                <Link to="/explore?category=Luxury%20Heritage" className="hover:text-white transition-colors">
                  Heritage Palaces
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Mountain%20Retreat" className="hover:text-white transition-colors">
                  Mountain Sanctuaries
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Coastal%20Villa" className="hover:text-white transition-colors">
                  Private Coastal Villas
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Wellness%20Sanctuary" className="hover:text-white transition-colors">
                  Ayurveda & Wellness
                </Link>
              </li>
              <li>
                <Link to="/group-booking" className="hover:text-white transition-colors">
                  Group Travel & Split Pay
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C5A880]">Destinations</h4>
            <ul className="space-y-2 text-sm text-[#A0B6AA]">
              <li>
                <Link to="/explore?destination=Jaipur" className="hover:text-white transition-colors">
                  Jaipur, Rajasthan
                </Link>
              </li>
              <li>
                <Link to="/explore?destination=Udaipur" className="hover:text-white transition-colors">
                  Udaipur, Lake Pichola
                </Link>
              </li>
              <li>
                <Link to="/explore?destination=Goa" className="hover:text-white transition-colors">
                  South Goa Beaches
                </Link>
              </li>
              <li>
                <Link to="/explore?destination=Shimla" className="hover:text-white transition-colors">
                  Shimla, Himalayas
                </Link>
              </li>
              <li>
                <Link to="/explore?destination=Coorg" className="hover:text-white transition-colors">
                  Coorg Coffee Plantations
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C5A880]">Stayora Gazette</h4>
            <p className="text-xs text-[#A0B6AA] leading-relaxed">
              Receive private invitations to seasonal palace openings, chef dinners, and member tariff privileges.
            </p>
            <div className="flex items-center rounded-lg bg-[#1A382D] border border-[#244A3C] p-1">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent border-none text-xs text-white placeholder-[#7A9A8B] px-2.5 py-1.5 focus:outline-none w-full"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="px-3 py-1.5 rounded-md bg-[#C5A880] text-[#122B22] hover:bg-[#D4AF37] transition-colors text-xs font-semibold flex items-center justify-center shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="pt-2 text-[11px] text-[#7A9A8B] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>concierge@stayora.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#7A9A8B] gap-4">
          <p>© {new Date().getFullYear()} Stayora Hospitality Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Guest Terms</Link>
            <Link to="/security" className="hover:text-white transition-colors">Security & Verification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
