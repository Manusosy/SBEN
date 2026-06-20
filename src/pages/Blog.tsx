import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { ArrowRight, Calendar, User, Tag, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/supabase';

const NAVY = '#000080';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts((data as unknown as BlogPost[]) || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filtered = posts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    });

  const formatDate = (post: BlogPost) =>
    new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <PageLayout>
      <SEO
        title="Blog — SBEN | News & Community Stories"
        description="Latest news, insights, and stories from ShineBridge Empowerment Network."
        imageUrl="/og-image.png"
        keywords={['blog', 'news', 'community', 'SBEN', 'empowerment']}
      />

      {/* Hero */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img
          src="/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM.jpeg"
          alt="Latest News & Updates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-3xl sm:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Latest News & Updates
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-white/80 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Stories, initiatives and updates from ShineBridge Empowerment Network
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Search + Category Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          {/* Category pills */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-sm px-4 py-1.5 rounded-full border transition-all font-medium"
                  style={{
                    background: activeCategory === cat ? NAVY : '#fff',
                    color: activeCategory === cat ? '#fff' : '#374151',
                    borderColor: activeCategory === cat ? NAVY : '#e5e7eb',
                    boxShadow: activeCategory === cat ? '0 1px 4px rgba(0,0,128,0.2)' : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          {!loading && posts.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
              />
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <div
              className="animate-spin rounded-full h-10 w-10 border-b-2"
              style={{ borderColor: NAVY }}
            />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <BookOpen className="w-14 h-14 mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-semibold text-lg">
              {posts.length === 0
                ? 'No articles published yet. Check back soon!'
                : `No articles found${searchQuery ? ` for "${searchQuery}"` : ''} in ${activeCategory === 'All' ? 'this section' : activeCategory}.`}
            </p>
            {(activeCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-sm font-medium underline"
                style={{ color: NAVY }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Articles Grid — uniform cards, no weird featured layout */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Thumbnail */}
                  <div className="h-52 overflow-hidden bg-gray-50 flex-shrink-0">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)' }}
                      >
                        <Tag className="w-10 h-10 text-indigo-300" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {post.category && (
                      <span
                        className="text-[11px] font-bold uppercase tracking-widest mb-2.5 inline-block"
                        style={{ color: NAVY }}
                      >
                        {post.category}
                      </span>
                    )}

                    <h2 className="text-base font-bold text-gray-900 mb-2.5 line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer row */}
                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post)}
                        </span>
                      </div>
                      <span
                        className="flex items-center gap-0.5 text-xs font-semibold group-hover:gap-1.5 transition-all"
                        style={{ color: NAVY }}
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Articles count */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-10">
            Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        )}
      </div>
    </PageLayout>
  );
};

export default Blog;
