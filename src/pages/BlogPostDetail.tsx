import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import EnhancedBlogContent from '@/components/EnhancedBlogContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, ContentSection } from '@/types/supabase';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from('blog_posts' as any)
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setPost(data as unknown as BlogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-xl">Loading post...</div>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`${post.title} - SBEN`}
        description={post.meta_description || post.excerpt}
        imageUrl={post.image_url || undefined}
        keywords={post.keywords || []}
        type="article"
        publishDate={post.published_at || post.created_at}
        category={post.category}
      />

      <article className="w-full pt-16 pb-16">
        {/* Hero Section */}
        <div className="banner-container h-96 sm:h-[450px] md:h-[500px] lg:h-[550px] relative">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover filter grayscale"
            />
          )}
          {/* Very faded navy blue overlay - matching homepage style */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000080]/30 via-[#000080]/25 to-white/20"></div>

          <div className="banner-overlay">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-start md:justify-center">
              <div className="w-full max-w-4xl mx-auto text-left md:text-center">
                <Link to="/blog" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors text-sm">
                  <ArrowLeft className="mr-2 h-3 w-3" />
                  Back to Blog
                </Link>

                <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-words max-w-full">
                  {post.title}
                </h1>

                <div className="flex flex-col gap-3 text-gray-300 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start md:justify-center gap-2 sm:gap-6">
                    <div className="flex items-center text-xs sm:text-base">
                      <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-base">
                      <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-center">
                    <div className="px-3 py-1 sm:px-4 sm:py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
                      {post.category}
                    </div>
                  </div>
                </div>

                <p className="text-gray-200 text-sm sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <EnhancedBlogContent content={post.content} />
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPostDetail;
