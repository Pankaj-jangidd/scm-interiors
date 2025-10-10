import { useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { ImageIcon, Upload, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RESIDENTIAL_CATEGORIES = [
  'Modular Kitchen',
  'Living Rooms',
  'Wardrobes',
  'Bedrooms',
  'Dressing Units',
  'False Ceiling',
  'Pooja Units',
];

const GalleryManagement = () => {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'residential' | 'commercial'>('residential');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = RESIDENTIAL_CATEGORIES;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'Image size must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!imagePreview || !altText) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields and select an image',
        variant: 'destructive',
      });
      return;
    }

    if (selectedType === 'residential' && !selectedCategory) {
      toast({
        title: 'Error',
        description: 'Please select a category for residential images',
        variant: 'destructive',
      });
      return;
    }

    addGalleryImage({
      url: imagePreview,
      alt: altText,
      caption: caption || undefined,
      category: selectedType,
      subcategory: selectedType === 'residential' ? selectedCategory : undefined,
      order: galleryImages.length,
    });

    toast({
      title: 'Success',
      description: 'Image added successfully',
    });

    // Reset form
    setIsDialogOpen(false);
    setImagePreview('');
    setAltText('');
    setCaption('');
    setSelectedCategory('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    deleteGalleryImage(id);
    toast({
      title: 'Success',
      description: 'Image deleted successfully',
    });
  };

  const residentialImages = galleryImages.filter(img => img.category === 'residential');
  const commercialImages = galleryImages.filter(img => img.category === 'commercial');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-accent mb-2">Gallery Management</h2>
            <p className="text-muted-foreground">Upload and manage gallery images</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Residential Gallery ({residentialImages.length} images)</h3>
            {residentialImages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No residential images yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {residentialImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(img.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 font-medium">{img.subcategory}</p>
                    {img.caption && <p className="text-xs text-muted-foreground">{img.caption}</p>}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Commercial Gallery ({commercialImages.length} images)</h3>
            {commercialImages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No commercial images yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {commercialImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(img.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 font-medium">{img.subcategory}</p>
                    {img.caption && <p className="text-xs text-muted-foreground">{img.caption}</p>}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Gallery Image</DialogTitle>
              <DialogDescription>
                Upload and categorize a new image for the gallery
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="mt-1"
                />
                {imagePreview && (
                  <div className="relative mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Select value={selectedType} onValueChange={(value: 'residential' | 'commercial') => {
                  setSelectedType(value);
                  setSelectedCategory('');
                }}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedType === 'residential' && (
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="alt">Image Description (Alt Text) *</Label>
                <Input
                  id="alt"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="caption">Caption (Optional)</Label>
                <Input
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a caption"
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
