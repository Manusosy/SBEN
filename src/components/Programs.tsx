import { motion } from "framer-motion";
import { GraduationCap, Heart, Users, Sprout, BrainCircuit, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: <GraduationCap className="w-8 h-8 text-accent-500" />,
    title: "Education Support",
    description: "Providing access to quality education through scholarships, learning materials, and mentorship programs.",
    link: "/programs/education"
  },
  {
    icon: <Heart className="w-8 h-8 text-success-500" />,
    title: "Healthcare Initiatives",
    description: "Facilitating access to essential healthcare services and promoting community health awareness.",
    link: "/programs/healthcare"
  },
  {
    icon: <Users className="w-8 h-8 text-secondary-500" />,
    title: "Women Empowerment",
    description: "Supporting women through savings groups, business skills training, and leadership development.",
    link: "/programs/women-empowerment"
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary-500" />,
    title: "Digital Literacy",
    description: "Equipping youth with essential digital skills for the modern workforce.",
    link: "/programs/digital-literacy"
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-empowerment-500" />,
    title: "Financial Inclusion",
    description: "Promoting financial literacy and access to sustainable saving and lending programs.",
    link: "/programs/financial-inclusion"
  },
  {
    icon: <Sprout className="w-8 h-8 text-warning-500" />,
    title: "Environmental Conservation",
    description: "Leading community initiatives for a cleaner, greener, and more sustainable environment.",
    link: "/programs/environmental"
  }
];

const Programs = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group"
            >
              <div className="mb-4">
                {program.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {program.description}
              </p>
              <Link to={program.link}>
                <Button
                  variant="ghost"
                  className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-50 p-0 h-auto"
                >
                  Learn More →
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/programs">
            <Button variant="default" size="lg" className="bg-secondary-500 hover:bg-secondary-600">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
