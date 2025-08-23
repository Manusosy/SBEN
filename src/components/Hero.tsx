import { ArrowRight, Users, BookOpen, Star, Target, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className="relative w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[600px] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
            alt="Community empowerment initiatives"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/90 via-primary-500/80 to-white"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="w-full" variants={itemVariants}>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white"
              variants={itemVariants}
            >
              Empowering Communities, Transforming Lives
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed text-gray-100"
              variants={itemVariants}
            >
              Building bridges to dignity, equity, and sustainable development through education, healthcare, and empowerment.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <Link to="/get-involved" className="w-full sm:w-auto">
                <button 
                  className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-empowerment-500 text-white rounded-lg hover:bg-empowerment-600 transition-all shadow-lg hover:shadow-xl hover:shadow-empowerment-500/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                >
                  Get Involved
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link
                to="/programs"
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl hover:shadow-secondary-500/20 flex items-center justify-center group text-sm sm:text-base font-medium"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={itemVariants}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-500/10 flex items-center justify-center rounded-lg text-secondary-500 mb-2 md:mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Women Empowerment</h3>
            <p className="text-gray-600 text-xs md:text-sm">Economic empowerment through savings groups, entrepreneurship training, and leadership development.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={itemVariants}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-500/10 flex items-center justify-center rounded-lg text-accent-500 mb-2 md:mb-3">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Youth Development</h3>
            <p className="text-gray-600 text-xs md:text-sm">Mentorship programs, digital literacy training, and leadership development for youth.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={itemVariants}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success-500/10 flex items-center justify-center rounded-lg text-success-500 mb-2 md:mb-3">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Healthcare & Wellness</h3>
            <p className="text-gray-600 text-xs md:text-sm">Improving access to healthcare services and promoting community wellness programs.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
