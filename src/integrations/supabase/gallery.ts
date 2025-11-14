import { supabase } from "@/integrations/supabase/client";

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
    const timestamp = Date.now();
    const cleanName = file.name.replace(/\s+/g, "-");

    const baseFolder =
      category === "residential" ? `residential/${subcategory}` : "commercial";

    const fullPath = `${baseFolder}/${timestamp}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fullPath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: "3600",
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(fullPath);

    const imageUrl = publicData.publicUrl;

    // GET MAX ORDER INDEX FOR THIS CATEGORY
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

    // INSERT WITH ORDER
    const { data, error: insertError } = await supabase
      .from("gallery_images")
      .insert([
        {
          url: imageUrl,
          alt: alt ?? null,
          category,
          subcategory: subcategory ?? null,
          order_index: nextOrder, // <-- ADD THIS
        },
      ])
      .select()
      .single();

    if (insertError) {
      await supabase.storage.from("images").remove([fullPath]);
      throw insertError;
    }

    return data;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}

export async function deleteGalleryImage(id: string, url: string) {
  try {
    // Extract file path
    const path = url.split("/images/")[1];

    await supabase.storage.from("images").remove([path]);

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
}

export async function getGalleryImages() {
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index", { ascending: true }); // <-- CHANGE THIS

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Fetch gallery error:", err);
    throw err;
  }
}
