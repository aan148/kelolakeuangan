import React from 'react';
import { Camera, Users, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const BenefitCards: React.FC = () => {
  const benefits = [
    {
      id: 'benefit-card-1',
      title: 'Scan Struk Belanja Otomatis',
      description: 'Cukup foto nota belanja, sistem membantu mengenali nominal dan kategori.',
      icon: Camera,
      iconBg: 'bg-[#F9ECE7]',
      iconBorder: 'border-[#F2D8CD]',
      iconColor: 'text-[#B86B5A]',
      tag: 'Cepat & Akurat',
    },
    {
      id: 'benefit-card-2',
      title: 'Sinkronisasi Suami & Istri',
      description: 'Kelola keuangan keluarga bersama dengan lebih mudah.',
      icon: Users,
      iconBg: 'bg-[#F4ECE8]',
      iconBorder: 'border-[#E8D9D2]',
      iconColor: 'text-[#7D5A4A]',
      tag: 'Keluarga Kompak',
    },
    {
      id: 'benefit-card-3',
      title: 'Privat, Aman & Bebas Iklan',
      description: 'Keuangan keluarga dirancang agar tetap nyaman dan privat.',
      icon: ShieldCheck,
      iconBg: 'bg-[#EBF2ED]',
      iconBorder: 'border-[#D4E3D8]',
      iconColor: 'text-[#4E7656]',
      tag: 'Bebas Khawatir',
    },
  ];

  return (
    <section id="benefit-cards-section" className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-[18px] sm:px-6 lg:px-8">
        
        {/* The 3 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#ECE2D8] shadow-[0_4px_20px_rgba(95,73,59,0.04)] hover:shadow-[0_8px_30px_rgba(95,73,59,0.08)] hover:border-[#DFCFC3] transition-all duration-300 flex flex-row items-start gap-4 sm:gap-5"
              >
                {/* Round Icon Container */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex-shrink-0 ${card.iconBg} ${card.iconBorder} border flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                >
                  <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${card.iconColor}`} />
                </div>

                {/* Content: Title & Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-[15.5px] sm:text-[17px] font-semibold text-[#382A24] leading-snug tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-[#73635B] text-[13.5px] sm:text-[14px] leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 text-[11.5px] font-medium text-[#8F7C73]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89685]" />
                    <span>{card.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
