import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { RealShowcase } from './components/RealShowcase';
import { Services } from './components/Services';
import { PriceList } from './components/PriceList';
import { Gallery } from './components/Gallery';
import { BarberTeam } from './components/BarberTeam';
import { BookingForm } from './components/BookingForm';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { MyBookingsModal } from './components/MyBookingsModal';
import { DragonAuraBackground } from './components/DragonAuraBackground';
import { getSavedBookings } from './utils/storage';
import type { BookingSubmission } from './types';

export const App: React.FC = () => {
  const [savedBookings, setSavedBookings] = useState<BookingSubmission[]>([]);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Preselection state for booking form
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | undefined>();
  const [preselectedStyleNote, setPreselectedStyleNote] = useState<string | undefined>();

  useEffect(() => {
    setSavedBookings(getSavedBookings());
  }, []);

  const handleBookingSuccess = (newBooking: BookingSubmission) => {
    setSavedBookings((prev) => [newBooking, ...prev]);
  };

  const handleClearBookings = () => {
    if (window.confirm('Bạn có chắc muốn xóa danh sách lịch hẹn đã lưu trên máy này?')) {
      localStorage.removeItem('tre_barbershop_bookings_v1');
      setSavedBookings([]);
      setIsMyBookingsOpen(false);
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
  };

  const handleSelectBarberForBooking = (barberId: string) => {
    setPreselectedBarberId(barberId);
  };

  const handleSelectHairstyleForBooking = (styleName: string) => {
    setPreselectedStyleNote(styleName);
  };

  return (
    <div className="min-h-screen bg-[#0e1110] text-[#F5F1E8] font-sans selection:bg-[#C9A45C] selection:text-[#121212] relative overflow-x-hidden">
      {/* Hiệu ứng chuyển động Rồng bay phượng múa nền vàng đồng & hào quang mờ */}
      <DragonAuraBackground />

      {/* Navigation Header */}
      <Header
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        savedBookingsCount={savedBookings.length}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* 3. Hero Section */}
        <Hero />

        {/* 4. Giới Thiệu (About) */}
        <About />

        {/* Không Gian & Ảnh Thực Tế Quán (img1 - img5) */}
        <RealShowcase />

        {/* 5. Dịch Vụ (Services) */}
        <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 6. Bảng Giá (Price List) */}
        <PriceList onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 7. Bộ Sưu Tập Kiểu Tóc (Gallery) */}
        <Gallery onSelectHairstyleForBooking={handleSelectHairstyleForBooking} />

        {/* 8. Đội Ngũ Barber (Team) */}
        <BarberTeam onSelectBarberForBooking={handleSelectBarberForBooking} />

        {/* 9. Đặt Lịch Cắt Tóc Online (Booking System) */}
        <BookingForm
          preselectedServiceId={preselectedServiceId}
          preselectedBarberId={preselectedBarberId}
          preselectedStyleNote={preselectedStyleNote}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 12. Feedback & Đánh Giá Khách Hàng (Reviews) */}
        <Reviews />

        {/* 10. Thông Tin Liên Hệ & Google Maps (Contact) */}
        <Contact />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* 11. Floating Contact Buttons */}
      <FloatingActions />

      {/* Saved Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={savedBookings}
        onClearBookings={handleClearBookings}
      />
    </div>
  );
};

export default App;
