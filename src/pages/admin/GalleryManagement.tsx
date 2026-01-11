// src/components/admin/GalleryManagement.tsx
import { useState, useRef, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageTransition from "@/components/admin/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Upload,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RESIDENTIAL_CATEGORIES = [
  "Modular Kitchen",
  "Living Rooms",
  "Bedrooms",
  "False Ceiling",
];

const GalleryManagement = () => {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useAdmin();
  const { toast } = useToast();

  const [viewMode, setViewMode] = useState<
    "overview" | "residential-subcategory" | "commercial"
  >("overview");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  );

  const [isResidentialDialogOpen, setIsResidentialDialogOpen] = useState(false);
  const [isCommercialDialogOpen, setIsCommercialDialogOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [residentialExpanded, setResidentialExpanded] = useState(false);
  const [commercialExpanded, setCommercialExpanded] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const residentialFileRef = useRef<HTMLInputElement>(null);
  const commercialFileRef = useRef<HTMLInputElement>(null);

  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  // Handle browser back button and trackpad swipe back gesture
  useEffect(() => {
    const handlePopState = () => {
      if (viewMode === "residential-subcategory") {
        setViewMode("overview");
        setActiveSubcategory(null);
        setSelectMode(false);
        setSelectedForDelete([]);
        setResidentialExpanded(false);
      }
    };

    // Push a state when entering subcategory view
    if (viewMode === "residential-subcategory") {
      window.history.pushState({ subcategory: activeSubcategory }, "");
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewMode, activeSubcategory]);

  useEffect(() => {
    if (!isResidentialDialogOpen && !isCommercialDialogOpen) {
      setSelectedFiles([]);
      setImagePreviews([]);
      setSelectedCategory("");
    }
  }, [isResidentialDialogOpen, isCommercialDialogOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const valid = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Too large",
          description: `${file.name} is larger than 5MB`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setSelectedFiles(valid);

    const previews: string[] = [];
    valid.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews[index] = reader.result as string;
        if (previews.filter(Boolean).length === valid.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const resetResidentialForm = () => {
    setIsResidentialDialogOpen(false);
    setSelectedFiles([]);
    setImagePreviews([]);
    setSelectedCategory("");
    if (residentialFileRef.current) residentialFileRef.current.value = "";
  };

  const resetCommercialForm = () => {
    setIsCommercialDialogOpen(false);
    setSelectedFiles([]);
    setImagePreviews([]);
    if (commercialFileRef.current) commercialFileRef.current.value = "";
  };

  const handleResidentialSubmit = async () => {
    if (!selectedFiles.length || !selectedCategory) {
      toast({
        title: "Missing fields",
        description: "Pick category and files.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        await addGalleryImage({
          file: selectedFiles[i],
          category: "residential",
          alt: `${selectedCategory} - Image ${i + 1}`,
          subcategory: selectedCategory,
        });
      }

      toast({
        title: "Success!",
        description: `${selectedFiles.length} image${
          selectedFiles.length > 1 ? "s" : ""
        } uploaded successfully`,
      });

      resetResidentialForm();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCommercialSubmit = async () => {
    if (!selectedFiles.length) {
      toast({
        title: "Missing images",
        description: "Pick at least one image.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        await addGalleryImage({
          file: selectedFiles[i],
          category: "commercial",
          alt: `Commercial Project - Image ${i + 1}`,
        });
      }

      toast({
        title: "Success!",
        description: `${selectedFiles.length} image${
          selectedFiles.length > 1 ? "s" : ""
        } uploaded successfully`,
      });

      resetCommercialForm();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      setIsDeleting(true);
      await deleteGalleryImage(id, url);
      toast({
        title: "Deleted",
        description: "Image removed successfully",
      });
      setSelectedForDelete((prev) => prev.filter((x) => x !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedForDelete.length === 0) return;

    try {
      setIsDeleting(true);

      for (const id of selectedForDelete) {
        const target = galleryImages.find((x) => x.id === id);
        if (target) {
          await deleteGalleryImage(target.id, target.url);
        }
      }

      setSelectedForDelete([]);
      setSelectMode(false);

      toast({
        title: "Success!",
        description: `${selectedForDelete.length} image${
          selectedForDelete.length > 1 ? "s" : ""
        } deleted`,
      });
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast({
        title: "Delete failed",
        description: "Some images may not have been deleted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const residentialImages = galleryImages.filter(
    (i) => i.category === "residential"
  );
  const commercialImages = galleryImages.filter(
    (i) => i.category === "commercial"
  );

  const residentialBySub = RESIDENTIAL_CATEGORIES.reduce<Record<string, any[]>>(
    (acc, cat) => {
      acc[cat] = residentialImages.filter((img) => img.subcategory === cat);
      return acc;
    },
    {}
  );

  const renderGrid = (images: typeof galleryImages, expanded: boolean) => {
    const list = expanded ? images : images.slice(0, 6);

    return (
      <div
        className={`grid ${
          expanded
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        } gap-3`}
      >
        {list.map((img) => (
          <div
            key={img.id}
            className="relative group aspect-square border rounded-lg overflow-hidden"
          >
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedForDelete.includes(img.id)}
                onChange={() => {
                  setSelectedForDelete((prev) =>
                    prev.includes(img.id)
                      ? prev.filter((x) => x !== img.id)
                      : [...prev, img.id]
                  );
                }}
                className="absolute top-2 left-2 z-20 h-5 w-5 accent-[#B8860B]"
              />
            )}

            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "auto",
              }}
            />

            {!selectMode && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-lg">
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isDeleting}
                  onClick={() => handleDelete(img.id, img.url)}
                >
                  {isDeleting ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-4 w-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Get current subcategory images
  const currentSubcategoryImages =
    activeSubcategory && viewMode === "residential-subcategory"
      ? residentialBySub[activeSubcategory] || []
      : [];

  return (
    <AdminLayout>
      <PageTransition>
        <div className="space-y-6">
          <h2
            className="text-3xl font-serif font-bold"
            style={{ color: "#B8860B" }}
          >
            Gallery Management
          </h2>

          {/* RESIDENTIAL */}
          <Card
            className="p-6 shadow-md"
            style={{ background: "#F8F8F8", border: "1px solid #E5E5E5" }}
          >
            {viewMode === "overview" ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "#1A1A1A" }}
                    >
                      Residential Projects
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {residentialImages.length} images across all categories
                    </p>
                  </div>
                </div>

                {/* Classy Category Tiles - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-6 max-w-6xl w-full mx-auto">
                  {" "}
                  {RESIDENTIAL_CATEGORIES.map((cat) => {
                    const count = (residentialBySub[cat] || []).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveSubcategory(cat);
                          setViewMode("residential-subcategory");
                          setSelectMode(false);
                          setSelectedForDelete([]);
                          setResidentialExpanded(false);
                        }}
                        className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
                          border: "2px solid #E5E5E5",
                          height: "150px",
                          width: "100%", // fill the grid cell (won't overflow now)
                          minWidth: 0, // prevents flexbox/grid overflow quirks
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Animated gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/0 via-[#B8860B]/0 to-[#B8860B]/0 group-hover:from-[#B8860B]/8 group-hover:via-[#B8860B]/4 group-hover:to-[#B8860B]/8 transition-all duration-500" />

                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#B8860B]/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-6">
                          <div
                            className="text-xl font-bold text-center mb-2 transition-all duration-300 group-hover:scale-105"
                            style={{ color: "#1A1A1A" }}
                          >
                            {cat}
                          </div>
                          <div
                            className="text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-300"
                            style={{
                              color: "#B8860B",
                              background: "rgba(139, 107, 74, 0.08)",
                            }}
                          >
                            {count} {count === 1 ? "image" : "images"}
                          </div>
                        </div>

                        {/* Bottom accent line with animation */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100" />

                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700" />
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              // SUBCATEGORY VIEW
              <div>
                {/* Back Navigation with Breadcrumb */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => {
                      setViewMode("overview");
                      setActiveSubcategory(null);
                      setSelectMode(false);
                      setSelectedForDelete([]);
                      setResidentialExpanded(false);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white"
                    style={{
                      border: "1.5px solid #E5E5E5",
                      color: "#1A1A1A",
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Back</span>
                  </button>

                  {/* Breadcrumb Path */}
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: "#B8860B", fontWeight: 600 }}>
                      Residential
                    </span>
                    <span style={{ color: "#666666" }}>/</span>
                    <span style={{ color: "#1A1A1A", fontWeight: 600 }}>
                      {activeSubcategory}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "#1A1A1A" }}
                  >
                    {currentSubcategoryImages.length}{" "}
                    {currentSubcategoryImages.length === 1 ? "image" : "images"}
                  </h3>

                  <div className="flex gap-2">
                    {!selectMode && (
                      <button
                        onClick={() => {
                          setSelectedCategory(activeSubcategory || "");
                          setIsResidentialDialogOpen(true);
                        }}
                        className="inline-flex items-center px-3 py-2 rounded-md text-white transition-all duration-200 hover:shadow-md"
                        style={{ background: "#B8860B" }}
                        disabled={isUploading}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Images
                      </button>
                    )}

                    {!selectMode && currentSubcategoryImages.length > 0 && (
                      <button
                        onClick={() => setSelectMode(true)}
                        className="inline-flex items-center px-3 py-2 rounded-md border transition-all duration-200 hover:bg-white"
                        style={{ borderColor: "#B8860B", color: "#B8860B" }}
                        disabled={isDeleting}
                      >
                        Select
                      </button>
                    )}

                    {selectMode && (
                      <>
                        <button
                          onClick={() => {
                            if (
                              selectedForDelete.length ===
                              currentSubcategoryImages.length
                            ) {
                              setSelectedForDelete([]);
                            } else {
                              setSelectedForDelete(
                                currentSubcategoryImages.map((img) => img.id)
                              );
                            }
                          }}
                          className="inline-flex items-center px-3 py-2 rounded-md border transition-all duration-200 hover:bg-white"
                          style={{ borderColor: "#B8860B", color: "#B8860B" }}
                        >
                          {selectedForDelete.length ===
                          currentSubcategoryImages.length
                            ? "Unselect All"
                            : "Select All"}
                        </button>

                        <button
                          onClick={handleBulkDelete}
                          className="inline-flex items-center px-3 py-2 rounded-md text-white transition-all duration-200 hover:shadow-md disabled:opacity-50"
                          style={{ background: "#B8860B" }}
                          disabled={
                            selectedForDelete.length === 0 || isDeleting
                          }
                        >
                          {isDeleting
                            ? "Deleting…"
                            : `Delete (${selectedForDelete.length})`}
                        </button>

                        <button
                          onClick={() => {
                            setSelectedForDelete([]);
                            setSelectMode(false);
                          }}
                          className="inline-flex items-center px-3 py-2 rounded-md border transition-all duration-200 hover:bg-white"
                          style={{ borderColor: "#666666", color: "#4B4B4B" }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Images Grid */}
                {currentSubcategoryImages.length === 0 ? (
                  <div
                    className="text-center py-16 rounded-lg"
                    style={{ background: "#FAFAFA" }}
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      No images in this category yet
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory(activeSubcategory || "");
                        setIsResidentialDialogOpen(true);
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 rounded-md text-white"
                      style={{ background: "#B8860B" }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add First Image
                    </button>
                  </div>
                ) : (
                  <>
                    {renderGrid(currentSubcategoryImages, residentialExpanded)}

                    {currentSubcategoryImages.length > 6 && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setResidentialExpanded(!residentialExpanded)
                        }
                        className="w-full mt-4"
                        style={{ borderColor: "#B8860B", color: "#B8860B" }}
                      >
                        {residentialExpanded ? (
                          <>
                            <ChevronUp className="mr-2" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-2" />
                            Show All ({currentSubcategoryImages.length})
                          </>
                        )}
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </Card>

          {/* COMMERCIAL */}
          <Card
            className="p-6 shadow-md"
            style={{ background: "#F8F8F8", border: "1px solid #E5E5E5" }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#1A1A1A" }}
                >
                  Commercial Projects
                </h3>
                <p className="text-sm text-muted-foreground">
                  {commercialImages.length} images
                </p>
              </div>

              <button
                onClick={() => setIsCommercialDialogOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md text-white transition-all duration-200 hover:shadow-md"
                style={{ background: "#B8860B" }}
                disabled={isUploading}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Images
              </button>
            </div>

            {commercialImages.length === 0 ? (
              <div
                className="text-center py-10 rounded-lg"
                style={{ background: "#FAFAFA" }}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p>No images yet</p>
              </div>
            ) : (
              <>
                {renderGrid(commercialImages, commercialExpanded)}

                {commercialImages.length > 6 && (
                  <Button
                    variant="outline"
                    onClick={() => setCommercialExpanded(!commercialExpanded)}
                    className="w-full mt-3"
                    style={{ borderColor: "#B8860B", color: "#B8860B" }}
                  >
                    {commercialExpanded ? (
                      <>
                        <ChevronUp className="mr-2" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2" />
                        Show All ({commercialImages.length})
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </Card>

          {/* RESIDENTIAL UPLOAD DIALOG */}
          <Dialog
            open={isResidentialDialogOpen}
            onOpenChange={setIsResidentialDialogOpen}
          >
            <DialogContent
              className="max-w-xl"
              style={{
                background: "#F8F8F8",
                border: "1px solid #E5E5E5",
                maxHeight: "80vh",
                overflow: "auto",
              }}
            >
              <DialogHeader>
                <DialogTitle style={{ color: "#1A1A1A" }}>
                  Add Residential Images
                </DialogTitle>
                <DialogDescription>
                  Choose a subcategory and upload images.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 px-1 pb-4">
                <div>
                  <Label>Select Subcategory</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {RESIDENTIAL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Upload Images</Label>
                  <input
                    ref={residentialFileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="mt-2"
                  />
                </div>

                {imagePreviews.length > 0 && (
                  <div
                    style={{ maxHeight: "36vh", overflow: "auto" }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {imagePreviews.map((p, i) => (
                      <div key={i} className="relative">
                        <img
                          src={p}
                          alt={`Preview ${i + 1}`}
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full"
                          onClick={() => {
                            setImagePreviews((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                            setSelectedFiles((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                          }}
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-3 sticky bottom-0 bg-transparent pt-3">
                  <Button variant="outline" onClick={resetResidentialForm}>
                    Cancel
                  </Button>

                  <button
                    onClick={handleResidentialSubmit}
                    className="inline-flex items-center px-3 py-2 rounded-md text-white disabled:opacity-50"
                    style={{ background: "#B8860B" }}
                    disabled={isUploading}
                  >
                    {isUploading
                      ? "Uploading…"
                      : `Upload (${selectedFiles.length})`}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* COMMERCIAL UPLOAD DIALOG */}
          <Dialog
            open={isCommercialDialogOpen}
            onOpenChange={setIsCommercialDialogOpen}
          >
            <DialogContent
              className="max-w-xl"
              style={{
                background: "#F8F8F8",
                border: "1px solid #E5E5E5",
                maxHeight: "80vh",
                overflow: "auto",
              }}
            >
              <DialogHeader>
                <DialogTitle style={{ color: "#1A1A1A" }}>
                  Add Commercial Images
                </DialogTitle>
                <DialogDescription>Upload multiple images.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 px-1 pb-4">
                <div>
                  <Label>Upload Images</Label>
                  <input
                    ref={commercialFileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="mt-2"
                  />
                </div>

                {imagePreviews.length > 0 && (
                  <div
                    style={{ maxHeight: "36vh", overflow: "auto" }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {imagePreviews.map((p, i) => (
                      <div key={i} className="relative">
                        <img
                          src={p}
                          alt={`Preview ${i + 1}`}
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full"
                          onClick={() => {
                            setImagePreviews((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                            setSelectedFiles((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                          }}
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-3 sticky bottom-0 bg-transparent pt-3">
                  <Button variant="outline" onClick={resetCommercialForm}>
                    Cancel
                  </Button>

                  <button
                    onClick={handleCommercialSubmit}
                    className="inline-flex items-center px-3 py-2 rounded-md text-white disabled:opacity-50"
                    style={{ background: "#B8860B" }}
                    disabled={isUploading}
                  >
                    {isUploading
                      ? "Uploading…"
                      : `Upload (${selectedFiles.length})`}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </PageTransition>
    </AdminLayout>
  );
};

export default GalleryManagement;
