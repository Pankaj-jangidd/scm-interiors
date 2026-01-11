import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageTransition from "@/components/admin/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, Calendar, User, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  getContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
} from "@/integrations/supabase/contact";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  submission_status: string;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getContactSubmissions();
      setSubmissions(Array.isArray(data) ? (data as ContactSubmission[]) : []);
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteContactSubmission(id);
      setSubmissions(submissions.filter((s) => s.id !== id));
      toast.success("Submission deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete submission");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";

    try {
      await updateContactStatus(id, newStatus);
      setSubmissions(
        submissions.map((s) =>
          s.id === id ? { ...s, submission_status: newStatus } : s
        )
      );
      toast.success(`Marked as ${newStatus}`);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                Contact Submissions
              </h2>
              <p className="text-muted-foreground">
                View and manage contact form submissions
              </p>
            </div>
            <Badge
              variant="secondary"
              className="text-lg px-4 py-2 bg-accent/10 text-accent font-semibold"
            >
              {
                submissions.filter((s) => s.submission_status === "unread")
                  .length
              }{" "}
              New
            </Badge>
          </div>

          {loading ? (
            <Card className="p-12 text-center bg-white border-0 shadow-lg rounded-2xl">
              <p className="text-muted-foreground">Loading...</p>
            </Card>
          ) : submissions.length === 0 ? (
            <Card className="p-12 text-center bg-white border-0 shadow-lg rounded-2xl">
              <div className="p-4 rounded-xl bg-accent/10 w-fit mx-auto mb-4">
                <Mail className="h-10 w-10 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground">
                No contact submissions yet
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <Card
                  key={submission.id}
                  className={`p-6 transition-all duration-300 hover:shadow-xl bg-white border-0 shadow-lg rounded-2xl ${
                    submission.submission_status === "unread"
                      ? "ring-2 ring-accent/30"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {submission.name}
                      </h3>
                      <Badge
                        variant={
                          submission.submission_status === "unread"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          submission.submission_status === "unread"
                            ? "bg-accent text-white"
                            : "bg-secondary text-muted-foreground"
                        }
                      >
                        {submission.submission_status === "unread"
                          ? "New"
                          : "Read"}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toggleStatus(
                            submission.id,
                            submission.submission_status
                          )
                        }
                        className="hover:bg-accent/10"
                      >
                        <Eye className="h-4 w-4 text-accent" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(submission.id)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-sm text-accent hover:underline break-all"
                        >
                          {submission.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Phone
                        </p>
                        <a
                          href={`tel:${submission.phone}`}
                          className="text-sm text-accent hover:underline"
                        >
                          {submission.phone}
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Project Type
                      </p>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {submission.project_type}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          Date
                        </p>
                        <p className="text-sm text-foreground">
                          {new Date(submission.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}{" "}
                          at{" "}
                          {new Date(submission.created_at).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {submission.message && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Message
                      </p>
                      <p className="text-sm text-foreground bg-secondary p-4 rounded-xl">
                        {submission.message}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </AdminLayout>
  );
};

export default ContactSubmissions;
