import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import EnhancedBlogContent from '@/components/EnhancedBlogContent';
import RichBlogContent from '@/components/RichBlogContent';
import { Calendar, User, Tag, Twitter, Linkedin, Facebook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, ContentSection } from '@/types/supabase';

interface ExtendedBlogPost extends BlogPost {
  tags?: string[];
}

const NAVY = '#000080';

/* ── Floating social share sidebar ── */
const SocialShare = ({ title, url }: { title: string; url: string }) => {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M11.99 2C6.473 2 2 6.473 2 11.99c0 1.905.525 3.69 1.44 5.215L2 22l4.916-1.418A9.959 9.959 0 0011.99 22C17.516 22 22 17.517 22 11.99 22 6.473 17.516 2 11.99 2zm0 18.18a8.169 8.169 0 01-4.17-1.145l-.299-.177-3.091.891.908-3.014-.194-.309A8.163 8.163 0 013.82 11.99c0-4.509 3.671-8.18 8.17-8.18 4.508 0 8.18 3.671 8.18 8.18 0 4.508-3.672 8.19-8.18 8.19z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="hidden lg:flex flex-col items-center gap-3">
      <span
        className="text-xs font-semibold tracking-widest uppercase text-gray-400"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.15em' }}
      >
        Share
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${l.label}`}
          className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
};

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<ExtendedBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setPost(data as unknown as ExtendedBlogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center py-40">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: NAVY }}
          />
        </div>
      </PageLayout>
    );
  }

  /* ── Not found ── */
  if (!post) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-500 mb-8">
            The article you are looking for doesn&apos;t exist or has been removed.
          </p>
          <Link to="/blog" className="text-sm font-medium" style={{ color: NAVY }}>
            ← Back to Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const publishDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageLayout>
      <SEO
        title={`${post.title} — SBEN`}
        description={post.meta_description || post.excerpt}
        imageUrl={post.image_url || undefined}
        keywords={post.keywords || []}
        type="article"
        publishDate={post.published_at || post.created_at}
        category={post.category}
      />

      <article className="pt-24 pb-20">

        {/* ── Breadcrumbs ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>/</span>
            {post.category && (
              <>
                <Link
                  to="/blog"
                  className="hover:text-gray-600 transition-colors"
                  style={{ color: NAVY }}
                >
                  {post.category}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        {/* ── Article header ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          {post.category && (
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-4 inline-block"
              style={{ color: NAVY }}
            >
              {post.category}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 border-b border-gray-200 pb-5">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gray-400" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {publishDate}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-auto">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-gray-200 text-gray-500"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Hero image ── no overlay at all ── */}
        {post.image_url && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="overflow-hidden" style={{ borderRadius: 7 }}>
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto max-h-[480px] object-cover"
              />
            </div>
          </div>
        )}

        {/* ── Excerpt — plain, no border highlight ── */}
        {post.excerpt && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* ── Content area: social share sidebar + article body ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex gap-8">

            {/* Floating social share — fixed to left outside the reading column */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <SocialShare title={post.title} url={pageUrl} />
              </div>
            </div>

            {/* Article body */}
            <div className="flex-1 min-w-0">
              {typeof post.content === 'string' && post.content.length > 0 ? (
                <RichBlogContent content={post.content} />
              ) : Array.isArray(post.content) && post.content.length > 0 ? (
                <EnhancedBlogContent content={post.content} />
              ) : (
                <p className="text-gray-400">No content available.</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile social share — inline at bottom ── */}
        <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Share this article</p>
          <div className="flex gap-3">
            {[
              { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
              { label: 'X / Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}` },
              { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
              { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + pageUrl)}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Tags footer ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 border border-gray-200 rounded-md text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Related / CTA ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="p-6 border border-gray-200" style={{ borderRadius: 7 }}>
            <p className="text-sm text-gray-500 mb-2">Continue reading</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-semibold text-sm"
              style={{ color: NAVY }}
            >
              ← All Articles
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPostDetail;
