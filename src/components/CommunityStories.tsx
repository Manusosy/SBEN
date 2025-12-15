import { motion } from "framer-motion";
import { Heart, Users, Star, Award } from "lucide-react";

const stories = [
  {
    id: 1,
    title: "Sarah's Journey to Education",
    description: "From struggling with basic literacy to becoming a confident student, Sarah's transformation through our education program has inspired her entire family.",
    image: "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.38 PM (1).jpeg",
    category: "Education",
    impact: "Family of 5 supported"
  },
  {
    id: 2,
    title: "Women's Savings Group Success",
    description: "A group of 20 women started with small savings and now run successful small businesses, providing for their families and employing others.",
    image: "/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg",
    category: "Empowerment",
    impact: "20 women empowered"
  },
  {
    id: 3,
    title: "Community Health Initiative",
    description: "Our healthcare outreach program has provided medical checkups and health education to over 300 families in the past year.",
    image: "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM.jpeg",
    category: "Healthcare",
    impact: "300+ families served"
  }
];

const CommunityStories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4"
          >
            Community Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real stories of transformation and impact from our community members
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-secondary-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{story.impact}</span>
                    </div>
                    <button className="text-secondary-500 hover:text-secondary-600 font-medium text-sm transition-colors">
                      Read Full Story →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-8 shadow-md border border-gray-100 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-6 h-6" />, value: "1000+", label: "Lives Touched" },
              { icon: <Users className="w-6 h-6" />, value: "500+", label: "Students Supported" },
              { icon: <Award className="w-6 h-6" />, value: "50+", label: "Programs Launched" },
              { icon: <Star className="w-6 h-6" />, value: "95%", label: "Success Rate" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="text-primary-600">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStories; 