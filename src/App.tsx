import React, { useState } from 'react';
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
import { APP_CONFIG } from './config/appLinks';

export default function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<'login' | 'register'>('login');
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scanNoticeOpen, setScanNoticeOpen] = useState(false);

  // Ketika pengguna mengklik Mulai Catat Gratis atau Mode Tamu:
  // Langsung tampilkan modal Catatan Keuangan (Mode Tamu, Google, Email/Password) sesuai permintaan!
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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E39] selection:bg-[#E8D5C8] selection:text-[#382D28] overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar
        onOpenGuestMode={() => handleOpenLoginModal('login')}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section & Original Family Illustration */}
        <HeroSection
          onOpenGuestMode={() => handleOpenLoginModal('login')}
          onScrollToFeatures={handleScrollToFeatures}
        />

        {/* 2. Three Key Benefit Cards */}
        <BenefitCards onOpenScanNotice={() => setScanNoticeOpen(true)} />

        {/* 3. Section Tentang Kami */}
        <AboutSection onOpenGuestMode={() => handleOpenLoginModal('login')} />

        {/* 4. Section Fitur Unggulan (8 features grid) */}
        <FeaturesSection
          onSelectFeature={() => {}}
          onOpenScanNotice={() => setScanNoticeOpen(true)}
        />

        {/* 5. Section Mulai Catat Gratis: Unduh & Versi Web */}
        <DownloadAppSection onOpenWebDemo={() => handleOpenLoginModal('login')} />

        {/* 6. Section Keamanan Cloud */}
        <CloudSecuritySection />

        {/* 7. Section Bantuan & Kontak / FAQ */}
        <FaqContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenGuestMode={() => handleOpenLoginModal('login')} />

      {/* Modal Tampilan Menu Login & Mode Tamu (Persis Sesuai Gambar yang Diunggah) */}
      <AppLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialTab={loginModalTab}
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
      />

      {/* Modal Pemberitahuan Fitur Scan Struk Belanjaan (Segera Hadir) */}
      <ScanReceiptModal
        isOpen={scanNoticeOpen}
        onClose={() => setScanNoticeOpen(false)}
      />
    </div>
  );
}
