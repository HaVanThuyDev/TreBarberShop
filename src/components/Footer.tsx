import React from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { STORE_CONFIG, SERVICES_LIST } from '../data/barberData';
import { FacebookIcon } from './Icons';

export const Footer: React.FC = () => {
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

  const navLinks = [
    { name: 'Trang chủ', href: '#hero' },
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Bộ sưu tập', href: '#gallery' },
    { name: 'Đội ngũ Barber', href: '#team' },
    { name: 'Đánh giá', href: '#reviews' },
    { name: 'Đặt lịch online', href: '#booking' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0B0C0E] border-t border-[#263B32] pt-16 pb-24 md:pb-16 text-[#F5F1E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2D30]/80">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A45C]">
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </picture>
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-wider text-[#F5F1E8]">
                  TRE<span className="text-[#C9A45C]">BABER</span>SHOP
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#C9A45C] uppercase">
                  Modern Barber Shop
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F1E8]/70 leading-relaxed max-w-sm">
              Không chỉ là một kiểu tóc, đó là phong cách và cá tính của chính bạn. TreBaberShop tự hào mang đến trải nghiệm cắt tóc nam và thư giãn đẳng cấp.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#161819] border border-[#2A2D30] hover:border-[#1877F2] text-[#F5F1E8] hover:text-[#1877F2] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href={STORE_CONFIG.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#161819] border border-[#2A2D30] hover:border-[#A334FA] text-[#F5F1E8] hover:text-[#A334FA] flex items-center justify-center transition-all"
                aria-label="Messenger"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={STORE_CONFIG.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#161819] border border-[#2A2D30] hover:border-[#0068FF] text-[#F5F1E8] hover:text-[#0068FF] flex items-center justify-center transition-all font-black text-[11px]"
                aria-label="Zalo"
              >
                Z
              </a>

              <a
                href={`tel:${STORE_CONFIG.hotline}`}
                className="w-9 h-9 rounded-full bg-[#263B32] border border-[#C9A45C]/40 text-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#121212] flex items-center justify-center transition-all"
                aria-label="Hotline"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-[#C9A45C] uppercase tracking-wider mb-4">
              Điều Hướng Nhanh
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs sm:text-sm text-[#F5F1E8]/70 hover:text-[#C9A45C] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold text-[#C9A45C] uppercase tracking-wider mb-4">
              Dịch Vụ Nổi Bật
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LIST.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-xs sm:text-sm text-[#F5F1E8]/70 hover:text-[#DFBA74] transition-colors text-left cursor-pointer"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#C9A45C] uppercase tracking-wider mb-4">
              Thông Tin Liên Hệ
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/80">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <span>{STORE_CONFIG.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#F5F1E8]/80">
              <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <a href={`tel:${STORE_CONFIG.hotline}`} className="hover:text-[#C9A45C] transition-colors">
                Hotline: {STORE_CONFIG.hotlineDisplay}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#F5F1E8]/80">
              <Clock className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <span>{STORE_CONFIG.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/50 text-center">
          <p>© 2026 TreBaberShop. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế & phát triển cho</span>
            <span className="text-[#C9A45C] font-semibold">TreBaberShop</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
