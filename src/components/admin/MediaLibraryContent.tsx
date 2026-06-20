import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, LayoutGrid, List as ListIcon, Upload, Trash2, Check } from 'lucide-react';

export interface GalleryImage {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

interface MediaLibraryContentProps {
  onSelect?: (image: GalleryImage) => void;
  selectable?: boolean;
}

export default function MediaLibraryContent({ onSelect, selectable = false }: MediaLibraryContentProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Upload state
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

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

  const handleUpload = async () => {
    if (!uploadFiles || uploadFiles.length === 0) {
      toast({ title: 'Please select files to upload', variant: 'destructive' });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError);
          failCount++;
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert([{
            title: uploadCaption || file.name,
            alt_text: uploadAltText || file.name,
            image_url: publicUrl,
            category: 'uncategorized',
            display_order: 0,
          }]);

        if (dbError) {
          console.error(`Error saving ${file.name} to DB:`, dbError);
          failCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast({ title: `Successfully uploaded ${successCount} images!` });
        setUploadFiles(null);
        setUploadAltText('');
        setUploadCaption('');
        // reset file input
        const fileInput = document.getElementById('media-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchImages();
      }

      if (failCount > 0) {
        toast({
          title: `Failed to upload ${failCount} images`,
          variant: 'destructive'
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

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const filteredImages = images.filter((img) => {
    const q = searchQuery.toLowerCase();
    return (
      img.alt_text?.toLowerCase().includes(q) ||
      img.title?.toLowerCase().includes(q) ||
      img.image_url?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full bg-[#f8f9fa] rounded-lg p-6">
      
      {/* Top Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search media by alt, caption, file name..." 
            className="pl-10 h-11 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium whitespace-nowrap">
          <span>Showing {filteredImages.length} of {images.length} images</span>
          <div className="flex bg-white rounded-md border border-gray-200 overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 flex items-center gap-2 transition-colors ${viewMode === 'grid' ? 'bg-[#eef1f6] text-primary' : 'hover:bg-gray-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid</span>
            </button>
            <div className="w-px bg-gray-200"></div>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-[#eef1f6] text-primary' : 'hover:bg-gray-50'}`}
            >
              <ListIcon className="w-4 h-4" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label className="text-xs font-bold text-gray-700 tracking-wider">UPLOAD IMAGE(S)</Label>
            <div className="flex items-center">
              <Input
                id="media-upload"
                type="file"
                accept="image/*"
                multiple
                className="h-10 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                onChange={(e) => setUploadFiles(e.target.files)}
                disabled={uploading}
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <Label className="text-xs font-bold text-gray-700 tracking-wider">ALT TEXT</Label>
            <Input
              placeholder="Describe the image for SEO and accessibility"
              className="h-10 border-gray-200"
              value={uploadAltText}
              onChange={(e) => setUploadAltText(e.target.value)}
              disabled={uploading}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label className="text-xs font-bold text-gray-700 tracking-wider">CAPTION</Label>
            <Input
              placeholder="Optional caption for articles"
              className="h-10 border-gray-200"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              disabled={uploading}
            />
          </div>

          <Button 
            className="h-10 px-8 bg-[#1B4332] hover:bg-[#143224] text-white font-medium"
            onClick={handleUpload}
            disabled={uploading || !uploadFiles}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      {/* Gallery View */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
          <p className="text-gray-500">No images found.</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`relative group aspect-square rounded-md overflow-hidden bg-gray-100 ${selectable ? 'cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2' : ''}`}
                  onClick={() => selectable && onSelect && onSelect(image)}
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {!selectable && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button
                        size="icon"
                        variant="destructive"
                        className="w-8 h-8 rounded-full"
                        onClick={(e) => handleDelete(image.id, e)}
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {selectable && (
                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                           <Check className="w-6 h-6" />
                        </div>
                     </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200 ${selectable ? 'cursor-pointer hover:border-primary' : ''}`}
                  onClick={() => selectable && onSelect && onSelect(image)}
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{image.title || 'Untitled'}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">Alt: {image.alt_text || 'None'}</p>
                  </div>
                  {!selectable && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => handleDelete(image.id, e)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                  {selectable && (
                    <Button size="sm" onClick={() => onSelect && onSelect(image)}>
                      Select
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
