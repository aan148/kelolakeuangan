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

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('kelolakeuangan_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
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

  // Global keydown listener to guarantee Escape dismisses any open modal or overlay,
  // including search overlays, feedback dialogs (such as "How to leave feedback"), and third-party widgets
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        // Close all React modal states
        setSearchModalOpen(false);
        setLoginModalOpen(false);
        setMobileModalOpen(false);
        setScanNoticeOpen(false);
        setFeedbackModalOpen(false);

        // Find and click any close buttons on the page (e.g. third-party SimpleCommenter or dialogs)
        const closeButtons = document.querySelectorAll<HTMLElement>(
          'button[aria-label="Close"], button[aria-label="close"], button[aria-label*="Close" i], button[aria-label*="Tutup" i], button[data-testid*="close" i], .close-button, .modal-close'
        );
        closeButtons.forEach((btn) => {
          try {
            if (btn.offsetParent !== null || btn.offsetWidth > 0 || btn.offsetHeight > 0) {
              btn.click();
            }
          } catch {
            // ignore
          }
        });

        // Specifically find any dialog or overlay containing "How to leave feedback"
        const dialogs = document.querySelectorAll<HTMLElement>(
          'dialog[open], [role="dialog"], [aria-modal="true"], div[class*="modal"], div[class*="overlay"], div[id*="feedback"], div[class*="feedback"], div[class*="sc-"], div[id*="simplecommenter"]'
        );
        dialogs.forEach((dialog) => {
          try {
            if (dialog.innerText && dialog.innerText.toLowerCase().includes('feedback')) {
              const closeBtn = dialog.querySelector<HTMLElement>('button[aria-label*="close" i], button[aria-label*="tutup" i], button.close, [data-dismiss]');
              if (closeBtn) {
                closeBtn.click();
              } else {
                dialog.style.display = 'none';
              }
            }
          } catch {
            // ignore
          }
        });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, []);

  // Check URL queries on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('login') === 'true' || params.get('auth') === 'login') {
        setLoginModalOpen(true);
      } else if (params.get('feedback') === 'true') {
        setFeedbackModalOpen(true);
      } else if (params.get('search') === 'true') {
        setSearchModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // When user logs in successfully:
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setActiveView('dashboard');
    try {
      localStorage.setItem('kelolakeuangan_auth_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    setCurrentUser(null);
    setActiveView('landing');
    try {
      localStorage.removeItem('kelolakeuangan_auth_user');
    } catch {
      // ignore
    }
  };

  const handleOpenLoginModal = (tab: 'login' | 'register' = 'login') => {
    setLoginModalTab(tab);
    setLoginModalOpen(true);
  };

  const handleScrollToFeatures = () => {
    const el = document.getElementById('fitur-unggulan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'feedback-modal') {
      setFeedbackModalOpen(true);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user is authenticated and active view is dashboard, render the Dashboard view
  if (currentUser && activeView === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E39] selection:bg-[#E8D5C8] selection:text-[#382D28]">
        <DashboardView
          user={currentUser}
          onSignOut={handleSignOut}
          onBackToHome={() => setActiveView('landing')}
        />
        {/* Quick Search Dialog */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onNavigateToSection={handleNavigateSection}
          onOpenScanNotice={() => setScanNoticeOpen(true)}
          onOpenFeedback={() => setFeedbackModalOpen(true)}
        />
        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackModalOpen}
          onClose={() => setFeedbackModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E39] selection:bg-[#E8D5C8] selection:text-[#382D28] overflow-x-hidden">
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

        {/* 1. Hero Section & Original Family Illustration */}
        <HeroSection
          onOpenGuestMode={() => {
            if (currentUser) {
              setActiveView('dashboard');
            } else {
              handleOpenLoginModal('login');
            }
          }}
          onScrollToFeatures={handleScrollToFeatures}
        />

        {/* 2. Three Key Benefit Cards */}
        <BenefitCards onOpenScanNotice={() => setScanNoticeOpen(true)} />

        {/* 3. Section Tentang Kami */}
        <AboutSection
          onOpenGuestMode={() => {
            if (currentUser) {
              setActiveView('dashboard');
            } else {
              handleOpenLoginModal('login');
            }
          }}
        />

        {/* 4. Section Fitur Unggulan (8 features grid) */}
        <FeaturesSection
          onSelectFeature={() => {}}
          onOpenScanNotice={() => setScanNoticeOpen(true)}
        />

        {/* 5. Section Mulai Catat Gratis: Unduh & Versi Web */}
        <DownloadAppSection
          onOpenWebDemo={() => {
            if (currentUser) {
              setActiveView('dashboard');
            } else {
              handleOpenLoginModal('login');
            }
          }}
        />

        {/* 6. Section Keamanan Cloud */}
        <CloudSecuritySection />

        {/* 7. Section Bantuan & Kontak / FAQ */}
        <FaqContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenGuestMode={() => {
          if (currentUser) {
            setActiveView('dashboard');
          } else {
            handleOpenLoginModal('login');
          }
        }}
      />

      {/* Modal Tampilan Menu Login & Mode Tamu */}
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

      {/* Modal Pemberitahuan Fitur Scan Struk Belanjaan (Segera Hadir) */}
      <ScanReceiptModal
        isOpen={scanNoticeOpen}
        onClose={() => setScanNoticeOpen(false)}
      />

      {/* Modal Feedback & Masukan (How to leave feedback) */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}
