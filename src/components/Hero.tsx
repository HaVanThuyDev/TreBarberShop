import React from 'react';
import { Compass, ShieldCheck, Scissors, Award, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
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
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Layered Gradients */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 640px)" srcSet="/background-mobile.webp" type="image/webp" />
          <source srcSet="/background.webp" type="image/webp" />
          <img
            src="/background.png"
            alt="TreBaberShop Không Gian Barber Hiện Đại"
            className="w-full h-full object-cover object-center scale-105"
          />
        </picture>
        {/* Deep Charcoal & Moss Green gradient overlay with atmospheric softness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1110] via-[#0e1110]/85 to-[#0e1110]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c2e26]/40 via-transparent to-[#0e1110]/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Brand Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F1E8] mb-4 drop-shadow-2xl">
          TRE<span className="gold-gradient-text">BABERSHOP</span>
        </h1>

        {/* Tagline */}
        <p className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-wide text-[#DFBA74] mb-5 uppercase max-w-3xl">
          “KHẲNG ĐỊNH PHONG CÁCH – ĐỊNH HÌNH CHẤT RIÊNG”
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/85 max-w-2xl leading-relaxed mb-8 font-normal">
          Không chỉ là một kiểu tóc, đó là phong cách và cá tính của chính bạn. Đến với TreBaberShop để trải nghiệm dịch vụ chăm sóc tóc nam chuyên nghiệp chuẩn mực quý ông.
        </p>

        {/* 2 CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={() => scrollTo('#booking')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A45C] via-[#DFBA74] to-[#C9A45C] text-[#121212] font-black text-sm uppercase tracking-widest shadow-[0_6px_25px_rgba(201,164,92,0.45)] hover:shadow-[0_8px_30px_rgba(201,164,92,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Scissors className="w-4 h-4" />
            ĐẶT LỊCH NGAY
          </button>

          <button
            onClick={() => scrollTo('#showcase')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#263B32]/80 hover:bg-[#263B32] text-[#F5F1E8] font-bold text-sm uppercase tracking-wider border border-[#C9A45C]/50 hover:border-[#C9A45C] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-[#C9A45C]" />
            XEM ẢNH THỰC TẾ QUÁN
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#263B32]/80">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#161819]/80 border border-[#2A2D30]/80 backdrop-blur-sm text-left">
            <div className="p-2 rounded-xl bg-[#263B32] text-[#C9A45C] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#F5F1E8]">10.000+</div>
              <div className="text-[11px] text-[#F5F1E8]/70">Khách quen tin chọn</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#161819]/80 border border-[#2A2D30]/80 backdrop-blur-sm text-left">
            <div className="p-2 rounded-xl bg-[#263B32] text-[#C9A45C] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#F5F1E8]">8+ Năm</div>
              <div className="text-[11px] text-[#F5F1E8]/70">Tay nghề Master Barber</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#161819]/80 border border-[#2A2D30]/80 backdrop-blur-sm text-left">
            <div className="p-2 rounded-xl bg-[#263B32] text-[#C9A45C] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#F5F1E8]">100% Khử trùng</div>
              <div className="text-[11px] text-[#F5F1E8]/70">Khăn & dao dùng 1 lần</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#161819]/80 border border-[#2A2D30]/80 backdrop-blur-sm text-left">
            <div className="p-2 rounded-xl bg-[#263B32] text-[#C9A45C] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#F5F1E8]">Đúng Giờ Hẹn</div>
              <div className="text-[11px] text-[#F5F1E8]/70">Cắt ngay không chờ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
