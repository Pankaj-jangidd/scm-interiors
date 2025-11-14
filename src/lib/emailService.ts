import emailjs from "@emailjs/browser";

// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_SERVICE_ID = "service_wvjjjn2"; // ⬅️ UPDATED
const EMAILJS_TEMPLATE_ID = "template_4jlr7if";
const EMAILJS_PUBLIC_KEY = "vshai0l_yf4DuhIhs";

/**
 * Send contact form notification email
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}) {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      project_type: data.projectType,
      message: data.message,
      submission_date: new Date().toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }),
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      console.log("✅ Email sent successfully!");
      return { success: true };
    }
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error };
  }
}

/**
 * Initialize EmailJS (call this once in your app)
 */
export function initEmailJS() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}
