import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
import { STORE_CONFIG } from '../data/barberData';
import { FacebookIcon } from './Icons';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0b0d0c] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#263B32]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            KẾT NỐI VỚI CHÚNG TÔI
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            THÔNG TIN <span className="gold-gradient-text">LIÊN HỆ & ĐỊA CHỈ</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            TreBaberShop hân hạnh đón tiếp quý khách tại Hà Nội. Hãy liên hệ qua Hotline, Zalo hoặc ghé trực tiếp tiệm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Real Action Buttons */}
          <div className="lg:col-span-5 space-y-4">
            {/* Store Address Card */}
            <div className="p-6 rounded-3xl bg-[#161819] border border-[#2A2D30] shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#263B32] text-[#C9A45C] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F5F1E8] mb-1">
                    Địa Chỉ Tiệm
                  </h3>
                  <p className="text-sm text-[#DFBA74] font-medium leading-relaxed mb-3">
                    {STORE_CONFIG.address}
                  </p>
                  <a
                    href={STORE_CONFIG.mapDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A45C] hover:text-[#DFBA74] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Mở Google Maps chỉ đường</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hotline Card */}
            <div className="p-6 rounded-3xl bg-[#161819] border border-[#2A2D30] shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#263B32] text-[#C9A45C] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#F5F1E8] mb-1">
                    Hotline Tư Vấn & Hỗ Trợ
                  </h3>
                  <p className="text-xs text-[#F5F1E8]/70 mb-3">
                    Giải đáp thắc mắc, tư vấn kiểu tóc & xử lý lịch hẹn 24/7.
                  </p>
                  <a
                    href={`tel:${STORE_CONFIG.hotline}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] font-black text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Gọi {STORE_CONFIG.hotlineDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 rounded-3xl bg-[#161819] border border-[#2A2D30] shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#263B32] text-[#C9A45C] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F5F1E8] mb-1">
                    Giờ Hoạt Động
                  </h3>
                  <p className="text-sm font-semibold text-[#DFBA74] mb-1">
                    {STORE_CONFIG.openingHours}
                  </p>
                  <p className="text-xs text-[#F5F1E8]/65">
                    Phục vụ xuyên suốt các ngày trong tuần, kể cả ngày Thứ 7, Chủ Nhật và các dịp Lễ Tết.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Connect Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Zalo */}
              <a
                href={STORE_CONFIG.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#161819] border border-[#2A2D30] hover:border-[#0068FF] text-center group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0068FF]/15 text-[#0068FF] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform font-bold text-sm">
                  Zalo
                </div>
                <div className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#0068FF] transition-colors">
                  Zalo Chat
                </div>
              </a>

              {/* Facebook */}
              <a
                href={STORE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#161819] border border-[#2A2D30] hover:border-[#1877F2] text-center group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#1877F2] transition-colors">
                  Facebook
                </div>
              </a>

              {/* Messenger */}
              <a
                href={STORE_CONFIG.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#161819] border border-[#2A2D30] hover:border-[#A334FA] text-center group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#A334FA]/15 text-[#A334FA] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#F5F1E8] group-hover:text-[#A334FA] transition-colors">
                  Messenger
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Interactive Card */}
          <div className="lg:col-span-7 h-full">
            <div className="rounded-3xl bg-[#161819] border border-[#2A2D30] overflow-hidden shadow-2xl h-full flex flex-col justify-between">
              <div className="p-4 bg-[#1A1D1F] border-b border-[#2A2D30] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-[#F5F1E8]/70 ml-2">
                    Bản đồ: 309 Xuân Phương, Nam Từ Liêm, Hà Nội
                  </span>
                </div>
                <a
                  href={STORE_CONFIG.mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A45C] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Navigation className="w-3 h-3" />
                  Chỉ đường
                </a>
              </div>

              {/* Map iframe */}
              <div className="relative w-full h-[380px] sm:h-[460px] bg-[#121212]">
                <iframe
                  title="Google Maps TreBaberShop"
                  src={STORE_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 bg-[#1A1D1F] border-t border-[#2A2D30] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#F5F1E8]/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  <span>Cửa hàng đang mở cửa đón khách tại Hà Nội</span>
                </div>
                <span className="text-[#DFBA74]">Có chỗ đỗ xe máy & ô tô thuận tiện</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
