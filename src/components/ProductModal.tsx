import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Shield, RotateCcw, Truck, Check, Share2, MessageSquare } from 'lucide-react';
import { Product, MOCK_REVIEWS } from '../data/products';
import { formatIDR } from '../utils/format';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants: { [key: string]: string }) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    product.variants?.forEach(v => {
      initial[v.name] = v.options[0];
    });
    return initial;
  });
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: option }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header Close Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition flex items-center space-x-1 text-xs font-bold"
            title="Bagikan Produk"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedLink ? 'Tersalin!' : 'Share'}</span>
          </button>
          <button
            onClick={() => onToggleWishlist(product)}
            className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-full transition"
            title="Favorit"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-full transition shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="w-full pt-[100%] relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow">
                    HEMAT {product.discount}%
                  </span>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-red-600 ring-2 ring-red-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Security Guarantees */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs text-slate-600">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Garansi Resmi 100% Original & Terlindungi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-slate-500" />
                  <span>Gratis ongkir instan / reguler ke seluruh kota</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>7 Hari pengembalian barang mudah & cepat</span>
                </div>
              </div>
            </div>

            {/* Product Content & Actions */}
            <div className="space-y-6">
              
              <div>
                <span className="bg-red-50 text-red-700 font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                  {product.storeName}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500 mr-1" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal ml-1">({product.reviewsCount} Ulasan)</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600 font-medium">Terjual {product.sold}</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    Stok Tersedia ({product.stock})
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100">
                <div className="text-sm text-slate-500 mb-0.5">Harga Spesial Toko</div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-red-600 tracking-tight">
                    {formatIDR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">
                      {formatIDR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 pt-2">
                  {product.variants.map((v) => (
                    <div key={v.name} className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Pilih {v.name}: <span className="text-red-600 font-bold">{selectedVariants[v.name]}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleVariantSelect(v.name, option)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                              selectedVariants[v.name] === option
                                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector & Add Button */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Jumlah Pembelian:</span>
                  <div className="flex items-center space-x-3 bg-slate-100 p-1 rounded-xl border border-slate-200 font-bold">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white text-slate-800 hover:bg-red-50 hover:text-red-600 transition shadow-sm flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-extrabold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white text-slate-800 hover:bg-red-50 hover:text-red-600 transition shadow-sm flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedVariants);
                    }}
                    className="py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-2xl flex items-center justify-center space-x-2 transition shadow-sm text-sm"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>+ Keranjang</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedVariants);
                      onClose();
                    }}
                    className="py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold rounded-2xl flex items-center justify-center space-x-2 transition shadow-lg shadow-red-500/20 text-sm"
                  >
                    <span>Beli Langsung</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Details & Reviews Tabs */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex space-x-6 border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
                  activeTab === 'desc' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Deskripsi Produk
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
                  activeTab === 'specs' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Spesifikasi
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 font-bold text-sm transition-colors border-b-2 flex items-center space-x-1.5 ${
                  activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Ulasan Pembeli</span>
                <span className="bg-slate-100 text-slate-700 text-[11px] px-1.5 py-0.5 rounded-full font-bold">
                  {product.reviewsCount}
                </span>
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'desc' && (
              <div className="text-slate-600 leading-relaxed text-sm space-y-4">
                <p>{product.description}</p>
                <div className="bg-amber-50 text-amber-900 p-4 rounded-2xl text-xs space-y-1">
                  <p className="font-bold">⚠️ Catatan Penjual Nusantara Store:</p>
                  <p>Harap rekam video unboxing saat membuka paket untuk mempermudah klaim garansi jika terjadi kerusakan akibat pengiriman kurir.</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-sm">
                {Object.entries(product.specs).map(([key, val], index) => (
                  <div key={key} className={`flex p-3 sm:p-4 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <span className="w-1/3 font-bold text-slate-700">{key}</span>
                    <span className="w-2/3 text-slate-600">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-extrabold text-slate-900">{product.rating}</div>
                    <div>
                      <div className="flex text-amber-500 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">Berdasarkan dari {product.reviewsCount} ulasan terverifikasi</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4 text-red-600" />
                    <span>Tulis Ulasan</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {MOCK_REVIEWS.map(rev => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={rev.avatar} alt={rev.user} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                              <span>{rev.user}</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase">Terverifikasi</span>
                            </h4>
                            <span className="text-xs text-slate-400">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm">{rev.comment}</p>
                      {rev.images && rev.images.length > 0 && (
                        <div className="flex space-x-2 pt-1">
                          {rev.images.map((img, idx) => (
                            <img key={idx} src={img} alt="Bukti review" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
