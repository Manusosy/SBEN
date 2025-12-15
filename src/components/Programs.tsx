import { motion } from "framer-motion";
import { GraduationCap, Heart, Users, Sprout, BrainCircuit, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: <GraduationCap className="w-6 h-6 text-accent-500" />,
    title: "Education Support",
    description: "Providing access to quality education through scholarships, learning materials, and mentorship programs.",
    link: "/programs/education",
    image: "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.38 PM (1).jpeg",
    color: "from-education-light to-education-dark",
    tag: "Education"
  },
  {
    icon: <Heart className="w-6 h-6 text-success-500" />,
    title: "Healthcare Initiatives",
    description: "Facilitating access to essential healthcare services and promoting community health awareness.",
    link: "/programs/healthcare",
    image: "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM.jpeg",
    color: "from-health-light to-health-dark",
    tag: "Healthcare"
  },
  {
    icon: <Users className="w-6 h-6 text-secondary-500" />,
    title: "Women Empowerment",
    description: "Supporting women through savings groups, business skills training, and leadership development.",
    link: "/programs/women-empowerment",
    image: "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.33 PM (1).jpeg",
    color: "from-community-light to-community-dark",
    tag: "Empowerment"
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-primary-500" />,
    title: "Digital Literacy",
    description: "Equipping youth with essential digital skills for the modern workforce.",
    link: "/programs/digital-literacy",
    image: "/gallery/digital-literacy/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg",
    color: "from-primary-100 to-primary-200",
    tag: "Technology"
  },
  {
    icon: <PiggyBank className="w-6 h-6 text-empowerment-500" />,
    title: "Financial Inclusion",
    description: "Promoting financial literacy and access to sustainable saving and lending programs.",
    link: "/programs/financial-inclusion",
    image: "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.32 PM.jpeg",
    color: "from-empowerment-100 to-empowerment-200",
    tag: "Finance"
  },
  {
    icon: <Sprout className="w-6 h-6 text-warning-500" />,
    title: "Environmental Conservation",
    description: "Leading community initiatives for a cleaner, greener, and more sustainable environment.",
    link: "/programs/environmental",
    image: "/gallery/environmental/WhatsApp Image 2025-09-06 at 5.09.33 PM.jpeg",
    color: "from-success-100 to-success-200",
    tag: "Environment"
  }
];

const Programs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4"
          >
            Our Programs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive initiatives designed to create lasting positive change in our community
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-secondary-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                      {program.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-secondary-50 transition-colors">
                      {program.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3 group-hover:text-secondary-600 transition-colors">
                      {program.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/programs">
            <Button variant="default" size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
