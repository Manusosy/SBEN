import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { GalleryImage } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

interface MediaPickerProps {
    onSelect: (url: string) => void;
    trigger?: React.ReactNode;
}

const MediaPicker = ({ onSelect, trigger }: MediaPickerProps) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const { toast } = useToast();

    // Fetch images when dialog opens
    useEffect(() => {
        if (open) {
            fetchImages();
        }
    }, [open, category, search]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('gallery_images')
                .select('*')
                .order('created_at', { ascending: false });

            if (category !== 'all') {
                query = query.eq('category', category);
            }

            if (search) {
                query = query.ilike('title', `%${search}%`);
            }

            const { data, error } = await query;
            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            // Add to DB
            const { error: dbError } = await supabase
                .from('gallery_images')
                .insert([{
                    title: file.name,
                    alt_text: file.name,
                    image_url: publicUrl,
                    category: 'uncategorized',
                    display_order: 0,
                }]);

            if (dbError) throw dbError;

            toast({ title: 'Image uploaded and added to gallery!' });
            fetchImages(); // Refresh list
        } catch (error: any) {
            toast({
                title: 'Upload failed',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSelect = (url: string) => {
        onSelect(url);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline"><ImageIcon className="w-4 h-4 mr-2" /> Select Image</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                <div className="flex gap-4 items-center py-4 border-b">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search images..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="women-empowerment">Women Empowerment</SelectItem>
                            <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
                            <SelectItem value="environmental">Environmental</SelectItem>
                            <SelectItem value="community">Community</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="uncategorized">Uncategorized</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                        <Button disabled={uploading}>
                            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                            Upload New
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-[400px] p-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            No images found. Upload one to get started.
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((img) => (
                                <div
                                    key={img.id}
                                    className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border cursor-pointer hover:ring-2 hover:ring-primary"
                                    onClick={() => handleSelect(img.image_url)}
                                >
                                    <img
                                        src={img.image_url}
                                        alt={img.alt_text}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">Select</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 truncate">
                                        <p className="text-[10px] text-white text-center truncate px-1">{img.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MediaPicker;
