import React, { useState } from 'react';
import { Camera, Maximize2, X, Scissors, MapPin } from 'lucide-react';
import { STORE_REAL_IMAGES, STORE_CONFIG } from '../data/barberData';

export const RealShowcase: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<(typeof STORE_REAL_IMAGES)[0] | null>(null);

  return (
    <section id="showcase" className="py-20 sm:py-28 bg-[#0d0f0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            HÌNH ẢNH THỰC TẾ TẠI TIỆM
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            KHÔNG GIAN & TAY NGHỀ <span className="gold-gradient-text">TREBABERSHOP</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
            Những khoảnh khắc thực tế được ghi lại tại địa chỉ <span className="text-[#DFBA74] font-semibold">{STORE_CONFIG.address}</span>. Nơi mỗi đường kéo đều được gửi gắm trọn vẹn tâm huyết.
          </p>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Main Large Card (img1 or img2) */}
          <div
            onClick={() => setSelectedImg(STORE_REAL_IMAGES[0])}
            className="sm:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/60 group cursor-pointer aspect-[16/10] sm:aspect-[16/9] shadow-xl"
          >
            <img
              src={STORE_REAL_IMAGES[0].src}
              alt={STORE_REAL_IMAGES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#F5F1E8] group-hover:bg-[#C9A45C] group-hover:text-[#121212] transition-colors">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263B32]/90 text-[#DFBA74] text-xs font-semibold border border-[#C9A45C]/30 mb-2">
                <Scissors className="w-3 h-3 text-[#C9A45C]" />
                Hình ảnh thực tế #1
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1E8]">
                {STORE_REAL_IMAGES[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F1E8]/75 mt-1">
                {STORE_REAL_IMAGES[0].desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setSelectedImg(STORE_REAL_IMAGES[1])}
            className="relative rounded-3xl overflow-hidden bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/60 group cursor-pointer aspect-square sm:aspect-auto shadow-xl"
          >
            <img
              src={STORE_REAL_IMAGES[1].src}
              alt={STORE_REAL_IMAGES[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#F5F1E8] group-hover:bg-[#C9A45C] group-hover:text-[#121212] transition-colors">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#263B32]/90 text-[#DFBA74] text-xs font-semibold border border-[#C9A45C]/30 mb-2">
                <MapPin className="w-3 h-3 text-[#C9A45C]" />
                Hình ảnh thực tế #2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                {STORE_REAL_IMAGES[1].title}
              </h3>
              <p className="text-xs text-[#F5F1E8]/75 mt-1">
                {STORE_REAL_IMAGES[1].desc}
              </p>
            </div>
          </div>

          {/* Cards 3, 4, 5 */}
          {STORE_REAL_IMAGES.slice(2).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImg(item)}
              className="relative rounded-3xl overflow-hidden bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/60 group cursor-pointer aspect-[4/5] sm:aspect-square shadow-xl"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F5F1E8] group-hover:bg-[#C9A45C] group-hover:text-[#121212] transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#263B32]/90 text-[#DFBA74] text-[11px] font-semibold border border-[#C9A45C]/30 mb-1.5">
                  Hình ảnh #{idx + 3}
                </div>
                <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#F5F1E8]/70 mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#181A1B] border border-[#C9A45C]/50 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-[#C9A45C] hover:text-[#121212] text-[#F5F1E8] transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 bg-[#161819] border-t border-[#2A2D30] text-left">
              <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mb-1">
                {selectedImg.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed">
                {selectedImg.desc} – Ảnh chụp thực tế tại TreBaberShop ({STORE_CONFIG.address}).
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
