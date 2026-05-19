import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, Flame, ShieldCheck, Truck, Tag, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoAlert, setShowPromoAlert] = useState(true);
  const [userModalOpen, setUserModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Banner Ticker */}
      {showPromoAlert && (
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white text-xs py-2 px-4 relative font-medium transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-bounce">
                PROMO
              </span>
              <span className="flex items-center">
                <Flame className="w-3.5 h-3.5 text-amber-300 mr-1 inline animate-pulse" />
                Diskon Kilat Ramadhan up to 70% + Ekstra Voucher Potongan Rp 70.000! Kode: <strong className="ml-1 underline font-bold tracking-wide">NUSANTARA70</strong>
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-slate-100">
              <button onClick={onOpenOrders} className="hover:text-white transition flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Lacak Pesanan</span>
              </button>
              <span className="text-white/30">|</span>
              <div className="flex items-center space-x-1 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Garansi 100% Original</span>
              </div>
            </div>
            <button 
              onClick={() => setShowPromoAlert(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
              title="Tutup banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 shrink-0">
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="flex items-center space-x-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tight">N</span>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-red-600 to-amber-600 bg-clip-text text-transparent block">
                  Nusantara<span className="text-red-600">Store</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest block -mt-1">
                  Toko Online #1
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari gadget impian, baju lebaran, sepatu sneakers, skincare..."
                className="w-full pl-10 pr-32 py-2.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-full border border-transparent focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none shadow-inner"
              />
              <div className="absolute inset-y-1 right-1 flex items-center space-x-1">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="bg-red-600 text-white text-xs px-3.5 py-1.5 rounded-full font-semibold shadow-sm flex items-center space-x-1 pointer-events-none">
                  <span>Cari</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Actions (Cart, Wishlist, User Profile) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all group"
              title="Favorit Saya"
            >
              <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'group-hover:scale-110 transition-transform'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse-slow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all group shadow-sm flex items-center space-x-2 px-3 sm:px-4"
              title="Keranjang Belanja"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Keranjang</span>
              <span className="bg-red-600 text-white group-hover:bg-white group-hover:text-red-600 font-bold text-xs px-2 py-0.5 rounded-full transition-all shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* User Profile / Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setUserModalOpen(!userModalOpen)}
                className="flex items-center space-x-2 p-1.5 pl-2.5 pr-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-all border border-slate-200"
              >
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                  BS
                </div>
                <span className="text-xs font-semibold hidden lg:inline max-w-[100px] truncate text-slate-800">
                  Budi Santoso
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
              </button>

              {/* User Dropdown Modal */}
              {userModalOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                      BS
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-slate-800 text-sm truncate">Budi Santoso</h4>
                      <p className="text-xs text-slate-500 truncate">budi.santoso@nusantara.id</p>
                      <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        ⭐ Member Platinum
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3 text-sm">
                    <button 
                      onClick={() => { onOpenOrders(); setUserModalOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <Truck className="w-4 h-4 text-slate-500" />
                      <span>Lacak Pesanan Saya</span>
                    </button>
                    <button 
                      onClick={() => { onOpenWishlist(); setUserModalOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <Heart className="w-4 h-4 text-slate-500" />
                      <span>Daftar Keinginan ({wishlistCount})</span>
                    </button>
                    <div className="border-t border-slate-100 my-1 pt-1"></div>
                    <div className="p-2.5 bg-amber-50 rounded-lg text-xs text-amber-900 flex items-start space-x-2">
                      <Tag className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>Anda memiliki <strong>3 Voucher Aktif</strong> siap dipakai saat checkout!</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setUserModalOpen(false)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Tutup Menu
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg md:hidden transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk toko..."
              className="w-full pl-9 pr-10 py-2 bg-slate-100 text-slate-800 placeholder-slate-400 text-xs rounded-xl border border-transparent focus:border-red-500 focus:bg-white outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar / Quick Links */}
        <div className="hidden md:flex items-center space-x-6 pt-3 mt-3 border-t border-slate-100 text-sm font-medium">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-red-500 mr-1" />
            <span>Kategori Populer:</span>
          </span>
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`transition-colors whitespace-nowrap pb-1 border-b-2 font-semibold ${
                  selectedCategory === cat.id
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-red-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center space-x-4 text-xs text-slate-600 font-semibold">
            <button onClick={onOpenOrders} className="hover:text-red-600 flex items-center space-x-1.5 transition">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Lacak Order</span>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pilih Kategori Produk</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setMobileMenuOpen(false); }}
                className={`p-2.5 text-left rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { onOpenOrders(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow"
            >
              <Truck className="w-4 h-4 text-red-500" />
              <span>Lacak Pesanan Saya (Tracking ID)</span>
            </button>
            <button
              onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
              className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span>Lihat Favorit Saya ({wishlistCount} Item)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
