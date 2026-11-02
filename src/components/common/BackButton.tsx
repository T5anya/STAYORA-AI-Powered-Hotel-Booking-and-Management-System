import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  fallbackUrl?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  fallbackUrl = '/',
  className = ''
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide text-[#122B22] dark:text-[#E8ECE9] bg-white/80 dark:bg-[#141F1A]/80 hover:bg-[#F3EEE4] dark:hover:bg-[#1A2822] border border-[#E8E1D5] dark:border-[#22352B] shadow-sm hover:shadow transition-all duration-200 active:scale-95 group ${className}`}
      title="Return to previous screen"
    >
      <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-200 group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
};
