import React from 'react';
import { Heart, Sparkles, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenGuestMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuestMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF4ED] border-t border-[#EAE0D4] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-[18px] sm:px-6 lg:px-8">
        
        {/* Pre-footer Call to Action card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DACD] shadow-[0_4px_24px_rgba(95,73,59,0.03)] mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-[#8C6D58] uppercase tracking-wider mb-1 block">
              Mulai Hari Ini
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#352721] mb-2">
              Bawa Ketenangan Finansial ke Rumah Anda
            </h3>
            <p className="text-[#6E5E56] text-xs sm:text-[13.5px] leading-relaxed">
              Bergabung bersama ribuan keluarga Indonesia yang mengelola pengeluaran harian dengan senyuman dan tanpa rasa cemas.
            </p>
          </div>

          <button
            onClick={onOpenGuestMode}
            className="flex-shrink-0 h-12 px-7 rounded-2xl bg-[#684D40] hover:bg-[#523C31] text-[#FAF7F2] text-sm font-medium shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Mulai Catat Gratis</span>
            <span className="text-xs">⚡</span>
          </button>
        </div>

        {/* Footer Navigation & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#ECE1D5]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EAD9CD] to-[#D8B4A6] flex items-center justify-center border border-[#F2E5DC] text-[#63483D]">
                <Heart className="w-4 h-4 text-[#8C5D4B] fill-[#8C5D4B]/20" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#352721] block leading-tight">
                  KelolaKeuangan
                </span>
                <span className="text-[11px] text-[#86756B]">
                  Keuangan Tenang, Keluarga Senang
                </span>
              </div>
            </div>

            <p className="text-xs text-[#7A6A62] leading-relaxed max-w-sm">
              Platform pencatatan keuangan pribadi dan keluarga dengan pendekatan hangat, manusiawi, dan bebas stres.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-[#755D50]">
              <a
                href="mailto:kelolacatatankeuangan@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-[#38271F] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#A56852]" />
                <span>kelolacatatankeuangan@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold text-[#3E2F28] block mb-2.5">
                Navigasi
              </span>
              <ul className="space-y-2 text-[#73635B]">
                <li><a href="#beranda" className="hover:text-[#352721] transition-colors">Beranda</a></li>
                <li><a href="#tentang-kami" className="hover:text-[#352721] transition-colors">Tentang Kami</a></li>
                <li><a href="#fitur-unggulan" className="hover:text-[#352721] transition-colors">Fitur Unggulan</a></li>
                <li><a href="#mulai-catat-gratis" className="hover:text-[#352721] transition-colors font-medium text-[#7D5240]">Unduh & Versi Web</a></li>
                <li><a href="#keamanan-cloud" className="hover:text-[#352721] transition-colors">Keamanan Cloud</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-[#3E2F28] block mb-2.5">
                Bantuan
              </span>
              <ul className="space-y-2 text-[#73635B]">
                <li><a href="#bantuan-kontak" className="hover:text-[#352721] transition-colors">FAQ & Kontak</a></li>
                <li><button onClick={onOpenGuestMode} className="hover:text-[#352721] text-left transition-colors cursor-pointer">Mode Tamu</button></li>
                <li><span className="text-[#96867E]">Privat & Bebas Iklan</span></li>
                <li><span className="text-[#96867E]">v1.0 Versi Stabil</span></li>
              </ul>
            </div>
          </div>

          {/* Security & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="flex items-center gap-2 text-xs text-[#527258] bg-[#E8F0EA] px-3 py-1.5 rounded-full border border-[#D5E3D8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AES-256 Cloud Encryption</span>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs text-[#7A6A61] hover:text-[#382A24] px-3 py-2 rounded-xl bg-white border border-[#E9DDD2] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Atas</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7A70]">
          <p>© {new Date().getFullYear()} KelolaKeuangan. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3 h-3 text-[#C97A83] fill-[#C97A83]" />
            <span>untuk keluarga Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
