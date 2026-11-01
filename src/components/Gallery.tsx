import React, { useState } from 'react';
import { Maximize2, X, Check, Scissors } from 'lucide-react';
import { HAIRSTYLES_GALLERY } from '../data/barberData';
import type { HairstyleItem } from '../types';

interface GalleryProps {
  onSelectHairstyleForBooking: (styleName: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectHairstyleForBooking }) => {
  const [selectedStyle, setSelectedStyle] = useState<HairstyleItem | null>(null);

  const handleBookThisStyle = (style: HairstyleItem) => {
    setSelectedStyle(null);
    onSelectHairstyleForBooking(style.name);
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
    <section id="gallery" className="py-20 sm:py-28 bg-[#0b0d0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Scissors className="w-3.5 h-3.5" />
            LOOKBOOK & BỘ SƯU TẬP
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            BỘ SƯU TẬP <span className="gold-gradient-text">KIỂU TÓC NAM</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            Tổng hợp các kiểu tóc xu hướng được các thợ tại TreBaberShop thực hiện. Chạm vào ảnh để xem chi tiết và dáng mặt phù hợp.
          </p>
        </div>

        {/* Gallery Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {HAIRSTYLES_GALLERY.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedStyle(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/70 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              {/* Aspect Ratio 4:5 or 1:1 image container */}
              <div className="aspect-[4/5] sm:aspect-square w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium text-[#C9A45C]">
                  {item.tag}
                </div>

                {/* Zoom Icon on Hover / Corner */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F5F1E8] group-hover:bg-[#C9A45C] group-hover:text-[#121212] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-left">
                  <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#F5F1E8] group-hover:text-[#DFBA74] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#F5F1E8]/70 mt-1 line-clamp-1">
                    Hợp: {item.suitableFace}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedStyle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedStyle(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#181A1B] border border-[#C9A45C]/50 rounded-3xl overflow-hidden shadow-2xl animate-[scaleUp_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStyle(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#C9A45C] hover:text-[#121212] text-[#F5F1E8] transition-colors cursor-pointer"
              aria-label="Đóng popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-black">
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181A1B] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-[#263B32] text-[#DFBA74] text-xs font-semibold border border-[#C9A45C]/30">
                {selectedStyle.tag}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="font-serif text-2xl font-black text-[#F5F1E8] mb-2">
                {selectedStyle.name}
              </h3>

              <div className="p-3 rounded-xl bg-[#263B32]/40 border border-[#263B32] mb-4 text-xs sm:text-sm text-[#F5F1E8]/90 flex items-start gap-2">
                <Check className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#C9A45C]">Khuôn mặt thích hợp nhất:</strong> {selectedStyle.suitableFace}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed mb-6">
                {selectedStyle.description}
              </p>

              {/* Action */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleBookThisStyle(selectedStyle)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Scissors className="w-4 h-4" />
                  Đặt lịch cắt kiểu này ngay
                </button>
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="py-3 px-4 rounded-xl bg-[#2A2D30] text-[#F5F1E8] text-xs sm:text-sm font-semibold hover:bg-[#35393D] transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
