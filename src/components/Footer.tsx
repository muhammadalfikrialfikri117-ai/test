import React, { useState } from 'react';
import { Mail, ShieldCheck, Gift, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Guarantee Box */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-white/20 uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" />
              <span>VOUCHER DISKON Rp 50.000 LANGSUNG!</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Daftar Newsletter & Dapatkan Ekstra Diskon
            </h3>
            <p className="text-slate-100 text-sm leading-relaxed">
              Jadilah yang pertama tahu promo Flash Sale 70%, peluncuran gadget eksklusif, dan diskon ongkir ke seluruh Indonesia. Tanpa spam, janji!
            </p>
          </div>

          <div className="w-full md:w-auto relative z-10 shrink-0">
            {subscribed ? (
              <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl space-y-2 text-center animate-scale-up border-2 border-amber-300">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                  🎉
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Selamat Berlangganan!</h4>
                <p className="text-xs text-slate-600">Gunakan kode voucher ini saat checkout:</p>
                <div className="font-mono text-lg font-extrabold text-red-600 tracking-wider bg-slate-100 py-1.5 px-4 rounded-xl border border-slate-200 inline-block">
                  HEMAT50
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan alamat email aktifmu..."
                    className="w-full pl-11 pr-4 py-3.5 bg-white/10 hover:bg-white/20 focus:bg-white text-slate-900 focus:text-slate-900 placeholder-slate-200 text-sm font-semibold rounded-2xl border border-white/30 focus:border-white outline-none transition backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl transition shadow-lg shrink-0 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Klaim Voucher</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-sm">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-red-500/20">
                N
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Nusantara<span className="text-red-500">Store</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Nusantara Store adalah platform e-commerce terkemuka di Indonesia yang menyediakan jutaan produk berkualitas tinggi dengan jaminan keaslian 100%, pengiriman kilat, dan layanan garansi resmi.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Gedung Menara Nusantara Lt. 12, Jakarta</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>cs@nusantarastore.id (Layanan 24/7)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Kategori */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Kategori Teratas</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#" className="hover:text-red-500 transition">Elektronik & Gadget (iBox / Samsung)</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Pakaian & Fashion Lebaran</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Sepatu Sneakers Pria & Wanita</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Skincare & Kecantikan BPOM</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Peralatan Dapur & Smart Home</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Kopi Specialty Aceh & Minuman Nusantara</a></li>
            </ul>
          </div>

          {/* Col 3: Layanan & Bantuan */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#" className="hover:text-red-500 transition">Lacak Pengiriman Pesanan (Tracking)</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Cara Pembayaran & Cicilan 0%</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Prosedur Pengembalian Barang (7 Hari Retur)</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Syarat & Ketentuan Pengguna</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Pusat Bantuan & Tanya Jawab (FAQ)</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Karier di Nusantara Tech ID</a></li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Pembayaran */}
          <div className="space-y-4 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Metode Pembayaran Aman</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {['BCA VA', 'Mandiri VA', 'BNI', 'BRI', 'GoPay', 'OVO', 'ShopeePay', 'QRIS', 'COD Tunai'].map((p) => (
                <span key={p} className="bg-slate-800 text-slate-300 font-extrabold px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] shadow-inner">
                  {p}
                </span>
              ))}
            </div>

            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider pt-2">Jasa Logistik Partner</h4>
            <div className="flex flex-wrap gap-2">
              {['JNE Express', 'SiCepat', 'GoSend Instant', 'GrabExpress', 'J&T', 'AnterAja'].map((l) => (
                <span key={l} className="bg-slate-800 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 text-[11px]">
                  {l}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Nusantara Store ID. Hak Cipta Dilindungi Undang-Undang. Terdaftar dan diawasi oleh Kementerian Kominfo RI.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 font-semibold text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1" />
              <span>100% Secure Checkout</span>
            </span>
            <span>Made with <Heart className="w-3.5 h-3.5 inline fill-red-500 text-red-500 mx-0.5" /> in Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
