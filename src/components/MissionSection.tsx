import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Leaf, Handshake } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Integrity",
    description: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our activities."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Inclusivity",
    description: "We embrace diversity and ensure all community members have equal access to opportunities."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Empowerment",
    description: "We build capacity and create opportunities for individuals to realize their full potential."
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainability",
    description: "We develop lasting solutions that create long-term positive impact for our community."
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Collaboration",
    description: "We work together with partners and stakeholders to achieve shared goals and maximize impact."
  }
];

const MissionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-secondary-500 mb-4"
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            To empower vulnerable members of the Kibera community through education support, 
            girl-child protection, healthcare initiatives, and environmental conservation, 
            building bridges to dignity, equity, and sustainable development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-primary-50 text-primary-500 mr-3">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
