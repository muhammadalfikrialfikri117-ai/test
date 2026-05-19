import React from 'react';
import { Star, Heart, ShoppingCart, MapPin, CheckCircle, Zap } from 'lucide-react';
import { Product } from '../data/products';
import { formatIDR } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-2xl border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discount > 0 && (
          <span className="bg-red-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
            <span>HEMAT {product.discount}%</span>
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center space-x-1 uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-white" />
            <span>Flash Sale</span>
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => onToggleWishlist(product, e)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-red-600 flex items-center justify-center shadow-md transition-all"
        title="Tambahkan ke Favorit"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="w-full pt-[100%] relative bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 5 && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-[10px] font-bold text-center py-1 uppercase tracking-wider">
            Sisa Stok {product.stock} Buah!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Store & Location */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 mb-1">
            <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold flex items-center space-x-0.5">
              <CheckCircle className="w-3 h-3" />
              <span>Mall</span>
            </span>
            <span className="flex items-center truncate">
              <MapPin className="w-3 h-3 text-slate-400 mr-0.5 shrink-0" />
              <span className="truncate">{product.location}</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating */}
        <div className="space-y-1.5">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg sm:text-xl font-extrabold text-red-600">
              {formatIDR(product.price)}
            </span>
          </div>
          {product.originalPrice > product.price && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 line-through">
                {formatIDR(product.originalPrice)}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                Diskon {product.discount}%
              </span>
            </div>
          )}

          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal ml-1">({product.reviewsCount})</span>
            </div>
            <span>Terjual {product.sold > 1000 ? `${(product.sold / 1000).toFixed(1)}k+` : product.sold}</span>
          </div>
        </div>

        {/* Add to Cart Quick Button */}
        <button
          onClick={(e) => onAddToCart(product, e)}
          className="w-full mt-2 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>+ Keranjang</span>
        </button>

      </div>
    </div>
  );
};
