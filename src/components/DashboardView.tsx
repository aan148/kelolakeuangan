import React, { useState, useEffect } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Trash2,
  Filter,
  Calendar,
  Tag,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  User,
  ArrowLeft,
  DollarSign
} from 'lucide-react';

export interface AuthUser {
  email: string;
  name?: string;
  role?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface DashboardViewProps {
  user: AuthUser;
  onSignOut: () => void;
  onBackToHome?: () => void;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'income',
    category: 'Gaji Bulanan',
    amount: 12500000,
    description: 'Transfer Gaji Kantor',
    date: '2026-09-15',
  },
  {
    id: 'tx-2',
    type: 'income',
    category: 'Bisnis Sampingan',
    amount: 3200000,
    description: 'Penjualan Kue & Hampers',
    date: '2026-09-17',
  },
  {
    id: 'tx-3',
    type: 'expense',
    category: 'Belanja Dapur',
    amount: 1450000,
    description: 'Bahan Pokok & Sayur Mingguan',
    date: '2026-09-18',
  },
  {
    id: 'tx-4',
    type: 'expense',
    category: 'Listrik & Utilitas',
    amount: 780000,
    description: 'Token Listrik PLN & PDAM',
    date: '2026-09-19',
  },
  {
    id: 'tx-5',
    type: 'expense',
    category: 'Pendidikan Anak',
    amount: 1200000,
    description: 'Buku & Perlengkapan Sekolah',
    date: '2026-09-19',
  },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onSignOut,
  onBackToHome,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('kelolakeuangan_transactions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_TRANSACTIONS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [txCategory, setTxCategory] = useState('Makanan & Belanja');
  const [txAmount, setTxAmount] = useState('');
  const [txDescription, setTxDescription] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('kelolakeuangan_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(txAmount.replace(/[^0-9]/g, ''));
    if (!num || isNaN(num) || num <= 0) return;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: txType,
      category: txCategory || (txType === 'income' ? 'Pemasukan Lain' : 'Pengeluaran Lain'),
      amount: num,
      description: txDescription.trim() || (txType === 'income' ? 'Pemasukan' : 'Pengeluaran'),
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setTxAmount('');
    setTxDescription('');
    setShowAddForm(false);
    setSuccessToast('Transaksi berhasil dicatat ke pembukuan!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === 'income') return t.type === 'income';
    if (activeFilter === 'expense') return t.type === 'expense';
    return true;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div id="dashboard-account-container" className="min-h-screen bg-[#FAF7F2] text-[#3D302A] pb-16">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DDD1] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              title="Kembali ke Beranda Publik"
              className="w-8 h-8 rounded-lg bg-white border border-[#E5D8CC] flex items-center justify-center text-[#6B574C] hover:text-[#2E231C] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EAD9CD] to-[#D8B4A6] flex items-center justify-center border border-[#F2E5DC] text-[#63483D]">
              <Wallet className="w-4 h-4 text-[#8C5D4B]" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-[#382B24] block leading-tight">
                KelolaKeuangan
              </span>
              <span className="text-[11px] text-[#8C7A70] block">Dashboard Keluarga</span>
            </div>
          </div>
        </div>

        {/* User profile & Sign out */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span
              id="user-display-email"
              data-testid="user-email"
              className="text-xs font-semibold text-[#382B24]"
            >
              {user.email}
            </span>
            <span className="text-[10.5px] text-[#279B65] font-medium flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#279B65] animate-pulse" />
              Sesi Aktif
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#EAD9CD] border border-[#D9C4B5] flex items-center justify-center text-[#684D40] text-xs font-bold">
            {user.email.charAt(0).toUpperCase()}
          </div>

          <button
            id="btn-sign-out"
            data-testid="sign-out-btn"
            aria-label="Keluar"
            onClick={onSignOut}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-[#FFF0ED] text-[#C44D48] hover:text-[#A83834] border border-[#ECD3CC] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#684D40] to-[#513B31] text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full text-white/90">
              <Sparkles className="w-3 h-3 text-[#FFD79E]" />
              Akun Terverifikasi
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Selamat Datang di Pembukuan Keluarga
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Catatan keuangan Anda tersimpan aman dan terenkripsi. Sesi aktif untuk email{' '}
              <strong className="underline decoration-white/40">{user.email}</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#523C31] text-xs sm:text-sm font-semibold shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Transaksi</span>
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3.5 rounded-2xl bg-[#EAF5EC] border border-[#CDE5D1] text-[#22753C] text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Financial Overview Cards (3 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Total Saldo */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9DDD2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6B63]">
              <span className="font-semibold">Sisa Saldo Kas</span>
              <div className="w-7 h-7 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#8C5D4B]">
                <Wallet className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#322520] tracking-tight">
              {formatRupiah(balance)}
            </div>
            <div className="text-[11.5px] text-[#279B65] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Arus kas keluarga sehat & aman</span>
            </div>
          </div>

          {/* Card 2: Total Pemasukan */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9DDD2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6B63]">
              <span className="font-semibold">Total Pemasukan</span>
              <div className="w-7 h-7 rounded-lg bg-[#EDF8F1] flex items-center justify-center text-[#279B65]">
                <ArrowDownLeft className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#238A56] tracking-tight">
              {formatRupiah(totalIncome)}
            </div>
            <div className="text-[11.5px] text-[#786961]">
              Pemasukan aktif bulan ini
            </div>
          </div>

          {/* Card 3: Total Pengeluaran */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9DDD2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6B63]">
              <span className="font-semibold">Total Pengeluaran</span>
              <div className="w-7 h-7 rounded-lg bg-[#FFF2F2] flex items-center justify-center text-[#D84C4C]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#D84C4C] tracking-tight">
              {formatRupiah(totalExpense)}
            </div>
            <div className="text-[11.5px] text-[#786961]">
              Pengeluaran tercatat rapi
            </div>
          </div>
        </div>

        {/* Modal / Inline Add Transaction Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4D8CC] shadow-xs space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#F2ECE4] pb-3">
              <h3 className="text-sm sm:text-base font-bold text-[#352721]">
                Catat Transaksi Baru
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-xs text-[#8C7A70] hover:text-[#382B24] p-1 rounded-md"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#5A4A41] mb-1">
                  Jenis Transaksi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTxType('expense')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      txType === 'expense'
                        ? 'bg-[#FFF2F2] border-[#F8C8C8] text-[#C43838]'
                        : 'bg-white border-[#E2D5C8] text-[#78675E]'
                    }`}
                  >
                    Pengeluaran
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxType('income')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      txType === 'income'
                        ? 'bg-[#EDF8F1] border-[#C2E8D0] text-[#1E7D4B]'
                        : 'bg-white border-[#E2D5C8] text-[#78675E]'
                    }`}
                  >
                    Pemasukan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4A41] mb-1">
                  Kategori
                </label>
                <select
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD0C3] bg-[#FAFAF8] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
                >
                  {txType === 'expense' ? (
                    <>
                      <option value="Makanan & Belanja">Makanan & Belanja Dapur</option>
                      <option value="Listrik & Utilitas">Listrik & Tagihan Rumah</option>
                      <option value="Pendidikan Anak">Pendidikan Anak & Sekolah</option>
                      <option value="Kesehatan">Kesehatan & Obat</option>
                      <option value="Transportasi">Bensin & Transportasi</option>
                      <option value="Hiburan Keluarga">Hiburan & Rekreasi</option>
                      <option value="Lainnya">Pengeluaran Lainnya</option>
                    </>
                  ) : (
                    <>
                      <option value="Gaji Bulanan">Gaji Pokok Bulanan</option>
                      <option value="Bisnis Sampingan">Bisnis / Usaha Sampingan</option>
                      <option value="Bonus & Tunjangan">Bonus & THR</option>
                      <option value="Investasi">Hasil Investasi</option>
                      <option value="Hadiah & Lainnya">Hadiah / Pemasukan Lainnya</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4A41] mb-1">
                  Nominal (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="Contoh: 150000"
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD0C3] bg-[#FAFAF8] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4A41] mb-1">
                  Keterangan / Catatan
                </label>
                <input
                  type="text"
                  value={txDescription}
                  onChange={(e) => setTxDescription(e.target.value)}
                  placeholder="Contoh: Belanja mingguan di pasar"
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD0C3] bg-[#FAFAF8] text-xs text-[#352721] focus:outline-none focus:border-[#7A5B4C]"
                />
              </div>

              <div className="sm:col-span-2 pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl border border-[#E0D5CA] text-xs text-[#6B5A51] hover:bg-[#F2ECE4] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#684D40] hover:bg-[#523C31] text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transactions Table / List */}
        <div className="bg-white rounded-2xl border border-[#E8DCD1] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F4EFEA] pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#352721]">
                Riwayat Transaksi Keuangan
              </h2>
              <p className="text-xs text-[#7D6C64]">
                Semua catatan arus kas keluarga yang terdata di sistem
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#F5EFE7] p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white text-[#382B24] shadow-2xs font-semibold'
                    : 'text-[#7D6E66] hover:text-[#382B24]'
                }`}
              >
                Semua ({transactions.length})
              </button>
              <button
                onClick={() => setActiveFilter('income')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'income'
                    ? 'bg-white text-[#218758] shadow-2xs font-semibold'
                    : 'text-[#7D6E66] hover:text-[#218758]'
                }`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setActiveFilter('expense')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'expense'
                    ? 'bg-white text-[#C73E3E] shadow-2xs font-semibold'
                    : 'text-[#7D6E66] hover:text-[#C73E3E]'
                }`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-[#F4EFEA]">
            {filteredTransactions.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8C7A70]">
                Belum ada transaksi di kategori ini.
              </div>
            ) : (
              filteredTransactions.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#FAF7F2] px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        item.type === 'income'
                          ? 'bg-[#EDF8F1] text-[#228455]'
                          : 'bg-[#FFF2F2] text-[#C94141]'
                      }`}
                    >
                      {item.type === 'income' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs sm:text-[13.5px] font-semibold text-[#352721] block">
                        {item.description}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-[#86756B]">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        item.type === 'income' ? 'text-[#228455]' : 'text-[#C94141]'
                      }`}
                    >
                      {item.type === 'income' ? '+' : '-'} {formatRupiah(item.amount)}
                    </span>
                    <button
                      onClick={() => handleDeleteTransaction(item.id)}
                      title="Hapus transaksi"
                      className="text-[#A4948A] hover:text-[#C94141] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
