import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  projectType: string;
  date: string;
  visible: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category: 'residential' | 'commercial';
  subcategory?: string;
  order: number;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  contactSubmissions: ContactSubmission[];
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: 'new' | 'read') => void;
  deleteSubmission: (id: string) => void;
  galleryImages: GalleryImage[];
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGalleryImages: (images: GalleryImage[]) => void;
  exportData: () => void;
  importData: (data: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'scminteriors2025';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      text: 'Excellent work! The modular kitchen design exceeded our expectations. Professional team and timely completion.',
      rating: 5,
      projectType: 'Residential',
      date: new Date().toISOString(),
      visible: true,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      text: 'Very satisfied with the false ceiling and lighting work. The attention to detail was remarkable.',
      rating: 5,
      projectType: 'Residential',
      date: new Date().toISOString(),
      visible: true,
    },
    {
      id: '3',
      name: 'Amit Patel',
      text: 'Great experience working with SCM Interiors. They transformed our office space beautifully.',
      rating: 5,
      projectType: 'Commercial',
      date: new Date().toISOString(),
      visible: true,
    },
    {
      id: '4',
      name: 'Deepika Reddy',
      text: 'Outstanding craftsmanship! The wardrobe design is both functional and elegant. Highly recommended for quality work.',
      rating: 5,
      projectType: 'Residential',
      date: new Date().toISOString(),
      visible: true,
    },
  ]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setReviews([...reviews, newReview]);
  };

  const updateReview = (id: string, updatedReview: Partial<Review>) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, ...updatedReview } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new',
    };
    setContactSubmissions([...contactSubmissions, newSubmission]);
  };

  const updateSubmissionStatus = (id: string, status: 'new' | 'read') => {
    setContactSubmissions(contactSubmissions.map(s => s.id === id ? { ...s, status } : s));
  };

  const deleteSubmission = (id: string) => {
    setContactSubmissions(contactSubmissions.filter(s => s.id !== id));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
    };
    setGalleryImages([...galleryImages, newImage]);
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  const reorderGalleryImages = (images: GalleryImage[]) => {
    setGalleryImages(images);
  };

  const exportData = () => {
    const data = {
      reviews,
      contactSubmissions,
      galleryImages,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scm-interiors-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.reviews) setReviews(data.reviews);
      if (data.contactSubmissions) setContactSubmissions(data.contactSubmissions);
      if (data.galleryImages) setGalleryImages(data.galleryImages);
    } catch (error) {
      console.error('Failed to import data:', error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        contactSubmissions,
        addContactSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        galleryImages,
        addGalleryImage,
        deleteGalleryImage,
        reorderGalleryImages,
        exportData,
        importData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
