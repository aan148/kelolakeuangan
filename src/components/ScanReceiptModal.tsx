import React, { useEffect } from 'react';
import { Sparkles, Camera, X, Clock, Bell } from 'lucide-react';

interface ScanReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScanReceiptModal: React.FC<ScanReceiptModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="scan-receipt-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="scan-receipt-modal-card"
        className="bg-white rounded-3xl border border-[#E5E0D8] shadow-2xl max-w-[440px] w-full p-6 sm:p-7 relative max-h-[95vh] overflow-y-auto"
      >
        {/* Tombol Tutup */}
        <button
          id="btn-close-scan-modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#E8DFD5] flex items-center justify-center text-[#5C4D44] transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon Kamera & Struk yang Estetik */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#FBEBE7] border border-[#F4D3C9] flex items-center justify-center shadow-xs">
              <Camera className="w-8 h-8 text-[#B86B5A]" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#E06D7B] text-white shadow-xs">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Badge Status */}
        <div className="flex justify-center mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF0ED] text-[#C2737D] border border-[#F2D2CB]">
            <Sparkles className="w-3 h-3 text-[#B86B5A]" />
            Dalam Pengembangan • Segera Hadir
          </span>
        </div>

        {/* Judul & Isi Pesan yang Diminta */}
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold text-[#2E241F] tracking-tight mb-2">
            Scan Struk Belanjaan
          </h3>
          <p className="text-[13.5px] sm:text-[14px] text-[#6B5C54] leading-relaxed">
            Fitur Scan Struk Belanjaan sedang kami siapkan dan akan hadir pada pembaruan mendatang! Terima kasih atas kesabaran dan antusiasme Anda.
          </p>
        </div>

        {/* Kotak Rincian yang Menenangkan */}
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE7DE] mb-5 text-left text-xs text-[#7A6B63] space-y-1.5">
          <p className="font-semibold text-[#382B24] flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-[#B86B5A]" />
            Apa yang sedang kami kembangkan?
          </p>
          <p className="leading-relaxed">
            Teknologi pembaca nota otomatis (OCR cerdas) untuk mengenali nominal belanja, tanggal transaksi, dan nama toko secara instan langsung dari foto kamera ponsel Anda.
          </p>
        </div>

        {/* Tombol Tutup Sesuai Permintaan */}
        <button
          id="btn-confirm-scan-modal"
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-[#684D40] hover:bg-[#533C31] active:scale-98 text-white text-xs sm:text-[13.5px] font-semibold shadow-xs transition-all flex items-center justify-center cursor-pointer"
        >
          Mengerti, Terima Kasih
        </button>
      </div>
    </div>
  );
};
