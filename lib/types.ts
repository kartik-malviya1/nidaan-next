export interface User {
  id: string;
  email: string;
  name?: string | null;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  category: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnualReport {
  id: string;
  year: string;
  title: string;
  highlights: string[];
  coverUrl: string;
  pdfUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  phoneNumber: string;
  panCard: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface DashboardStats {
  stats: {
    totalGalleryImages: number;
    totalDonations: number;
    totalDonationAmount: number;
    totalContacts: number;
    totalApplications: number;
  };
  recentUploads: GalleryImage[];
  recentDonations: Donation[];
  recentContacts: Contact[];
  recentApplications: Application[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  institution: string;
  area: string;
  duration: string | null;
  availability: string | null;
  motivation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

