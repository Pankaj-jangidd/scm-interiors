import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageTransition from "@/components/admin/PageTransition"; // ✅ Added this import
import { Card } from "@/components/ui/card";
import { Image, MessageSquare, Mail, TrendingUp } from "lucide-react";
import { getReviews } from "@/integrations/supabase/reviews";
import { getContactSubmissions } from "@/integrations/supabase/contact";
import { getGalleryImages } from "@/integrations/supabase/gallery"; // if you have this

const Dashboard = () => {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);

  // initial load + periodic refresh
  useEffect(() => {
    let mounted = true;

    const loadAll = async () => {
      try {
        const [g, r, c] = await Promise.all([
          // if you don't have getGalleryImages, replace with []
          typeof getGalleryImages === "function"
            ? getGalleryImages()
            : Promise.resolve([]),
          getReviews(false),
          getContactSubmissions(),
        ]);

        if (!mounted) return;
        setGalleryImages(Array.isArray(g) ? g : []);
        setReviews(Array.isArray(r) ? r : []);
        setContactSubmissions(Array.isArray(c) ? c : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    loadAll();
    const iv = setInterval(() => loadAll(), 5000);

    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, []);

  const stats = [
    {
      title: "Gallery Images",
      value: galleryImages.length,
      icon: Image,
      color: "#6B5444",
      bg: "#F5EFE7",
    },
    {
      title: "Total Reviews",
      value: reviews.length,
      icon: MessageSquare,
      color: "#6B5444",
      bg: "#F5EFE7",
    },
    {
      title: "Contact Submissions",
      value: contactSubmissions.length,
      icon: Mail,
      color: "#6B5444",
      bg: "#F5EFE7",
    },
    {
      title: "Visible Reviews",
      value: reviews.filter((r) => r.visible).length,
      icon: TrendingUp,
      color: "#6B5444",
      bg: "#F5EFE7",
    },
  ];

  const recentSubmissions = contactSubmissions.slice(0, 5);

  return (
    <AdminLayout>
      <PageTransition>
        <div className="space-y-8">
          <div>
            <h2
              className="text-3xl font-serif font-bold mb-2"
              style={{ color: "#6B5444" }}
            >
              Admin Dashboard
            </h2>
            <p className="text-muted-foreground">
              Overview of your website content
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: stat.bg }}
                    >
                      <Icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Contact Submissions */}
          <Card className="p-6">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#6B5444" }}
            >
              Recent Contact Submissions
            </h3>
            {recentSubmissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No submissions yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-col md:flex-row md:items-start md:justify-between p-4 rounded-lg gap-4"
                    style={{ backgroundColor: "#F5EFE7" }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold text-foreground">
                          {submission.name}
                        </p>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              submission.status === "new"
                                ? "#6B5444"
                                : "#E5DDD5",
                            color:
                              submission.status === "new"
                                ? "#FAF8F5"
                                : "#2C2C2C",
                          }}
                        >
                          {submission.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {submission.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.phone}
                      </p>
                      <p className="text-sm mt-2 text-foreground line-clamp-2">
                        {submission.message}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(submission.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </PageTransition>
    </AdminLayout>
  );
};

export default Dashboard;
