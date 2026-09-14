import React from 'react';
import { Sparkles, Heart, ArrowRight, ShieldCheck, Users, Check } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

interface HeroSectionProps {
  onOpenGuestMode: () => void;
  onScrollToFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenGuestMode,
  onScrollToFeatures,
}) => {
  return (
    <section
      id="beranda"
      className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[18px] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (or Top on Mobile): Text Content */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            
            {/* Small Top Badge / Label */}
            <div
              id="hero-label-badge"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#F3E9E0] text-[#7A5B4C] border border-[#E9DACD] text-[11px] sm:text-[12.5px] font-semibold tracking-wider uppercase transition-transform hover:scale-102"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B07D62]" />
              <span>PENCATAT KEUANGAN KELUARGA & PRIBADI CERDAS</span>
            </div>

            {/* Big Serif Heading with delicate outline heart decoration */}
            <div className="relative">
              <h1
                id="hero-main-heading"
                className="font-serif-display text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[54px] font-semibold text-[#322520] tracking-tight leading-[1.18] sm:leading-[1.16]"
              >
                Hidup Lebih Tenang <br className="hidden sm:inline" />
                dengan{' '}
                <span className="relative inline-block text-[#684D40]">
                  Finansial Terencana
                  {/* Subtle decorative curved underline */}
                  <svg
                    className="absolute left-0 -bottom-1 w-full h-2.5 text-[#D4A373]/50 -z-10"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Delicate outline heart icon next to heading */}
              <div
                className="inline-block align-middle ml-2 sm:ml-3 p-1 sm:p-1.5 rounded-full bg-[#FAF0EC] border border-[#ECD3CC] text-[#C27E86] animate-pulse"
                style={{ animationDuration: '3.5s' }}
                title="Keluarga Bahagia"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-[2]" />
              </div>
            </div>

            {/* Hero Description */}
            <p
              id="hero-description"
              className="text-[#6D5D55] text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.65] max-w-xl font-normal"
            >
              Kami percaya setiap keluarga berhak atas masa depan yang aman dan bebas cemas. Catat pengeluaran harian, kelola pemasukan, dan rencanakan keuangan keluarga dengan lebih mudah.
            </p>

            {/* Two Action Buttons as requested */}
            <div
              id="hero-action-buttons"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-2"
            >
              {/* Button 1: Coba Mode Tamu */}
              <button
                id="btn-coba-mode-tamu"
                onClick={onOpenGuestMode}
                className="h-12 sm:h-13 px-6 sm:px-7 rounded-2xl bg-[#684D40] hover:bg-[#533C31] active:scale-98 text-[#FAF7F2] font-medium text-[15px] sm:text-[16px] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>⚡ Coba Mode Tamu</span>
                <ArrowRight className="w-4 h-4 text-[#ECDACF]" />
              </button>

              {/* Button 2: Pelajari Fitur */}
              <button
                id="btn-pelajari-fitur"
                onClick={onScrollToFeatures}
                className="h-12 sm:h-13 px-6 sm:px-7 rounded-2xl bg-[#FFFFFF] hover:bg-[#F7F2EB] active:scale-98 text-[#4E3F37] border border-[#E7DDD2] font-medium text-[15px] sm:text-[16px] shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pelajari Fitur</span>
              </button>
            </div>

            {/* Trust and reassurance badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#7B6A61]">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#E5ECE6] flex items-center justify-center text-[#4A7251]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Tanpa Biaya Tersembunyi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#E5ECE6] flex items-center justify-center text-[#4A7251]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Privasi Keluarga Terjaga</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#E5ECE6] flex items-center justify-center text-[#4A7251]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Bisa Duet Suami & Istri</span>
              </div>
            </div>

          </div>

          {/* Right Column (or Bottom on Mobile): Big Illustration & Mini-Dashboard */}
          <div className="lg:col-span-6 w-full mt-4 lg:mt-0">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
