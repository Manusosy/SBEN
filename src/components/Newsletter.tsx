import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12 text-center"
        >
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter to receive the latest stories, updates, and opportunities to get involved in our community initiatives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter; 