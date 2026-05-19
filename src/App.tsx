import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FlashSale } from './components/FlashSale';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';
import { SupportWidget } from './components/SupportWidget';
import { PRODUCTS, CATEGORIES, Product } from './data/products';
import { SlidersHorizontal, ArrowUpDown, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';

export const App: React.FC = () => {
  // App States
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Nusantara Ultra Smartwatch
      quantity: 1,
      selectedVariants: { Warna: 'Starlight Silver', 'Ukuran Strap': 'M/L (160-220mm)' }
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['p1', 'p3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('populer');
  
  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Checkout states
  const [appliedVoucherDiscount, setAppliedVoucherDiscount] = useState<number>(0);
  const [activeVoucherCode, setActiveVoucherCode] = useState<string>('');
  const [latestOrderId, setLatestOrderId] = useState<string>('NS-892104');

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, variants?: { [key: string]: string }) => {
    const selectedVars = variants || (product.variants ? { [product.variants[0].name]: product.variants[0].options[0] } : {});
    
    setCart(prev => {
      // check if exists with same variant
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVars)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariants: selectedVars }];
      }
    });

    showToast(`Berhasil menambahkan ${product.name} ke keranjang!`);
  };

  const handleCardAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleAddToCart(product, 1);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
        showToast('Barang dihapus dari keranjang', 'info');
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Barang dihapus dari keranjang', 'info');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist(prev => {
      if (prev.includes(product.id)) {
        showToast('Dihapus dari daftar favorit', 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast('Ditambahkan ke daftar favorit! ❤️');
        return [...prev, product.id];
      }
    });
  };

  // Checkout Handlers
  const handleProceedToCheckout = (discount: number, voucherCode: string) => {
    setAppliedVoucherDiscount(discount);
    setActiveVoucherCode(voucherCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setLatestOrderId(orderId);
    setCart([]); // Empty cart on success
    showToast(`Transaksi Sukses! Order ID: ${orderId}`);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.storeName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'lowest') return a.price - b.price;
      if (sortBy === 'highest') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.sold - a.sold; // default 'populer'
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter(p => wishlist.includes(p.id));
  }, [wishlist]);

  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      
      {/* Toast Notification Popup */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 animate-in slide-in-from-top duration-300 border border-slate-700">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">✓</div>
          <span className="text-xs sm:text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsTrackingOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => { setSelectedCategory(cat); scrollToCatalog(); }}
      />

      <main className="flex-1 pb-16">
        
        {/* Hero Section */}
        <HeroBanner
          onExplore={scrollToCatalog}
          onSelectCategory={(cat) => { setSelectedCategory(cat); scrollToCatalog(); }}
        />

        {/* Flash Sale Banner & Carousel */}
        <FlashSale
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleCardAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlist}
        />

        {/* Product Catalog Section */}
        <div id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Section Heading & Filtering Tools */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                  <ShoppingBag className="w-7 h-7 text-red-600 inline" />
                  <span>Katalog Produk Pilihan</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {selectedCategory === 'all' 
                    ? 'Menampilkan seluruh produk unggulan dari seller terverifikasi Nusantara Store'
                    : `Menampilkan kategori: ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`
                  }
                </p>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center space-x-3 self-start md:self-auto">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <span>Urutkan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-extrabold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="populer">🔥 Paling Populer & Terjual</option>
                    <option value="lowest">🏷️ Harga: Rendah ke Tinggi</option>
                    <option value="highest">💎 Harga: Tinggi ke Rendah</option>
                    <option value="rating">⭐ Rating Bintang Terbaik</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Quick Selector Chips */}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 shrink-0 mr-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
                <span>Filter Kategori:</span>
              </span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 shadow-sm ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search feedback */}
            {searchQuery && (
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                <span>Hasil pencarian untuk: <strong className="underline font-bold text-red-600">"{searchQuery}"</strong> ({filteredProducts.length} produk ditemukan)</span>
                <button onClick={() => setSearchQuery('')} className="font-bold underline text-slate-700 hover:text-black">
                  Hapus filter pencarian
                </button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-xl">Produk Tidak Ditemukan</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Maaf, produk dengan kata kunci atau filter kategori yang Anda cari tidak tersedia. Coba gunakan kata kunci lain.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-6 py-3 bg-slate-900 text-white font-extrabold text-xs sm:text-sm rounded-xl hover:bg-red-600 transition shadow"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleCardAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          )}

          {/* Trust Guarantees / Value Proposition */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mt-16 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="bg-white/20 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KEUNTUNGAN BELANJA DI NUSANTARA STORE</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Pengiriman Ekstra Cepat & Garansi Retur 7 Hari
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Setiap barang melalui inspeksi ketat sebelum dikemas. Nikmati kenyamanan berbelanja online bebas cemas dengan asuransi pengiriman penuh ke seluruh pelosok Nusantara.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Customer Support Widget */}
      <SupportWidget />

      {/* Modals & Slide Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(selectedProduct.id)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onExplore={() => { setIsCartOpen(false); scrollToCatalog(); }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedDiscount={appliedVoucherDiscount}
        voucherCode={activeVoucherCode}
        onOrderSuccess={handleOrderSuccess}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemove={handleToggleWishlist}
        onAddToCart={handleCardAddToCart}
        onExplore={() => { setIsWishlistOpen(false); scrollToCatalog(); }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrderId={latestOrderId}
      />

    </div>
  );
};

export default App;
