import React from 'react';
import { Award, Scissors, CheckCircle2, Users } from 'lucide-react';
import { BARBERS_LIST } from '../data/barberData';
import type { BarberItem } from '../types';

interface BarberTeamProps {
  onSelectBarberForBooking: (barberId: string) => void;
}

export const BarberTeam: React.FC<BarberTeamProps> = ({ onSelectBarberForBooking }) => {
  const handleSelectBarber = (barber: BarberItem) => {
    onSelectBarberForBooking(barber.id);
    const element = document.querySelector('#booking');
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="team" className="py-20 sm:py-28 bg-[#0f1210] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            NGHỆ NHÂN TÓC NAM
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            ĐỘI NGŨ <span className="gold-gradient-text">BARBER CHUYÊN NGHIỆP</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            Những người thợ đam mê với nghề, sở hữu đôi tay khéo léo và gu thẩm mỹ tinh tế, sẵn sàng kiến tạo kiểu tóc hoàn mỹ nhất cho bạn.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BARBERS_LIST.map((barber) => (
            <div
              key={barber.id}
              className="group rounded-3xl bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_12px_30px_rgba(201,164,92,0.15)] relative"
            >
              <div>
                {/* Avatar with Circular / Rounded Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#1A1D1F]">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {/* Cuts count badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-[#DFBA74]">
                    <span>{barber.cutsCount}+ lượt cắt</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#263B32]/90 backdrop-blur-md text-[11px] font-semibold text-[#F5F1E8] border border-[#C9A45C]/30 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#C9A45C]" />
                    <span>{barber.experience}</span>
                  </div>
                </div>

                {/* Barber Info */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-xl font-bold text-[#F5F1E8] group-hover:text-[#DFBA74] transition-colors">
                      {barber.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                  </div>
                  <span className="text-xs font-semibold text-[#C9A45C] tracking-wide block mt-0.5">
                    {barber.role}
                  </span>
                </div>

                {/* Specialty & Highlights */}
                <div className="space-y-2 text-xs text-[#F5F1E8]/75 mb-5 pt-3 border-t border-[#2A2D30]">
                  <div>
                    <span className="text-[#C9A45C] font-semibold">Chuyên môn:</span> {barber.specialty}
                  </div>
                  <div className="line-clamp-2">
                    <span className="text-[#DFBA74] font-semibold">Phong cách:</span> {barber.highlightStyle}
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                onClick={() => handleSelectBarber(barber)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1A1D1F] hover:bg-[#C9A45C] text-[#F5F1E8] hover:text-[#121212] border border-[#2A2D30] hover:border-[#C9A45C] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Đặt lịch với {barber.name.split(' ').pop()}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
