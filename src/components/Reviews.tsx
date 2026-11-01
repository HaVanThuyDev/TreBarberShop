import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, Plus } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/barberData';
import type { ReviewItem } from '../types';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('tre_barbershop_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newService, setNewService] = useState('Cắt tóc tạo kiểu');

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      role: 'Khách hàng mới',
      avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Vừa xong',
      serviceUsed: newService,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('tre_barbershop_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setIsModalOpen(false);
    setNewName('');
    setNewComment('');
    setCurrentIndex(0);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0d0f0e] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            KHÁCH HÀNG NÓI GÌ <span className="gold-gradient-text">VỀ TREBABERSHOP</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            Sự hài lòng của quý khách là niềm tự hào và động lực lớn nhất để đội ngũ Barber không ngừng hoàn thiện.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#161819] border border-[#2A2D30] shadow-2xl relative overflow-hidden text-center min-h-[300px] flex flex-col justify-between">
            <MessageSquareQuote className="w-14 h-14 text-[#263B32] absolute top-6 right-6 -rotate-12 opacity-50" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < reviews[currentIndex].rating
                        ? 'fill-[#C9A45C] text-[#C9A45C]'
                        : 'text-[#2A2D30]'
                    }`}
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-base sm:text-lg text-[#F5F1E8]/90 font-medium leading-relaxed italic mb-8 max-w-xl mx-auto">
                “{reviews[currentIndex].comment}”
              </p>
            </div>

            {/* Reviewer Info */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C9A45C] mb-3 shadow-md bg-[#263B32]">
                <img
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                {reviews[currentIndex].name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#C9A45C] mt-0.5">
                <span>{reviews[currentIndex].serviceUsed}</span>
                <span>•</span>
                <span className="text-[#F5F1E8]/50">{reviews[currentIndex].date}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Đánh giá trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIndex ? 'w-8 bg-[#C9A45C]' : 'w-2 bg-[#2A2D30]'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Đánh giá kế tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Leave a review button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1D1F] border border-[#2A2D30] hover:border-[#C9A45C]/60 text-xs font-semibold text-[#DFBA74] hover:text-[#F5F1E8] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C9A45C]" />
              <span>Gửi đánh giá cảm nhận của bạn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#181A1B] border border-[#2A2D30] rounded-3xl p-6 sm:p-8 shadow-2xl animate-[scaleUp_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mb-1">
              Gửi Đánh Giá Của Bạn
            </h3>
            <p className="text-xs text-[#F5F1E8]/70 mb-5">
              Cảm nhận thực tế của bạn giúp TreBaberShop phục vụ ngày càng tốt hơn.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1">
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Tuấn"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] text-sm focus:border-[#C9A45C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1">
                  Đánh giá số sao
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating
                            ? 'fill-[#C9A45C] text-[#C9A45C]'
                            : 'text-[#2A2D30]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#C9A45C] font-bold ml-2">
                    {newRating} / 5 Sao
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1">
                  Dịch vụ đã trải nghiệm
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cắt tạo kiểu, Combo Hoàng Đế..."
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] text-sm focus:border-[#C9A45C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1">
                  Lời nhận xét
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Chia sẻ trải nghiệm của bạn về thợ, không gian, kiểu tóc..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] text-sm focus:border-[#C9A45C] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#DFBA74] text-[#121212] font-black text-xs uppercase tracking-wider cursor-pointer"
                >
                  Gửi nhận xét
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-[#2A2D30] text-[#F5F1E8] text-xs font-semibold hover:bg-[#35393D] cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
