import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Anchor,
  Compass,
  Zap
} from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { MovingTicker } from '../components/common/MovingTicker';
import { ImageSlider } from '../components/common/ImageSlider';

export const Aviation: React.FC = () => {
  const [origin, setOrigin] = useState('New Delhi (DEL)');
  const [destination, setDestination] = useState('Udaipur (UDR)');
  const [passengers, setPassengers] = useState(4);
  const [aircraftType, setAircraftType] = useState('midsize');
  const [quoteCalculated, setQuoteCalculated] = useState(true);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
      title: 'Pilatus PC-24 Super Versatile Jet',
      subtitle: 'Land directly on short airstrips in Jaisalmer, Shimla, and Coorg without commercial terminal delays.',
      location: 'Private Hangar Access',
      badge: 'Sovereign Aviation'
    },
    {
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1920&q=80',
      title: 'Airbus H145 Palace-to-Palace Helitransfers',
      subtitle: 'Twin-engine executive helicopters landing directly on palace helipads across Rajasthan and Kerala.',
      location: 'Helipad Concierge',
      badge: 'Twin-Turbine Safety'
    },
    {
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1920&q=80',
      title: 'Sunseeker 76ft Luxury Catamaran Charters',
      subtitle: 'Cruise the Konkan coast and Mandwa waters with private chef, jetskis, and champagne sun deck.',
      location: 'Goa & Mumbai Coast',
      badge: 'Marine Sovereign'
    }
  ];

  const fleet = [
    {
      id: 'fleet-01',
      name: 'Pilatus PC-24 Super Jet',
      type: 'Light Jet (Short Runway Capable)',
      speed: '815 km/h',
      range: '3,769 km',
      capacity: '6 - 8 Passengers',
      cabin: 'BMW Designworks Interior, Fully Reclining Executive Leather, Enclosed Lavatory',
      ratePerHour: 285000,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fleet-02',
      name: 'Bombardier Challenger 3500',
      type: 'Super Mid-Size Jet',
      speed: '870 km/h',
      range: '6,297 km',
      capacity: '9 - 10 Passengers',
      cabin: 'Nuage Zero-Gravity Seats, 4K High-Definition Cinema, Ka-band High Speed Satellite Wi-Fi',
      ratePerHour: 420000,
      image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fleet-03',
      name: 'Airbus H145 Twin Helicopter',
      type: 'Executive Rotorcraft',
      speed: '240 km/h',
      range: '650 km',
      capacity: '4 - 6 Passengers',
      cabin: 'Mercedes-Benz Style Luxury Cabin, Active Vibration Dampening, Noise-Cancelling Bose A20',
      ratePerHour: 195000,
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'fleet-04',
      name: 'Sunseeker 76 Flybridge Yacht',
      type: 'Luxury Motor Yacht',
      speed: '32 Knots',
      range: 'Coastline Coastal',
      capacity: 'Up to 12 Guests',
      cabin: '4 Staterooms, Panoramic Saloon, Teak Dining Aft, Dual Yamaha WaveRunners',
      ratePerHour: 145000,
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Price estimator
  const baseRate = aircraftType === 'light' ? 285000 : aircraftType === 'midsize' ? 420000 : 195000;
  const flightHours = origin.includes('DEL') && destination.includes('UDR') ? 1.2 : 2.0;
  const estimatedTotal = Math.round(baseRate * flightHours + 45000); // landing + lounge fees

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0C1310] text-[#122B22] dark:text-[#E8ECE9] antialiased transition-colors">
      <MovingTicker />

      {/* Header & Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to Discover" fallbackUrl="/" />
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
              Stayora Private Aviation & Marine Fleet
            </span>
          </div>
        </div>

        {/* Hero Parallax */}
        <ImageSlider slides={heroSlides} heightClass="h-[440px] sm:h-[520px]" />
      </div>

      {/* Section 1: Philosophy & VIP Terminal Protocol (Scroll 1-2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E8E1D5] dark:border-[#22352B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1D2D44]/10 dark:bg-[#C5A880]/15 text-[#1D2D44] dark:text-[#C5A880]">
              <Plane className="w-3.5 h-3.5" />
              <span>Zero-Wait Dedicated FBO Jet Terminals</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#122B22] dark:text-white leading-tight">
              Palace-To-Palace Transit At 45,000 Feet
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Skip commercial airport queues and tarmac delays. Stayora Private Fleet connects India’s premier heritage destinations with seamless door-to-helipad transfers, bespoke in-flight catering from our partner palace chefs, and private tarmac security clearance in under 12 minutes.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E8E1D5] dark:border-[#22352B]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#1D2D44] dark:text-[#C5A880]">12 Mins</span>
                <p className="text-xs text-gray-500 mt-0.5">Tarmac Boarding</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#1D2D44] dark:text-[#C5A880]">28</span>
                <p className="text-xs text-gray-500 mt-0.5">Palace Helipads</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#1D2D44] dark:text-[#C5A880]">100%</span>
                <p className="text-xs text-gray-500 mt-0.5">DGCA Certified Safety</p>
              </div>
            </div>
          </div>

          {/* Instant Flight Charter Calculator */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#1D2D44] dark:text-[#C5A880] font-bold">
                  Instant Charter Estimator
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  Live Rates
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Departure</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  >
                    <option value="New Delhi (DEL)">New Delhi (DEL) - Private Jet Lounge</option>
                    <option value="Mumbai (BOM)">Mumbai (BOM) - Kalina General Aviation Terminal</option>
                    <option value="Bangalore (BLR)">Bangalore (BLR) - Executive Terminal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Palatial Destination</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                  >
                    <option value="Udaipur (UDR)">Udaipur (UDR) - Lake Pichola Helipad Transfer</option>
                    <option value="Jaisalmer (JSA)">Jaisalmer (JSA) - Thar Desert Airstrip</option>
                    <option value="Goa (GOX)">Goa Dabolim / Mopa (Direct Villa Transfer)</option>
                    <option value="Shimla (SLV)">Shimla (SLV) - Wildflower Hall Helipad</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Aircraft Class</label>
                    <select
                      value={aircraftType}
                      onChange={(e) => setAircraftType(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    >
                      <option value="light">Pilatus PC-24 (Light Jet)</option>
                      <option value="midsize">Bombardier 3500 (Super Mid)</option>
                      <option value="heli">Airbus H145 (Twin Heli)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Passengers</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-transparent text-[#122B22] dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0C1310] border border-[#E8E1D5] dark:border-[#22352B] space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Flight Duration Approx</span>
                  <span className="font-semibold text-[#122B22] dark:text-white">{flightHours} Hours</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>VIP Lounge & Catering</span>
                  <span className="text-emerald-600 font-semibold">Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 dark:border-[#22352B]">
                  <span>Estimated Total Tariff</span>
                  <span className="font-serif text-lg text-[#C5A880]">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Charter quote logged for ${origin} → ${destination} (${passengers} Guests). Our Aviation Concierge will call you within 15 minutes.`)}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#1D2D44] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#121B2A] dark:hover:bg-[#D4AF37] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Request Flight Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Fleet Showcase (Scroll 3-4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="pb-4 border-b border-[#E8E1D5] dark:border-[#22352B]">
          <span className="text-xs uppercase tracking-widest text-[#1D2D44] dark:text-[#C5A880] font-bold">The Hangar</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#122B22] dark:text-white mt-1">
            Our Sovereign Fleet Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleet.map((craft) => (
            <div
              key={craft.id}
              className="rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                  {craft.type}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#122B22] dark:text-white group-hover:text-[#C5A880] transition-colors">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    {craft.cabin}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E8E1D5] dark:border-[#22352B] text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Speed</span>
                    <span className="text-xs font-semibold">{craft.speed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Max Range</span>
                    <span className="text-xs font-semibold">{craft.range}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Seats</span>
                    <span className="text-xs font-semibold">{craft.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Charter Rate / Hour</span>
                    <span className="font-serif text-lg font-bold text-[#122B22] dark:text-[#C5A880]">
                      ₹{craft.ratePerHour.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Inquiry initiated for ${craft.name}. Our flight dispatch will contact you.`)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1D2D44] dark:bg-[#C5A880] text-white dark:text-[#0C1310] hover:bg-[#121B2A] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Charter Aircraft</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Safety & Luxury Guarantee (Scroll 5-6) */}
      <section className="bg-[#121B2A] text-[#FBF9F4] py-20 border-t border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Gold Standard Aviation</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Uncompromising Safety & Discreet Privacy</h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              All aircraft are piloted exclusively by two Captain-certified commanders with minimum 5,000 multi-engine turbine hours, maintained in accordance with FAA and DGCA Part 135 standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0D1522] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Dual-Pilot Crew Always</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Zero single-pilot operations. Every sector is crewed by two seasoned captains with simulator recurrency every 6 months.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0D1522] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Palace Chef Catering</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Hot multi-course meals prepared by partner luxury hotel culinary teams and transferred in heated galley containers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0D1522] border border-[#C5A880]/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold">Guaranteed Standby Aircraft</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                A secondary matching category aircraft is kept on 90-minute operational standby at major hub airports to eliminate disruptions.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-[#C5A880] text-[#0C1310] hover:bg-[#D4AF37] transition-all shadow-xl"
            >
              <span>Explore Destinations with Helipads</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
