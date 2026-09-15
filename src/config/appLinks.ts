// Konfigurasi tautan aplikasi nyata buatan Anda
export const APP_CONFIG = {
  appName: 'Aplikasi Keuangan Keluarga',
  // URL Web App yang sudah Anda buat di AI Studio
  webAppUrl: 'https://ais-pre-eiwpext6eyfzixe3udwsoe-734293047314.asia-southeast1.run.app',
  // URL unduhan APK untuk HP Android
  apkDownloadUrl: 'https://github.com/aan148/kelolakeuangan/releases/download/v1.0.0/KeuanganKu.apk',
  apkFileName: 'KeuanganKu.apk',
};

/**
 * Deteksi apakah perangkat pengguna adalah smartphone/mobile (Android/iOS)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

/**
 * Aksi Cerdas:
 * - Jika HP: otomatis mendownload APK / membuka link APK
 * - Jika Komputer / Laptop Windows / Mac: otomatis membuka aplikasi web di tab baru
 */
export function openAppForDevice(onMobileFallback?: () => void) {
  if (typeof window === 'undefined') return;

  const isMobile = isMobileDevice();

  if (isMobile) {
    if (onMobileFallback) {
      onMobileFallback();
    } else {
      // Buka unduhan APK untuk pengguna HP
      window.location.href = APP_CONFIG.apkDownloadUrl;
    }
  } else {
    // Buka aplikasi web langsung untuk pengguna Laptop/Windows/Desktop
    window.open(APP_CONFIG.webAppUrl, '_blank', 'noopener,noreferrer');
  }
}
