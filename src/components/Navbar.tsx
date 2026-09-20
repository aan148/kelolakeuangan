import React, { useState } from 'react';
import { Search, Menu, X, Heart, Sparkles, ArrowRight, ShieldCheck, LogOut, MessageSquare, User, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';

interface NavbarProps {
  onOpenGuestMode: () => void;
  onOpenSearch: () => void;
  currentUser?: { email: string; name?: string; role?: string } | null;
  onSignOut?: () => void;
  onOpenFeedback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuestMode,
  onOpenSearch,
  currentUser,
  onSignOut,
  onOpenFeedback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Fitur Unggulan', href: '#fitur-unggulan' },
    { label: 'Unduh & Web', href: '#mulai-catat-gratis' },
    { label: 'Keamanan Cloud', href: '#keamanan-cloud' },
    { label: 'Bantuan & Kontak', href: '#bantuan-kontak' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header id="main-header" className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EFE7DE] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Left: Logo & Brand Info */}
            <a
              id="brand-logo-link"
              href="#beranda"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#EAD9CD] to-[#D8B4A6] flex items-center justify-center shadow-xs border border-[#F2E5DC] text-[#63483D] flex-shrink-0 transition-transform group-hover:scale-105">
                <div className="relative">
                  <Heart className="w-5 h-5 text-[#8C5D4B] fill-[#8C5D4B]/20" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8DA491]" />
                </div>
              </div>

              {/* Brand Text & Tagline */}
              <div className="flex flex-col text-left">
                <span className="text-[17px] sm:text-[19px] font-bold tracking-tight text-[#3A2D27] leading-tight flex items-center gap-1.5">
                  KelolaKeuangan
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-[#EFE4DC] text-[#7A584A] font-medium">
                    Keluarga
                  </span>
                </span>
                <span className="text-[11px] sm:text-[12px] text-[#7E6E66] font-normal tracking-wide leading-tight">
                  Keuangan Tenang, Keluarga Senang
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  id={`nav-link-${item.href.replace('#', '')}`}
                  onClick={() => handleLinkClick(item.href)}
                  className="px-3 py-1.5 rounded-lg text-[13.5px] font-medium text-[#5E4F47] hover:text-[#2E241F] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              {onOpenFeedback && (
                <button
                  id="nav-link-feedback"
                  onClick={onOpenFeedback}
                  className="px-3 py-1.5 rounded-lg text-[13.5px] font-medium text-[#7A5B4C] hover:text-[#322520] hover:bg-[#F2ECE4] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Feedback</span>
                </button>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                id="btn-search-trigger"
                onClick={onOpenSearch}
                aria-label="Cari fitur dan bantuan"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#6B5A51] hover:text-[#2E241F] hover:bg-[#F2ECE4] border border-transparent hover:border-[#E8DFD5] transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              {/* Logged in User state or CTA Button */}
              {currentUser ? (
                <div id="nav-user-session" data-testid="signed-in-indicator" className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8DCD1] text-xs">
                    <User className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span id="nav-user-email" data-testid="user-email" className="font-semibold text-[#382B24] max-w-[150px] truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <a
                    id="btn-nav-open-app"
                    href={APP_CONFIG.webAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-[#684D40] hover:bg-[#523C31] text-white text-xs font-medium shadow-2xs transition-all cursor-pointer"
                    title="Buka aplikasi asli Anda"
                  >
                    <span>Buka Aplikasi</span>
                    <ExternalLink className="w-3 h-3 text-[#EAD9CD]" />
                  </a>
                  <button
                    id="btn-nav-sign-out"
                    data-testid="sign-out-btn"
                    aria-label="Sign Out"
                    title="Keluar dari sesi"
                    onClick={onSignOut}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#FFF0EE] hover:bg-[#FCE2DD] text-[#C44D48] text-xs sm:text-[13px] font-semibold border border-[#F5D2CC] transition-all cursor-pointer active:scale-98"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  id="btn-nav-register-desktop"
                  onClick={onOpenGuestMode}
                  className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#684D40] hover:bg-[#553E33] text-[#FAF7F2] text-[13px] sm:text-[14px] font-medium shadow-xs hover:shadow transition-all cursor-pointer active:scale-98"
                >
                  <span>Mulai Catat Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#5A4B43] hover:bg-[#F0E8DF] active:bg-[#E8DDD1] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DDD2] px-5 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
          >
            {currentUser && (
              <div className="p-3 rounded-xl bg-white border border-[#EADBCE] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#382B24] truncate">{currentUser.email}</span>
                <span className="text-[11px] text-[#279B65] font-medium">Sesi Aktif</span>
              </div>
            )}

            <div className="flex flex-col space-y-1 pt-1">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.href)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-[14.5px] font-medium text-[#4D3F37] hover:bg-[#F2ECE3] active:bg-[#EADFCF] transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-[#B8A89C] text-xs">›</span>
                </button>
              ))}
              {onOpenFeedback && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFeedback();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-[14.5px] font-medium text-[#7A5B4C] hover:bg-[#F2ECE3] active:bg-[#EADFCF] transition-colors flex items-center justify-between"
                >
                  <span>Feedback / Beri Saran</span>
                  <span className="text-[#B8A89C] text-xs">›</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-[#EFE7DE] flex flex-col gap-2">
              {currentUser ? (
                <>
                  <a
                    id="btn-mobile-open-app"
                    href={APP_CONFIG.webAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 px-4 rounded-xl bg-[#684D40] text-white text-[14px] font-semibold text-center flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Buka Aplikasi Asli</span>
                    <ExternalLink className="w-4 h-4 text-[#EAD9CD]" />
                  </a>
                  <button
                    id="btn-mobile-sign-out"
                    data-testid="sign-out-btn"
                    aria-label="Sign Out"
                    title="Keluar dari akun"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#FFF0EE] text-[#C44D48] text-[14.5px] font-semibold text-center border border-[#F5D2CC] flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out / Keluar</span>
                  </button>
                </>
              ) : (
                <button
                  id="btn-mobile-register-menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGuestMode();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#684D40] text-[#FAF7F2] text-[14.5px] font-medium text-center shadow-xs flex items-center justify-center gap-2 active:bg-[#523C31]"
                >
                  <span>Mulai Catat Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#8C7A70] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8DA491]" />
                <span>Privat & Bebas Iklan • Siap pakai tanpa unduh</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

