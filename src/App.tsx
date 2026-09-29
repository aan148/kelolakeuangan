import React, { useState, useEffect } from 'react';
import { AppLoginPage } from './components/AppLoginPage';
import { DashboardView, AuthUser } from './components/DashboardView';
import { ScanReceiptModal } from './components/ScanReceiptModal';
import { CheckCircle2, X } from 'lucide-react';

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

  const [scanNoticeOpen, setScanNoticeOpen] = useState(false);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

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

  // When user logs in successfully:
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setWelcomeToast(`👋 Selamat datang! Anda berhasil masuk sebagai ${user?.email || 'pengguna'}`);
    setTimeout(() => {
      setWelcomeToast(null);
    }, 4500);
    try {
      localStorage.setItem('kelolakeuangan_auth_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  // Sign out handler -> langsung kembali ke halaman login aplikasi
  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('kelolakeuangan_auth_user');
    } catch {
      // ignore
    }
  };

  // 1. Jika pengguna BELUM login: LANGSUNG TAMPILKAN HALAMAN LOGIN APLIKASI
  if (!currentUser) {
    return (
      <AppLoginPage onLoginSuccess={handleLoginSuccess} />
    );
  }

  // 2. Jika pengguna SUDAH login: LANGSUNG TAMPILKAN DASHBOARD APLIKASI
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

      {/* Main App Dashboard */}
      <DashboardView
        user={currentUser}
        onSignOut={handleSignOut}
        onOpenScanReceipt={() => setScanNoticeOpen(true)}
      />

      {/* Modal Pindai Struk Belanjaan AI */}
      <ScanReceiptModal
        isOpen={scanNoticeOpen}
        onClose={() => setScanNoticeOpen(false)}
        onTransactionSaved={(tx) => {
          if (!tx) return;
          const cat = tx.category || 'Belanja';
          const amt = typeof tx.amount === 'number' ? tx.amount.toLocaleString('id-ID') : '0';
          setWelcomeToast(`Struk belanja ${cat} senilai Rp ${amt} berhasil dicatat!`);
          setTimeout(() => setWelcomeToast(null), 5000);
        }}
      />
    </div>
  );
}
