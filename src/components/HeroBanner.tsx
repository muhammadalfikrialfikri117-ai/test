import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Clock, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { BANNER_SLIDES } from '../data/products';

interface HeroBannerProps {
  onExplore: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNER_SLIDES[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      {/* Main Banner Slider Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-900 text-white min-h-[420px] sm:min-h-[460px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform transition-transform duration-1000 ease-out" 
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} mix-blend-multiply opacity-80`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-12 md:p-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.badge}</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {slide.heading}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
              {slide.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onExplore}
              className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm flex items-center space-x-2"
            >
              <span>{slide.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </button>
            <button
              onClick={() => onSelectCategory(currentSlide === 0 ? 'elektronik' : currentSlide === 1 ? 'elektronik' : 'fashion')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-xl transition text-sm border border-white/30"
            >
              Lihat Kategori Terkait
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition z-20"
          title="Slide Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition z-20"
          title="Slide Berikutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {BANNER_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              title={`Pergi ke slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Guarantees / Value Proposition Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3.5 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Gratis Ongkir Rp 0</h4>
            <p className="text-xs text-slate-500">Ke Seluruh Pelosok Indonesia</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3.5 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">100% Original</h4>
            <p className="text-xs text-slate-500">Garansi Resmi Distributor</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3.5 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Kirim Kilat 2 Jam</h4>
            <p className="text-xs text-slate-500">Layanan Instant & Same Day</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3.5 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Retur Mudah 7 Hari</h4>
            <p className="text-xs text-slate-500">Uang Kembali Tanpa Ribet</p>
          </div>
        </div>
      </div>
    </div>
  );
};
