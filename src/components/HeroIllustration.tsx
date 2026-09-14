import React, { useState } from 'react';
import {
  TrendingUp,
  Receipt,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Layers,
  Wallet
} from 'lucide-react';
import { AnimatedInputAndChart } from './AnimatedInputAndChart';

export const HeroIllustration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'transaksi'>('ringkasan');

  return (
    <div id="hero-illustration-container" className="relative w-full max-w-[560px] mx-auto lg:max-w-none">
      {/* Soft background ambient glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#F3E5DC]/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#E7EBD9]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Illustration Artboard Container */}
      <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE2] rounded-3xl p-4 sm:p-6 border border-[#ECE0D4] shadow-[0_12px_40px_rgba(115,86,68,0.06)] overflow-hidden">
        
        {/* Top Decorative Header of the illustration frame */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EFE5DA] text-xs text-[#826F64]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8B4B8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5CCA7]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8DA491]" />
            <span className="ml-2 font-medium tracking-wide text-[#6E5A4F] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B07D62]" />
              KelolaKeuangan Family Vault
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#F2E8DF] text-[11px] text-[#7A6458] font-medium">
            Status: Tenang & Terkendali
          </span>
        </div>

        {/* Vector SVG Scene: Warm Family, Cozy Home & Smart Financial Tree */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Ilustrasi keluarga bahagia mengelola keuangan bersama dengan tenang"
          >
            <defs>
              <linearGradient id="warmSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE8D3" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F7D6B9" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B37D64" />
                <stop offset="100%" stopColor="#8C5844" />
              </linearGradient>
              <linearGradient id="sofaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EFE3D8" />
                <stop offset="100%" stopColor="#DFCEBF" />
              </linearGradient>
              <linearGradient id="plantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9BB59F" />
                <stop offset="100%" stopColor="#759379" />
              </linearGradient>
              <linearGradient id="skinGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D0B5" />
                <stop offset="100%" stopColor="#E5B796" />
              </linearGradient>
              <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C97A7E" />
                <stop offset="50%" stopColor="#C7926B" />
                <stop offset="100%" stopColor="#7B9D80" />
              </linearGradient>
            </defs>

            {/* Ambient Background Shapes: Soft Sun & Clouds */}
            <circle cx="300" cy="140" r="120" fill="url(#warmSunGrad)" />
            <circle cx="100" cy="70" r="35" fill="#FAF1E6" />
            <circle cx="130" cy="65" r="45" fill="#FAF1E6" />
            <circle cx="170" cy="75" r="30" fill="#FAF1E6" />
            
            {/* Little Home Shape in background */}
            <g opacity="0.85">
              <path d="M470 140 L530 90 L590 140 Z" fill="url(#roofGrad)" />
              <rect x="485" y="140" width="90" height="95" rx="6" fill="#FDFBF8" stroke="#E5D6C7" strokeWidth="2" />
              {/* Window */}
              <rect x="500" y="155" width="25" height="25" rx="4" fill="#FDEBD8" stroke="#D8C3B0" strokeWidth="1.5" />
              <rect x="535" y="155" width="25" height="25" rx="4" fill="#FDEBD8" stroke="#D8C3B0" strokeWidth="1.5" />
              {/* Door with soft warm brown */}
              <rect x="520" y="195" width="20" height="40" rx="3" fill="#A87961" />
              {/* Chimney */}
              <rect x="555" y="95" width="14" height="28" rx="2" fill="#8C5844" />
              {/* Little plant by house */}
              <path d="M465 235 C460 215 475 200 480 235 Z" fill="url(#plantGrad)" />
            </g>

            {/* Soft Living Room Floor & Rug */}
            <ellipse cx="300" cy="275" rx="260" ry="45" fill="#EFE5DB" opacity="0.6" />
            <ellipse cx="300" cy="275" rx="220" ry="32" fill="#FBF8F4" stroke="#E6D7C8" strokeWidth="1.5" strokeDasharray="6 4" />

            {/* Potted Fiddle Leaf Fig Plant (Left side) */}
            <g id="potted-plant">
              <path d="M45 285 L55 240 L85 240 L95 285 Z" fill="#C29D84" stroke="#A78269" strokeWidth="1.5" />
              <path d="M70 240 Q70 190 60 160" stroke="#5E7D63" strokeWidth="4" strokeLinecap="round" />
              <path d="M70 215 Q50 195 40 195 C35 205 55 225 70 218" fill="url(#plantGrad)" />
              <path d="M70 185 Q88 170 95 175 C95 185 80 200 68 190" fill="url(#plantGrad)" />
              <path d="M60 160 Q40 135 48 130 C58 132 68 150 60 160" fill="url(#plantGrad)" />
              <path d="M60 160 Q75 140 85 142 C85 152 70 165 60 160" fill="url(#plantGrad)" />
            </g>

            {/* Cozy Modern Sofa */}
            <g id="cozy-sofa">
              {/* Backrest */}
              <rect x="150" y="165" width="300" height="90" rx="26" fill="url(#sofaGrad)" stroke="#D4C1B0" strokeWidth="2" />
              {/* Armrests */}
              <rect x="135" y="195" width="35" height="65" rx="16" fill="#DFCEBF" stroke="#CAAFAA" strokeWidth="1.5" />
              <rect x="430" y="195" width="35" height="65" rx="16" fill="#DFCEBF" stroke="#CAAFAA" strokeWidth="1.5" />
              {/* Cushions */}
              <rect x="170" y="210" width="125" height="48" rx="14" fill="#F7EFE8" stroke="#DDCBC0" strokeWidth="1.5" />
              <rect x="305" y="210" width="125" height="48" rx="14" fill="#F7EFE8" stroke="#DDCBC0" strokeWidth="1.5" />
              {/* Soft decorative throw pillow */}
              <rect x="180" y="185" width="40" height="40" rx="10" transform="rotate(-15 180 185)" fill="#E2A9B0" opacity="0.9" />
              <rect x="380" y="185" width="40" height="40" rx="10" transform="rotate(15 380 185)" fill="#9BB59F" opacity="0.8" />
            </g>

            {/* Characters: Husband & Wife sitting comfortably */}
            {/* Wife (Left) */}
            <g id="wife-character">
              {/* Torso & Warm Knit Sweater (Dusty Rose) */}
              <path d="M205 180 Q230 180 245 220 L190 220 Z" fill="#DFAEB3" />
              {/* Arms holding a tablet/phone */}
              <path d="M200 190 Q215 210 238 212" stroke="#DFAEB3" strokeWidth="14" strokeLinecap="round" />
              <circle cx="238" cy="212" r="6" fill="url(#skinGrad1)" />
              {/* Neck & Head */}
              <rect x="212" y="152" width="12" height="15" fill="url(#skinGrad1)" rx="4" />
              <circle cx="218" cy="142" r="18" fill="url(#skinGrad1)" />
              {/* Hair (Soft dark brown, elegant bun) */}
              <circle cx="218" cy="138" r="19" fill="#4A342B" />
              <circle cx="225" cy="122" r="10" fill="#4A342B" />
              {/* Face features: Peaceful smile */}
              <path d="M222 143 Q226 148 230 143" stroke="#684537" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="225" cy="138" r="1.5" fill="#4A342B" />
              {/* Small blush */}
              <ellipse cx="228" cy="143" rx="3" ry="1.5" fill="#E8A7AF" />
            </g>

            {/* Husband (Right) */}
            <g id="husband-character">
              {/* Torso in Soft Brown / Oatmeal Knit */}
              <path d="M340 175 Q365 175 385 220 L325 220 Z" fill="#8C6856" />
              {/* Arm leaning companionably */}
              <path d="M340 188 Q320 205 285 210" stroke="#8C6856" strokeWidth="14" strokeLinecap="round" />
              <circle cx="285" cy="210" r="6" fill="url(#skinGrad1)" />
              {/* Neck & Head */}
              <rect x="352" y="148" width="14" height="15" fill="url(#skinGrad1)" rx="4" />
              <circle cx="359" cy="136" r="19" fill="url(#skinGrad1)" />
              {/* Hair (Modern clean side-part) */}
              <path d="M340 134 Q358 116 376 128 C375 142 355 138 340 134 Z" fill="#3D2B24" />
              {/* Face features: warm smile */}
              <path d="M346 141 Q350 146 354 141" stroke="#52382D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="349" cy="136" r="1.5" fill="#3D2B24" />
              <ellipse cx="346" cy="142" rx="3" ry="1.5" fill="#E2A69A" />
            </g>

            {/* Shared Digital Tablet between them displaying the Green Growing Chart */}
            <g id="family-tablet">
              <rect x="245" y="185" width="80" height="56" rx="8" fill="#2D221D" stroke="#E3D1C2" strokeWidth="2" />
              <rect x="248" y="188" width="74" height="50" rx="6" fill="#FDFBF8" />
              {/* Mini chart in tablet */}
              <path d="M254 225 L268 215 L285 220 L300 200 L314 195" fill="none" stroke="url(#chartLineGrad)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="314" cy="195" r="3" fill="#759379" />
              {/* Mini heart on tablet */}
              <path d="M295 192 C295 190 293 189 291 190 C289 189 287 190 287 192 C287 195 291 198 291 198 C291 198 295 195 295 192 Z" fill="#DFAEB3" />
            </g>

            {/* Floating Family Financial Elements around the scene */}
            {/* 1. Shield Check - Keamanan Cloud */}
            <g id="float-shield" className="animate-bounce" style={{ animationDuration: '4s' }}>
              <rect x="100" y="90" width="38" height="38" rx="12" fill="#FFFFFF" stroke="#E8DFD5" strokeWidth="1.5" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.04))" />
              <path d="M119 98 L129 102 C129 112 119 118 119 118 C119 118 109 112 109 102 Z" fill="#8DA491" opacity="0.25" stroke="#759379" strokeWidth="1.5" />
              <path d="M115 107 L118 110 L124 104" stroke="#5E7D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* 2. Floating Heart (Keluarga Senang) */}
            <g id="float-heart">
              <circle cx="300" cy="100" r="16" fill="#FFF0F2" stroke="#F0D5D8" strokeWidth="1.5" />
              <path d="M300 106 C296 102 292 98 292 95 C292 92.5 294 91 296.5 91 C298.5 91 300 92.5 300 92.5 C300 92.5 301.5 91 303.5 91 C306 91 308 92.5 308 95 C308 98 304 102 300 106 Z" fill="#D48C94" />
            </g>

            {/* 3. Floating Savings Growth Badge (Right) */}
            <g id="float-growth" className="animate-pulse" style={{ animationDuration: '3s' }}>
              <rect x="420" y="65" width="105" height="36" rx="18" fill="#FFFFFF" stroke="#E8DED3" strokeWidth="1.5" filter="drop-shadow(0 4px 12px rgba(110,80,60,0.06))" />
              <circle cx="438" cy="83" r="11" fill="#E8F1E9" />
              <path d="M434 85 L442 79 M442 79 H437 M442 79 V84" stroke="#5E7D63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="455" y="81" fill="#42342D" fontSize="10" fontWeight="bold" fontFamily="system-ui">Tabungan +18%</text>
              <text x="455" y="92" fill="#88766C" fontSize="8" fontFamily="system-ui">Target Tercapai</text>
            </g>

            {/* 4. Little Sprouts / Golden Coin Seed (Center bottom) */}
            <g id="sprout-pot">
              <ellipse cx="300" cy="272" rx="16" ry="5" fill="#CBB7A6" />
              <circle cx="300" cy="265" r="10" fill="#E9BE78" stroke="#CA9E56" strokeWidth="1.5" />
              <text x="300" y="269" fill="#825C1F" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">Rp</text>
              <path d="M300 255 Q293 245 292 240 Q300 242 300 255" fill="#759379" />
              <path d="M300 255 Q307 245 308 240 Q300 242 300 255" fill="#8DA491" />
            </g>
          </svg>
        </div>

        {/* Interactive Animated Input and Live Financial Chart */}
        <AnimatedInputAndChart />

      </div>
    </div>
  );
};
