
import PageLayout from '@/components/PageLayout';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/data/blogPosts';
import { motion } from 'framer-motion';

const Blog = () => {
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
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
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
                  src={post.imageUrl || '/gallery/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
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
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
