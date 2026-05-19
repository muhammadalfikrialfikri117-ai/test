import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface FlashSaleProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistedIds: string[];
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistedIds,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 }; // Loop for demo
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleItems = products.filter(p => p.isFlashSale);

  if (flashSaleItems.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-gradient-to-br from-red-700 via-red-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        
        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-lg animate-bounce">
              <Zap className="w-7 h-7 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">FLASH SALE SPESIAL</h2>
                <span className="bg-amber-400 text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider hidden sm:inline">
                  ⚡ DISKON UP TO 70%
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm">Stok sangat terbatas! Promo berakhir dalam waktu:</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Clock className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="flex items-center space-x-1.5 text-lg font-mono font-bold">
              <span className="bg-white text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center shadow">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-amber-300">:</span>
              <span className="bg-white text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center shadow">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-amber-300">:</span>
              <span className="bg-white text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center shadow">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
          {flashSaleItems.map(product => {
            const stockInfo = product.flashSaleStock || { total: 50, remaining: 15 };
            const percentSold = Math.round(((stockInfo.total - stockInfo.remaining) / stockInfo.total) * 100);
            
            return (
              <div key={product.id} className="bg-white text-slate-900 rounded-2xl p-1 shadow-lg relative flex flex-col">
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistedIds.includes(product.id)}
                />
                
                {/* Stock sold bar */}
                <div className="px-4 pb-3 pt-1">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full"
                      style={{ width: `${percentSold}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1 font-semibold">
                    <span className="text-red-600">Tersisa {stockInfo.remaining} buah</span>
                    <span>Terjual {percentSold}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
