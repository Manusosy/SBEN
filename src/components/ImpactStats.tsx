import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Book, Heart, Sprout } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-5 h-5 text-primary-500" />,
    value: 1000,
    label: "Community Members Impacted",
    description: "Lives touched through our programs"
  },
  {
    icon: <Book className="w-5 h-5 text-accent-500" />,
    value: 500,
    label: "Students Supported",
    description: "Access to quality education"
  },
  {
    icon: <Heart className="w-5 h-5 text-empowerment-500" />,
    value: 300,
    label: "Mentorship Connections",
    description: "Youth receiving guidance"
  },
  {
    icon: <Sprout className="w-5 h-5 text-success-500" />,
    value: 100,
    label: "Environmental Projects",
    description: "Sustainable community initiatives"
  }
];

const ImpactStats = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector('#impact-stats');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newCounts = stats.map((stat, index) => {
        const targetValue = stat.value;
        const currentValue = Math.floor(targetValue * progress);
        return currentValue;
      });

      setCounts(newCounts);

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(stats.map(stat => stat.value));
      }
    }, stepDuration);
  };

  return (
    <section id="impact-stats" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-secondary-500 mb-4"
          >
            Our Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Together, we're creating lasting change in our community through education, healthcare, and empowerment.
          </motion.p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {counts[index]}+
                  </h3>
                  
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </h4>
                  
                  <p className="text-xs text-gray-600">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Impact Message with Image */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <img
                  src="/gallery/education/WhatsApp Image 2025-08-23 at 12.42.38 PM (1).jpeg"
                  alt="Students supported and community learning"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Building a Better Future Together
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every number represents a life changed, a family supported, and a community strengthened. 
                Our impact continues to grow as we expand our programs and reach more community members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
