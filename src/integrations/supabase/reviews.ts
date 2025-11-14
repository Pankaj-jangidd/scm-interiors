import { supabase } from "@/integrations/supabase/client";

export async function addReview(data: {
  name: string;
  text: string;
  rating: number;
  projectType: string;
  visible?: boolean;
}) {
  try {
    const { data: review, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: data.name,
          text: data.text,
          rating: data.rating,
          project_type: data.projectType,
          visible: data.visible ?? true,
        } as any,
      ])
      .select()
      .single();

    if (error) throw error;
    return review;
  } catch (err) {
    console.error("Add review error:", err);
    throw err;
  }
}

export async function getReviews(visibleOnly = false) {
  try {
    let query = supabase
      .from("reviews")
      // fetch explicit columns
      .select("id, name, text, rating, project_type, visible, created_at")
      .order("created_at", { ascending: false });

    if (visibleOnly) {
      query = query.eq("visible", true);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Return raw DB rows (do not remap) — AdminContext expects DB shape and will normalize.
    return data || [];
  } catch (err) {
    console.error("Fetch reviews error:", err);
    return [];
  }
}

export async function updateReview(id: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .update(updates as any)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Update review error:", err);
    throw err;
  }
}

export async function deleteReview(id: string) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Delete review error:", err);
    throw err;
  }
}
