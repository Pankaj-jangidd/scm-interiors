import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/contexts/AdminContext';
import { Star, Trash2, Eye, EyeOff, Plus, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReviewsManagement = () => {
  const { reviews, addReview, updateReview, deleteReview } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    projectType: 'Residential',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({ ...formData, visible: true });
    toast.success('Review added successfully!');
    setIsDialogOpen(false);
    setFormData({ name: '', text: '', rating: 5, projectType: 'Residential' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
      toast.success('Review deleted successfully!');
    }
  };

  const toggleVisibility = (id: string, currentVisibility: boolean) => {
    updateReview(id, { visible: !currentVisibility });
    toast.success(`Review ${!currentVisibility ? 'shown' : 'hidden'} successfully!`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-accent mb-2">Reviews Management</h2>
            <p className="text-muted-foreground">Manage customer testimonials</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Client Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Renovation">Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="text">Review Text *</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.text.length}/500 characters
                  </p>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Add Review
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className={`p-6 ${!review.visible && 'opacity-50'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisibility(review.id, review.visible)}
                  >
                    {review.visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
              <div className="border-t pt-3">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.projectType}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No reviews yet. Add your first review!</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewsManagement;
