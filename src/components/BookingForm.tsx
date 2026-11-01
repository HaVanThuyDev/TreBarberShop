import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Scissors,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST, BARBERS_LIST, TIME_SLOTS, STORE_CONFIG } from '../data/barberData';
import { formatVND, isValidVietnamesePhone, saveBooking } from '../utils/storage';
import type { BookingSubmission } from '../types';

interface BookingFormProps {
  preselectedServiceId?: string;
  preselectedBarberId?: string;
  preselectedStyleNote?: string;
  onBookingSuccess: (booking: BookingSubmission) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedServiceId,
  preselectedBarberId,
  preselectedStyleNote,
  onBookingSuccess,
}) => {
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successBooking, setSuccessBooking] = useState<BookingSubmission | null>(null);

  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  // Max date (30 days from now)
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(todayStr);
    }
  }, []);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceIds((prev) =>
        prev.includes(preselectedServiceId) ? prev : [...prev, preselectedServiceId]
      );
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedBarberId) {
      setSelectedBarberId(preselectedBarberId);
    }
  }, [preselectedBarberId]);

  useEffect(() => {
    if (preselectedStyleNote) {
      setNotes((prev) => {
        const addition = `Yêu cầu cắt kiểu: ${preselectedStyleNote}`;
        return prev ? `${prev} - ${addition}` : addition;
      });
    }
  }, [preselectedStyleNote]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  const selectedServices = SERVICES_LIST.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, item) => sum + item.price, 0);
  const totalDuration = selectedServices.reduce((sum, item) => sum + item.durationMinutes, 0);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập họ và tên của bạn';
    } else if (customerName.trim().length < 2) {
      newErrors.customerName = 'Họ tên quá ngắn';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!isValidVietnamesePhone(phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (cần 10 chữ số, ví dụ 0396xxxxxx)';
    }

    if (selectedServiceIds.length === 0) {
      newErrors.services = 'Vui lòng chọn ít nhất 1 dịch vụ';
    }

    if (!selectedDate) {
      newErrors.date = 'Vui lòng chọn ngày đặt lịch';
    } else if (selectedDate < todayStr) {
      newErrors.date = 'Không thể chọn ngày trong quá khứ';
    }

    if (!selectedTime) {
      newErrors.time = 'Vui lòng chọn khung giờ bạn muốn đến';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = await saveBooking({
        customerName: customerName.trim(),
        phone: phone.trim(),
        serviceIds: selectedServiceIds,
        barberId: selectedBarberId,
        date: selectedDate,
        timeSlot: selectedTime,
        notes: notes.trim(),
        totalPrice,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A45C', '#DFBA74', '#263B32', '#F5F1E8'],
        });
      } catch (err) {
        console.warn('Confetti:', err);
      }

      setSuccessBooking(saved);
      onBookingSuccess(saved);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Có lỗi xảy ra khi lưu lịch hẹn. Vui lòng gọi trực tiếp hotline ' + STORE_CONFIG.hotlineDisplay);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setSuccessBooking(null);
    setCustomerName('');
    setPhone('');
    setSelectedServiceIds([]);
    setSelectedBarberId('any');
    setSelectedTime('');
    setNotes('');
    setErrors({});
  };

  const createGoogleCalendarUrl = (booking: BookingSubmission) => {
    const title = encodeURIComponent(`Lịch cắt tóc TreBaberShop (#${booking.bookingCode})`);
    const details = encodeURIComponent(
      `Khách hàng: ${booking.customerName}\nSố điện thoại: ${booking.phone}\nDịch vụ: ${booking.serviceIds
        .map((id) => SERVICES_LIST.find((s) => s.id === id)?.name)
        .filter(Boolean)
        .join(', ')}\nĐịa chỉ: ${STORE_CONFIG.address}\nHotline: ${STORE_CONFIG.hotlineDisplay}`
    );
    const location = encodeURIComponent(STORE_CONFIG.address);
    const startHour = booking.timeSlot.replace(':', '');
    const cleanDate = booking.date.replace(/-/g, '');
    const dates = `${cleanDate}T${startHour}00/${cleanDate}T${parseInt(startHour) + 100}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-[#0b0d0c] relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#263B32]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263B32]/70 border border-[#263B32] text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-3">
            <Scissors className="w-3.5 h-3.5" />
            HỆ THỐNG ĐẶT LỊCH TRỰC TUYẾN
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F1E8] mb-4">
            ĐẶT LỊCH <span className="gold-gradient-text">CẮT TÓC ONLINE</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F1E8]/75">
            Chủ động chọn giờ, chọn thợ yêu thích, đến {STORE_CONFIG.address} là cắt ngay không cần chờ đợi.
          </p>
        </div>

        {/* Success Modal / Card State */}
        {successBooking ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#161819] border-2 border-[#C9A45C] shadow-[0_0_40px_rgba(201,164,92,0.25)] text-center animate-[fadeIn_0.3s_ease-out]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#263B32] text-[#C9A45C] border-2 border-[#C9A45C] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A45C] px-3 py-1 rounded-full bg-[#263B32]/70 border border-[#C9A45C]/40">
              ĐẶT LỊCH THÀNH CÔNG!
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#F5F1E8] mt-3 mb-2">
              Cảm ơn anh {successBooking.customerName}!
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 max-w-lg mx-auto mb-6">
              Hệ thống TreBaberShop đã ghi nhận lịch hẹn của anh. Thợ sẽ chuẩn bị sẵn ghế và dụng cụ trước giờ hẹn tại {STORE_CONFIG.address}.
            </p>

            {/* Ticket Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#1A1D1F] border border-[#2A2D30] text-left mb-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2D30]">
                <span className="text-xs text-[#F5F1E8]/70">Mã lịch hẹn:</span>
                <span className="font-mono text-base font-black text-[#C9A45C] tracking-wider">
                  #{successBooking.bookingCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#F5F1E8]/60 block">Ngày hẹn:</span>
                  <span className="font-semibold text-[#F5F1E8]">{successBooking.date}</span>
                </div>
                <div>
                  <span className="text-[#F5F1E8]/60 block">Khung giờ:</span>
                  <span className="font-semibold text-[#C9A45C] text-sm">
                    {successBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F1E8]/60 block">Số điện thoại:</span>
                  <span className="font-semibold text-[#F5F1E8]">{successBooking.phone}</span>
                </div>
                <div>
                  <span className="text-[#F5F1E8]/60 block">Barber phục vụ:</span>
                  <span className="font-semibold text-[#F5F1E8]">
                    {successBooking.barberId === 'any'
                      ? 'Barber bất kỳ (Thợ trống)'
                      : BARBERS_LIST.find((b) => b.id === successBooking.barberId)?.name || 'Chuyên viên'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2A2D30]">
                <span className="text-[#F5F1E8]/60 text-xs block mb-1">Dịch vụ đã chọn:</span>
                <div className="space-y-1">
                  {successBooking.serviceIds.map((sid) => {
                    const s = SERVICES_LIST.find((item) => item.id === sid);
                    return (
                      <div key={sid} className="flex justify-between text-xs text-[#F5F1E8]/90">
                        <span>• {s?.name}</span>
                        <span className="text-[#C9A45C] font-semibold">{s ? formatVND(s.price) : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {successBooking.notes && (
                <div className="pt-2 text-xs text-[#F5F1E8]/70">
                  <span className="text-[#C9A45C]">Ghi chú:</span> {successBooking.notes}
                </div>
              )}

              <div className="pt-3 border-t border-[#2A2D30] flex items-center justify-between">
                <span className="text-xs font-bold text-[#F5F1E8]">Tổng thanh toán:</span>
                <span className="font-serif text-lg font-black text-[#C9A45C]">
                  {formatVND(successBooking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Quick Actions for Confirmation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={createGoogleCalendarUrl(successBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-[#263B32] hover:bg-[#344E43] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C9A45C]" />
                <span>Thêm vào Lịch</span>
              </a>

              <a
                href={`${STORE_CONFIG.zaloUrl}?text=${encodeURIComponent(
                  `Xin chào TreBaberShop, tôi vừa đặt lịch hẹn mã #${successBooking.bookingCode} vào lúc ${successBooking.timeSlot} ngày ${successBooking.date}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] hover:border-[#C9A45C] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A45C]" />
                <span>Nhắn qua Zalo</span>
              </a>
            </div>

            <button
              onClick={handleBookAnother}
              className="mt-6 text-xs text-[#C9A45C] hover:underline font-semibold cursor-pointer"
            >
              + Đặt thêm lịch hẹn khác
            </button>
          </div>
        ) : (
          /* Main Booking Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-[#161819] border border-[#2A2D30] p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Step 1: Chọn Dịch Vụ */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2A2D30]">
                <label className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8] flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#C9A45C]" />
                  <span>1. Chọn dịch vụ cắt & chăm sóc</span>
                </label>
                <span className="text-xs text-[#C9A45C] font-semibold">
                  (Có thể chọn nhiều dịch vụ)
                </span>
              </div>

              {errors.services && (
                <div className="mb-3 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.services}</span>
                </div>
              )}

              {/* Service Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#263B32]/80 border-[#C9A45C] shadow-md'
                          : 'bg-[#1A1D1F]/70 border-[#2A2D30] hover:border-[#C9A45C]/40 hover:bg-[#1E2224]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-[#C9A45C] border-[#C9A45C] text-[#121212]'
                              : 'border-[#2A2D30] bg-[#121212]'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#F5F1E8]">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-[#F5F1E8]/60 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#C9A45C]" />
                            <span>{service.durationMinutes} phút</span>
                          </div>
                        </div>
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm text-[#C9A45C] shrink-0">
                        {formatVND(service.price)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Price Summary Bar */}
              {selectedServiceIds.length > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#1A1D1F] border border-[#C9A45C]/40 flex items-center justify-between">
                  <span className="text-xs text-[#F5F1E8]/80 font-medium">
                    Đã chọn {selectedServiceIds.length} dịch vụ (~{totalDuration} phút)
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-[#F5F1E8]/60 mr-2">Tạm tính:</span>
                    <span className="font-serif text-lg font-black text-[#C9A45C]">
                      {formatVND(totalPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Chọn Barber */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2A2D30]">
                <label className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#C9A45C]" />
                  <span>2. Chọn Barber phục vụ</span>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {/* Any Barber */}
                <div
                  onClick={() => setSelectedBarberId('any')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedBarberId === 'any'
                      ? 'bg-[#263B32] border-[#C9A45C] shadow-md'
                      : 'bg-[#1A1D1F] border-[#2A2D30] hover:border-[#C9A45C]/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#C9A45C]/40 flex items-center justify-center mx-auto mb-2 text-[#C9A45C]">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#F5F1E8]">Barber bất kỳ</div>
                  <div className="text-[10px] text-[#F5F1E8]/60">Sắp xếp thợ trống</div>
                </div>

                {/* Specific Barbers */}
                {BARBERS_LIST.map((barber) => {
                  const isSelected = selectedBarberId === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#263B32] border-[#C9A45C] shadow-md'
                          : 'bg-[#1A1D1F] border-[#2A2D30] hover:border-[#C9A45C]/40'
                      }`}
                    >
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-10 h-10 rounded-full object-cover mx-auto mb-2 border border-[#C9A45C]/40"
                      />
                      <div className="text-xs font-bold text-[#F5F1E8] truncate">
                        {barber.name}
                      </div>
                      <div className="text-[10px] text-[#C9A45C] truncate">{barber.role}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Chọn Ngày & Giờ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="font-serif text-base sm:text-lg font-bold text-[#F5F1E8] flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#C9A45C]" />
                  <span>3. Chọn ngày hẹn</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  max={maxDate}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] focus:border-[#C9A45C] focus:outline-none focus:ring-1 focus:ring-[#C9A45C] transition-all text-sm"
                />
                {errors.date && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.date}
                  </p>
                )}
                <span className="text-[11px] text-[#F5F1E8]/50 mt-1 block">
                  * Nhận đặt lịch trước tối đa 30 ngày
                </span>
              </div>

              {/* Time Slots */}
              <div>
                <label className="font-serif text-base sm:text-lg font-bold text-[#F5F1E8] flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#C9A45C]" />
                  <span>4. Chọn khung giờ</span>
                </label>

                {errors.time && (
                  <p className="mb-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.time}
                  </p>
                )}

                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setSelectedTime(slot);
                          if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                        }}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C9A45C] text-[#121212] font-black shadow-md scale-105'
                            : 'bg-[#1A1D1F] text-[#F5F1E8]/80 border border-[#2A2D30] hover:border-[#C9A45C]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Thông Tin Khách Hàng */}
            <div className="pt-2 border-t border-[#2A2D30]">
              <label className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8] flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#C9A45C]" />
                <span>5. Thông tin người đặt</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1.5">
                    Họ và tên quý khách <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:border-[#C9A45C] focus:outline-none focus:ring-1 focus:ring-[#C9A45C] text-sm"
                    />
                    <User className="w-4 h-4 text-[#C9A45C]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.customerName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1.5">
                    Số điện thoại liên hệ <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0396 339 931"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:border-[#C9A45C] focus:outline-none focus:ring-1 focus:ring-[#C9A45C] text-sm"
                    />
                    <Phone className="w-4 h-4 text-[#C9A45C]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#F5F1E8]/80 mb-1.5">
                  Ghi chú thêm (Tùy chọn: Kiểu tóc mong muốn, lưu ý da đầu...)
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Muốn cắt kiểu Undercut gọt sát hai bên, tóc mỏng cần tư vấn uốn phồng..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A1D1F] border border-[#2A2D30] text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:border-[#C9A45C] focus:outline-none focus:ring-1 focus:ring-[#C9A45C] text-sm resize-none"
                  />
                  <FileText className="w-4 h-4 text-[#C9A45C]/70 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C9A45C] via-[#DFBA74] to-[#C9A45C] text-[#121212] font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_6px_25px_rgba(201,164,92,0.45)] hover:shadow-[0_8px_30px_rgba(201,164,92,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ĐANG XỬ LÝ LỊCH HẸN...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Scissors className="w-5 h-5" />
                    XÁC NHẬN ĐẶT LỊCH NGAY
                  </span>
                )}
              </button>
              <p className="text-center text-[11px] text-[#F5F1E8]/50 mt-3">
                * Cam kết bảo mật thông tin khách hàng. TreBaberShop sẽ gọi xác nhận trước giờ hẹn 15 phút.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
