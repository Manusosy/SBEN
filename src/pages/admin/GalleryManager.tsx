import AdminLayout from '@/components/admin/AdminLayout';
import MediaLibraryContent from '@/components/admin/MediaLibraryContent';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const GalleryManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* WordPress-style Breadcrumb Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="hover:text-primary transition-colors cursor-pointer">Media</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Media Library</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-500 mt-1">Manage uploaded files.</p>
          </div>
        </div>

        {/* Media Library Core Content */}
        <MediaLibraryContent />
      </div>
    </AdminLayout>
  );
};

export default GalleryManager;