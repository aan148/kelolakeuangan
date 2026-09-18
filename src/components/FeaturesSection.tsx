import React, { useState } from 'react';
import {
  Camera,
  Target,
  Coins,
  ReceiptText,
  LayoutDashboard,
  LineChart,
  Landmark,
  CalendarDays,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature?: (featureTitle: string) => void;
  onOpenScanNotice?: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature, onOpenScanNotice }) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      id: 'feature-1',
      title: 'Scan Struk Belanja',
      description: 'Ubah foto nota menjadi catatan digital rapi.',
      icon: Camera,
      iconBg: 'bg-[#FBEBE7]',
      iconBorder: 'border-[#F4D3C9]',
      iconColor: 'text-[#B86B5A]',
      highlight: 'Segera Hadir',
      isComingSoon: true,
      detail: 'Deteksi otomatis nominal total, tanggal, dan nama toko dalam hitungan detik.',
    },
    {
      id: 'feature-2',
      title: 'Anggaran & Target',
      description: 'Kendalikan batas pengeluaran agar tidak boros.',
      icon: Target,
      iconBg: 'bg-[#F6EEE7]',
      iconBorder: 'border-[#EAD7C8]',
      iconColor: 'text-[#9C6D54]',
      highlight: 'Notifikasi Cerdas',
      detail: 'Atur pagu belanja dapur, jajan, hingga transportasi dengan peringatan lembut.',
    },
    {
      id: 'feature-3',
      title: 'Pemasukan',
      description: 'Catat dan pantau seluruh pemasukan.',
      icon: Coins,
      iconBg: 'bg-[#EFF5F0]',
      iconBorder: 'border-[#D5E5D7]',
      iconColor: 'text-[#4E7656]',
      highlight: 'Multi Sumber',
      detail: 'Gaji utama, bisnis sampingan, dividen, dan transfer pasangan tercatat jelas.',
    },
    {
      id: 'feature-4',
      title: 'Pengeluaran',
      description: 'Kelola pengeluaran berdasarkan kategori.',
      icon: ReceiptText,
      iconBg: 'bg-[#FAF0ED]',
      iconBorder: 'border-[#EED6CF]',
      iconColor: 'text-[#C2737D]',
      highlight: 'Kategori Lengkap',
      detail: 'Kategori khusus kebutuhan rumah tangga, anak, cicilan, hingga sedekah.',
    },
    {
      id: 'feature-5',
      title: 'Dashboard',
      description: 'Lihat kondisi keuangan secara sederhana.',
      icon: LayoutDashboard,
      iconBg: 'bg-[#F4ECE8]',
      iconBorder: 'border-[#E8D9D2]',
      iconColor: 'text-[#7D5A4A]',
      highlight: 'Visual Bersih',
      detail: 'Sekali lirik, langsung paham sisa dana aman tanpa pusing istilah rumit.',
    },
    {
      id: 'feature-6',
      title: 'Grafik Keuangan',
      description: 'Pantau perkembangan keuangan.',
      icon: LineChart,
      iconBg: 'bg-[#F2EFF6]',
      iconBorder: 'border-[#DFD6E8]',
      iconColor: 'text-[#7D6B9C]',
      highlight: 'Tren Mingguan & Bulanan',
      detail: 'Grafik interaktif yang memperlihatkan tren hemat dan laju tabungan keluarga.',
    },
    {
      id: 'feature-7',
      title: 'Target Tabungan',
      description: 'Buat target keuangan keluarga.',
      icon: Landmark,
      iconBg: 'bg-[#FDF3E7]',
      iconBorder: 'border-[#F8DFC0]',
      iconColor: 'text-[#B88741]',
      highlight: 'Impian Bersama',
      detail: 'Rencanakan dana darurat, DP rumah impian, qurban, atau liburan anak.',
    },
    {
      id: 'feature-8',
      title: 'Riwayat Transaksi',
      description: 'Lihat transaksi berdasarkan waktu.',
      icon: CalendarDays,
      iconBg: 'bg-[#F0F4F6]',
      iconBorder: 'border-[#D4E3E8]',
      iconColor: 'text-[#507A8A]',
      highlight: 'Filter Fleksibel',
      detail: 'Cari catatan pengeluaran lama dengan cepat berdasarkan tanggal atau kata kunci.',
    },
  ];

  return (
    <section id="fitur-unggulan" className="py-12 sm:py-18 lg:py-24 bg-[#FAF7F2]/60">
      <div className="max-w-7xl mx-auto px-[18px] sm:px-6 lg:px-8">
        
        {/* Section Header with delicate decorative line */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="text-[12px] font-semibold tracking-widest text-[#967768] uppercase mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B07D62]" />
            DIBUAT DENGAN CINTA UNTUK KELUARGA
          </span>

          <h2 className="font-serif-display text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-[#322520] tracking-tight">
            Fitur Unggulan
          </h2>

          {/* Delicate decorative line */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-10 h-[2px] rounded-full bg-[#D8BEAD]" />
            <span className="w-2 h-2 rounded-full bg-[#8DA491]" />
            <span className="w-10 h-[2px] rounded-full bg-[#D8BEAD]" />
          </div>

          <p className="mt-3 text-[#705F56] text-[14.5px] sm:text-[16px] max-w-xl">
            Seluruh kebutuhan pencatatan keuangan dirancang sederhana, nyaman dipandang, dan mudah digunakan setiap hari.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            const isSelected = activeFeature === index;

            return (
              <div
                key={feat.id}
                id={feat.id}
                onClick={() => {
                  if (feat.isComingSoon && onOpenScanNotice) {
                    onOpenScanNotice();
                    return;
                  }
                  setActiveFeature(isSelected ? null : index);
                  if (onSelectFeature) onSelectFeature(feat.title);
                }}
                className={`group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B38772] shadow-[0_8px_30px_rgba(110,80,60,0.1)] ring-2 ring-[#B38772]/20'
                    : 'border-[#ECE2D8] shadow-[0_3px_15px_rgba(95,73,59,0.03)] hover:shadow-[0_8px_25px_rgba(95,73,59,0.07)] hover:border-[#DFD1C4]'
                }`}
              >
                <div>
                  {/* Top: Round Icon Badge & Subtle Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${feat.iconBg} ${feat.iconBorder} border transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feat.iconColor}`} />
                    </div>

                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                        feat.isComingSoon
                          ? 'bg-[#FAF0ED] text-[#C2737D] border-[#F2D2CB] font-semibold animate-pulse'
                          : 'bg-[#FAF4ED] text-[#856D60] border-[#EFE7DE]'
                      }`}
                    >
                      {feat.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#352721] mb-1.5 group-hover:text-[#684D40] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#73635B] text-[13.5px] sm:text-[14px] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Additional contextual detail */}
                <div className="mt-4 pt-3 border-t border-[#F6EFE8] flex items-center justify-between text-xs text-[#917E74]">
                  <span className="truncate pr-2">{isSelected ? feat.detail : 'Klik untuk rincian'}</span>
                  <span className={`text-[14px] transition-transform duration-200 ${isSelected ? 'rotate-90 text-[#684D40]' : 'text-[#BFAF9F]'}`}>
                    ›
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
