/**
 * Cloudinary Upload Function
 * Uploads images directly from browser to Cloudinary
 */

const CLOUDINARY_CLOUD_NAME = "dp8syhcsf";
const CLOUDINARY_UPLOAD_PRESET = "scm_gallery";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadToCloudinary(
  file: File,
  folder?: string
): Promise<CloudinaryUploadResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Optional: organize into folders
    if (folder) {
      formData.append("folder", `gallery/${folder}`);
    } else {
      formData.append("folder", "gallery");
    }

    console.log("📤 Uploading to Cloudinary:", file.name);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data: CloudinaryUploadResult = await response.json();
    console.log("✅ Cloudinary upload successful:", data.secure_url);

    return data;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
}

/**
 * Delete image from Cloudinary (requires backend/signed request)
 * This is a placeholder - actual deletion requires server-side implementation
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // Note: Deletion requires signed requests, which need your API secret
  // This should be done server-side for security
  console.warn("Cloudinary deletion requires server-side implementation");
  // For now, we'll just remove from database
}
