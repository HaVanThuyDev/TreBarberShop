export interface ServiceItem {
  id: string;
  name: string;
  category: 'cut' | 'relax' | 'perm_dye' | 'combo';
  price: number;
  durationMinutes: number;
  description: string;
  image: string;
  isPopular?: boolean;
  features?: string[];
}

export interface BarberItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  highlightStyle: string;
  image: string;
  rating: number;
  cutsCount: number;
}

export interface HairstyleItem {
  id: string;
  name: string;
  tag: string;
  suitableFace: string;
  description: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
}

export interface BookingSubmission {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  serviceIds: string[];
  barberId: string;
  date: string;
  timeSlot: string;
  notes: string;
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  hotline: string;
  hotlineDisplay: string;
  zaloUrl: string;
  facebookUrl: string;
  messengerUrl: string;
  address: string;
  openingHours: string;
  mapEmbedUrl: string;
  mapDirectUrl: string;
  googleSheetsEndpoint?: string;
}
