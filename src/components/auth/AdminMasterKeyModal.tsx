import React, { useState } from 'react';
import { KeyRound, ShieldAlert, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/client';

interface AdminMasterKeyModalProps {
  onUnlocked: () => void;
}

export const AdminMasterKeyModal: React.FC<AdminMasterKeyModalProps> = ({ onUnlocked }) => {
  const [masterKey, setMasterKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterKey.trim()) {
      setError('Please provide the Master Security Key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await apiRequest<{ success: boolean; verified: boolean; message: string }>('/admin/verify-master-key', {
        method: 'POST',
        body: JSON.stringify({ masterKey: masterKey.trim() })
      });

      if (res.verified) {
        sessionStorage.setItem('stayora_admin_master_unlocked', 'true');
        onUnlocked();
      } else {
        setError('Master Key authorization rejected.');
      }
    } catch (err: any) {
      setError(err?.message || 'Invalid Master Key. Authorization denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#0C1310] border border-[#C5A880]/40 shadow-2xl text-[#E8ECE9] space-y-6 animate-slide-up">
        {/* Emblem & Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#122B22] border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880] shadow-[0_0_25px_rgba(197,168,128,0.35)]">
            <KeyRound className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
              Restricted Sovereign Zone
            </span>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">Platform Admin Master Key</h2>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              This portal governs pan-India hotel registries, financial escrow, and master credentials. Enter the designated Master Key to proceed.
            </p>
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Master Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={masterKey}
                onChange={(e) => setMasterKey(e.target.value)}
                placeholder="Enter Sovereign Master Key"
                className="w-full px-4 py-3 bg-[#141F1A] border border-[#22352B] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] rounded-xl text-white placeholder-gray-500 text-sm tracking-wider font-mono outline-none transition-all"
                autoFocus
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">
              Default system key: <code className="text-[#C5A880] font-mono font-semibold">STAYORA-ROYAL-2026</code> (can be changed from Platform Admin Settings).
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-[#0C1310] bg-[#C5A880] hover:bg-[#D4AF37] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#C5A880]/20 font-semibold"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#0C1310] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Unlock Platform Governance</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
