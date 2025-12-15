import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 via-primary-700/90 to-secondary-600/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Let's Build a Better Future Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
          >
            Every action, no matter how small, contributes to creating lasting positive change in our community. 
            Join us in building bridges to dignity, equity, and sustainable development.
          </motion.p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Donate",
              description: "Support our programs and initiatives with your generous contribution",
              action: "Give Now",
              link: "/donate",
              color: "from-empowerment-500 to-empowerment-600"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Volunteer",
              description: "Share your time, skills, and expertise with our community",
              action: "Get Involved",
              link: "/get-involved",
              color: "from-secondary-500 to-secondary-600"
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "Spread Awareness",
              description: "Help us reach more people and expand our impact",
              action: "Learn More",
              link: "/about",
              color: "from-accent-500 to-accent-600"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                
                <p className="text-gray-200 mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <Link to={item.link}>
                  <button className={`px-6 py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    {item.action}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to volunteer, donate, or simply learn more about our work, 
              we'd love to hear from you. Every connection brings us closer to our shared vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </button>
              </Link>
              <Link to="/programs">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all">
                  Explore Programs
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-200 text-lg mb-4">Trusted by our community and partners</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="text-white font-semibold text-lg">Community-Based Organization</div>
            <div className="text-white font-semibold text-lg">•</div>
            <div className="text-white font-semibold text-lg">Kibera, Nairobi</div>
            <div className="text-white font-semibold text-lg">•</div>
            <div className="text-white font-semibold text-lg">Est. 2023</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA; 