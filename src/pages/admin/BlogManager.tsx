import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Trash2, Edit, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  published_at: string | null;
  created_at: string;
}

const BRAND_NAVY = '#000080';

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data as unknown as BlogPost[]) || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', post.id);
      if (error) throw error;
      setPosts(posts.filter((p) => p.id !== post.id));
      setDeleteDialogOpen(false);
      toast({ title: 'Success', description: 'Article deleted successfully.' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .in('id', Array.from(selectedIds));
      if (error) throw error;
      setPosts(posts.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      setBulkAction('');
      toast({ title: 'Success', description: `${selectedIds.size} article(s) deleted.` });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleApplyBulk = () => {
    if (bulkAction === 'delete') handleBulkDelete();
  };

  // counts
  const allCount = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;
  const archivedCount = posts.filter((p) => p.status === 'archived').length;

  // derived filtered list
  const filtered = posts.filter((post) => {
    const matchesTab =
      activeTab === 'all' ||
      post.status === activeTab;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.author || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));

  // checkbox helpers
  const allSelected = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));
  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };
  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const formatDate = (post: BlogPost) => {
    const raw = post.published_at || post.created_at;
    const d = new Date(raw);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'published') {
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide"
          style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}
        >
          Published
        </span>
      );
    }
    if (status === 'draft') {
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide"
          style={{ background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }}
        >
          Draft
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide"
        style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}
      >
        Archived
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: BRAND_NAVY }}
          />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-w-0 space-y-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

        {/* ── Page Title + New Article button ── */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-2xl font-normal text-gray-900 leading-tight">All Articles</h1>
          <Link to="/admin/blog/new">
            <button
              className="text-xs px-3 py-1 rounded border transition-colors"
              style={{
                color: BRAND_NAVY,
                borderColor: BRAND_NAVY,
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = BRAND_NAVY;
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = BRAND_NAVY;
              }}
            >
              + New article
            </button>
          </Link>
        </div>

        {/* ── Tab filters + Search ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-gray-200 pb-2">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-0 text-sm">
            {(
              [
                { key: 'all', label: 'All', count: allCount },
                { key: 'published', label: 'Published', count: publishedCount },
                { key: 'draft', label: 'Drafts', count: draftCount },
                { key: 'archived', label: 'Archived', count: archivedCount },
              ] as const
            ).map((tab, i, arr) => (
              <span key={tab.key} className="flex items-center">
                <button
                  onClick={() => { setActiveTab(tab.key); setSelectedIds(new Set()); }}
                  className="transition-colors px-0"
                  style={{
                    color: activeTab === tab.key ? BRAND_NAVY : '#2271b1',
                    fontWeight: activeTab === tab.key ? 600 : 400,
                    textDecoration: activeTab === tab.key ? 'none' : 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 2px',
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
                {i < arr.length - 1 && <span className="text-gray-300 mx-1.5">|</span>}
              </span>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setSearchTerm(searchInput)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1"
              style={{ width: 160, focusRingColor: BRAND_NAVY }}
            />
            <button
              onClick={() => setSearchTerm(searchInput)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50 transition-colors"
            >
              Search posts
            </button>
          </div>
        </div>

        {/* ── Bulk actions + Filters bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Bulk actions */}
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
            >
              <option value="">Bulk actions</option>
              <option value="delete">Move to Trash</option>
            </select>
            <button
              onClick={handleApplyBulk}
              disabled={!bulkAction || selectedIds.size === 0}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Apply
            </button>

            {/* Status dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => { /* filters are live */ }}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50 transition-colors"
            >
              Filter
            </button>
          </div>

          {/* Item count */}
          <span className="text-sm text-gray-500">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-500 text-sm">
              <p className="mb-3">No articles match your criteria.</p>
              <Link to="/admin/blog/new">
                <button
                  className="text-sm px-4 py-2 rounded border transition-colors"
                  style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY, background: 'transparent' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = BRAND_NAVY;
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = BRAND_NAVY;
                  }}
                >
                  + New article
                </button>
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <th className="px-3 py-2.5 text-left w-8">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="rounded border-gray-300"
                      style={{ accentColor: BRAND_NAVY }}
                    />
                  </th>
                  <th className="px-3 py-2.5 text-left text-gray-600 font-medium text-xs uppercase tracking-wide">
                    Article
                  </th>
                  <th className="px-3 py-2.5 text-left text-gray-600 font-medium text-xs uppercase tracking-wide w-28">
                    Status
                  </th>
                  <th className="px-3 py-2.5 text-left text-gray-600 font-medium text-xs uppercase tracking-wide w-36">
                    Category
                  </th>
                  <th className="px-3 py-2.5 text-left text-gray-600 font-medium text-xs uppercase tracking-wide w-32">
                    Author
                  </th>
                  <th className="px-3 py-2.5 text-left text-gray-600 font-medium text-xs uppercase tracking-wide w-32">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, idx) => {
                  const isHovered = hoveredRow === post.id;
                  const isSelected = selectedIds.has(post.id);
                  return (
                    <tr
                      key={post.id}
                      onMouseEnter={() => setHoveredRow(post.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderBottom: idx < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                        background: isSelected ? '#f0f4ff' : isHovered ? '#f9fafb' : '#fff',
                        transition: 'background 0.1s',
                      }}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-3 align-top">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(post.id)}
                          className="rounded border-gray-300 mt-0.5"
                          style={{ accentColor: BRAND_NAVY }}
                        />
                      </td>

                      {/* Title + row actions */}
                      <td className="px-3 py-3 align-top">
                        <div>
                          <a
                            href={`/admin/blog/${post.id}`}
                            onClick={(e) => { e.preventDefault(); navigate(`/admin/blog/${post.id}`); }}
                            className="font-medium leading-snug hover:underline cursor-pointer"
                            style={{ color: BRAND_NAVY, textDecoration: 'none' }}
                          >
                            {post.title}
                            {post.status === 'draft' && (
                              <span className="text-gray-400 font-normal"> — Draft</span>
                            )}
                            {post.status === 'archived' && (
                              <span className="text-gray-400 font-normal"> — Archived</span>
                            )}
                          </a>

                          {/* Hover row actions */}
                          <div
                            className="flex items-center gap-2 mt-1"
                            style={{ visibility: isHovered ? 'visible' : 'hidden', minHeight: 20 }}
                          >
                            <Link
                              to={`/admin/blog/${post.id}`}
                              className="text-xs font-medium hover:underline"
                              style={{ color: BRAND_NAVY }}
                            >
                              Edit
                            </Link>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => { setSelectedPost(post); setDeleteDialogOpen(true); }}
                              className="text-xs font-medium text-red-600 hover:underline bg-transparent border-none cursor-pointer p-0"
                            >
                              Trash
                            </button>
                            {post.status === 'published' && post.slug && (
                              <>
                                <span className="text-gray-300">|</span>
                                <Link
                                  to={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="text-xs font-medium hover:underline"
                                  style={{ color: '#2271b1' }}
                                >
                                  View
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3 align-top">
                        <StatusBadge status={post.status} />
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3 align-top text-gray-600">
                        {post.category || <span className="text-gray-300">—</span>}
                      </td>

                      {/* Author */}
                      <td className="px-3 py-3 align-top text-gray-600">
                        {post.author || <span className="text-gray-300">—</span>}
                      </td>

                      {/* Date */}
                      <td className="px-3 py-3 align-top text-gray-600 whitespace-nowrap">
                        {formatDate(post)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Bottom bulk actions (mirrors top) ── */}
        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
            >
              <option value="">Bulk actions</option>
              <option value="delete">Move to Trash</option>
            </select>
            <button
              onClick={handleApplyBulk}
              disabled={!bulkAction || selectedIds.size === 0}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Apply
            </button>
          </div>
        )}

        {/* ── Delete Confirmation Dialog ── */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Move to Trash</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>"{selectedPost?.title}"</strong>? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedPost && handleDelete(selectedPost)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default BlogManager;