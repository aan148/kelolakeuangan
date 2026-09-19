import React, { useState } from 'react';
import {
  Download,
  Monitor,
  Smartphone,
  Globe,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Laptop,
  Check,
  HardDrive
} from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';

interface DownloadAppSectionProps {
  onOpenWebDemo: () => void;
}

export const DownloadAppSection: React.FC<DownloadAppSectionProps> = ({ onOpenWebDemo }) => {
  const [downloadingOS, setDownloadingOS] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (osId: string, osName: string, filename: string) => {
    setDownloadingOS(osName);
    setDownloadSuccess(null);

    if (osId === 'android') {
      // Trigger unduhan file APK Langsung ke HP
      setTimeout(() => {
        setDownloadingOS(null);
        setDownloadSuccess(osName);

        // Langsung arahkan browser untuk mengunduh berkas APK
        window.location.href = APP_CONFIG.apkDownloadUrl;
      }, 500);
      return;
    }

    setTimeout(() => {
      setDownloadingOS(null);
      setDownloadSuccess(osName);

      // Simulasi trigger download file installer Windows
      const dummyContent = `Aplikasi Keuangan Keluarga - Setup Windows\nVersi: 1.0.0 Stable\nWebsite: https://kelolakeuangan.web.id\nWeb App: ${APP_CONFIG.webAppUrl}\n\nTerima kasih telah mengunduh Aplikasi Keuangan Keluarga!`;
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 1000);
  };

  const platforms = [
    {
      id: 'windows',
      name: 'Windows Desktop',
      badge: 'Installer .exe / MSI',
      icon: Monitor,
      desc: 'Aplikasi desktop Windows 10 & 11 dengan performa cepat, shortcut keyboard, dan mode offline.',
      version: 'v1.0.0 • 64-bit • Siap Pakai',
      fileSize: '48.5 MB',
      filename: 'Aplikasi-Keuangan-Keluarga-Windows-x64.exe',
      popular: true,
    },
    {
      id: 'android',
      name: 'Android Mobile (APK)',
      badge: 'Download APK Gratis',
      icon: Smartphone,
      desc: 'Pasang langsung di HP Android. Mencatat pengeluaran harian kapan saja di genggaman dan sinkron otomatis.',
      version: 'v1.0.0 • Android 8.0+',
      fileSize: '18.2 MB',
      filename: 'Aplikasi-Keuangan-Keluarga.apk',
      popular: false,
    },
    {
      id: 'web',
      name: 'Versi Web (Semua Browser)',
      badge: 'Langsung Buka Tanpa Install',
      icon: Globe,
      desc: 'Buka di Google Chrome, Edge, Safari di laptop Windows, Mac, atau HP tanpa perlu ruang penyimpanan.',
      version: 'Cloud Web App • Selalu Terkini',
      fileSize: '0 MB (Web)',
      popular: false,
      isWeb: true,
    },
  ];

  return (
    <section
      id="mulai-catat-gratis"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE4] to-[#FAF7F2] border-t border-b border-[#EDE3D8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4DC] border border-[#DFCEC2] text-xs font-semibold text-[#7A584A] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B07D62]" />
            <span>Mulai Catat Gratis • Multi Platform</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#382B24] tracking-tight leading-tight">
            Unduh Aplikasi atau Buka Langsung di Web
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#736359] leading-relaxed max-w-2xl mx-auto">
            Pilih cara yang paling nyaman untuk Anda dan pasangan. Tersedia aplikasi desktop untuk Windows, aplikasi mobile Android, dan versi Web praktis yang dapat langsung dibuka dari browser apa pun.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {platforms.map((plat) => {
            const Icon = plat.icon;
            const isDownloading = downloadingOS === plat.name;
            const isDownloaded = downloadSuccess === plat.name;

            return (
              <div
                key={plat.id}
                id={`card-platform-${plat.id}`}
                className={`relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  plat.popular
                    ? 'border-[#B8927F] shadow-[0_12px_36px_rgba(110,80,62,0.12)] ring-2 ring-[#B8927F]/25'
                    : 'border-[#EAE0D5] shadow-[0_4px_20px_rgba(95,73,59,0.04)] hover:shadow-md hover:border-[#DFC8B9]'
                }`}
              >
                {plat.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#684D40] text-white text-[11px] font-semibold tracking-wide shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#EED8CC]" />
                    <span>Rekomendasi Windows</span>
                  </div>
                )}

                <div>
                  {/* Top Platform Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6EFE9] border border-[#EBE0D6] flex items-center justify-center text-[#684D40]">
                      <Icon className="w-6 h-6 text-[#8C5D4B]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF3EC] text-[#7A584A] text-xs font-medium border border-[#EFE2D6]">
                      {plat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#382B24] tracking-tight mb-2">
                    {plat.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#78665C] leading-relaxed mb-5">
                    {plat.desc}
                  </p>

                  {/* Technical Meta Tags */}
                  <div className="space-y-1.5 py-3 border-t border-b border-[#F4EDE5] text-[11.5px] text-[#86756B] mb-6">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span className="font-semibold text-[#4A7251] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Siap Digunakan
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ukuran File:</span>
                      <span className="font-medium text-[#46362F]">{plat.fileSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kesesuaian:</span>
                      <span className="font-medium text-[#46362F]">{plat.version}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div>
                  {plat.isWeb ? (
                    <button
                      id="btn-open-web-app"
                      name="btn-open-web-app"
                      type="button"
                      aria-label="Buka Versi Web Sekarang"
                      onClick={onOpenWebDemo}
                      className="w-full py-3 px-4 rounded-xl bg-[#FAF3EC] hover:bg-[#F0E5DA] text-[#63493D] font-semibold text-xs sm:text-[13px] border border-[#DECBC0] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-xs select-none"
                    >
                      <Globe className="w-4 h-4 text-[#8C5D4B]" />
                      <span>Buka Versi Web Sekarang</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDownload(plat.id, plat.name, plat.filename || 'installer')}
                      disabled={isDownloading}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-xs ${
                        plat.popular
                          ? 'bg-[#684D40] hover:bg-[#523C31] text-white'
                          : 'bg-[#FAF3EC] hover:bg-[#F0E5DA] text-[#63493D] border border-[#DECBC0]'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          <span>Menyiapkan Berkas...</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#759D7B]" />
                          <span>Terunduh! Klik untuk Unduh Ulang</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Unduh & Pasang Sekarang</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Banner Below Cards */}
        <div className="mt-12 max-w-4xl mx-auto bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#E9DFD4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] flex items-center justify-center text-[#476C4D] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#382B24]">
                Semua Versi Terhubung Real-Time & 100% Gratis
              </h4>
              <p className="text-xs text-[#7A6A61] mt-0.5">
                Input di aplikasi Windows laptop, saldo di HP Android otomatis terbarui berkat Cloud Sync terenkripsi.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenWebDemo}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#684D40] hover:bg-[#523C31] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Uji Coba Versi Web</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
