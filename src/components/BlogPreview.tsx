import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/supabase';

const NAVY = '#000080';

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, author, category, image_url, published_at, created_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts((data as unknown as BlogPost[]) || []);
      } catch (err) {
        console.error('Error fetching blog preview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: NAVY }} />
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inspiring stories of transformation and impact from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {/* Thumbnail */}
              <div className="h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-indigo-300" />
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {post.category && (
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-2 inline-block"
                    style={{ color: NAVY }}
                  >
                    {post.category}
                  </span>
                )}

                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors flex-1">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 border-t pt-3 border-gray-50">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors group/link"
                  style={{ color: NAVY }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold text-sm transition-all hover:text-white"
            style={{ borderColor: NAVY, color: NAVY }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = NAVY;
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = NAVY;
            }}
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
