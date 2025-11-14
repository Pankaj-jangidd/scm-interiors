// ===============================
//  ADMIN CONTEXT (FINAL VERSION)
// ===============================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

import {
  uploadGalleryImage,
  getGalleryImages as supabaseFetchGallery,
  deleteGalleryImage as supabaseDeleteGalleryImage,
} from "@/integrations/supabase/gallery";

import {
  addReview as addReviewToDB,
  getReviews as getReviewsFromDB,
  updateReview as updateReviewInDB,
  deleteReview as deleteReviewFromDB,
} from "@/integrations/supabase/reviews";

import {
  submitContactForm as addContactToDB,
  getContactSubmissions as getContactsFromDB,
  updateContactStatus as updateContactStatusInDB,
  deleteContactSubmission as deleteContactFromDB,
} from "@/integrations/supabase/contact";

import { supabase } from "@/integrations/supabase/client";

/* ===============================
      TYPE DECLARATIONS
================================= */
export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;

  project_type?: string;
  created_at?: string;
  visible: boolean;

  projectType?: string;
  date?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;

  project_type?: string;
  created_at?: string;
  status?: "new" | "read";

  projectType?: string;
  date?: string;

  message: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category: "residential" | "commercial";
  subcategory?: string;
  order: number;
}

/* ===============================
      NORMALIZERS (IMPORTANT)
================================= */

// Convert raw Supabase row → app-safe Review
const normalizeReview = (r: any): Review => ({
  id: String(r.id),
  name: r.name ?? "",
  text: r.text ?? "",
  rating: Number(r.rating) || 0,
  visible: Boolean(r.visible),

  project_type: r.project_type,
  created_at: r.created_at,

  projectType: r.project_type,
  date: r.created_at,
});

// Convert raw Supabase row → app-safe ContactSubmission
const normalizeContact = (c: any): ContactSubmission => ({
  id: String(c.id),
  name: c.name ?? "",
  email: c.email ?? "",
  phone: c.phone ?? "",
  message: c.message ?? "",

  project_type: c.project_type,
  created_at: c.created_at,
  status: c.status ?? c.submission_status ?? "new",

  projectType: c.project_type,
  date: c.created_at,
});

/* ===============================
      CONTEXT SETUP
================================= */

interface AdminContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;

  reviews: Review[];
  addReview: (r: {
    name: string;
    text: string;
    rating: number;
    projectType: string;
    visible?: boolean;
  }) => Promise<any>;
  updateReview: (id: string, data: Partial<Review>) => Promise<any>;
  deleteReview: (id: string) => Promise<any>;

  contactSubmissions: ContactSubmission[];
  addContactSubmission: (s: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
  }) => Promise<any>;
  updateSubmissionStatus: (id: string, status: "new" | "read") => Promise<any>;
  deleteSubmission: (id: string) => Promise<any>;

  galleryImages: GalleryImage[];
  addGalleryImage: (data: {
    file: File;
    category: string;
    alt?: string;
    subcategory?: string;
  }) => Promise<void>;
  deleteGalleryImage: (id: string, url: string) => Promise<void>;
  reorderGalleryImages: (images: GalleryImage[]) => void;

  exportData: () => void;
  importData: (json: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = "pankajjangid";
const ADMIN_PASSWORD = "PANKAJ247";

/* ===============================
      PROVIDER
================================= */

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<
    ContactSubmission[]
  >([]);

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const reviewsChannelRef = useRef<any>(null);
  const contactsChannelRef = useRef<any>(null);

  /* ===============================
      LOAD GALLERY
================================= */
  useEffect(() => {
    (async () => {
      try {
        const data = await supabaseFetchGallery();
        setGalleryImages(
          (data || []).map((img: any) => ({
            id: img.id,
            url: img.url,
            alt: img.alt || "",
            caption: img.caption || "",
            category: img.category,
            subcategory: img.subcategory || undefined,
            order: img.order_index ?? 0,
          }))
        );
      } catch (err) {
        console.error("Gallery load failed:", err);
      }
    })();
  }, []);

  /* ===============================
      AUTH
================================= */
  const login = (u: string, p: string) => {
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  /* ===============================
      LOAD REVIEWS & CONTACTS + REALTIME
================================= */
  useEffect(() => {
    let mounted = true;

    const loadInitial = async () => {
      try {
        const [r, c] = await Promise.all([
          getReviewsFromDB(false),
          getContactsFromDB(),
        ]);
        if (!mounted) return;

        setReviews((r || []).map(normalizeReview));
        setContactSubmissions((c || []).map(normalizeContact));
      } catch (err) {
        console.error("Initial load failed:", err);
      }
    };

    loadInitial();

    // 🔥 When website adds review → force reload for admin panel
    window.addEventListener("scm:reviews-updated", async () => {
      const fresh = await getReviewsFromDB(false);
      setReviews((fresh || []).map(normalizeReview));
    });

    // --- realtime reviews ---
    reviewsChannelRef.current = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => {
          getReviewsFromDB(false)
            .then((res) => setReviews((res || []).map(normalizeReview)))
            .catch(console.error);
        }
      )
      .subscribe();

    // --- realtime contacts ---
    contactsChannelRef.current = supabase
      .channel("public:contact_submissions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        () => {
          getContactsFromDB()
            .then((res) =>
              setContactSubmissions((res || []).map(normalizeContact))
            )
            .catch(console.error);
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(reviewsChannelRef.current);
      supabase.removeChannel(contactsChannelRef.current);
    };
  }, []);

  /* ===============================
      REVIEWS CRUD
================================= */
  const addReview = async (review: {
    name: string;
    text: string;
    rating: number;
    projectType: string;
    visible?: boolean;
  }) => {
    const created = await addReviewToDB(review);
    const all = await getReviewsFromDB(false);
    setReviews((all || []).map(normalizeReview));
    return created;
  };

  const updateReview = async (id: string, data: Partial<Review>) => {
    await updateReviewInDB(id, {
      ...data,
      project_type: data.projectType ?? data.project_type,
    });
    const all = await getReviewsFromDB(false);
    setReviews((all || []).map(normalizeReview));
  };

  const deleteReview = async (id: string) => {
    await deleteReviewFromDB(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  /* ===============================
      CONTACT CRUD
================================= */
  const addContactSubmission = async (sub) => {
    await addContactToDB(sub);
    const all = await getContactsFromDB();
    setContactSubmissions((all || []).map(normalizeContact));
  };

  const updateSubmissionStatus = async (id: string, status: "new" | "read") => {
    await updateContactStatusInDB(id, status);
    setContactSubmissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteSubmission = async (id: string) => {
    await deleteContactFromDB(id);
    setContactSubmissions((prev) => prev.filter((c) => c.id !== id));
  };

  /* ===============================
      GALLERY CRUD
================================= */
  const addGalleryImage = async (image: {
    file: File;
    category: string;
    alt?: string;
    subcategory?: string;
  }) => {
    try {
      const saved = await uploadGalleryImage({
        file: image.file,
        category: image.category,
        alt: image.alt,
        subcategory: image.subcategory,
      });

      if (!saved) throw new Error("Upload failed");

      setGalleryImages((prev) => [
        ...prev,
        {
          id: saved.id,
          url: saved.url,
          alt: saved.alt ?? "",
          category: saved.category as "residential" | "commercial",
          subcategory: saved.subcategory ?? undefined,
          order: saved.order_index ?? 0,
        },
      ]);
    } catch (err) {
      console.error("Failed to add image:", err);
      throw err;
    }
  };

  const deleteGalleryImage = async (id: string, url: string) => {
    await supabaseDeleteGalleryImage(id, url);
    setGalleryImages((prev) => prev.filter((i) => i.id !== id));
  };

  const reorderGalleryImages = (imgs: GalleryImage[]) => {
    setGalleryImages(imgs);
  };

  /* ===============================
      EXPORT / IMPORT
================================= */
  const exportData = () => {
    const data = {
      reviews,
      contactSubmissions,
      galleryImages,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scm-interiors-backup.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const importData = (json: string) => {
    try {
      const data = JSON.parse(json);
      if (data.reviews) setReviews(data.reviews.map(normalizeReview));
      if (data.contactSubmissions)
        setContactSubmissions(data.contactSubmissions.map(normalizeContact));
      if (data.galleryImages) setGalleryImages(data.galleryImages);
    } catch (err) {
      console.error("Import failed:", err);
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
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
