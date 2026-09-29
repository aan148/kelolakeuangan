import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitCards } from './components/BenefitCards';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CloudSecuritySection } from './components/CloudSecuritySection';
import { FaqContactSection } from './components/FaqContactSection';
import { DownloadAppSection } from './components/DownloadAppSection';
import { Footer } from './components/Footer';
import { AppLoginModal } from './components/AppLoginModal';
import { MobileDownloadModal } from './components/MobileDownloadModal';
import { SearchModal } from './components/SearchModal';
import { ScanReceiptModal } from './components/ScanReceiptModal';
import { FeedbackModal } from './components/FeedbackModal';
import { DashboardView, AuthUser } from './components/DashboardView';
import { CheckCircle2, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { APP_CONFIG } from './config/appLinks';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('kelolakeuangan_auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<'login' | 'register'>('login');
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scanNoticeOpen, setScanNoticeOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  // Global keydown listener to dismiss modal with Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        setSearchModalOpen(false);
        setLoginModalOpen(false);
        setMobileModalOpen(false);
        setScanNoticeOpen(false);
        setFeedbackModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, []);

  // Check URL queries on mount (e.g. ?action=scan)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('action') === 'scan' || params.get('scan') === 'true') {
        setScanNoticeOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Buka modal login aplikasi catatan keuangan
  const handleOpenLoginModal = (tab: 'login' | 'register' = 'login') => {
    setLoginModalTab(tab);
    setLoginModalOpen(true);
  };

  // Berhasil login
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setActiveView('dashboard');
    setWelcomeToast(`👋 Selamat datang! Berhasil masuk sebagai ${user?.email || 'pengguna'}`);
    setTimeout(() => {
      setWelcomeToast(null);
    }, 4500);
  };

  // Keluar akun
  const handleSignOut = () => {
    setCurrentUser(null);
    setActiveView('landing');
    try {
      localStorage.removeItem('kelolakeuangan_auth_user');
    } catch {
      // ignore
    }
  };

  // Smooth scroll
  const handleScrollToFeatures = () => {
    const el = document.getElementById('fitur');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Tampilan Dashboard (Jika pengguna sudah login & sedang berada di dashboard)
  if (activeView === 'dashboard' && currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E39] selection:bg-[#E8D5C8] selection:text-[#382D28]">
        {/* Floating Welcome Toast */}
        {welcomeToast && (
          <div className="fixed top-5 right-5 z-50 max-w-md bg-white border border-[#279B65]/30 rounded-2xl p-4 shadow-lg shadow-[#279B65]/10 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-8 h-8 rounded-xl bg-[#EDF8F1] text-[#279B65] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 pr-1">
              <p className="text-xs sm:text-sm font-semibold text-[#2D3F33]">
                Autentikasi Berhasil
              </p>
              <p className="text-xs text-[#527258] mt-0.5 leading-relaxed">
                {welcomeToast}
              </p>
            </div>
            <button
              onClick={() => setWelcomeToast(null)}
              className="text-[#88A890] hover:text-[#2D3F33] p-1 rounded-lg"
              aria-label="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <DashboardView
          user={currentUser}
          onSignOut={handleSignOut}
          onBackToHome={() => setActiveView('landing')}
          onOpenScanReceipt={() => setScanNoticeOpen(true)}
        />

        {/* Quick Search Dialog */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onNavigateToSection={handleNavigateSection}
          onOpenScanNotice={() => setScanNoticeOpen(true)}
          onOpenFeedback={() => setFeedbackModalOpen(true)}
        />

        {/* Modal Pindai Struk Belanjaan AI */}
        <ScanReceiptModal
          isOpen={scanNoticeOpen}
          onClose={() => setScanNoticeOpen(false)}
          onOpenDashboard={() => setActiveView('dashboard')}
          onTransactionSaved={(tx) => {
            if (!tx) return;
            const cat = tx.category || 'Belanja';
            const amt = typeof tx.amount === 'number' ? tx.amount.toLocaleString('id-ID') : '0';
            setWelcomeToast(`Struk belanja ${cat} senilai Rp ${amt} berhasil dicatat!`);
            setTimeout(() => setWelcomeToast(null), 5000);
          }}
        />

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackModalOpen}
          onClose={() => setFeedbackModalOpen(false)}
        />
      </div>
    );
  }

  // 2. Tampilan Web Asli Tetap Seperti Semula (Landing Page Lengkap)
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E39] selection:bg-[#E8D5C8] selection:text-[#382D28] overflow-x-hidden">
      {/* Floating Welcome Toast */}
      {welcomeToast && (
        <div className="fixed top-5 right-5 z-50 max-w-md bg-white border border-[#279B65]/30 rounded-2xl p-4 shadow-lg shadow-[#279B65]/10 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-[#EDF8F1] text-[#279B65] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-1">
            <p className="text-xs sm:text-sm font-semibold text-[#2D3F33]">
              Autentikasi Berhasil
            </p>
            <p className="text-xs text-[#527258] mt-0.5 leading-relaxed">
              {welcomeToast}
            </p>
          </div>
          <button
            onClick={() => setWelcomeToast(null)}
            className="text-[#88A890] hover:text-[#2D3F33] p-1 rounded-lg"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Quick Action: Open Dashboard if user is logged in */}
      {currentUser && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2.5 rounded-full bg-[#684D40] hover:bg-[#523C31] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#684D40]/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
            title="Buka Dasbor Kas Keluarga Anda"
          >
            <LayoutDashboard className="w-4 h-4 text-[#FFD79E]" />
            <span>Dashboard Saya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenGuestMode={() => handleOpenLoginModal('login')}
        onOpenSearch={() => setSearchModalOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* If user is logged in, show an authenticated dashboard quick access banner */}
        {currentUser && (
          <div
            id="auth-status-banner"
            data-testid="signed-in-indicator"
            className="bg-[#FAF0EC] border-b border-[#F0D5CA] px-4 py-2.5 text-center flex items-center justify-center gap-3 text-xs sm:text-sm text-[#6E493D]"
          >
            <span>
              Signed in as <strong id="banner-user-email" data-testid="user-email">{currentUser.email}</strong>
            </span>
            <button
              id="btn-open-dashboard-view"
              onClick={() => setActiveView('dashboard')}
              className="px-3 py-1 rounded-lg bg-[#684D40] text-white font-medium hover:bg-[#523C31] transition-colors cursor-pointer text-xs"
            >
              Buka Dashboard
            </button>
            <button
              id="btn-banner-sign-out"
              data-testid="sign-out-btn"
              aria-label="Sign Out"
              title="Keluar dari akun"
              onClick={handleSignOut}
              className="text-[#C44D48] hover:underline font-semibold cursor-pointer text-xs"
            >
              Sign Out / Keluar
            </button>
          </div>
        )}

        {/* 1. Hero Section & Original Family Illustration:
            Ketika klik "Mulai Catat Gratis" / "Coba Aplikasi", langsung buka Modal Login Catatan Keuangan */}
        <HeroSection
          onOpenGuestMode={() => handleOpenLoginModal('login')}
          onScrollToFeatures={handleScrollToFeatures}
          onOpenScanReceipt={() => setScanNoticeOpen(true)}
        />

        {/* 2. Three Key Benefit Cards */}
        <BenefitCards onOpenScanNotice={() => setScanNoticeOpen(true)} />

        {/* 3. Section Tentang Kami */}
        <AboutSection
          onOpenGuestMode={() => handleOpenLoginModal('login')}
        />

        {/* 4. Section Fitur Unggulan (8 features grid) */}
        <FeaturesSection
          onSelectFeature={() => {}}
          onOpenScanNotice={() => setScanNoticeOpen(true)}
        />

        {/* 5. Section Mulai Catat Gratis: Unduh & Versi Web */}
        <DownloadAppSection
          onOpenWebDemo={() => handleOpenLoginModal('login')}
        />

        {/* 6. Section Keamanan Cloud */}
        <CloudSecuritySection />

        {/* 7. Section Bantuan & Kontak / FAQ */}
        <FaqContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenGuestMode={() => handleOpenLoginModal('login')}
      />

      {/* Modal Login Aplikasi Catatan Keuangan & Google Auth (catatankeuangan-c7a98) */}
      <AppLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialTab={loginModalTab}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Pop-up dialog untuk unduh APK */}
      <MobileDownloadModal
        isOpen={mobileModalOpen}
        onClose={() => setMobileModalOpen(false)}
      />

      {/* Quick Search Dialog */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateToSection={handleNavigateSection}
        onOpenScanNotice={() => setScanNoticeOpen(true)}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
      />

      {/* Modal Pindai Struk Belanjaan AI */}
      <ScanReceiptModal
        isOpen={scanNoticeOpen}
        onClose={() => setScanNoticeOpen(false)}
        onOpenDashboard={() => setActiveView('dashboard')}
        onTransactionSaved={(tx) => {
          if (!tx) return;
          const cat = tx.category || 'Belanja';
          const amt = typeof tx.amount === 'number' ? tx.amount.toLocaleString('id-ID') : '0';
          setWelcomeToast(`Struk belanja ${cat} senilai Rp ${amt} berhasil dicatat!`);
          setTimeout(() => setWelcomeToast(null), 5000);
        }}
      />

      {/* Modal Feedback & Masukan */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}
