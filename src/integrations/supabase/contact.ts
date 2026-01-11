import { supabase } from "@/integrations/supabase/client";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}) {
  try {
    const { data: submission, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          project_type: data.projectType,
          message: data.message,
          submission_status: "unread",
        } as any, // ⬅️ Add here too
      ])
      .select()
      .single();

    if (error) throw error;
    return submission;
  } catch (err) {
    console.error("Submit contact error:", err);
    throw err;
  }
}

export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Fetch contacts error:", err);
    throw err;
  }
}

export async function updateContactStatus(id: string, newStatus: string) {
  try {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ submission_status: newStatus } as any) // ⬅️ Fixed
      .eq("id", id);

    if (error) throw error;
  } catch (err) {
    console.error("Update status error:", err);
    throw err;
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id)
      .select(); // <-- IMPORTANT

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Delete contact error:", err);
    throw err;
  }
}
