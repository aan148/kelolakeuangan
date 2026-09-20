import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Camera, Target, Coins, ShieldCheck, Heart, FileText, Download, Monitor } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenScanNotice?: () => void;
  onOpenFeedback?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
  onOpenScanNotice,
  onOpenFeedback,
}) => {
  const [query, setQuery] = useState('');

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

  const searchableItems = [
    { title: 'Beri Masukan & Saran (How to leave feedback)', category: 'Feedback', sectionId: 'feedback-modal', icon: FileText, isFeedback: true },
    { title: 'Unduh Aplikasi & Versi Web (Windows / Android)', category: 'Download', sectionId: 'mulai-catat-gratis', icon: Download },
    { title: 'Aplikasi Windows Desktop (.exe / MSI)', category: 'Download', sectionId: 'mulai-catat-gratis', icon: Monitor },
    { title: 'Scan Struk Belanja Otomatis (Segera Hadir)', category: 'Fitur', sectionId: 'fitur-unggulan', icon: Camera, isScanNotice: true },
    { title: 'Anggaran & Target Belanja', category: 'Fitur', sectionId: 'fitur-unggulan', icon: Target },
    { title: 'Sinkronisasi Suami & Istri', category: 'Fitur', sectionId: 'benefit-cards-section', icon: Heart },
    { title: 'Pencatatan Pemasukan Keluarga', category: 'Fitur', sectionId: 'fitur-unggulan', icon: Coins },
    { title: 'Enkripsi & Keamanan Cloud', category: 'Keamanan', sectionId: 'keamanan-cloud', icon: ShieldCheck },
    { title: 'Filosofi & Tentang KelolaKeuangan', category: 'Tentang', sectionId: 'tentang-kami', icon: FileText },
    { title: 'Pertanyaan Sering Diajukan (FAQ)', category: 'Bantuan', sectionId: 'bantuan-kontak', icon: Search },
  ];

  const filtered = searchableItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Cepat"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2B211C]/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DACD] shadow-2xl max-w-lg w-full overflow-hidden p-4 sm:p-5 relative">
        {/* Search Input */}
        <div className="relative flex items-center mb-3">
          <Search className="absolute left-3.5 w-4 h-4 text-[#8C7A70]" />
          <input
            type="text"
            autoFocus
            placeholder="Cari fitur, keamanan, bantuan, feedback..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-[#E5D5C8] text-sm text-[#382B24] placeholder-[#9E8E84] focus:outline-none focus:border-[#7A5B4C] shadow-xs"
          />
          <button
            id="btn-close-search"
            data-testid="close-search-modal"
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="absolute right-3 text-[#8C7A70] hover:text-[#382B24] p-1.5 rounded-full hover:bg-[#F2ECE4] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    onClose();
                    if (item.isFeedback && onOpenFeedback) {
                      onOpenFeedback();
                    } else if (item.isScanNotice && onOpenScanNotice) {
                      onOpenScanNotice();
                    } else {
                      onNavigateToSection(item.sectionId);
                    }
                  }}
                  className="w-full p-3 rounded-xl bg-white hover:bg-[#F5EFE7] text-left border border-[#EFE5DA] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF2EB] flex items-center justify-center text-[#7E5E50]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#382B24] block group-hover:text-[#684D40]">
                        {item.title}
                      </span>
                      <span className="text-[10.5px] text-[#8C7B71]">
                        Kategori: {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A69387] group-hover:text-[#684D40] group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })
          ) : (
            <div className="text-center py-6 text-xs text-[#8C7A70]">
              Tidak ada hasil yang cocok dengan &quot;{query}&quot;
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-[#EFE7DE] flex items-center justify-between text-[11px] text-[#9A897F]">
          <span>Tekan ESC untuk menutup</span>
          <span>KelolaKeuangan</span>
        </div>
      </div>
    </div>
  );
};
