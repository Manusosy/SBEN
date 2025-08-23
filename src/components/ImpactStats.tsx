import { motion } from "framer-motion";
import { Users, Book, Heart, Sprout } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    value: "1000+",
    label: "Community Members Impacted",
    description: "Lives touched through our programs"
  },
  {
    icon: <Book className="w-8 h-8 text-primary-500" />,
    value: "500+",
    label: "Students Supported",
    description: "Access to quality education"
  },
  {
    icon: <Heart className="w-8 h-8 text-primary-500" />,
    value: "300+",
    label: "Mentorship Connections",
    description: "Youth receiving guidance"
  },
  {
    icon: <Sprout className="w-8 h-8 text-primary-500" />,
    value: "100+",
    label: "Environmental Projects",
    description: "Sustainable community initiatives"
  }
];

const ImpactStats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-500 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we're creating lasting change in our community through education, healthcare, and empowerment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
