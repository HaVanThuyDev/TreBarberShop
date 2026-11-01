import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck2, Clock, Scissors } from 'lucide-react';
import { STORE_CONFIG } from '../data/barberData';

interface HeaderProps {
  onOpenMyBookings: () => void;
  savedBookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMyBookings, savedBookingsCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#hero' },
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Không gian thực', href: '#showcase' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Bộ sưu tập', href: '#gallery' },
    { name: 'Đội ngũ Barber', href: '#team' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1210]/95 backdrop-blur-md border-b border-[#263B32]/70 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/95 via-[#0f1210]/75 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#C9A45C] shadow-[0_0_15px_rgba(201,164,92,0.3)] group-hover:scale-105 transition-transform bg-[#181A1B]">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="TreBaberShop Logo"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </picture>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-wider text-[#F5F1E8] group-hover:text-[#C9A45C] transition-colors">
                TRE<span className="text-[#C9A45C]">BABER</span>SHOP
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.25em] text-[#C9A45C]/90 uppercase font-medium">
                Modern Barber Shop
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#F5F1E8]/85 hover:text-[#C9A45C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C9A45C] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Lịch hẹn đã đặt (nếu có) */}
            <button
              onClick={onOpenMyBookings}
              title="Tra cứu lịch hẹn của bạn"
              className="relative p-2.5 rounded-full bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 transition-all cursor-pointer"
            >
              <CalendarCheck2 className="w-5 h-5" />
              {savedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A45C] text-[#121212] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {savedBookingsCount}
                </span>
              )}
            </button>

            {/* Hotline Call Button */}
            <a
              href={`tel:${STORE_CONFIG.hotline}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#263B32]/80 border border-[#263B32] text-xs font-semibold text-[#F5F1E8] hover:bg-[#263B32] hover:border-[#C9A45C]/50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{STORE_CONFIG.hotlineDisplay}</span>
            </a>

            {/* CTA ĐẶT LỊCH NGAY */}
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(201,164,92,0.4)] hover:shadow-[0_6px_22px_rgba(201,164,92,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                ĐẶT LỊCH NGAY
              </span>
            </a>
          </div>

          {/* Mobile Right Controls: Bookings Button + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] active:scale-95"
              aria-label="Xem lịch hẹn"
            >
              <CalendarCheck2 className="w-5 h-5 text-[#C9A45C]" />
              {savedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A45C] text-[#121212] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedBookingsCount}
                </span>
              )}
            </button>

            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="px-3 py-1.5 rounded-lg bg-[#C9A45C] text-[#121212] font-black text-xs uppercase tracking-wide active:scale-95 flex items-center gap-1"
            >
              <Scissors className="w-3 h-3" />
              Đặt Lịch
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] hover:text-[#C9A45C] transition-colors focus:outline-none"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`md:hidden fixed inset-x-0 top-[65px] bg-[#0f1210]/98 backdrop-blur-xl border-b border-[#263B32] transition-all duration-300 ease-in-out shadow-2xl ${
          mobileMenuOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto py-5' : 'max-h-0 opacity-0 overflow-hidden py-0'
        }`}
      >
        <div className="max-w-md mx-auto px-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 border-b border-[#2A2D30]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#F5F1E8] hover:text-[#C9A45C] hover:bg-[#1A1D1F] active:bg-[#263B32]/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-[#F5F1E8]/70 px-1">
              <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{STORE_CONFIG.openingHours}</span>
            </div>

            <a
              href={`tel:${STORE_CONFIG.hotline}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#263B32] text-[#F5F1E8] font-bold text-sm border border-[#354F44]"
            >
              <Phone className="w-4 h-4 text-[#C9A45C]" />
              <span>Gọi hotline: {STORE_CONFIG.hotlineDisplay}</span>
            </a>

            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] font-black text-sm uppercase tracking-wider shadow-lg shadow-[#C9A45C]/30"
            >
              <Scissors className="w-4 h-4" />
              ĐẶT LỊCH NGAY
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
