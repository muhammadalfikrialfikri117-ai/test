import React, { useState } from 'react';
import { MessageCircle, X, ChevronDown, ChevronUp, ExternalLink, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 text-sm border-2 border-white/20 animate-bounce"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Bantuan & FAQ</span>
        </button>
      )}

      {/* Widget Modal */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">Pusat Bantuan Nusantara</h4>
                <p className="text-[11px] text-slate-300">Siap menjawab semua pertanyaanmu</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FAQ Accordion */}
          <div className="p-4 max-h-80 overflow-y-auto space-y-2.5 bg-slate-50">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pertanyaan Populer (FAQ):</p>
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between"
                >
                  <span>{item.question}</span>
                  {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-red-600 shrink-0 ml-1" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-3 bg-red-50/50 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed font-medium">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Live Chat Action */}
          <div className="p-4 bg-white border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-500 text-center">Belum menemukan jawaban? Hubungi CS kami:</p>
            <a
              href="https://wa.me/628111111111"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi via WhatsApp (Live 24/7)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}
    </div>
  );
};
