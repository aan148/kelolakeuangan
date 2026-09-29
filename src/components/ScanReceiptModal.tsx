import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Store,
  Calendar,
  Tag,
  DollarSign,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Info,
  Check,
} from 'lucide-react';
import { SAMPLE_RECEIPTS, SampleReceipt } from '../utils/sampleReceipts';

interface ScannedItem {
  name: string;
  price?: number;
  quantity?: number;
}

interface ScannedReceiptData {
  merchantName: string;
  date?: string;
  totalAmount: number;
  category: string;
  items?: ScannedItem[];
  notes?: string;
  confidence?: string;
}

interface ScanReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionSaved?: (transaction: any) => void;
  onOpenDashboard?: () => void;
}

const CATEGORY_OPTIONS = [
  'Belanja Dapur',
  'Makanan & Belanja',
  'Transportasi & Bensin',
  'Listrik & Utilitas',
  'Kesehatan & Obat',
  'Pendidikan Anak',
  'Lain-lain',
];

export const ScanReceiptModal: React.FC<ScanReceiptModalProps> = ({
  isOpen,
  onClose,
  onTransactionSaved,
  onOpenDashboard,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<ScannedReceiptData | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form edit states for verification
  const [merchantName, setMerchantName] = useState('');
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [category, setCategory] = useState('Belanja Dapur');
  const [notes, setNotes] = useState('');

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keyboard escape listener
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

  // Reset states when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setIsScanning(false);
      setErrorMessage(null);
      setScannedData(null);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Process image with Gemini AI
  const processReceiptImage = async (dataUri: string, detectedMime: string) => {
    setIsScanning(true);
    setErrorMessage(null);
    setScannedData(null);
    setSavedSuccess(false);
    setScanStep('Mengunggah foto & menyiapkan analisis...');

    try {
      const stepTimer1 = setTimeout(() => {
        setScanStep('Membaca tulisan pada struk belanja...');
      }, 900);
      const stepTimer2 = setTimeout(() => {
        setScanStep('Menghitung total belanja & mengenali item...');
      }, 2000);

      const response = await fetch('/api/scan-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: dataUri,
          mimeType: detectedMime,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Gagal memproses struk belanja.');
      }

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error('Data struk tidak dapat dikenali secara lengkap.');
      }

      const data: ScannedReceiptData = result.data;
      setScannedData(data);
      setMerchantName(data.merchantName || 'Toko Belanja');
      setDate(data.date || new Date().toISOString().split('T')[0]);
      setTotalAmount(Number(data.totalAmount) || 0);
      setCategory(
        CATEGORY_OPTIONS.includes(data.category) ? data.category : 'Belanja Dapur'
      );
      setNotes(data.notes || '');
    } catch (err: any) {
      console.error('Scan error:', err);
      setErrorMessage(
        err.message || 'Terjadi kendala saat membaca struk. Pastikan foto jelas dan coba lagi.'
      );
    } finally {
      setIsScanning(false);
      setScanStep('');
    }
  };

  // Handle local file selection (camera or gallery)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileMime = file.type || 'image/jpeg';
    setMimeType(fileMime);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setSelectedImage(result);
        processReceiptImage(result, fileMime);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle sample receipt selection
  const handleSelectSample = (sample: SampleReceipt) => {
    setSelectedImage(sample.svgDataUri);
    setMimeType('image/svg+xml');
    processReceiptImage(sample.svgDataUri, 'image/svg+xml');
  };

  // Save to kas / transactions
  const handleSaveToTransactions = () => {
    if (!totalAmount || totalAmount <= 0) {
      setErrorMessage('Nominal belanja tidak valid.');
      return;
    }

    const newTransaction = {
      id: `tx-scan-${Date.now()}`,
      type: 'expense',
      category: category || 'Belanja Dapur',
      amount: totalAmount,
      description: `[Struk] ${merchantName || 'Belanja'} ${notes ? `• ${notes}` : ''}`.trim(),
      date: date || new Date().toISOString().split('T')[0],
    };

    try {
      const existing = localStorage.getItem('kelolakeuangan_transactions');
      const txs = existing ? JSON.parse(existing) : [];
      txs.unshift(newTransaction);
      localStorage.setItem('kelolakeuangan_transactions', JSON.stringify(txs));
      window.dispatchEvent(new Event('transaction_updated'));

      if (onTransactionSaved) {
        onTransactionSaved(newTransaction);
      }
      setSavedSuccess(true);
    } catch (e) {
      console.error('Save error:', e);
      setErrorMessage('Gagal menyimpan transaksi ke memori lokal.');
    }
  };

  return (
    <div
      id="scan-receipt-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Pindai Struk Belanja Otomatis AI"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isScanning) onClose();
      }}
    >
      <div
        id="scan-receipt-modal-card"
        className="bg-[#FAF7F2] rounded-3xl border border-[#E5DDD2] shadow-2xl max-w-[620px] w-full p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto flex flex-col"
      >
        {/* Tombol Tutup */}
        <button
          id="btn-close-scan-modal"
          data-testid="close-scan-modal"
          onClick={onClose}
          disabled={isScanning}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE6DB] hover:bg-[#E3D6C8] flex items-center justify-center text-[#5C4D44] transition-colors cursor-pointer z-10 disabled:opacity-50"
          aria-label="Close"
          title="Tutup Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Modal */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#EFE3D8] border border-[#E0D0C2] flex items-center justify-center text-[#8C5D4B] shadow-2xs">
            <Camera className="w-5 h-5 text-[#8C5D4B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#33261F] tracking-tight">
                Pindai Struk Belanja AI
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAE2D7] text-[#7A584A] border border-[#DDD0C2]">
                <Sparkles className="w-3 h-3 text-[#A86448]" />
                Cerdas & Cepat
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#75645A]">
              Foto struk Indomaret, Alfamart, SPBU, atau pasar. AI otomatis mengisi buku kas Anda!
            </p>
          </div>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Success State */}
        {savedSuccess ? (
          <div className="bg-white rounded-2xl p-6 border border-[#D5E5D8] text-center my-auto animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#EAF5ED] text-[#2E7D32] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h4 className="text-lg font-bold text-[#204028] mb-1">
              Struk Berhasil Dicatat ke Buku Kas!
            </h4>
            <p className="text-sm text-[#4E6B54] mb-4">
              Pengeluaran sebesar{' '}
              <span className="font-bold text-[#1B5E20]">
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>{' '}
              di <span className="font-semibold">{merchantName}</span> telah otomatis masuk ke
              catatan Anda.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
              {onOpenDashboard && (
                <button
                  id="btn-view-dashboard-after-scan"
                  onClick={() => {
                    onClose();
                    onOpenDashboard();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#684D40] hover:bg-[#523C31] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Buka Buku Kas & Laporan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                id="btn-scan-another"
                onClick={() => {
                  setSelectedImage(null);
                  setScannedData(null);
                  setSavedSuccess(false);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F0E9DF] hover:bg-[#E5DCD0] text-[#554339] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Pindai Struk Lainnya
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Action buttons (Camera, Upload, Demo) */}
            {!selectedImage && !isScanning && (
              <div className="space-y-4">
                {/* Big Action Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    id="btn-take-photo-receipt"
                    onClick={() => cameraInputRef.current?.click()}
                    className="p-5 rounded-2xl bg-white hover:bg-[#FDFBF7] border-2 border-dashed border-[#DACCC0] hover:border-[#8C5D4B] transition-all flex flex-col items-center justify-center text-center group cursor-pointer active:scale-98 shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F6EDE4] group-hover:bg-[#EFE3D8] text-[#8C5D4B] flex items-center justify-center mb-2.5 transition-colors">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#382B24]">Ambil Foto Kamera</span>
                    <span className="text-[11px] text-[#7A6A61] mt-0.5">
                      Buka kamera ponsel & jepret struk
                    </span>
                  </button>

                  <button
                    id="btn-upload-file-receipt"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 rounded-2xl bg-white hover:bg-[#FDFBF7] border-2 border-dashed border-[#DACCC0] hover:border-[#8C5D4B] transition-all flex flex-col items-center justify-center text-center group cursor-pointer active:scale-98 shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F6EDE4] group-hover:bg-[#EFE3D8] text-[#8C5D4B] flex items-center justify-center mb-2.5 transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#382B24]">Pilih dari Galeri</span>
                    <span className="text-[11px] text-[#7A6A61] mt-0.5">
                      Unggah file foto JPG, PNG, atau WebP
                    </span>
                  </button>
                </div>

                {/* Instant Demo Samples */}
                <div className="p-4 rounded-2xl bg-[#F2EAE0] border border-[#E4D8CC]">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Sparkles className="w-4 h-4 text-[#8C5D4B]" />
                    <span className="text-xs font-bold text-[#45342C]">
                      Atau Coba Contoh Struk Instan (Langsung Coba Tanpa Kertas):
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SAMPLE_RECEIPTS.map((sample) => (
                      <button
                        key={sample.id}
                        id={`btn-sample-${sample.id}`}
                        onClick={() => handleSelectSample(sample)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF4ED] border border-[#DECFC2] hover:border-[#8C5D4B] text-left transition-all cursor-pointer group active:scale-98 shadow-2xs"
                      >
                        <div className="text-xs font-bold text-[#3B2C24] group-hover:text-[#8C5D4B] truncate">
                          {sample.name}
                        </div>
                        <div className="flex items-center justify-between text-[10.5px] text-[#78675E] mt-0.5">
                          <span>{sample.category}</span>
                          <span className="font-semibold text-[#8C5D4B]">
                            {sample.estimatedTotal}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Scanning In Progress State */}
            {isScanning && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0D5C9] text-center my-3 animate-in fade-in duration-200">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-2xl bg-[#EFE3D8] animate-ping opacity-30" />
                  <div className="w-16 h-16 rounded-2xl bg-[#EFE3D8] border border-[#DFCFC2] flex items-center justify-center text-[#8C5D4B]">
                    <RefreshCw className="w-7 h-7 animate-spin text-[#8C5D4B]" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#382B24] mb-1">
                  Gemini AI Sedang Menganalisis Struk...
                </h4>
                <p className="text-xs sm:text-sm text-[#7A685F]">{scanStep}</p>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#9E8B80]">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Mengenali teks toko, tanggal, item barang, dan nominal rupiah</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && !isScanning && (
              <div className="p-3.5 rounded-2xl bg-[#FDF0EE] border border-[#F5C9C4] flex items-start gap-2.5 text-xs text-[#A83228] my-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  <button
                    onClick={() => {
                      setErrorMessage(null);
                      setSelectedImage(null);
                    }}
                    className="mt-1 text-xs underline font-semibold hover:text-[#7A1D16] cursor-pointer"
                  >
                    Ganti foto atau coba struk contoh
                  </button>
                </div>
              </div>
            )}

            {/* Scanned Data Verification Card */}
            {scannedData && !isScanning && (
              <div className="space-y-4 my-2 animate-in fade-in-50 duration-200">
                {/* Image Thumbnail & Re-scan Button */}
                <div className="p-3 rounded-2xl bg-white border border-[#E5DDD2] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Struk Belanja"
                        className="w-12 h-14 object-cover rounded-lg border border-[#DDD3C7] shrink-0"
                      />
                    )}
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                        <span className="text-xs font-bold text-[#204028]">
                          Struk Berhasil Dibaca AI
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7A6B62] truncate block">
                        Verifikasi data di bawah sebelum menyimpan ke buku kas
                      </span>
                    </div>
                  </div>

                  <button
                    id="btn-rescan-receipt"
                    onClick={() => {
                      setSelectedImage(null);
                      setScannedData(null);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#F2EAE0] hover:bg-[#E5DCD0] text-[#554339] text-xs font-medium shrink-0 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Ganti Foto</span>
                  </button>
                </div>

                {/* Editable Fields Form */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDD2] space-y-3.5 shadow-2xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Merchant Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#55443C] mb-1 flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-[#8C5D4B]" />
                        Nama Toko / Tempat Belanja
                      </label>
                      <input
                        id="input-scan-merchant"
                        type="text"
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD3C7] bg-[#FCFAF7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5D4B] text-[#33261F] font-semibold"
                        placeholder="Contoh: Indomaret Cipete"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#55443C] mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8C5D4B]" />
                        Tanggal Transaksi
                      </label>
                      <input
                        id="input-scan-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD3C7] bg-[#FCFAF7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5D4B] text-[#33261F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Total Amount */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#55443C] mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#8C5D4B]" />
                        Total Nominal Belanja (Rp)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7A6960]">
                          Rp
                        </span>
                        <input
                          id="input-scan-amount"
                          type="number"
                          value={totalAmount || ''}
                          onChange={(e) => setTotalAmount(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2 text-sm sm:text-base rounded-xl border border-[#DDD3C7] bg-[#FCFAF7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5D4B] text-[#8C5D4B] font-extrabold"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#55443C] mb-1 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#8C5D4B]" />
                        Kategori Pos Pengeluaran
                      </label>
                      <select
                        id="select-scan-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD3C7] bg-[#FCFAF7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5D4B] text-[#33261F]"
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Items Breakdown list if available */}
                  {scannedData.items && scannedData.items.length > 0 && (
                    <div className="pt-2 border-t border-[#EFE8DF]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-[#8C5D4B]" />
                        <span className="text-[11px] font-bold text-[#55443C]">
                          Rincian Barang yang Terbaca ({scannedData.items.length} item):
                        </span>
                      </div>
                      <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                        {scannedData.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#FAF7F2] text-[#4A3B33]"
                          >
                            <span className="truncate pr-2 font-medium">
                              • {item.name} {item.quantity && item.quantity > 1 ? `(x${item.quantity})` : ''}
                            </span>
                            {item.price && (
                              <span className="font-semibold text-[#7A5B4C] shrink-0">
                                Rp {item.price.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Note */}
                  {notes && (
                    <div className="p-2.5 rounded-xl bg-[#F6EFE6] border border-[#E9DDCF] text-[11px] text-[#6E5B50] flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#8C5D4B] shrink-0 mt-0.5" />
                      <span>{notes}</span>
                    </div>
                  )}
                </div>

                {/* Save button */}
                <button
                  id="btn-save-scanned-transaction"
                  type="button"
                  onClick={handleSaveToTransactions}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#684D40] hover:bg-[#523C31] active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D8EADB]" />
                  <span>Masukkan ke Buku Catatan Keuangan</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Footer Info */}
        <div className="mt-4 pt-3 border-t border-[#EAE2D7] text-center text-[11px] text-[#8C7A70] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#8C5D4B]" />
          <span>Didukung oleh Gemini AI OCR • Privasi struk Anda 100% terjaga</span>
        </div>
      </div>
    </div>
  );
};
