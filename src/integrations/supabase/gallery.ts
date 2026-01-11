import { supabase } from "@/integrations/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * Upload image to Cloudinary and save URL to Supabase
 */
export async function uploadGalleryImage({
  file,
  category,
  alt,
  subcategory,
}: {
  file: File;
  category: string;
  alt?: string;
  subcategory?: string;
}) {
  try {
    // 1. Upload to Cloudinary
    const folder =
      category === "residential" ? `residential/${subcategory}` : "commercial";
    const cloudinaryResult = await uploadToCloudinary(file, folder);
    const imageUrl = cloudinaryResult.secure_url;

    // 2. Get next order index
    const { data: existingImages } = await supabase
      .from("gallery_images")
      .select("order_index")
      .eq("category", category)
      .order("order_index", { ascending: false })
      .limit(1);

    const nextOrder =
      existingImages && existingImages.length > 0
        ? (existingImages[0].order_index || 0) + 1
        : 0;

    // 3. Save to Supabase database
    const { data, error: insertError } = await supabase
      .from("gallery_images")
      .insert([
        {
          url: imageUrl,
          alt: alt ?? null,
          category,
          subcategory: subcategory ?? null,
          order_index: nextOrder,
        },
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    console.log("✅ Image saved to database:", data);
    return data;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}

/**
 * Delete image from database (Cloudinary deletion requires backend)
 */
export async function deleteGalleryImage(id: string, url: string) {
  try {
    // Delete from Supabase database
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // Note: Cloudinary deletion requires signed requests from backend
    // The image will remain in Cloudinary but won't be referenced
    console.log("✅ Image removed from database");
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
}

/**
 * Fetch all gallery images
 */
export async function getGalleryImages() {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Fetch gallery error:", err);
    throw err;
  }
}
