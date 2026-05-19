import React from 'react';
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { formatIDR } from '../utils/format';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemove: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onExplore: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemove,
  onAddToCart,
  onExplore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <h2 className="font-extrabold text-lg">Daftar Keinginan Saya</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition"
              title="Tutup"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">Daftar Favorit Masih Kosong</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Tekan ikon hati (❤️) pada produk yang Anda suka untuk menyimpannya di sini agar mudah dibeli nanti!
                </p>
                <button
                  onClick={() => { onClose(); onExplore(); }}
                  className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-red-500/20"
                >
                  Jelajahi Produk Pilihan
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 flex space-x-3 items-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">{p.name}</h4>
                      <p className="font-extrabold text-red-600 text-sm mt-1">{formatIDR(p.price)}</p>
                      {p.originalPrice > p.price && (
                        <p className="text-xs text-slate-400 line-through">{formatIDR(p.originalPrice)}</p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 shrink-0">
                      <button
                        onClick={(e) => onAddToCart(p, e)}
                        className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition shadow-sm"
                        title="Tambahkan ke Keranjang"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => onRemove(p, e)}
                        className="p-2.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition shadow-sm"
                        title="Hapus dari Favorit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action */}
          {wishlistedProducts.length > 0 && (
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => { onClose(); onExplore(); }}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center space-x-2"
              >
                <span>Lihat Lebih Banyak Produk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
