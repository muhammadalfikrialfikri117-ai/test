import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, ArrowLeft, Copy, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from './CartDrawer';
import { formatIDR } from '../utils/format';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  voucherCode: string;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  voucherCode,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Budi Santoso',
    phone: '081234567890',
    city: 'Jakarta Selatan',
    zip: '12345',
    address: 'Jl. Jend. Sudirman No. Kav 45, Gedung Menara Nusantara Lantai 12',
    notes: 'Tolong packing ekstra aman pakai kayu dan bubble wrap tebal ya.',
  });
  const [courier, setCourier] = useState('jne');
  const [payment, setPayment] = useState('bca_va');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 50000;
  
  // Courier fee calculation
  const getCourierFee = () => {
    if (isFreeShipping) return 0;
    if (courier === 'gosend') return 35000;
    if (courier === 'sicepat') return 20000;
    return 25000;
  };
  
  const courierFee = getCourierFee();
  const grandTotal = Math.max(0, subtotal + courierFee - appliedDiscount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newOrderId = `NS-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(newOrderId);
      setStep('success');
      onOrderSuccess(newOrderId);

      // Trigger spectacular confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const copyVirtualAccount = () => {
    navigator.clipboard.writeText('8077 0812 3456 7890');
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {step === 'form' ? (
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition mr-1">
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
            ) : null}
            <div>
              <h2 className="font-extrabold text-lg text-white">
                {step === 'form' ? 'Penyelesaian Transaksi (Checkout)' : '🎉 Pesanan Berhasil!'}
              </h2>
              <p className="text-xs text-slate-300">
                {step === 'form' ? 'Lengkapi alamat dan pilih metode pembayaran' : 'Terima kasih telah berbelanja di Nusantara Store'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {step === 'form' ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              
              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">1</div>
                  <h3 className="font-extrabold text-slate-800 text-base">Alamat Pengiriman Tujuan</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama Penerima</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">No. Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kota / Kabupaten</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kode Pos</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Alamat Lengkap (Jalan, No Rumah, RT/RW)</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Catatan untuk Kurir (Opsional)</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Contoh: Titip di pos satpam jika rumah kosong"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Courier Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">2</div>
                  <h3 className="font-extrabold text-slate-800 text-base">Pilih Kurir Pengiriman</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCourier('jne')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      courier === 'jne' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">JNE Reguler</span>
                        <Truck className={`w-4 h-4 ${courier === 'jne' ? 'text-red-600' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Estimasi 2-4 Hari Kerja</p>
                    </div>
                    <span className="font-bold text-xs text-red-600 mt-3">
                      {isFreeShipping ? 'GRATIS (Rp 0)' : 'Rp 25.000'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCourier('gosend')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      courier === 'gosend' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">GoSend Instant ⚡</span>
                        <Truck className={`w-4 h-4 ${courier === 'gosend' ? 'text-red-600' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Kirim 2 Jam Sampai</p>
                    </div>
                    <span className="font-bold text-xs text-red-600 mt-3">
                      {isFreeShipping ? 'GRATIS (Rp 0)' : 'Rp 35.000'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCourier('sicepat')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      courier === 'sicepat' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">SiCepat Ekspres</span>
                        <Truck className={`w-4 h-4 ${courier === 'sicepat' ? 'text-red-600' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Estimasi 1-2 Hari</p>
                    </div>
                    <span className="font-bold text-xs text-red-600 mt-3">
                      {isFreeShipping ? 'GRATIS (Rp 0)' : 'Rp 20.000'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">3</div>
                  <h3 className="font-extrabold text-slate-800 text-base">Metode Pembayaran</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    payment === 'bca_va' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="bca_va"
                        checked={payment === 'bca_va'}
                        onChange={() => setPayment('bca_va')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">BCA Virtual Account</span>
                        <span className="text-[11px] text-slate-500 block">Cek otomatis 24/7 tanpa konfirmasi</span>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">BCA</span>
                  </label>

                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    payment === 'mandiri_va' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="mandiri_va"
                        checked={payment === 'mandiri_va'}
                        onChange={() => setPayment('mandiri_va')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Mandiri Virtual Account</span>
                        <span className="text-[11px] text-slate-500 block">Bayar via Livin' by Mandiri</span>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded">Mandiri</span>
                  </label>

                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    payment === 'gopay' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="gopay"
                        checked={payment === 'gopay'}
                        onChange={() => setPayment('gopay')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">GoPay / QRIS Scan</span>
                        <span className="text-[11px] text-slate-500 block">OVO, ShopeePay, DANA, LinkAja</span>
                      </div>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">QRIS</span>
                  </label>

                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    payment === 'cod' ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={payment === 'cod'}
                        onChange={() => setPayment('cod')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Bayar di Tempat (COD)</span>
                        <span className="text-[11px] text-slate-500 block">Bayar tunai langsung ke kurir</span>
                      </div>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded">COD</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal ({items.length} item)</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Ongkos Kirim ({courier.toUpperCase()})</span>
                  <span>{isFreeShipping ? 'Rp 0 (Subsidi Promo)' : formatIDR(courierFee)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-red-600 font-bold">
                    <span>Diskon Voucher ({voucherCode})</span>
                    <span>-{formatIDR(appliedDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2.5 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total Tagihan Akhir</span>
                  <span className="text-red-600 text-xl tracking-tight">{formatIDR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 disabled:opacity-50 text-white font-extrabold text-base rounded-2xl transition shadow-xl shadow-red-500/20 flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses Pesanan Aman...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Konfirmasi & Bayar Sekarang {formatIDR(grandTotal)}</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Success Celebration Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-scale-up">
                <CheckCircle className="w-14 h-14" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Hore! Pesanan Anda Berhasil Dibuat
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Nomor Tagihan pesanan Anda <strong className="text-red-600 font-mono text-base">{generatedOrderId}</strong>. Kami telah mengirimkan rincian lengkap ke WhatsApp & email Anda.
                </p>
              </div>

              {payment !== 'cod' ? (
                <div className="bg-slate-900 text-white p-6 rounded-3xl max-w-md mx-auto space-y-4 text-left shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Instruksi Pembayaran</span>
                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-extrabold">Batas Waktu: 24 Jam</span>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-300">Total Pembayaran</p>
                    <p className="text-2xl font-extrabold text-amber-300">{formatIDR(grandTotal)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-300 mb-1">Nomor {payment === 'bca_va' ? 'BCA' : payment === 'mandiri_va' ? 'Mandiri' : 'QRIS'} Virtual Account:</p>
                    <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/10 font-mono font-bold text-lg">
                      <span className="tracking-wider">8077 0812 3456 7890</span>
                      <button
                        onClick={copyVirtualAccount}
                        className="p-1.5 bg-white text-slate-900 hover:bg-amber-300 rounded-lg text-xs font-bold transition flex items-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedVA ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl text-xs space-y-1 text-slate-300">
                    <p className="font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Verifikasi Otomatis</span>
                    </p>
                    <p>Setelah Anda melakukan transfer, sistem akan otomatis mengubah status pesanan Anda menjadi <strong className="text-white">"Sedang Dikemas"</strong> dalam 1 menit.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-900 p-6 rounded-3xl max-w-md mx-auto space-y-3 text-left border border-amber-200">
                  <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>Perhatian untuk Pembayaran COD</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Mohon siapkan uang pas tunai sebesar <strong className="text-red-600 font-extrabold text-sm">{formatIDR(grandTotal)}</strong> untuk diserahkan kepada kurir pengiriman saat pesanan sampai di depan rumah Anda.
                  </p>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition shadow-md"
                >
                  Selesai & Lanjutkan Belanja
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
