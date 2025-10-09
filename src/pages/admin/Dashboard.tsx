import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, FolderKanban, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    images: 0,
    programs: 0,
    publishedPosts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [posts, images, programs, published] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
        supabase.from('programs').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      ]);

      setStats({
        posts: posts.count || 0,
        images: images.count || 0,
        programs: programs.count || 0,
        publishedPosts: published.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Posts', value: stats.posts, icon: FileText, color: 'text-blue-600' },
    { title: 'Published Posts', value: stats.publishedPosts, icon: TrendingUp, color: 'text-green-600' },
    { title: 'Gallery Images', value: stats.images, icon: Image, color: 'text-purple-600' },
    { title: 'Programs', value: stats.programs, icon: FolderKanban, color: 'text-orange-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/blog"
                className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FileText className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Manage Blog Posts</h3>
                <p className="text-sm text-gray-600 mt-1">Create and edit articles</p>
              </a>
              <a
                href="/admin/gallery"
                className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Image className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Manage Gallery</h3>
                <p className="text-sm text-gray-600 mt-1">Upload and organize photos</p>
              </a>
              <a
                href="/admin/programs"
                className="p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <FolderKanban className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Manage Programs</h3>
                <p className="text-sm text-gray-600 mt-1">Update program information</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;