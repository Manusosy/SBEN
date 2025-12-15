import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  // Get the 3 newest blog posts for the homepage
  const latestPosts = blogPosts.slice(0, 3);

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
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.imageUrl || '/gallery/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-secondary-500 hover:text-secondary-600 font-medium transition-colors group/link"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Removed top-centered View All Articles button as requested */}
      </div>
    </section>
  );
};

export default BlogPreview;
