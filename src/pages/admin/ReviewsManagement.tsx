import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageTransition from "@/components/admin/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  MessageSquare,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAdmin } from "@/contexts/AdminContext"; // ✅ IMPORTANT

const ReviewsManagement = () => {
  // 🔥 Use global admin context instead of local state
  const { reviews, addReview, updateReview, deleteReview } = useAdmin();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    text: "",
    rating: 5,
    projectType: "Residential",
  });

  const handleOpenDialog = (review?: any) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        text: review.text,
        rating: review.rating,
        projectType: review.project_type,
      });
    } else {
      setEditingReview(null);
      setFormData({
        name: "",
        text: "",
        rating: 5,
        projectType: "Residential",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview.id, {
          name: formData.name,
          text: formData.text,
          rating: formData.rating,
          projectType: formData.projectType,
        });
        toast.success("Review updated!");
      } else {
        await addReview({
          name: formData.name,
          text: formData.text,
          rating: formData.rating,
          projectType: formData.projectType,
          visible: true,
        });
        toast.success("Review added!");
      }

      setIsDialogOpen(false);
      setEditingReview(null);
      setFormData({
        name: "",
        text: "",
        rating: 5,
        projectType: "Residential",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review deleted!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      await updateReview(id, { visible: !visible });
      toast.success(`Review ${!visible ? "shown" : "hidden"}`);
    } catch {
      toast.error("Failed to update visibility");
    }
  };

  return (
    <AdminLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#8B6B4A] mb-2">
                Reviews Management
              </h2>
              <p className="text-muted-foreground">
                {reviews.filter((r) => r.visible).length} of {reviews.length}{" "}
                visible
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#8B6B4A] hover:bg-[#6B5339]"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-[#8B6B4A]">
                    {editingReview ? "Edit Review" : "Add Review"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Client Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Rating *</Label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(v) =>
                        setFormData({ ...formData, rating: parseInt(v) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} Stars
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, projectType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Renovation">Renovation</SelectItem>
                        <SelectItem value="Modular Kitchen">
                          Modular Kitchen
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Review Text *</Label>
                    <Textarea
                      value={formData.text}
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#8B6B4A] hover:bg-[#6B5339]"
                  >
                    {editingReview ? "Update Review" : "Add Review"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* REVIEWS GRID */}
          {reviews.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-[#8B6B4A] opacity-50" />
              <p className="text-lg text-muted-foreground">No reviews yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <Card
                  key={r.id}
                  className={`p-6 ${
                    !r.visible &&
                    "opacity-50 border-2 border-dashed border-[#8B6B4A]"
                  }`}
                >
                  <div className="flex justify-between mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < r.rating
                              ? "text-[#D4AF37] fill-[#D4AF37]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(r)}
                      >
                        <Edit className="h-4 w-4 text-[#8B6B4A]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(r.id, r.visible)}
                      >
                        {r.visible ? (
                          <Eye className="h-4 w-4 text-[#8B6B4A]" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-[#8B6B4A]" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(r.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{r.text}</p>

                  <div className="border-t pt-3 text-sm">
                    <p className="font-semibold text-[#8B6B4A]">{r.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.project_type}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(r.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </AdminLayout>
  );
};

export default ReviewsManagement;
