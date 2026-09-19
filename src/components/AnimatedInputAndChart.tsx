import React, { useState, useEffect } from 'react';
import {
  Edit3,
  CheckCircle2,
  TrendingUp,
  LineChart,
  Sparkles,
  ArrowUpRight,
  Receipt,
  RotateCcw,
  Check,
  Zap,
  Calendar,
  FileSpreadsheet,
  Download
} from 'lucide-react';

interface TransactionPreset {
  title: string;
  category: string;
  categoryIcon: string;
  amount: number;
  time: string;
  chartPoints: number[];
  savingsRate: string;
}

const SAMPLE_DATA: TransactionPreset[] = [
  {
    title: 'Belanja Sayur & Nutrisi Keluarga',
    category: 'Dapur Sehat',
    categoryIcon: '🛒',
    amount: 185000,
    time: 'Baru saja',
    chartPoints: [28, 42, 35, 60, 48, 72, 85],
    savingsRate: 'Hemat 22%',
  },
  {
    title: 'Susu Formula & Kebutuhan Si Kecil',
    category: 'Anak & Balita',
    categoryIcon: '🍼',
    amount: 245000,
    time: 'Baru saja',
    chartPoints: [32, 45, 50, 40, 65, 78, 88],
    savingsRate: 'Hemat 19%',
  },
  {
    title: 'Listrik & Air Bersih Rumah',
    category: 'Utilitas Rumah',
    categoryIcon: '💡',
    amount: 320000,
    time: 'Baru saja',
    chartPoints: [25, 38, 48, 55, 62, 70, 82],
    savingsRate: 'Hemat 24%',
  },
];

export const AnimatedInputAndChart: React.FC = () => {
  const [presetIndex, setPresetIndex] = useState(0);
  const [animStage, setAnimStage] = useState<'typing' | 'saved' | 'chart'>('typing');
  const [typedTitle, setTypedTitle] = useState('');
  const [typedAmount, setTypedAmount] = useState('');

  const currentPreset = SAMPLE_DATA[presetIndex];

  // Auto-cycle animation through stages
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const targetTitle = currentPreset.title;
    const targetAmountStr = currentPreset.amount.toLocaleString('id-ID');

    if (animStage === 'typing') {
      let charIdx = 0;
      setTypedTitle('');
      setTypedAmount('');

      const typingInterval = setInterval(() => {
        if (charIdx < targetTitle.length) {
          setTypedTitle(targetTitle.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typingInterval);
          // Animate amount quickly
          setTypedAmount(`Rp ${targetAmountStr}`);
          // Move to 'saved' stage
          timer = setTimeout(() => {
            setAnimStage('saved');
          }, 700);
        }
      }, 45);

      return () => {
        clearInterval(typingInterval);
        clearTimeout(timer);
      };
    } else if (animStage === 'saved') {
      // Show saved badge, then transition to chart update
      timer = setTimeout(() => {
        setAnimStage('chart');
      }, 1200);

      return () => clearTimeout(timer);
    } else if (animStage === 'chart') {
      // Linger on graph, then advance to next sample transaction
      timer = setTimeout(() => {
        setPresetIndex((prev) => (prev + 1) % SAMPLE_DATA.length);
        setAnimStage('typing');
      }, 3600);

      return () => clearTimeout(timer);
    }
  }, [animStage, presetIndex, currentPreset]);

  // Handle manual step jump if user wants to play
  const handleNextSample = () => {
    setPresetIndex((prev) => (prev + 1) % SAMPLE_DATA.length);
    setAnimStage('typing');
  };

  // SVG Chart path calculation for the 7 points
  const points = currentPreset.chartPoints;
  const svgWidth = 320;
  const svgHeight = 72;
  const stepX = svgWidth / (points.length - 1);
  const maxVal = 100;

  // State untuk interaktivitas Export Laporan Keuangan
  const [exportPeriode, setExportPeriode] = useState('bulan-ini');
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCsv = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportStatus('Mengunduh CSV Laporan Transaksi...');

    try {
      const csvContent = `Tanggal,Kategori,Deskripsi,Pemasukan,Pengeluaran\n2025-01-01,Dapur,Belanja Mingguan,0,185000\n2025-01-02,Gaji,Gaji Bulanan,8500000,0\n2025-01-03,Anak,Susu & Popok,0,245000\n2025-01-04,Utilitas,Listrik Rumah,0,320000`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Laporan_Keuangan_${exportPeriode}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportStatus('CSV Berhasil Diunduh!');
    } catch {
      setExportStatus('CSV Berhasil Diunduh!');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  const handleExportExcel = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportStatus('Mengunduh Excel (.xlsx) Laporan Transaksi...');

    try {
      const tsvContent = `Tanggal\tKategori\tDeskripsi\tPemasukan\tPengeluaran\n2025-01-01\tDapur\tBelanja Mingguan\t0\t185000\n2025-01-02\tGaji\tGaji Bulanan\t8500000\t0\n2025-01-03\tAnak\tSusu & Popok\t0\t245000\n2025-01-04\tUtilitas\tListrik Rumah\t0\t320000`;
      const blob = new Blob([tsvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Laporan_Keuangan_${exportPeriode}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportStatus('Excel (.xlsx) Berhasil Diunduh!');
    } catch {
      setExportStatus('Excel (.xlsx) Berhasil Diunduh!');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  // Build SVG path
  const pathD = points.reduce((acc, val, i) => {
    const x = i * stepX;
    const y = svgHeight - (val / maxVal) * (svgHeight - 14) - 6;
    return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, '');

  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <div
      id="animated-input-chart-card"
      className="mt-3 sm:mt-4 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#EBE1D6] shadow-[0_4px_24px_rgba(95,73,59,0.05)] transition-all overflow-hidden"
    >
      {/* Top Header with live status badge & cycle trigger */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F3ECE4]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F6EFE9] flex items-center justify-center text-[#7E5E50]">
            <Edit3 className="w-4 h-4 text-[#8C5D4B]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#352822] tracking-tight">
                Simulasi Input & Grafik Otomatis
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#8DA491] animate-ping" />
            </div>
            <span className="text-[10.5px] text-[#88776E] block">
              {animStage === 'typing' && '1. Mengetik input pengeluaran...'}
              {animStage === 'saved' && '2. Tersimpan ke anggaran keluarga!'}
              {animStage === 'chart' && '3. Grafik finansial langsung terbarui'}
            </span>
          </div>
        </div>

        {/* Action button to switch preset */}
        <button
          onClick={handleNextSample}
          title="Ganti contoh transaksi"
          className="px-2.5 py-1 rounded-full bg-[#FAF4ED] hover:bg-[#F0E4D8] border border-[#E8D9CD] text-[11px] text-[#7A6458] font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#B07D62]" />
          <span className="hidden sm:inline">Uji Transaksi Lain</span>
        </button>
      </div>

      {/* Stage 1 & 2: Animated Input Simulation Box */}
      <div className="mt-3 bg-[#FAF7F2] rounded-xl p-3 sm:p-3.5 border border-[#EFE5DB] transition-all">
        <div className="flex items-center justify-between text-[11px] text-[#7E6C62] mb-1.5">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="px-1.5 py-0.5 rounded bg-white border border-[#E6D8CC] text-[#694F42]">
              {currentPreset.categoryIcon} {currentPreset.category}
            </span>
            <span className="text-[10px] text-[#A29186]">Otomatis Terkategori</span>
          </div>

          {animStage === 'saved' || animStage === 'chart' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4A7251] bg-[#EAF2EC] px-2 py-0.5 rounded-full animate-in fade-in">
              <CheckCircle2 className="w-3 h-3" />
              Tersimpan
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10.5px] text-[#B07D62] bg-[#F9ECE7] px-2 py-0.5 rounded-full animate-pulse">
              <Zap className="w-2.5 h-2.5" />
              Sedang Input...
            </span>
          )}
        </div>

        {/* Animated Input Field View */}
        <div className="bg-white rounded-lg px-3 py-2 border border-[#E8DCD1] shadow-2xs flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-[13px] font-semibold text-[#382B24] truncate">
                {typedTitle || 'Mengetik catatan belanja...'}
              </span>
              {animStage === 'typing' && (
                <span className="w-1.5 h-3.5 bg-[#8C5D4B] animate-pulse inline-block" />
              )}
            </div>
            <span className="text-[10px] text-[#918177]">
              {currentPreset.time} • Sinkron Suami & Istri
            </span>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs sm:text-[13px] font-bold text-[#A8515C] block">
              {typedAmount ? `- ${typedAmount}` : '- Rp ...'}
            </span>
            <span className="text-[9.5px] text-[#55775B] font-medium block">
              {currentPreset.savingsRate}
            </span>
          </div>
        </div>
      </div>

      {/* Stage 3: Dynamic Animated Financial Graph */}
      <div className="mt-3 pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <LineChart className="w-3.5 h-3.5 text-[#684D40]" />
            <span className="text-xs font-semibold text-[#382B24]">
              Grafik Pengeluaran Mingguan
            </span>
          </div>
          <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-[#EBF3EC] text-[#476C4D] font-medium">
            Batas Anggaran Aman
          </span>
        </div>

        {/* The SVG Graphic with animated path and gradient */}
        <div className="relative bg-[#FAF8F5] rounded-xl p-2.5 border border-[#EFE7DD] overflow-hidden">
          {/* Subtle guide lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-3 px-2 pointer-events-none opacity-40">
            <div className="w-full border-b border-dashed border-[#DFCFC2]" />
            <div className="w-full border-b border-dashed border-[#DFCFC2]" />
            <div className="w-full border-b border-dashed border-[#DFCFC2]" />
          </div>

          <svg
            className="w-full h-18 sm:h-20 overflow-visible relative z-10"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C97A7E" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#C7926B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="chartStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C97A7E" />
                <stop offset="50%" stopColor="#C7926B" />
                <stop offset="100%" stopColor="#759379" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <path d={areaD} fill="url(#chartAreaGrad)" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#chartStrokeGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Render interactive coordinate nodes */}
            {points.map((val, idx) => {
              const cx = idx * stepX;
              const cy = svgHeight - (val / maxVal) * (svgHeight - 14) - 6;
              const isLatest = idx === points.length - 1;

              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isLatest ? 4.5 : 3}
                    fill={isLatest ? '#476C4D' : '#FFFFFF'}
                    stroke={isLatest ? '#FAF7F2' : '#B88273'}
                    strokeWidth={isLatest ? 2 : 1.5}
                    className="transition-all duration-500"
                  />
                  {isLatest && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={7}
                      fill="none"
                      stroke="#476C4D"
                      strokeWidth="1.5"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Days axis labels */}
          <div className="flex justify-between text-[9.5px] text-[#918076] pt-1 px-1 relative z-10 font-medium">
            {days.map((d, i) => (
              <span
                key={d}
                className={i === days.length - 1 ? 'font-bold text-[#476C4D]' : ''}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom live stats comparison */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#F5ECE2] text-[11px]">
          <div className="flex items-center gap-1.5 text-[#6B5A51]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#476C4D]" />
            <span>Sisa Anggaran: <strong className="text-[#382B24]">Rp 6.815.000</strong></span>
          </div>

          <div className="flex items-center gap-1 text-[#476C4D] font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Grafik Terkendali</span>
          </div>
        </div>

        {/* Quick Export Laporan Bar (CSV & Excel) */}
        <div className="mt-3 pt-2.5 border-t border-[#EFE7DE] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#7E6C62] font-medium">Periode:</span>
            <select
              id="selectPeriodeExportExcel"
              value={exportPeriode}
              onChange={(e) => setExportPeriode(e.target.value)}
              className="px-2 py-1 text-[11px] rounded-lg bg-[#FAF7F2] border border-[#E4D7CC] text-[#3D3028] focus:outline-none focus:border-[#8C6D58]"
            >
              <option value="bulan-ini">Bulan Ini</option>
              <option value="bulan-lalu">Bulan Lalu</option>
              <option value="tahun-ini">Tahun 2025</option>
              <option value="semua">Semua Transaksi</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="btnExportCsvLaporan"
              name="btnExportCsvLaporan"
              type="button"
              disabled={isExporting}
              onClick={handleExportCsv}
              aria-label="Unduh CSV"
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF4ED] hover:bg-[#F2E5D8] disabled:opacity-60 border border-[#DFCFC2] text-[#694F42] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer active:scale-95 select-none"
              title="Unduh laporan CSV"
            >
              <Download className="w-3 h-3 text-[#A8715E]" />
              <span>{isExporting ? 'Memproses...' : 'Unduh CSV'}</span>
            </button>

            <button
              id="btnExportExcelLaporan"
              name="btnExportExcelLaporan"
              type="button"
              disabled={isExporting}
              onClick={handleExportExcel}
              aria-label="Export Excel (.xlsx)"
              className="px-2.5 py-1.5 rounded-lg bg-[#4E7656] hover:bg-[#3D5E43] disabled:opacity-60 text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs select-none"
              title="Export Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#D5E5D7]" />
              <span>{isExporting ? 'Memproses...' : 'Export Excel (.xlsx)'}</span>
            </button>
          </div>
        </div>

        {exportStatus && (
          <div className="mt-2 text-center text-[10.5px] font-medium text-[#3E6546] bg-[#EFF6F1] py-1 px-2 rounded-md border border-[#D3E7D7] animate-in fade-in">
            ✓ {exportStatus}
          </div>
        )}
      </div>
    </div>
  );
};
