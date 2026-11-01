import React from 'react';
import { Tag, Clock, CheckCircle, Check } from 'lucide-react';
import { SERVICES_LIST } from '../data/barberData';
import { formatVND } from '../utils/storage';

interface PriceListProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const PriceList: React.FC<PriceListProps> = ({ onSelectServiceForBooking }) => {
  const groups = [
    {
      title: 'Dịch Vụ Cắt & Tạo Kiểu',
      category: 'cut',
      badge: 'Cơ bản & Tạo phom',
    },
    {
      title: 'Gói Combo Tiết Kiệm & Cao Cấp',
      category: 'combo',
      badge: 'Được chuộng nhất',
    },
    {
      title: 'Thư Giãn, Dưỡng Da & Cạo Mặt',
      category: 'relax',
      badge: 'Chăm sóc da & Huyệt đạo',
    },
    {
      title: 'Uốn, Nhuộm & Phục Hồi Tóc',
      category: 'perm_dye',
      badge: 'Hóa chất cao cấp',
    },
  ];

  const handleSelect = (serviceId: string) => {
    onSelectServiceForBooking(serviceId);
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
    <section id="pricing" className="py-20 sm:py-28 bg-[#0f1210] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#263B32]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            BẢNG GIÁ NIÊM YẾT MINH BẠCH
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            BẢNG GIÁ <span className="gold-gradient-text">DỊCH VỤ</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            Cam kết giá niêm yết minh bạch, không phụ phí phát sinh, cam kết dịch vụ làm hài lòng mới thanh toán.
          </p>
        </div>

        {/* Grouped Price Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((grp) => {
            const items = SERVICES_LIST.filter((s) => s.category === grp.category);
            return (
              <div
                key={grp.category}
                className="rounded-3xl bg-[#161819] border border-[#2A2D30] p-6 sm:p-7 shadow-xl relative flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#2A2D30] mb-5">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8]">
                        {grp.title}
                      </h3>
                      <span className="text-xs text-[#C9A45C] font-medium tracking-wide">
                        {grp.badge}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#263B32] text-[#DFBA74] border border-[#C9A45C]/30 font-semibold">
                      {items.length} dịch vụ
                    </span>
                  </div>

                  {/* Service Items: Horizontal on Desktop, Vertical Stack on Mobile */}
                  <div className="space-y-4">
                    {items.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleSelect(service.id)}
                        className="group p-3.5 rounded-2xl bg-[#1A1D1F]/70 border border-[#2A2D30] hover:border-[#C9A45C]/50 hover:bg-[#1F2225] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm sm:text-base text-[#F5F1E8] group-hover:text-[#DFBA74] transition-colors">
                              {service.name}
                            </span>
                            {service.isPopular && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#121212] font-black uppercase">
                                <Check className="w-3 h-3 stroke-[3]" />
                                Được yêu thích
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#F5F1E8]/60">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#C9A45C]" />
                              {service.durationMinutes} phút
                            </span>
                            <span className="text-[#2A2D30]">•</span>
                            <span className="line-clamp-1">{service.description}</span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2A2D30]/60">
                          <span className="font-serif font-black text-lg sm:text-xl text-[#C9A45C]">
                            {formatVND(service.price)}
                          </span>
                          <span className="text-xs px-3 py-1.5 rounded-lg bg-[#263B32] text-[#F5F1E8] group-hover:bg-[#C9A45C] group-hover:text-[#121212] font-semibold transition-colors">
                            Đặt
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#2A2D30]/60 flex items-center justify-between text-xs text-[#F5F1E8]/65">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C9A45C]" />
                    Đã bao gồm tư vấn & sấy tạo kiểu
                  </span>
                  <span className="text-[#DFBA74]">Chuẩn quý ông</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
