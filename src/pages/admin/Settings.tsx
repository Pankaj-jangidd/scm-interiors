import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { Upload, Download, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { importData, exportData } = useAdmin();
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleImport = () => {
    if (!importFile) {
      toast.error('Please select a file to import');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        importData(jsonString);
        toast.success('Data imported successfully!');
        setImportFile(null);
      } catch (error) {
        toast.error('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(importFile);
  };

  const handleExport = () => {
    exportData();
    toast.success('Data exported successfully!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-3xl font-serif font-bold text-accent mb-2">Settings</h2>
          <p className="text-muted-foreground">Manage your admin panel settings</p>
        </div>

        {/* Data Management */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="h-6 w-6 text-accent" />
            <h3 className="text-xl font-semibold text-accent">Data Management</h3>
          </div>

          <div className="space-y-6">
            {/* Export Data */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Download all your content (reviews, contact submissions, gallery images) as a JSON backup file.
              </p>
              <Button 
                onClick={handleExport}
                className="bg-accent hover:bg-accent/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>

            {/* Import Data */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-foreground mb-2">Import Data</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Restore your content from a previously exported JSON backup file.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="import-file">Select Backup File</Label>
                  <Input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleImport}
                  disabled={!importFile}
                  className="bg-accent hover:bg-accent/90"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 bg-secondary/20">
          <h4 className="font-semibold text-foreground mb-2">⚠️ Important Notice</h4>
          <p className="text-sm text-muted-foreground">
            Your data is stored in the browser's memory and will be lost when you close or refresh the page. 
            Make sure to export your data regularly to avoid losing any content. When you return, you can 
            import the backup file to restore all your content.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
