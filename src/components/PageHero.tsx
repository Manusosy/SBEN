import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  description: string;
  imagePath: string;
  showButtons?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const PageHero = ({ 
  title, 
  description, 
  imagePath,
  showButtons = false,
  primaryButtonText = "Get Involved",
  primaryButtonLink = "/get-involved",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/programs",
  className = ""
}: PageHeroProps) => {
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

  return (
    <motion.div 
      className={`relative w-full ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[600px] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={imagePath}
            alt="Community empowerment initiatives"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-500/90 via-secondary-500/80 to-white"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="w-full" variants={itemVariants}>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed text-gray-100"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            
            {showButtons && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={itemVariants}
              >
                <Link to={primaryButtonLink} className="w-full sm:w-auto">
                  <button 
                    className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:shadow-primary-500/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  >
                    {primaryButtonText}
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link
                  to={secondaryButtonLink}
                  className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all shadow-lg hover:shadow-xl hover:shadow-secondary-500/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                >
                  {secondaryButtonText}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageHero;
