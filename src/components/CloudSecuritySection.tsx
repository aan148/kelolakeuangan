import React from 'react';
import { ShieldCheck, Lock, EyeOff, Cloud, RefreshCw, KeyRound, Check } from 'lucide-react';

export const CloudSecuritySection: React.FC = () => {
  const securityPoints = [
    {
      icon: Lock,
      title: 'Enkripsi Ujung-ke-Ujung',
      desc: 'Setiap data transaksi dan foto struk diamankan dengan enkripsi standar perbankan AES-256.',
    },
    {
      icon: EyeOff,
      title: '100% Privat & Tanpa Iklan',
      desc: 'Kami tidak pernah menjual data Anda ke pihak ketiga ataupun menampilkan iklan pelacak.',
    },
    {
      icon: Cloud,
      title: 'Sinkronisasi Cloud Real-Time',
      desc: 'Catatan langsung terhubung antara smartphone Anda dan pasangan secara instan dan rapi.',
    },
    {
      icon: RefreshCw,
      title: 'Cadangan Otomatis Harian',
      desc: 'Riwayat finansial tersimpan aman, tidak akan hilang meskipun Anda berganti perangkat.',
    },
  ];

  return (
    <section id="keamanan-cloud" className="py-12 sm:py-18 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-[18px] sm:px-6 lg:px-8">
        
        {/* Main Security Card */}
        <div className="bg-[#FAF4ED] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DACE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Info & Guarantee */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] text-[#6A5245] border border-[#E5D5C8] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#517B58]" />
                <span>KEAMANAN STANDAR TINGGI</span>
              </div>

              <h2 className="font-serif-display text-[26px] sm:text-[34px] lg:text-[38px] font-semibold text-[#352721] tracking-tight leading-snug">
                Data Keuangan Keluarga Anda Tetap Milik Anda Sepenuhnya
              </h2>

              <p className="text-[#6D5D55] text-[15px] sm:text-[16px] leading-relaxed">
                Kami memahami bahwa catatan finansial keluarga adalah hal yang sangat intim dan privat. KelolaKeuangan dirancang dengan arsitektur privasi-terdahulu tanpa celah iklan atau eksploitasi data.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <div className="bg-white/80 px-4 py-2.5 rounded-xl border border-[#E9DDD2] text-xs text-[#54433B] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#8C6D58]" />
                  <span>Kunci Akses Terpisah per Keluarga</span>
                </div>
                <div className="bg-white/80 px-4 py-2.5 rounded-xl border border-[#E9DDD2] text-xs text-[#54433B] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#517B58]" />
                  <span>Server Aman & Uptime 99.9%</span>
                </div>
              </div>
            </div>

            {/* Right Col: 4 Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityPoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-[#E8DCD1] shadow-[0_2px_10px_rgba(95,73,59,0.03)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F6EDE6] border border-[#ECD9CC] flex items-center justify-center text-[#7E5C4B] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#352721] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#75645C] text-xs sm:text-[13px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
