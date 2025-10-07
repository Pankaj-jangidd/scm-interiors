import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { Image, MessageSquare, Mail, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { galleryImages, reviews, contactSubmissions } = useAdmin();

  const stats = [
    {
      title: 'Gallery Images',
      value: galleryImages.length,
      icon: Image,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Reviews',
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Contact Submissions',
      value: contactSubmissions.length,
      icon: Mail,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Visible Reviews',
      value: reviews.filter(r => r.visible).length,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  const recentSubmissions = contactSubmissions.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-accent mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your website content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Contact Submissions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-accent">Recent Contact Submissions</h3>
          {recentSubmissions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-start justify-between p-4 bg-secondary/20 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{submission.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        submission.status === 'new' 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-foreground'
                      }`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{submission.email}</p>
                    <p className="text-sm text-muted-foreground">{submission.phone}</p>
                    <p className="text-sm mt-2 text-foreground line-clamp-2">{submission.message}</p>
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
    </AdminLayout>
  );
};

export default Dashboard;
