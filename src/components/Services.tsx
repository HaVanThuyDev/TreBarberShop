import React, { useState } from 'react';
import { Scissors, Clock, Check, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/barberData';
import { formatVND } from '../utils/storage';
import type { ServiceItem } from '../types';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cut' | 'relax' | 'perm_dye' | 'combo'>('all');

  const filterTabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'cut', label: 'Cắt & Tạo kiểu' },
    { key: 'combo', label: 'Gói Combo' },
    { key: 'relax', label: 'Gội & Cạo mặt' },
    { key: 'perm_dye', label: 'Uốn & Nhuộm' },
  ];

  const filteredServices = activeFilter === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === activeFilter);

  const handleBookService = (service: ServiceItem) => {
    onSelectServiceForBooking(service.id);
    const bookingSection = document.querySelector('#booking');
    if (bookingSection) {
      const navOffset = 80;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#0b0d0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Scissors className="w-3.5 h-3.5" />
            MENU DỊCH VỤ CHUYÊN NGHIỆP
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            DỊCH VỤ <span className="gold-gradient-text">TẠI TREBABERSHOP</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
            Mỗi gói dịch vụ đều được chăm chút tỉ mỉ từ tay nghề người thợ, sản phẩm cao cấp chính hãng đến sự thoải mái tối đa của quý khách.
          </p>

          {/* Filter Categories on Mobile & Desktop */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-[#C9A45C] text-[#121212] font-bold shadow-[0_2px_12px_rgba(201,164,92,0.35)] scale-105'
                    : 'bg-[#181A1B] text-[#F5F1E8]/75 border border-[#2A2D30] hover:text-[#C9A45C] hover:border-[#C9A45C]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative"
            >
              {/* Popular Badge */}
              {service.isPopular && (
                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] text-[11px] font-black uppercase tracking-wider shadow-md">
                  Được Yêu Thích
                </div>
              )}

              {/* Service Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1A1D1F]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161819] via-transparent to-black/20" />

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-medium text-[#F5F1E8] border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#C9A45C]" />
                  <span>{service.durationMinutes} phút</span>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#DFBA74] transition-colors leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-xl sm:text-2xl font-black text-[#C9A45C] tracking-tight">
                      {formatVND(service.price)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5F1E8]/70 leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  {service.features && (
                    <div className="space-y-1.5 pt-2 border-t border-[#2A2D30]/80 mb-5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#F5F1E8]/80">
                          <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleBookService(service)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#263B32] hover:bg-[#C9A45C] text-[#F5F1E8] hover:text-[#121212] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Chọn dịch vụ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform ml-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
