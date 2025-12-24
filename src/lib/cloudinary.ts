/**
 * Cloudinary Upload Function
 * Uploads images directly from browser to Cloudinary
 */

const CLOUDINARY_CLOUD_NAME = "dp8syhcsf";

/**
 * Transform any Cloudinary URL to add optimizations
 * Works with both new uploads and existing URLs
 */
export function getOptimizedUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
  } = {}
): string {
  // If not a Cloudinary URL, return as-is
  if (!url.includes("cloudinary.com")) {
    return url;
  }

  const { width = 400, height, quality = "auto", crop = "fill" } = options;

  // Build transformation string
  let transforms = `f_auto,q_${quality},dpr_auto`;
  
  if (width) transforms += `,w_${width}`;
  if (height) transforms += `,h_${height}`;
  if (crop) transforms += `,c_${crop}`;

  // Check if URL already has transformations
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  // Check if there are existing transformations (look for patterns like f_, w_, q_, etc.)
  const afterUpload = url.substring(uploadIndex + 8);
  const hasTransforms = /^[a-z]_[a-z0-9]+/.test(afterUpload);

  if (hasTransforms) {
    // Replace existing transformations
    const versionMatch = afterUpload.match(/v\d+\//);
    if (versionMatch) {
      const versionIndex = afterUpload.indexOf(versionMatch[0]);
      const pathAfterVersion = afterUpload.substring(versionIndex);
      return url.substring(0, uploadIndex + 8) + transforms + "/" + pathAfterVersion;
    }
    return url; // If can't parse, return original
  } else {
    // Insert transformations after /upload/
    return url.substring(0, uploadIndex + 8) + transforms + "/" + afterUpload;
  }
}

/**
 * Get thumbnail-sized optimized URL for gallery grids
 */
export function getThumbnailUrl(url: string): string {
  return getOptimizedUrl(url, { width: 400, height: 400, crop: "fill" });
}

/**
 * Get full-size optimized URL for lightbox viewing
 */
export function getFullSizeUrl(url: string): string {
  return getOptimizedUrl(url, { width: 1200, quality: "auto:good", crop: "limit" });
}
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
