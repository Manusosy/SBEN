import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Empowering Youth Through Mentorship: Stories of Impact",
      excerpt: "Discover how SBEN's mentorship program is creating lasting positive change in the lives of young people across our community.",
      image: "/lovable-uploads/4187f423-ba69-4043-be76-c43098488348.png",
      date: "August 15, 2025",
      author: "SBEN Team",
      slug: "mentorship-impact-stories"
    },
    {
      id: 2,
      title: "Building Future Leaders: SBEN's Leadership Development Program",
      excerpt: "How our comprehensive leadership program is equipping the next generation with the skills and confidence to drive positive change.",
      image: "/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png",
      date: "August 10, 2025",
      author: "SBEN Team",
      slug: "leadership-development-program"
    },
    {
      id: 3,
      title: "Education Initiatives Making a Difference in Our Community",
      excerpt: "Exploring the impact of SBEN's educational support programs and how they're helping students achieve their academic goals.",
      image: "/lovable-uploads/5ca619e6-2139-4879-9b3c-94777ab85e2a.png",
      date: "August 5, 2025",
      author: "SBEN Team",
      slug: "education-initiatives-impact"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover inspiring stories of transformation and impact from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  src={post.image}
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
                  className="inline-flex items-center text-tebari-green hover:text-tebari-green/80 font-medium transition-colors group"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-tebari-green text-white rounded-lg hover:bg-tebari-green/90 transition-all group"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
