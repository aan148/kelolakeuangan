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
import { InteractiveGuestModal } from './components/InteractiveGuestModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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
        onOpenGuestMode={() => setGuestModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section & Original Family Illustration */}
        <HeroSection
          onOpenGuestMode={() => setGuestModalOpen(true)}
          onScrollToFeatures={handleScrollToFeatures}
        />

        {/* 2. Three Key Benefit Cards */}
        <BenefitCards />

        {/* 3. Section Tentang Kami */}
        <AboutSection onOpenGuestMode={() => setGuestModalOpen(true)} />

        {/* 4. Section Fitur Unggulan (8 features grid) */}
        <FeaturesSection onSelectFeature={() => {}} />

        {/* 5. Section Mulai Catat Gratis: Unduh & Versi Web */}
        <DownloadAppSection onOpenWebDemo={() => setGuestModalOpen(true)} />

        {/* 6. Section Keamanan Cloud */}
        <CloudSecuritySection />

        {/* 7. Section Bantuan & Kontak / FAQ */}
        <FaqContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenGuestMode={() => setGuestModalOpen(true)} />

      {/* Interactive Guest Mode Preview Modal */}
      <InteractiveGuestModal
        isOpen={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
      />

      {/* Quick Search Dialog */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateToSection={handleNavigateSection}
      />
    </div>
  );
}
