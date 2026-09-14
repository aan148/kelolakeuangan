import React, { useState } from 'react';
import {
  X,
  Plus,
  Receipt,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Camera,
  CheckCircle2,
  Wallet,
  ArrowRight,
  Monitor,
  Globe
} from 'lucide-react';

interface InteractiveGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveGuestModal: React.FC<InteractiveGuestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [balance, setBalance] = useState(48500000);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Belanja Sayur & Buah Segar', category: 'Dapur', amount: -145000, date: 'Hari ini' },
    { id: 2, name: 'Gaji Bulanan Mas Masuk', category: 'Pemasukan', amount: 12000000, date: 'Kemarin' },
    { id: 3, name: 'Susu Formula & Popok Anak', category: 'Kebutuhan Anak', amount: -380000, date: '2 hari lalu' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Dapur');
  const [scanSimulated, setScanSimulated] = useState(false);

  if (!isOpen) return null;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(newAmount.replace(/\D/g, ''), 10);
    if (!newTitle || isNaN(num) || num <= 0) return;

    const newTx = {
      id: Date.now(),
      name: newTitle,
      category: newCategory,
      amount: -num,
      date: 'Baru saja',
    };

    setTransactions([newTx, ...transactions]);
    setBalance((prev) => prev - num);
    setNewTitle('');
    setNewAmount('');
  };

  const handleSimulateScan = () => {
    setScanSimulated(true);
    setTimeout(() => {
      setNewTitle('Supermarket Prima Jaya (Struk Terdeteksi)');
      setNewAmount('215000');
      setNewCategory('Dapur');
      setScanSimulated(false);
    }, 1200);
  };

  return (
    <div
      id="guest-mode-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B211C]/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DACD] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE4D9] hover:bg-[#E2D2C4] flex items-center justify-center text-[#5C4B42] transition-colors cursor-pointer"
          aria-label="Tutup jendela simulasi"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EAE0D5] text-[11px] font-semibold text-[#735547] flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#B07D62]" />
            Versi Web Langsung Aktif
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[11px] font-semibold text-[#4A7251] flex items-center gap-1">
            <Monitor className="w-3 h-3 text-[#4A7251]" />
            Kompatibel Windows & HP
          </span>
        </div>

        <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#382A24] mb-1">
          Aplikasi KelolaKeuangan (Versi Web)
        </h3>
        <p className="text-xs sm:text-[13px] text-[#78665C] mb-4">
          Coba langsung aplikasi di browser ini. Data tersinkronisasi otomatis dengan aplikasi desktop Windows dan Android.
        </p>

        {/* Balance preview */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DCD0] shadow-xs mb-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#86756C] block">Total Saldo Terencana</span>
            <span className="text-lg sm:text-xl font-bold text-[#352721]">
              Rp {balance.toLocaleString('id-ID')}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#EAF2EC] text-[#4A7251] text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Keuangan Tenang
          </span>
        </div>

        {/* Action: Simulate Receipt Scanner button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSimulateScan}
            disabled={scanSimulated}
            className="w-full py-2.5 px-3 rounded-xl bg-[#F0E5DC] hover:bg-[#E6D6CA] active:bg-[#DFCABC] text-[#63483D] text-xs sm:text-[13px] font-medium border border-[#DFCEC1] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#8C5D4B]" />
            <span>{scanSimulated ? 'Menganalisis foto struk...' : '📸 Uji Coba Simulasi Scan Struk Belanja'}</span>
          </button>
        </div>

        {/* Form to add quick expense */}
        <form onSubmit={handleAddTransaction} className="bg-white p-4 rounded-2xl border border-[#E8DCD0] space-y-3 mb-4">
          <span className="text-xs font-semibold text-[#4F3E35] block">
            Catat Pengeluaran Baru
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              placeholder="Nama pengeluaran (mis. Minyak & Beras)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DCD0] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
            />
            <input
              type="text"
              placeholder="Nominal (Rp)"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DCD0] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DCD0] text-xs text-[#524138] focus:outline-none"
            >
              <option value="Dapur">🛒 Dapur & Makanan</option>
              <option value="Kebutuhan Anak">🎓 Anak & Pendidikan</option>
              <option value="Listrik">💡 Listrik & Utilitas</option>
              <option value="Keluarga">❤️ Rekreasi Keluarga</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#684D40] hover:bg-[#523C31] text-[#FAF7F2] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          </div>
        </form>

        {/* Transaction History list */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#5B483E] block px-1">
            Riwayat Transaksi Terkini
          </span>

          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white p-3 rounded-xl border border-[#EFE5DB] flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-medium text-[#382B24]">{tx.name}</p>
                <p className="text-[11px] text-[#8C7B71]">{tx.category} • {tx.date}</p>
              </div>
              <span
                className={`font-semibold ${
                  tx.amount > 0 ? 'text-[#476C4D]' : 'text-[#A8515C]'
                }`}
              >
                {tx.amount > 0 ? '+' : ''}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>

        {/* Footer button to close or proceed */}
        <div className="mt-5 pt-3 border-t border-[#EFE5DA] flex items-center justify-between">
          <span className="text-[11px] text-[#8C7A70]">
            Mode simulasi preview. Data tersimpan di sesi Anda.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#E8DDD2] hover:bg-[#DCCEC0] text-[#4A3A31] text-xs font-medium cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
