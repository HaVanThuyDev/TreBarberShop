import React from 'react';
import { X, Calendar, Clock, Scissors, User, Phone, CheckCircle2, Trash2 } from 'lucide-react';
import type { BookingSubmission } from '../types';
import { SERVICES_LIST, BARBERS_LIST } from '../data/barberData';
import { formatVND } from '../utils/storage';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingSubmission[];
  onClearBookings: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onClearBookings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full max-h-[85vh] bg-[#181A1B] border border-[#C9A45C]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-[scaleUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#161819] border-b border-[#2A2D30] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#263B32] text-[#C9A45C]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8]">
                Lịch Hẹn Của Bạn
              </h3>
              <p className="text-xs text-[#F5F1E8]/60">
                Được lưu an toàn trên thiết bị của bạn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1A1D1F] hover:bg-[#2A2D30] text-[#F5F1E8] transition-colors cursor-pointer"
            aria-label="Đóng popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="py-12 text-center text-[#F5F1E8]/60 space-y-3">
              <Calendar className="w-12 h-12 text-[#2A2D30] mx-auto" />
              <p className="text-sm">Bạn chưa có lịch hẹn nào được lưu.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#C9A45C] text-[#121212] font-bold text-xs uppercase"
              >
                Đặt lịch ngay
              </button>
            </div>
          ) : (
            bookings.map((b) => {
              const barberObj = BARBERS_LIST.find((item) => item.id === b.barberId);
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#161819] border border-[#2A2D30] hover:border-[#C9A45C]/40 transition-all space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#2A2D30]">
                    <span className="font-mono font-black text-sm text-[#C9A45C]">
                      #{b.bookingCode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#263B32] text-[#DFBA74] border border-[#C9A45C]/30 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã xác nhận
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#F5F1E8]/80">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span className="font-bold text-[#DFBA74]">{b.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{b.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{b.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2A2D30]/60">
                    <div className="text-[11px] text-[#F5F1E8]/60 mb-1 flex items-center gap-1">
                      <Scissors className="w-3 h-3 text-[#C9A45C]" />
                      <span>Dịch vụ ({b.serviceIds.length}):</span>
                    </div>
                    <div className="space-y-0.5 pl-4">
                      {b.serviceIds.map((sid) => {
                        const s = SERVICES_LIST.find((item) => item.id === sid);
                        return (
                          <div key={sid} className="text-[#F5F1E8]/90">
                            • {s?.name} ({s ? formatVND(s.price) : ''})
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2A2D30]/60 flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Thợ: {barberObj ? barberObj.name : 'Barber bất kỳ'}</span>
                    <span className="font-serif font-black text-sm text-[#C9A45C]">
                      {formatVND(b.totalPrice)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="p-4 bg-[#161819] border-t border-[#2A2D30] flex items-center justify-between">
            <button
              onClick={onClearBookings}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa lịch sử</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#2A2D30] hover:bg-[#35393D] text-[#F5F1E8] text-xs font-semibold cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
