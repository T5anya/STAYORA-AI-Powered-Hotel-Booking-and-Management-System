import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <BackButton label="Back to Previous Page" fallbackUrl="/" />
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-[#C5A880]">
          24/7 Royal Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#122B22] dark:text-[#FBF9F4]">
          Connect with Stayora
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6860] dark:text-[#9DAEA4]">
          Our concierge team and hotel onboarding specialists are at your service for bespoke itinerary curation and partnership requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-3">
            <Mail className="w-5 h-5 text-[#8B5E3C] dark:text-[#C5A880]" />
            <h3 className="font-serif font-bold text-base text-[#122B22] dark:text-[#FBF9F4]">Email Concierge</h3>
            <p className="text-xs text-gray-500">concierge@stayora.com</p>
            <p className="text-xs text-gray-500">partnerships@stayora.com</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-3">
            <Phone className="w-5 h-5 text-[#8B5E3C] dark:text-[#C5A880]" />
            <h3 className="font-serif font-bold text-base text-[#122B22] dark:text-[#FBF9F4]">Priority Telephony</h3>
            <p className="text-xs text-gray-500">+91 (0) 141 285 0000 (Jaipur Hub)</p>
            <p className="text-xs text-gray-500">+91 1800 258 9900 (Toll-Free Concierge)</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] space-y-3">
            <MapPin className="w-5 h-5 text-[#8B5E3C] dark:text-[#C5A880]" />
            <h3 className="font-serif font-bold text-base text-[#122B22] dark:text-[#FBF9F4]">Hospitality Headquarters</h3>
            <p className="text-xs text-gray-500">Stayora Pavilion, Diplomatic Enclave, Chanakyapuri, New Delhi 110023</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Message Dispatched</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Thank you for contacting Stayora. Our Senior Concierge Officer will reply within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanya Agarwal"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Inquiry Topic</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Royal wedding villa buyout or palace reservation inquiry"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your travel dates, preferred destination, and guest preferences..."
                  className="w-full p-3 rounded-2xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#0E1612]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#122B22] dark:bg-[#C5A880] text-white dark:text-[#122B22] font-semibold text-xs flex items-center gap-2 hover:opacity-90"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
