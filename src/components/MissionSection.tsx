import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Leaf, Handshake } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Integrity",
    description: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our activities.",
    color: "from-empowerment-100 to-empowerment-200",
    bgColor: "bg-empowerment-50"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Inclusivity",
    description: "We embrace diversity and ensure all community members have equal access to opportunities.",
    color: "from-primary-100 to-primary-200",
    bgColor: "bg-primary-50"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Empowerment",
    description: "We build capacity and create opportunities for individuals to realize their full potential.",
    color: "from-secondary-100 to-secondary-200",
    bgColor: "bg-secondary-50"
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Sustainability",
    description: "We develop lasting solutions that create long-term positive impact for our community.",
    color: "from-success-100 to-success-200",
    bgColor: "bg-success-50"
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Collaboration",
    description: "We work together with partners and stakeholders to achieve shared goals and maximize impact.",
    color: "from-accent-100 to-accent-200",
    bgColor: "bg-accent-50"
  }
];

const MissionSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To empower vulnerable members of the Kibera community through education support, 
              girl-child protection, healthcare initiatives, and environmental conservation, 
              building bridges to dignity, equity, and sustainable development.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a resilient, empowered, and inclusive community where every individual, 
                especially the vulnerable, have access to quality education, healthcare, equal opportunities, 
                and a safe, sustainable environment.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg"
                alt="Community empowerment initiatives"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-secondary-500 mb-4"
          >
            Our Core Values
          </motion.h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide our work and shape our community impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`${value.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${value.color} text-white mr-3 group-hover:scale-105 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {value.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
