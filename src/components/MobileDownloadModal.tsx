import React, { useEffect } from 'react';
import {
  X,
  Smartphone,
  Monitor,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDownloadModal: React.FC<MobileDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown, true);
    }
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    // Membuka unduhan langsung berkas APK tanpa tab kosong
    window.location.href = APP_CONFIG.apkDownloadUrl;
    onClose();
  };

  const handleOpenWebAnyway = () => {
    window.open(APP_CONFIG.webAppUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      id="mobile-download-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Unduh Aplikasi Android APK"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B211C]/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DACD] shadow-2xl max-w-md w-full p-6 sm:p-7 relative">
        {/* Close Button */}
        <button
          id="btn-close-mobile-modal"
          data-testid="close-mobile-modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE4D9] hover:bg-[#E2D2C4] flex items-center justify-center text-[#5C4B42] transition-colors cursor-pointer"
          aria-label="Close"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4DC] border border-[#DFCEC2] text-xs font-semibold text-[#7A584A] mb-3">
          <Smartphone className="w-3.5 h-3.5 text-[#B07D62]" />
          <span>Pengguna Smartphone Terdeteksi</span>
        </div>

        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#382A24] mb-2">
          Unduh {APP_CONFIG.appName} (.APK)
        </h3>

        <p className="text-xs sm:text-[13.5px] text-[#736359] leading-relaxed mb-5">
          Untuk kenyamanan terbaik di ponsel Anda, gunakan aplikasi Android (.apk) agar pencatatan keuangan keluarga bisa diakses cepat, offline, dan bebas hambatan.
        </p>

        {/* Info Box */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DCD0] shadow-2xs space-y-2.5 mb-5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#86756C]">Format Berkas:</span>
            <span className="font-semibold text-[#382B24]">Android APK (.apk)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#86756C]">Kompatibilitas:</span>
            <span className="font-medium text-[#382B24]">Android 8.0 ke atas</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#86756C]">Keamanan:</span>
            <span className="font-semibold text-[#4A7251] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Bersih & Aman
            </span>
          </div>
        </div>

        {/* Main Action: Download APK */}
        <button
          type="button"
          onClick={handleDownloadApk}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#684D40] hover:bg-[#523C31] active:scale-98 text-[#FAF7F2] font-semibold text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer mb-3"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Aplikasi APK Sekarang</span>
        </button>

        {/* Alternative: Open Web App Anyway */}
        <button
          type="button"
          onClick={handleOpenWebAnyway}
          className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-[#F0E6DD] text-[#7A584A] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Atau tetap buka versi Web di browser HP</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
