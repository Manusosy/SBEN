import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  children?: ReactNode;
  className?: string;
  textColor?: 'white' | 'dark';
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  backgroundGradient = 'from-primary-500 to-gray-900',
  children,
  className = '',
  textColor = 'white',
  height = 'md'
}: HeroSectionProps) => {
  const heightClasses = {
    sm: 'h-[40vh] min-h-[300px]',
    md: 'h-[50vh] min-h-[400px]',
    lg: 'h-[60vh] min-h-[500px]',
    xl: 'h-[70vh] min-h-[600px]'
  };

  const textColorClass = textColor === 'white' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`relative w-full ${heightClasses[height]} flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img 
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${backgroundGradient} opacity-80`}></div>
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${backgroundGradient}`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${textColorClass}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed ${textColor === 'white' ? 'text-gray-200' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;