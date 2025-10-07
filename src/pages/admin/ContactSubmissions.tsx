import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Trash2, Eye, Mail as MailIcon } from 'lucide-react';
import { toast } from 'sonner';

const ContactSubmissions = () => {
  const { contactSubmissions, updateSubmissionStatus, deleteSubmission } = useAdmin();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
      toast.success('Submission deleted successfully!');
    }
  };

  const handleMarkAsRead = (id: string) => {
    updateSubmissionStatus(id, 'read');
    toast.success('Marked as read');
  };

  const handleMarkAsUnread = (id: string) => {
    updateSubmissionStatus(id, 'new');
    toast.success('Marked as unread');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-accent mb-2">Contact Submissions</h2>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>

        {contactSubmissions.length === 0 ? (
          <Card className="p-12 text-center">
            <MailIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No contact submissions yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {contactSubmissions.map((submission) => (
              <Card key={submission.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{submission.name}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      submission.status === 'new' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-foreground'
                    }`}>
                      {submission.status === 'new' ? 'New' : 'Read'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => submission.status === 'new' 
                        ? handleMarkAsRead(submission.id) 
                        : handleMarkAsUnread(submission.id)
                      }
                      title={submission.status === 'new' ? 'Mark as read' : 'Mark as unread'}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(submission.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a 
                      href={`mailto:${submission.email}`}
                      className="text-sm text-accent hover:underline break-all"
                    >
                      {submission.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a 
                      href={`tel:${submission.phone}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {submission.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                    <p className="text-sm font-medium text-foreground">{submission.projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="text-sm text-foreground">
                      {new Date(submission.date).toLocaleDateString()} at{' '}
                      {new Date(submission.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {submission.message && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Message</p>
                    <p className="text-sm text-foreground bg-secondary/20 p-4 rounded-lg">
                      {submission.message}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContactSubmissions;
