import { motion } from "framer-motion";
import { Laptop, Shield, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const DigitalLiteracy = () => {
  const initiatives = [
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: "Basic Computer Skills",
      description: "Essential computer operations and software usage"
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Internet & Online Tools",
      description: "Web navigation and online resource utilization"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Digital Safety",
      description: "Online security and responsible internet use"
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Digital Creation",
      description: "Content creation and basic programming"
    }
  ];

  const impacts = [
    {
      stat: "1000+",
      label: "Students Trained",
    },
    {
      stat: "95%",
      label: "Program Completion",
    },
    {
      stat: "80%",
      label: "Employment Rate",
    },
    {
      stat: "40+",
      label: "Partner Companies",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Digital Literacy - SBEN"
        description="Equipping youth with essential digital skills for the modern workforce through comprehensive training programs."
        keywords={['digital literacy', 'computer skills', 'online safety', 'digital training']}
      />

      <PageHero
        title="Digital Literacy"
        description="Equipping youth with essential digital skills for the modern workforce"
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />

      {/* Initiatives */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Programs
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                className="bg-gray-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">{initiative.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Impact
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{impact.stat}</div>
                <div className="text-gray-600">{impact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Our Approach
            </motion.h2>
            <motion.div
              className="prose prose-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>
                In today's digital age, computer literacy is essential for success in the workforce. Our digital literacy program provides comprehensive training to bridge the digital divide.
              </p>
              <p>
                Through hands-on training and practical exercises, we ensure our participants gain the confidence and skills they need to thrive in the digital world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Support Digital Education
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us empower more youth with essential digital skills.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DigitalLiteracy;
