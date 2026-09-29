export interface SampleReceipt {
  id: string;
  name: string;
  store: string;
  category: string;
  estimatedTotal: string;
  svgDataUri: string;
}

// Helper to safely encode UTF-8 strings to Base64 in both browser and node environments without throwing InvalidCharacterError
function safeUtf8ToBase64(str: string): string {
  try {
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(unescape(encodeURIComponent(str)));
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf-8').toString('base64');
    }
  } catch (err) {
    console.warn('safeUtf8ToBase64 encoding warning:', err);
  }
  return '';
}

const receipt1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="580" viewBox="0 0 400 580" style="background:#ffffff;font-family:monospace;color:#1e1e1e;padding:24px;">
  <rect width="100%" height="100%" fill="#ffffff" stroke="#e0d7ce" stroke-width="2"/>
  <text x="200" y="45" text-anchor="middle" font-size="18" font-weight="bold" fill="#33261f">INDOMARET CIPETE RAYA</text>
  <text x="200" y="70" text-anchor="middle" font-size="12" fill="#66554b">PT INDOMARCO PRISMATAMA</text>
  <text x="200" y="90" text-anchor="middle" font-size="11" fill="#88776d">Tgl: 20-09-2026 10:15 WIB</text>
  <text x="200" y="108" text-anchor="middle" font-size="11" fill="#88776d">Kasir: Siti - No: INDO/88392/CP</text>
  <line x1="25" y1="125" x2="375" y2="125" stroke="#99887e" stroke-dasharray="4"/>
  <text x="30" y="155" font-size="13" fill="#2d241f">BERAS PANDAN WANGI 5KG</text>
  <text x="370" y="155" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">78.500</text>
  <text x="30" y="185" font-size="13" fill="#2d241f">MINYAK GORENG TROPICAL 2L</text>
  <text x="370" y="185" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">36.500</text>
  <text x="30" y="215" font-size="13" fill="#2d241f">TELUR AYAM NEGERI 10 BTR</text>
  <text x="370" y="215" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">27.000</text>
  <text x="30" y="245" font-size="13" fill="#2d241f">SUSU UHT COKELAT 1 LTR</text>
  <text x="370" y="245" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">18.500</text>
  <text x="30" y="275" font-size="13" fill="#2d241f">BUMBU DAPUR RACIK INDOFOOD</text>
  <text x="370" y="275" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">7.500</text>
  <line x1="25" y1="300" x2="375" y2="300" stroke="#99887e" stroke-dasharray="4"/>
  <text x="30" y="335" font-size="15" font-weight="bold" fill="#221711">TOTAL BELANJA</text>
  <text x="370" y="335" text-anchor="end" font-size="16" font-weight="bold" fill="#8C5D4B">Rp 168.000</text>
  <text x="30" y="365" font-size="12" fill="#66554b">PEMBAYARAN QRIS BCA</text>
  <text x="370" y="365" text-anchor="end" font-size="12" fill="#66554b">168.000</text>
  <text x="30" y="390" font-size="12" fill="#66554b">KEMBALIAN</text>
  <text x="370" y="390" text-anchor="end" font-size="12" fill="#66554b">0</text>
  <line x1="25" y1="415" x2="375" y2="415" stroke="#99887e" stroke-dasharray="4"/>
  <text x="200" y="450" text-anchor="middle" font-size="12" fill="#6e5e54">HEMAT DENGAN MEMBER INDOMARET</text>
  <text x="200" y="475" text-anchor="middle" font-size="12" font-weight="bold" fill="#4d3f38">*** TERIMA KASIH ***</text>
  <text x="200" y="495" text-anchor="middle" font-size="11" fill="#88776d">Semoga Berkah untuk Keluarga Anda</text>
</svg>`;

const receipt2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520" style="background:#ffffff;font-family:monospace;color:#1e1e1e;padding:24px;">
  <rect width="100%" height="100%" fill="#ffffff" stroke="#e0d7ce" stroke-width="2"/>
  <text x="200" y="45" text-anchor="middle" font-size="18" font-weight="bold" fill="#992222">SPBU PERTAMINA 34-12801</text>
  <text x="200" y="68" text-anchor="middle" font-size="12" fill="#55443c">JL. FATMAWATI NO. 18 JAKSEL</text>
  <text x="200" y="88" text-anchor="middle" font-size="11" fill="#77665e">Tgl: 20-09-2026 16:45</text>
  <text x="200" y="106" text-anchor="middle" font-size="11" fill="#77665e">Pompa: 03 - Shift: 2</text>
  <line x1="25" y1="120" x2="375" y2="120" stroke="#88776d" stroke-dasharray="4"/>
  <text x="30" y="155" font-size="14" font-weight="bold" fill="#2d241f">PERTAMAX (RON 92)</text>
  <text x="30" y="180" font-size="12" fill="#55443c">Volume : 20.00 Liter</text>
  <text x="30" y="205" font-size="12" fill="#55443c">Harga/L: Rp 12.500</text>
  <line x1="25" y1="230" x2="375" y2="230" stroke="#88776d" stroke-dasharray="4"/>
  <text x="30" y="270" font-size="15" font-weight="bold" fill="#221711">TOTAL BAYAR</text>
  <text x="370" y="270" text-anchor="end" font-size="18" font-weight="bold" fill="#B33E2B">Rp 250.000</text>
  <text x="30" y="305" font-size="12" fill="#55443c">METODE: DEBIT MANDIRI</text>
  <text x="370" y="305" text-anchor="end" font-size="12" fill="#55443c">LUNAS</text>
  <line x1="25" y1="330" x2="375" y2="330" stroke="#88776d" stroke-dasharray="4"/>
  <text x="200" y="375" text-anchor="middle" font-size="13" font-weight="bold" fill="#33261f">PASTI PAS PERTAMINA</text>
  <text x="200" y="398" text-anchor="middle" font-size="11" fill="#77665e">Selamat Jalan &amp; Utamakan Keselamatan</text>
</svg>`;

const receipt3Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="540" viewBox="0 0 400 540" style="background:#ffffff;font-family:monospace;color:#1e1e1e;padding:24px;">
  <rect width="100%" height="100%" fill="#ffffff" stroke="#e0d7ce" stroke-width="2"/>
  <text x="200" y="45" text-anchor="middle" font-size="18" font-weight="bold" fill="#1b633b">APOTEK K-24 KELUARGA SEHAT</text>
  <text x="200" y="68" text-anchor="middle" font-size="12" fill="#55443c">Buka 24 Jam Non-Stop</text>
  <text x="200" y="88" text-anchor="middle" font-size="11" fill="#77665e">Tgl: 19-09-2026 20:10</text>
  <text x="200" y="106" text-anchor="middle" font-size="11" fill="#77665e">Apoteker: apt. Hendra, S.Farm</text>
  <line x1="25" y1="120" x2="375" y2="120" stroke="#88776d" stroke-dasharray="4"/>
  <text x="30" y="155" font-size="13" fill="#2d241f">PARACETAMOL SIRUP ANAK 60ML</text>
  <text x="370" y="155" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">24.500</text>
  <text x="30" y="185" font-size="13" fill="#2d241f">VITAMIN C 500MG (30 TABLET)</text>
  <text x="370" y="185" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">45.000</text>
  <text x="30" y="215" font-size="13" fill="#2d241f">MINYAK TELON PLUS 100ML</text>
  <text x="370" y="215" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">32.500</text>
  <text x="30" y="245" font-size="13" fill="#2d241f">PLESTER LUKA STERIL (BOX)</text>
  <text x="370" y="245" text-anchor="end" font-size="13" font-weight="bold" fill="#2d241f">16.000</text>
  <line x1="25" y1="270" x2="375" y2="270" stroke="#88776d" stroke-dasharray="4"/>
  <text x="30" y="305" font-size="15" font-weight="bold" fill="#221711">TOTAL TRANSAKSI</text>
  <text x="370" y="305" text-anchor="end" font-size="16" font-weight="bold" fill="#1b633b">Rp 118.000</text>
  <text x="30" y="335" font-size="12" fill="#55443c">BAYAR TUNAI</text>
  <text x="370" y="335" text-anchor="end" font-size="12" fill="#55443c">120.000</text>
  <text x="30" y="360" font-size="12" fill="#55443c">KEMBALI</text>
  <text x="370" y="360" text-anchor="end" font-size="12" fill="#55443c">2.000</text>
  <line x1="25" y1="385" x2="375" y2="385" stroke="#88776d" stroke-dasharray="4"/>
  <text x="200" y="425" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b633b">SEMOGA CEPAT SEMBUH &amp; SEHAT SELALU</text>
  <text x="200" y="445" text-anchor="middle" font-size="11" fill="#77665e">Simpan struk ini sebagai bukti transaksi</text>
</svg>`;

export const SAMPLE_RECEIPTS: SampleReceipt[] = [
  {
    id: "indomaret",
    name: "Struk Indomaret",
    store: "Indomaret Cipete Raya",
    category: "Belanja Dapur",
    estimatedTotal: "Rp 168.000",
    svgDataUri: `data:image/svg+xml;base64,${safeUtf8ToBase64(receipt1Svg)}`,
  },
  {
    id: "spbu",
    name: "Struk SPBU Pertamina",
    store: "SPBU Fatmawati",
    category: "Transportasi & Bensin",
    estimatedTotal: "Rp 250.000",
    svgDataUri: `data:image/svg+xml;base64,${safeUtf8ToBase64(receipt2Svg)}`,
  },
  {
    id: "apotek",
    name: "Struk Apotek K-24",
    store: "Apotek K-24 Keluarga Sehat",
    category: "Kesehatan & Obat",
    estimatedTotal: "Rp 118.000",
    svgDataUri: `data:image/svg+xml;base64,${safeUtf8ToBase64(receipt3Svg)}`,
  },
];
