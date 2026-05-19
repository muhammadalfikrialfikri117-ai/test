import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Tag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, VOUCHERS } from '../data/products';
import { formatIDR } from '../utils/format';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: { [key: string]: string };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, voucherCode: string) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
}) => {
  const [inputVoucher, setInputVoucher] = useState('');
  const [activeVoucher, setActiveVoucher] = useState<{ code: string; discount: number } | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [showVoucherList, setShowVoucherList] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 50000;
  const shippingFee = isFreeShipping ? 0 : 25000;
  const discountAmount = activeVoucher ? activeVoucher.discount : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const applyVoucherCode = (codeToApply: string) => {
    setVoucherError('');
    const found = VOUCHERS.find(v => v.code.toUpperCase() === codeToApply.toUpperCase());
    if (!found) {
      setVoucherError('Kode voucher tidak ditemukan!');
      return;
    }
    if (subtotal < found.minSpend) {
      setVoucherError(`Minimal belanja ${formatIDR(found.minSpend)} untuk menggunakan kode ini.`);
      return;
    }
    setActiveVoucher({ code: found.code, discount: found.discount });
    setInputVoucher(found.code);
    setShowVoucherList(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-red-500" />
              <h2 className="font-extrabold text-lg">Keranjang Belanja</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition"
              title="Tutup Keranjang"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">Keranjang Masih Kosong</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Yuk, cari gadget impian, baju lebaran, atau perlengkapan rumah sekarang juga dan nikmati gratis ongkir!
                </p>
                <button
                  onClick={() => { onClose(); onExplore(); }}
                  className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-red-500/20"
                >
                  Mulai Belanja Sekarang
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress Indicator */}
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white text-xs shadow-sm flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 font-bold">
                    🎉
                  </div>
                  <div>
                    {isFreeShipping ? (
                      <p className="font-bold">Selamat! Anda menikmati Gratis Ongkir pengiriman se-Indonesia.</p>
                    ) : (
                      <p>
                        Tambah belanja <strong className="underline">{formatIDR(50000 - subtotal)}</strong> lagi untuk <strong>Gratis Ongkir!</strong>
                      </p>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 flex space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-slate-800 text-sm truncate leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded transition shrink-0"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Variants string */}
                          {Object.keys(item.selectedVariants).length > 0 && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {Object.entries(item.selectedVariants).map(([_, v]) => `${v}`).join(', ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-end justify-between mt-2">
                          <span className="font-extrabold text-red-600 text-sm">
                            {formatIDR(item.product.price)}
                          </span>

                          <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-red-50 hover:text-red-600 font-bold text-xs flex items-center justify-center transition"
                            >
                              -
                            </button>
                            <span className="text-xs font-extrabold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-red-50 hover:text-red-600 font-bold text-xs flex items-center justify-center transition"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                      <Tag className="w-4 h-4 text-red-600" />
                      <span>Kode Voucher Diskon / Promo</span>
                    </label>
                    <button
                      onClick={() => setShowVoucherList(!showVoucherList)}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      {showVoucherList ? 'Tutup Daftar' : 'Lihat Voucher (3)'}
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputVoucher}
                      onChange={(e) => setInputVoucher(e.target.value)}
                      placeholder="Masukkan kode (Cth: NUSANTARA70)"
                      className="flex-1 px-3.5 py-2.5 bg-slate-100 focus:bg-white text-xs rounded-xl border border-slate-200 focus:border-red-500 outline-none uppercase font-bold"
                    />
                    <button
                      onClick={() => applyVoucherCode(inputVoucher)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Klaim
                    </button>
                  </div>

                  {voucherError && <p className="text-xs text-red-600 font-semibold">{voucherError}</p>}

                  {activeVoucher && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-red-600" />
                        <div>
                          <span className="font-bold text-xs text-slate-800 uppercase">{activeVoucher.code}</span>
                          <p className="text-[10px] text-emerald-600 font-semibold">Voucher berhasil diterapkan!</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setActiveVoucher(null); setInputVoucher(''); }}
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1"
                      >
                        Hapus
                      </button>
                    </div>
                  )}

                  {/* Available Vouchers Dropdown */}
                  {showVoucherList && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-slate-700 mb-1">Pilih Voucher Tersedia:</p>
                      {VOUCHERS.map(v => (
                        <div key={v.code} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                          <div>
                            <div className="font-extrabold text-xs text-red-600">{v.code}</div>
                            <div className="text-[11px] text-slate-600">{v.description}</div>
                          </div>
                          <button
                            onClick={() => applyVoucherCode(v.code)}
                            className="ml-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm transition shrink-0"
                          >
                            Pakai
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} Barang)</span>
                  <span className="font-bold text-slate-800">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ongkos Kirim</span>
                  <span className={isFreeShipping ? 'text-emerald-600 font-bold' : 'text-slate-800 font-bold'}>
                    {isFreeShipping ? 'GRATIS (Rp 0)' : formatIDR(shippingFee)}
                  </span>
                </div>
                {activeVoucher && (
                  <div className="flex justify-between text-red-600 font-bold">
                    <span>Diskon Voucher ({activeVoucher.code})</span>
                    <span>-{formatIDR(activeVoucher.discount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total Tagihan</span>
                  <span className="text-red-600 text-lg">{formatIDR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onProceedToCheckout(activeVoucher ? activeVoucher.discount : 0, activeVoucher ? activeVoucher.code : '');
                }}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold rounded-2xl transition shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2 text-sm"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Transaksi dijamin aman terenkripsi 256-bit SSL</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
