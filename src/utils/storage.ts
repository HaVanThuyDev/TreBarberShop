import type { BookingSubmission } from '../types';
import { STORE_CONFIG } from '../data/barberData';

const STORAGE_KEY = 'tre_barbershop_bookings_v1';

export function getSavedBookings(): BookingSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading bookings from localStorage:', e);
    return [];
  }
}

export async function saveBooking(booking: Omit<BookingSubmission, 'id' | 'bookingCode' | 'createdAt' | 'status'>): Promise<BookingSubmission> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newBooking: BookingSubmission = {
    ...booking,
    id: `booking-${Date.now()}`,
    bookingCode: `TRE-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };

  const existing = getSavedBookings();
  const updated = [newBooking, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving booking to localStorage:', e);
  }

  // Nếu chủ quán có cấu hình endpoint Google Sheets Apps Script, gửi data lên đó
  if (STORE_CONFIG.googleSheetsEndpoint && STORE_CONFIG.googleSheetsEndpoint.startsWith('http')) {
    try {
      await fetch(STORE_CONFIG.googleSheetsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(newBooking),
      });
    } catch (err) {
      console.warn('Google Sheets sync notice:', err);
    }
  }

  return newBooking;
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount).replace('₫', 'đ');
}

export function isValidVietnamesePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s.-]/g, '');
  const vnPhoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return vnPhoneRegex.test(cleanPhone) && cleanPhone.length === 10;
}
