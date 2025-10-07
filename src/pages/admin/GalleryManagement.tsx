import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageIcon, AlertCircle } from 'lucide-react';

const GalleryManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-accent mb-2">Gallery Management</h2>
          <p className="text-muted-foreground">Upload and manage gallery images</p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Gallery image upload functionality is coming soon. You can currently manage images by adding them to your project's assets folder.
          </AlertDescription>
        </Alert>

        <Card className="p-12 text-center">
          <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Gallery Management</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            This feature allows you to upload, organize, and manage images for both residential and commercial galleries. 
            Image upload functionality will be available in a future update.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
