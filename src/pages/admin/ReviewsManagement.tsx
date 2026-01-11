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

import { useAdmin } from "@/contexts/AdminContext";

const ReviewsManagement = () => {
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
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
                  className="bg-accent hover:bg-accent/90 shadow-md transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 rounded-2xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-foreground font-serif">
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
                      className="mt-2 bg-secondary border-0"
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
                      <SelectTrigger className="mt-2 bg-secondary border-0">
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
                      <SelectTrigger className="mt-2 bg-secondary border-0">
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
                      className="mt-2 bg-secondary border-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 shadow-md"
                  >
                    {editingReview ? "Update Review" : "Add Review"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* REVIEWS GRID */}
          {reviews.length === 0 ? (
            <Card className="p-12 text-center bg-white border-0 shadow-lg rounded-2xl">
              <div className="p-4 rounded-xl bg-accent/10 w-fit mx-auto mb-4">
                <MessageSquare className="h-10 w-10 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground">No reviews yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, index) => (
                <Card
                  key={r.id}
                  className={`p-6 bg-white border-0 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl ${
                    !r.visible && "opacity-50 ring-2 ring-dashed ring-accent/30"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < r.rating
                              ? "text-accent fill-accent"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(r)}
                        className="hover:bg-accent/10"
                      >
                        <Edit className="h-4 w-4 text-accent" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVisibility(r.id, r.visible)}
                        className="hover:bg-accent/10"
                      >
                        {r.visible ? (
                          <Eye className="h-4 w-4 text-accent" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-accent" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(r.id)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 italic">
                    "{r.text}"
                  </p>

                  <div className="border-t border-border pt-3 text-sm">
                    <p className="font-semibold text-foreground">{r.name}</p>
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
