import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on devices with fine pointer and no reduced-motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let idCounter = 0;
    // Luxury Indian Heritage colors: Royal Gold, Amber, Champagne, Warm Terracotta
    const colors = ['#C5A880', '#D4AF37', '#E5C158', '#E6C687', '#B87333'];

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Subtle throttling to keep performance butter-smooth
      if (Math.random() > 0.35) return;

      const newParticle: Particle = {
        id: ++idCounter,
        x: e.clientX,
        y: e.clientY,
        color: colors[idCounter % colors.length],
        size: Math.random() * 3.5 + 2,
      };

      setParticles((prev) => [...prev.slice(-14), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const decayInterval = setInterval(() => {
      setParticles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 70);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(decayInterval);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Subtle cursor follower halo */}
      <div
        className="fixed w-7 h-7 rounded-full border border-[#C5A880]/40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          boxShadow: '0 0 12px rgba(197, 168, 128, 0.25)',
        }}
      />
      {/* Trailing golden dust particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            opacity: 0.65,
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        />
      ))}
    </div>
  );
};
