import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Compass, Tag, Calendar, Shield } from 'lucide-react';
import { apiRequest } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const StayoraAIChat: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: "Namaste! I am your Stayora AI Concierge. I can help you discover royal heritage palaces, check real-time suite availability, explain our complimentary cancellation terms, or track your active stay reservations. How may I assist you today?",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const quickPrompts = [
    'Recommend a palace stay in Jaipur',
    'What are the active privilege coupons?',
    'How does group split payment work?',
    'Check my booking status'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiRequest<{ reply: string }>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: textToSend })
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply || 'Thank you for reaching out. Let me know if you would like me to assist with anything else.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Our AI Concierge is available to answer any questions about our luxury properties in Jaipur, Udaipur, Shimla, Goa, Coorg, and Delhi, as well as group bookings and instant QR check-in.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Stayora AI Concierge"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#122B22] text-[#FBF9F4] shadow-2xl hover:bg-[#1A382D] transition-all duration-300 border border-[#C5A880]/40 group hover:scale-105"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#C5A880] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C5A880]" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          {isOpen ? 'Close Concierge' : 'Stayora AI Concierge'}
        </span>
      </button>

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] rounded-3xl bg-white dark:bg-[#141F1A] border border-[#E8E1D5] dark:border-[#22352B] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 max-h-[600px] h-[540px]">
          {/* Header */}
          <div className="p-4 bg-[#122B22] text-[#FBF9F4] flex items-center justify-between border-b border-[#1E3B30]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C5A880] text-[#122B22] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold tracking-tight">Stayora AI Concierge</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#A0B6AA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Grounded in Live Property DB</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 bg-[#FBF9F4] dark:bg-[#0E1612] border-b border-[#E8E1D5] dark:border-[#22352B] flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-[#141F1A] border border-gray-200 dark:border-[#22352B] text-gray-700 dark:text-gray-300 hover:border-[#C5A880] whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#122B22] text-[#C5A880] flex items-center justify-center shrink-0 text-[10px] font-bold">
                    S
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-[#122B22] text-white dark:bg-[#C5A880] dark:text-[#122B22] rounded-br-none'
                      : 'bg-gray-100 dark:bg-[#1A2620] text-gray-800 dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] opacity-60 text-right mt-1">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-gray-500 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#122B22] text-[#C5A880] flex items-center justify-center shrink-0 text-[10px] font-bold">
                  S
                </div>
                <div className="bg-gray-100 dark:bg-[#1A2620] rounded-2xl px-4 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <div className="p-3 border-t border-[#E8E1D5] dark:border-[#22352B] bg-[#FBF9F4] dark:bg-[#0E1612]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rooms, rates, policies..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-[#22352B] bg-white dark:bg-[#141F1A] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="p-2 rounded-xl bg-[#122B22] text-[#C5A880] dark:bg-[#C5A880] dark:text-[#122B22] hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
