import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  location?: string;
  badge?: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  heightClass?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  autoPlayInterval = 5000,
  heightClass = 'h-[460px] sm:h-[560px]'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length, autoPlayInterval]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({ x: x * 20, y: y * 20 });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${heightClass} rounded-3xl overflow-hidden shadow-2xl bg-[#0C1310] select-none group`}
    >
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Parallax Image Layer */}
            <div
              className="absolute inset-0 scale-105 transition-transform duration-300 ease-out"
              style={{
                transform: isActive
                  ? `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(1.08)`
                  : 'scale(1)',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Gradient Overlays for Readability & Royal Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50" />

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 max-w-4xl">
              {slide.badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/90 text-[#0C1814] w-fit mb-3 shadow-lg backdrop-blur-md animate-slide-up">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>
              )}

              {slide.location && (
                <span className="text-xs uppercase tracking-widest text-[#E8ECE9]/75 font-medium mb-1">
                  {slide.location}
                </span>
              )}

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-md mb-2">
                {slide.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-200 line-clamp-2 max-w-2xl drop-shadow">
                {slide.subtitle}
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="pointer-events-auto w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="pointer-events-auto w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls Bar: Dots + Play/Pause */}
      <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="w-px h-3 bg-white/20" />

        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-[#C5A880]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
