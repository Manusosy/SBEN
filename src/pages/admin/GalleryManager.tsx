import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GalleryImage {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

const categories = [
  { value: 'education', label: 'Education' },
  { value: 'women-empowerment', label: 'Women Empowerment' },
  { value: 'digital-literacy', label: 'Digital Literacy' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'community', label: 'Community' },
  { value: 'healthcare', label: 'Healthcare' },
];

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    alt_text: '',
    image_url: '',
    category: 'community',
    display_order: 0,
  });

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    try {
      let query = supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 1. Upload to Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError);
          failCount++;
          continue;
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // 3. Create DB Entry automatically for each uploaded image
        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert([{
            title: formData.title || file.name, // Use provided title or filename
            alt_text: formData.alt_text || file.name,
            image_url: publicUrl,
            category: formData.category,
            display_order: formData.display_order + i, // Increment order for batch
          }]);

        if (dbError) {
          console.error(`Error saving ${file.name} to DB:`, dbError);
          failCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast({ title: `Successfully added ${successCount} images!` });
        setDialogOpen(false);
        resetForm();
        fetchImages();
      }

      if (failCount > 0) {
        toast({
          title: `Failed to upload ${failCount} images`,
          variant: "destructive"
        });
      }

    } catch (error: any) {
      toast({
        title: 'Upload process failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  // Legacy single submit (kept if needed, but file upload now handles creation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If user didn't select files but filled the URL manually (unlikely given the UI but possible)
    if (formData.image_url) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('gallery_images')
          .insert([formData]);

        if (error) throw error;
        toast({ title: 'Image added successfully!' });
        setDialogOpen(false);
        resetForm();
        fetchImages();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // If they hit submit but rely on the file input which is now auto-processing
      if (!uploading) {
        toast({ title: "Please select images to upload", variant: "destructive" });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Image deleted successfully!' });
      fetchImages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      alt_text: '',
      image_url: '',
      category: 'community',
      display_order: 0,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-600 mt-2">Manage your photo gallery</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>

        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 truncate">
                  {image.title}
                </h3>
                <p className="text-xs text-gray-500 capitalize">{image.category}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found. Add your first image!</p>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Images</Label>
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  multiple
                />
                <p className="text-xs text-gray-500">
                  Select multiple files to upload them immediately as separate entries.
                  Title and Category below will be applied to all uploaded images.
                </p>
                {uploading && <span className="text-sm text-blue-500">Uploading and saving images...</span>}
              </div>
              {/* Preview removed for multi-upload as strictly one preview doesn't make sense */}
              {formData.image_url && !uploading && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading || uploading}>
                <Upload className="w-4 h-4 mr-2" />
                {formData.image_url ? 'Add Single (Manual URL)' : 'Close'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default GalleryManager;