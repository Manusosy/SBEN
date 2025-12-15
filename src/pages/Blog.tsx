import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/supabase';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts' as any)
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

  return (
    <PageLayout>
      <SEO
        title="Blog - SBEN | News and insights about community development and empowerment"
        description="Stay updated with the latest news, insights, and stories about community development, education, healthcare, and empowerment initiatives from ShineBridge Empowerment Network (SBEN)."
        imageUrl="/og-image.png"
        keywords={['blog', 'news', 'community development', 'SBEN', 'empowerment', 'education', 'healthcare']}
      />

      <PageHero
        title="Latest News & Updates"
        description="Stay updated with our latest news, stories, and community initiatives"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM.jpeg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">Loading blog posts...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No blog posts found.</div>
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image_url || '/gallery/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-empowerment-500 hover:text-empowerment-600 font-medium transition-colors group"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            )))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
