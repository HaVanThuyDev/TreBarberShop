import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Scissors } from 'lucide-react';
import { STORE_CONFIG } from '../data/barberData';
import { FacebookIcon } from './Icons';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBooking = () => {
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
    <>
      {/* Floating Speed-dial / Action Stack on the Bottom Right */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Cuộn lên đầu trang"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A1D1F]/90 border border-[#2A2D30] text-[#F5F1E8] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 flex items-center justify-center shadow-lg backdrop-blur-md transition-all active:scale-90 cursor-pointer animate-[fadeIn_0.3s_ease-out]"
            aria-label="Cuộn lên đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Facebook Fanpage Button */}
        <a
          href={STORE_CONFIG.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Ghé thăm Facebook TreBaberShop"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(24,119,242,0.4)] hover:scale-110 active:scale-95 transition-all"
          aria-label="Facebook Cá Nhân & Quán"
        >
          <FacebookIcon className="w-5 h-5 fill-current" />
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1 rounded-lg bg-[#181A1B] text-[#F5F1E8] text-xs font-semibold whitespace-nowrap border border-[#2A2D30] shadow-xl pointer-events-none">
            Facebook TreBaberShop
          </span>
        </a>

        {/* Messenger Button */}
        <a
          href={STORE_CONFIG.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat qua Messenger"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#0084FF] via-[#A033FF] to-[#FF5E3A] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(160,51,255,0.4)] hover:scale-110 active:scale-95 transition-all"
          aria-label="Chat Messenger"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1 rounded-lg bg-[#181A1B] text-[#F5F1E8] text-xs font-semibold whitespace-nowrap border border-[#2A2D30] shadow-xl pointer-events-none">
            Chat Messenger
          </span>
        </a>

        {/* Zalo Button */}
        <a
          href={STORE_CONFIG.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat qua Zalo"
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(0,104,255,0.4)] hover:scale-110 active:scale-95 transition-all font-black text-xs"
          aria-label="Chat Zalo"
        >
          <span>Zalo</span>
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1 rounded-lg bg-[#181A1B] text-[#F5F1E8] text-xs font-semibold whitespace-nowrap border border-[#2A2D30] shadow-xl pointer-events-none">
            Zalo: {STORE_CONFIG.hotlineDisplay}
          </span>
        </a>

        {/* Phone Call Hotline Button with Pulse Animation */}
        <a
          href={`tel:${STORE_CONFIG.hotline}`}
          title="Gọi Hotline ngay"
          className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] flex items-center justify-center shadow-[0_4px_25px_rgba(201,164,92,0.6)] hover:scale-110 active:scale-95 transition-all"
          aria-label="Gọi điện thoại trực tiếp"
        >
          <span className="absolute inset-0 rounded-full bg-[#C9A45C] opacity-75 animate-ping -z-10" />
          <Phone className="w-6 h-6 fill-current" />
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1 rounded-lg bg-[#181A1B] text-[#DFBA74] text-xs font-bold whitespace-nowrap border border-[#C9A45C]/40 shadow-xl pointer-events-none">
            Hotline: {STORE_CONFIG.hotlineDisplay}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0f1210]/95 backdrop-blur-xl border-t border-[#263B32] p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:${STORE_CONFIG.hotline}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#263B32] text-[#F5F1E8] text-xs font-bold flex items-center justify-center gap-2 border border-[#354F44] active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Gọi Hotline</span>
        </a>

        <button
          onClick={scrollToBooking}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#C9A45C]/25 active:scale-95 cursor-pointer"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Đặt Lịch Ngay</span>
        </button>
      </div>
    </>
  );
};
