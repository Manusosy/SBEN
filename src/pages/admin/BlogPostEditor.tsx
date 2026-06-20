import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaPicker from '@/components/admin/MediaPicker';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Switch } from '@/components/ui/switch';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  keywords: string[] | null;
  meta_description: string | null;
  tags: string[] | null;
  status: string;
  featured: boolean | null;
  published_at: string | null;
  created_at: string;
}

const categories = [
  'Education',
  'Healthcare',
  'Women Empowerment',
  'Community Development',
  'Youth Development',
  'Economic Empowerment',
  'News & Updates',
  'Success Stories',
];

// CMS Standards Validation Helpers
const validateMetaDescription = (text: string) => {
  const length = text.length;
  const optimal = length >= 120 && length <= 160;
  return { length, optimal, status: optimal ? 'optimal' : length === 0 ? 'empty' : 'warning' };
};

const validateExcerpt = (text: string) => {
  const length = text.length;
  const optimal = length >= 80 && length <= 200;
  return { length, optimal, status: optimal ? 'optimal' : length === 0 ? 'empty' : 'warning' };
};

const calculateSEOScore = (formData: Partial<BlogPost>) => {
  let score = 0;
  if (formData.title && formData.title.length > 0) score += 15;
  if (formData.title && formData.title.length >= 30 && formData.title.length <= 60) score += 10;
  if (formData.excerpt && formData.excerpt.length >= 80 && formData.excerpt.length <= 200) score += 20;
  if (formData.meta_description && formData.meta_description.length >= 120 && formData.meta_description.length <= 160) score += 20;
  if (formData.keywords && formData.keywords.length > 0) score += 15;
  if (formData.tags && formData.tags.length > 0) score += 15;
  if (formData.category) score += 5;
  return Math.min(score, 100);
};

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(id ? true : false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [categoryList, setCategoryList] = useState(categories);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'SBEN Team',
    category: '',
    image_url: null,
    keywords: [],
    meta_description: '',
    tags: [],
    status: 'draft',
    featured: false,
    published_at: null,
  });

  const [publishDate, setPublishDate] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(data as any);
      setImagePreview(data.image_url);
      if (data.published_at) {
        setPublishDate(new Date(data.published_at).toISOString().slice(0, 16));
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleCoverImageSelect = (image: { image_url: string }) => {
    setFormData((prev) => ({
      ...prev,
      image_url: image.image_url,
    }));
    setImagePreview(image.image_url);
    toast({
      title: 'Success',
      description: 'Cover image selected successfully',
    });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };

  const addCategory = () => {
    if (newCategoryInput.trim() && !categoryList.includes(newCategoryInput.trim())) {
      const newCategory = newCategoryInput.trim();
      setCategoryList([...categoryList, newCategory]);
      setFormData((prev) => ({ ...prev, category: newCategory }));
      setNewCategoryInput('');
      setShowNewCategory(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      if (!formData.title || !formData.excerpt || !formData.content) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        setPublishing(false);
        return;
      }

      const publishedAt = new Date(publishDate).toISOString();

      const { featured, id: formId, created_at, ...validData } = formData;
      const payload = {
        ...validData,
        status: 'published',
        published_at: publishedAt,
      };

      if (id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload as any)
          .eq('id', id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Article published successfully',
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([payload as any]);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Article created and published successfully',
        });
      }

      navigate('/admin/blog');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setPublishing(true);
    try {
      if (!formData.title) {
        toast({
          title: 'Error',
          description: 'Please enter a title',
          variant: 'destructive',
        });
        setPublishing(false);
        return;
      }

      const { featured, id: formId, created_at, ...validData } = formData;
      const payload = {
        ...validData,
        status: 'draft',
      };

      if (id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload as any)
          .eq('id', id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Draft saved successfully',
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([payload as any]);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Draft created successfully',
        });
      }

      navigate('/admin/blog');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/blog')}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to blog posts"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id ? 'Edit Article' : 'New Article'}
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={publishing}
            >
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              disabled={publishing}
              className="bg-green-700 hover:bg-green-800"
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div>
                <Input
                  placeholder="Article Title"
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-2xl font-bold border-0 border-b border-gray-200 rounded-none px-0 placeholder:text-gray-400 placeholder:italic focus:ring-0 focus:border-gray-400"
                />
              </div>

              {/* Cover Image — above the editor */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-2">Cover Image</p>
                {imagePreview ? (
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100" style={{ borderRadius: 7 }}>
                    <img
                      src={imagePreview}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image_url: null }));
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 px-3 py-1 text-xs rounded border border-gray-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 bg-gray-50 transition-colors"
                    style={{ borderRadius: 7 }}
                  >
                    <ImageIcon className="w-7 h-7 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Click to select cover image</p>
                    <p className="text-xs text-gray-400 mt-0.5">Choose from Media Library</p>
                  </div>
                )}
              </div>

              {/* Rich Text Editor */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-2">Content</p>
                <RichTextEditor
                  content={formData.content || ''}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                />
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700">
                    EXCERPT
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <span className="text-xs text-gray-500">
                    {formData.excerpt?.length || 0}/200 characters
                  </span>
                </div>
                <Textarea
                  placeholder="A short summary that appears in article cards and previews. Best practices: 80-200 characters, 1-2 sentences."
                  value={formData.excerpt || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value.slice(0, 200) }))
                  }
                  rows={3}
                  className={`border-gray-300 placeholder:text-gray-400 placeholder:italic ${formData.excerpt && formData.excerpt.length >= 80 && formData.excerpt.length <= 200
                    ? 'border-green-300 focus:ring-green-500'
                    : ''
                    }`}
                />
                {formData.excerpt && (
                  <div className="mt-2 text-xs">
                    {formData.excerpt.length < 80 && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="w-4 h-4" />
                        Too short - aim for 80+ characters
                      </div>
                    )}
                    {formData.excerpt.length > 200 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        Too long - keep under 200 characters
                      </div>
                    )}
                    {formData.excerpt.length >= 80 && formData.excerpt.length <= 200 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Perfect length
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                {/* Publish Settings Header */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    PUBLISH SETTINGS
                  </h3>
                </div>

                {/* Published Toggle */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <Label className="text-sm font-medium text-gray-700">
                    Published
                  </Label>
                  <Switch
                    checked={formData.status === 'published'}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: checked ? 'published' : 'draft',
                      }))
                    }
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <Label className="text-sm font-medium text-gray-700">
                    Featured
                  </Label>
                  <Switch
                    checked={formData.featured || false}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: checked,
                      }))
                    }
                  />
                </div>

                {/* Publish Date */}
                <div className="py-3 border-b border-gray-200">
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    Publish Date
                  </Label>
                  <Input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Category */}
                <div className="py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-700">
                      CATEGORY
                    </Label>
                    <button
                      onClick={() => setShowNewCategory(!showNewCategory)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + New
                    </button>
                  </div>

                  {showNewCategory && (
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="New category"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        className="text-sm placeholder:text-gray-400 placeholder:italic"
                      />
                      <Button
                        size="sm"
                        onClick={addCategory}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  )}

                  <Select
                    value={formData.category || ''}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="— No category —" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryList.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-700">
                      TAGS
                    </Label>
                    <button
                      onClick={() => (document.querySelector('input[placeholder="Add tag"]') as HTMLInputElement)?.focus()}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + New
                    </button>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      className="text-sm placeholder:text-gray-400 placeholder:italic"
                    />
                    <Button
                      size="sm"
                      onClick={addTag}
                      variant="outline"
                      disabled={!tagInput.trim()}
                    >
                      Add
                    </Button>
                  </div>

                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(index)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Image */}
                <div className="py-3 border-b border-gray-200">
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    META DESCRIPTION
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    placeholder="Short summary for search engines (120-160 characters)"
                    value={formData.meta_description || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, meta_description: e.target.value.slice(0, 160) }))
                    }
                    rows={2}
                    className={`text-sm placeholder:text-gray-400 placeholder:italic ${formData.meta_description && formData.meta_description.length >= 120 && formData.meta_description.length <= 160
                      ? 'border-green-300 focus:ring-green-500'
                      : ''
                      }`}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formData.meta_description?.length || 0}/160 characters
                    </span>
                    {formData.meta_description && (
                      <div className="text-xs">
                        {formData.meta_description.length < 120 && (
                          <span className="text-yellow-600">Too short</span>
                        )}
                        {formData.meta_description.length > 160 && (
                          <span className="text-red-600">Too long</span>
                        )}
                        {formData.meta_description.length >= 120 && formData.meta_description.length <= 160 && (
                          <span className="text-green-600">Perfect</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO Score */}
                <div className="py-3 border-b border-gray-200">
                  <Label className="text-sm font-medium text-gray-700 block mb-3">
                    SEO READINESS
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Score</span>
                      <span className="text-lg font-bold text-blue-600">
                        {calculateSEOScore(formData)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${calculateSEOScore(formData) < 50
                          ? 'bg-red-500'
                          : calculateSEOScore(formData) < 75
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          }`}
                        style={{ width: `${calculateSEOScore(formData)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mt-3">
                      <div className={`flex items-center gap-2 ${formData.title ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        Title
                      </div>
                      <div className={`flex items-center gap-2 ${formData.excerpt && formData.excerpt.length >= 80 ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        Excerpt
                      </div>
                      <div className={`flex items-center gap-2 ${formData.meta_description && formData.meta_description.length >= 120 ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        Meta Description
                      </div>
                      <div className={`flex items-center gap-2 ${formData.tags && formData.tags.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        Tags
                      </div>
                      <div className={`flex items-center gap-2 ${formData.image_url ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        Cover Image
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Image — removed from sidebar, now in main column */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MediaPicker
        open={isMediaPickerOpen}
        onOpenChange={setIsMediaPickerOpen}
        onSelect={handleCoverImageSelect}
      />
    </AdminLayout>
  );
};

export default BlogPostEditor;
