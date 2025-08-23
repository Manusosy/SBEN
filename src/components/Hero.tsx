import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Lightbulb, Heart } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 5 images for the slider
  const heroImages = [
    "/gallery/WhatsApp Image 2025-08-23 at 12.42.38 PM.jpeg",
    "/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (3).jpeg",
    "/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg",
    "/gallery/WhatsApp Image 2025-08-23 at 12.27.50 PM.jpeg",
    "/gallery/WhatsApp Image 2025-08-23 at 12.16.26 PM.jpeg"
  ];

  // Auto-advance images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative w-full">
      {/* Image Slider Background */}
      <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.1,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-secondary-500/90 via-secondary-500/80 to-white"></div>
            </motion.div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            >
              Empowering Communities,
              <br />
              <span className="text-white">Transforming Lives</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto text-gray-100 leading-relaxed"
            >
              Join us in our mission to create sustainable change through education, 
              healthcare, and community development in Kibera and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/get-involved"
                className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Involved
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center px-8 py-4 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-secondary-500/20"
              >
                Donate Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Feature Cards - Professional and clean */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative z-20 -mt-20 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600 leading-relaxed">Supporting over 500 families in Kibera through our various programs and initiatives</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-100 transition-colors">
                <Lightbulb className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education First</h3>
              <p className="text-gray-600 leading-relaxed">Providing quality education and digital literacy skills to empower our youth</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-empowerment-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-empowerment-100 transition-colors">
                <Heart className="w-6 h-6 text-empowerment-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Women Empowerment</h3>
              <p className="text-gray-600 leading-relaxed">Building economic independence through skills training and community support</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
