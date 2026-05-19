import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Truck, Clock, RefreshCw, MapPin, ExternalLink } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrderId = 'NS-892104',
}) => {
  const [trackingId, setTrackingId] = useState(recentOrderId);
  const [searchedOrder, setSearchedOrder] = useState<{
    id: string;
    date: string;
    status: 'dikemas' | 'dikirim' | 'selesai';
    courier: string;
    receipt: string;
    destination: string;
    lastUpdate: string;
    items: string;
  } | null>({
    id: recentOrderId,
    date: '25 Maret 2026, 14:30 WIB',
    status: 'dikirim',
    courier: 'JNE Reguler - Layanan Prioritas Nusantara',
    receipt: 'JNE88920192837ID',
    destination: 'Budi Santoso - Jakarta Selatan',
    lastUpdate: 'Paket telah keluar dari Hub Transit Jakarta Pusat menuju Cabang Pengantaran Jakarta Selatan.',
    items: '1x Nusantara Ultra Smartwatch Series 9 (Starlight Silver)',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      if (trackingId.toUpperCase().startsWith('NS-')) {
        setSearchedOrder({
          id: trackingId.toUpperCase(),
          date: 'Hari ini, 10:15 WIB',
          status: 'dikemas',
          courier: 'SiCepat Ekspres',
          receipt: 'SICEPAT992109283',
          destination: 'Budi Santoso - Jakarta Selatan',
          lastUpdate: 'Pesanan telah dicetak resi dan sedang disiapkan oleh penjual di gudang utama.',
          items: 'Kemeja Pria Flannel Premium Katun 100% (Navy Tartan - L)',
        });
      } else {
        setErrorMsg('Nomor pesanan tidak valid! Harap masukkan format resi seperti NS-XXXXXX');
        setSearchedOrder(null);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg">Lacak Status Pesanan</h2>
              <p className="text-xs text-slate-300">Pantau perjalanan paket Anda secara real-time</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Tracking Input Bar */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute inset-y-0 left-0 my-auto ml-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Masukkan Nomor Order (Cth: NS-892104)..."
                className="w-full pl-10 pr-4 py-3 bg-slate-100 focus:bg-white text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-red-500 outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-lg shadow-red-500/20 flex items-center space-x-2 shrink-0"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Lacak</span>}
            </button>
          </form>

          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Searched Order Summary & Timeline */}
          {searchedOrder && !loading && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Nomor Tagihan</span>
                    <span className="font-extrabold text-base text-slate-900 font-mono">{searchedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Nomor Resi Kurir</span>
                    <span className="font-bold text-xs text-red-600 font-mono bg-red-50 px-2 py-0.5 rounded">{searchedOrder.receipt}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Layanan Pengiriman:</span>
                    <strong className="text-slate-800">{searchedOrder.courier}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Waktu Pembayaran:</span>
                    <span>{searchedOrder.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tujuan Pengiriman:</span>
                    <span className="truncate max-w-xs">{searchedOrder.destination}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-start space-x-2 mt-2">
                    <Package className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700 font-medium">Isi Paket: <strong>{searchedOrder.items}</strong></span>
                  </div>
                </div>
              </div>

              {/* Graphical Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Riwayat Perjalanan Paket</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start space-x-4">
                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">Pembayaran Terverifikasi & Diterima</h5>
                      <p className="text-[11px] text-slate-500">Sistem Nusantara Store telah memvalidasi pembayaran Anda melalui bank/QRIS.</p>
                      <span className="text-[10px] text-slate-400 font-mono">25 Maret 2026, 14:31 WIB</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start space-x-4">
                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white shadow">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">Pesanan Sedang Dikemas & Diverifikasi Penjual</h5>
                      <p className="text-[11px] text-slate-500">Penjual melakukan quality control dan membungkus pesanan dengan bubble wrap tebal.</p>
                      <span className="text-[10px] text-slate-400 font-mono">25 Maret 2026, 16:10 WIB</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start space-x-4">
                    <div className={`absolute -left-[25px] top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white shadow ${
                      searchedOrder.status === 'dikirim' || searchedOrder.status === 'selesai'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className={`font-bold text-xs ${searchedOrder.status === 'dikirim' ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                        Paket Diserahkan ke Kurir & Dalam Perjalanan
                      </h5>
                      <p className="text-[11px] text-slate-600 font-medium bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-1">
                        📍 <strong>Status Terkini:</strong> {searchedOrder.lastUpdate}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono block mt-1">26 Maret 2026, 09:45 WIB</span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-start space-x-4">
                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-white">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-400">Paket Tiba di Alamat Penerima</h5>
                      <p className="text-[11px] text-slate-400">Kurir mengantarkan paket ke depan pintu rumah Anda.</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-4 bg-red-50 text-red-900 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold block">Punya kendala dengan pengiriman?</span>
                  <span className="text-[11px] text-slate-600">Tim Customer Support kami siap membantu 24/7.</span>
                </div>
                <a
                  href="https://wa.me/628111111111"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-extrabold flex items-center space-x-1 shadow-sm transition"
                >
                  <span>Chat CS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
