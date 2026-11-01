import React from 'react';
import { Users, ShieldCheck, HeartHandshake, Scissors, CheckCircle2, Award } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: Users,
      title: 'Đội ngũ Barber chuyên nghiệp',
      desc: 'Các tay kéo nhiều năm kinh nghiệm, luôn cập nhật các kỹ thuật fade, uốn, tạo kiểu xu hướng thế giới.',
    },
    {
      icon: Scissors,
      title: 'Không gian hiện đại & Sang trọng',
      desc: 'Thiết kế phong cách Modern Barber tối giản, ánh sáng chuẩn salon, điều hòa mát lạnh và âm nhạc thư giãn.',
    },
    {
      icon: ShieldCheck,
      title: 'Dụng cụ tiệt trùng sạch sẽ 100%',
      desc: 'Mỗi khách hàng được phục vụ bằng bộ khăn mới, lưỡi dao cạo dùng 1 lần và dụng cụ sát khuẩn tia cực tím.',
    },
    {
      icon: Award,
      title: 'Tư vấn kiểu tóc chuẩn tỉ lệ mặt',
      desc: 'Phân tích cấu trúc hộp sọ, chất tóc và phong cách công việc để chọn kiểu tóc tôn nét nam tính nhất.',
    },
    {
      icon: HeartHandshake,
      title: 'Chăm sóc khách hàng tận tình',
      desc: 'Phục vụ nước uống miễn phí, bảo hành chỉnh sửa form tóc trong 3 ngày nếu khách chưa ưng ý.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0f1210] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#263B32]/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Collage & Brand Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image using real img2 */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#C9A45C]/40 shadow-2xl">
                <picture>
                  <source srcSet="/img2.webp" type="image/webp" />
                  <img
                    src="/img2.jpg"
                    alt="TreBaberShop Story"
                    className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1210] via-transparent to-transparent opacity-80" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#181A1B]/90 backdrop-blur-md border border-[#C9A45C]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A45C] to-[#263B32] flex items-center justify-center font-serif font-black text-xl text-[#121212]">
                      TB
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-[#F5F1E8]">TreBaberShop</div>
                      <div className="text-xs text-[#C9A45C]">Nghệ thuật & Đẳng cấp</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#263B32] text-[#DFBA74] border border-[#C9A45C]/30">
                      Chuẩn Barber
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & 5 Core Pillars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-4">
              <Scissors className="w-3.5 h-3.5" />
              VỀ CHÚNG TÔI
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-6 leading-tight">
              CÂU CHUYỆN CỦA <span className="gold-gradient-text">CHÚNG TÔI</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#161819]/90 border-l-4 border-[#C9A45C] border-y border-r border-[#2A2D30] mb-8">
              <p className="text-base sm:text-lg text-[#F5F1E8]/90 font-medium leading-relaxed italic">
                “TreBaberShop là nơi dành cho những người đàn ông yêu thích sự chỉn chu, tự tin và phong cách riêng. Chúng tôi mang đến trải nghiệm cắt tóc chuyên nghiệp, tận tâm và phù hợp với từng khuôn mặt.”
              </p>
            </div>

            {/* 5 Core Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group p-4 rounded-2xl bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/50 hover:bg-[#1A1D1F] transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-[#263B32] text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#121212] transition-colors shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-bold text-[#F5F1E8] group-hover:text-[#DFBA74] transition-colors">
                          {item.title}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-[#C9A45C]/50 group-hover:text-[#C9A45C] transition-colors shrink-0 ml-2" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#F5F1E8]/70 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
