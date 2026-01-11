import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { addReview } from "@/integrations/supabase/reviews";

const AddReviewDialog = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    projectType: "Residential",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.review) {
      toast.error("Please fill all fields");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await addReview({
        name: formData.name,
        text: formData.review, // DB column
        rating,
        projectType: formData.projectType,
        visible: true,
      });

      window.dispatchEvent(new CustomEvent("scm:reviews-updated"));

      toast.success("Review submitted!");
      setOpen(false);
      setRating(0);
      setFormData({ name: "", review: "", projectType: "Residential" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Add Your Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Share your experience with us!</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div>
            <Label>Your Name *</Label>
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
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Your Review *</Label>
            <Textarea
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewDialog;
