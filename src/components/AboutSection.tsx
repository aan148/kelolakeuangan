import React from 'react';
import { Heart, Sparkles, ArrowRight, Shield, Leaf, Flower2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenGuestMode: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenGuestMode }) => {
  return (
    <section id="tentang-kami" className="py-12 sm:py-18 lg:py-24 relative overflow-hidden">
      {/* Soft background subtle accents */}
      <div className="max-w-4xl mx-auto px-[18px] sm:px-6 lg:px-8 relative">
        
        {/* Subtle floral & heart delicate decorative badges floating gently */}
        <div className="absolute -top-4 left-6 hidden sm:flex items-center gap-1 text-[#DFAEB3] opacity-60">
          <Flower2 className="w-5 h-5" />
        </div>
        <div className="absolute top-10 right-8 hidden sm:flex items-center gap-1 text-[#8DA491] opacity-60">
          <Leaf className="w-5 h-5" />
        </div>

        {/* Main Card with Warm Neutral & Soft Glow */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EDE2D7] shadow-[0_8px_30px_rgba(95,73,59,0.04)] text-center">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <span className="text-[12px] font-semibold tracking-widest text-[#967768] uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#B07D62]" />
              FILOSOFI KELUARGA
            </span>

            <h2 className="font-serif-display text-[26px] sm:text-[34px] lg:text-[38px] font-semibold text-[#352822] tracking-tight">
              Tentang Kami
            </h2>

            {/* Delicate decorative line beneath title */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              <span className="w-8 h-[2px] rounded-full bg-[#D4BAA9]" />
              <Heart className="w-3.5 h-3.5 text-[#C97A83] fill-[#C97A83]/30" />
              <span className="w-8 h-[2px] rounded-full bg-[#D4BAA9]" />
            </div>
          </div>

          {/* Paragraph Content as requested */}
          <p className="text-[#5E4E46] text-[15.5px] sm:text-[17px] lg:text-[18px] leading-[1.8] max-w-2xl mx-auto font-normal font-sans-clean">
            KelolaKeuangan hadir dari keyakinan sederhana: merawat keuangan keluarga tidak seharusnya rumit atau memicu stres. Kami merancang ruang pencatatan yang hangat, intuitif, dan transparan agar setiap rupiah yang dikelola membantu keluarga memahami kondisi keuangan dan merencanakan masa depan.
          </p>

          {/* 3 Core Values Pill Badges */}
          <div className="mt-8 pt-6 border-t border-[#F2EAE1] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <div className="bg-[#FAF7F2] py-3 px-4 rounded-2xl border border-[#EFE5DA] flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C97A83]" />
              <span className="text-xs sm:text-[13px] font-medium text-[#524138]">Ramah Pemula & Suami-Istri</span>
            </div>
            <div className="bg-[#FAF7F2] py-3 px-4 rounded-2xl border border-[#EFE5DA] flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8DA491]" />
              <span className="text-xs sm:text-[13px] font-medium text-[#524138]">100% Tanpa Iklan Bising</span>
            </div>
            <div className="bg-[#FAF7F2] py-3 px-4 rounded-2xl border border-[#EFE5DA] flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B07D62]" />
              <span className="text-xs sm:text-[13px] font-medium text-[#524138]">Data Aman & Terenkripsi</span>
            </div>
          </div>

          {/* CTA Button: Coba Mode Tamu */}
          <div className="mt-8 flex justify-center">
            <button
              id="btn-about-mode-tamu"
              onClick={onOpenGuestMode}
              className="h-12 px-7 rounded-2xl bg-[#684D40] hover:bg-[#523C31] text-[#FAF7F2] text-[14.5px] sm:text-[15.5px] font-medium shadow-xs hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Coba Mode Tamu</span>
              <ArrowRight className="w-4 h-4 text-[#E6D4C8]" />
            </button>
          </div>

          {/* Subtle bottom botanical accent */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9B897F]">
            <Leaf className="w-3.5 h-3.5 text-[#8DA491]" />
            <span>Mulai dari langkah kecil, capai impian keluarga bersama</span>
          </div>

        </div>
      </div>
    </section>
  );
};
