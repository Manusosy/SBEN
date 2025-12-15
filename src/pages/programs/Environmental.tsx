import { motion } from "framer-motion";
import { TreeDeciduous, Recycle, Leaf, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const EnvironmentalConservation = () => {
  const initiatives = [
    {
      icon: <TreeDeciduous className="w-8 h-8 text-primary" />,
      title: "Tree Planting",
      description: "Community reforestation and green spaces"
    },
    {
      icon: <Recycle className="w-8 h-8 text-primary" />,
      title: "Waste Management",
      description: "Recycling and waste reduction programs"
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Sustainable Practices",
      description: "Education on eco-friendly lifestyles"
    },
    {
      icon: <Sun className="w-8 h-8 text-primary" />,
      title: "Clean Energy",
      description: "Promoting renewable energy solutions"
    }
  ];

  const impacts = [
    {
      stat: "10000+",
      label: "Trees Planted",
    },
    {
      stat: "50+",
      label: "Community Projects",
    },
    {
      stat: "5000+",
      label: "People Educated",
    },
    {
      stat: "30%",
      label: "Waste Reduction",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Environmental Conservation - SBEN"
        description="Leading community initiatives for a cleaner, greener, and more sustainable environment through conservation efforts."
        keywords={['environmental conservation', 'tree planting', 'waste management', 'sustainability']}
      />

      <PageHero
        title="Environmental Conservation"
        description="Leading community initiatives for a cleaner, greener, and more sustainable environment"
        imagePath="/gallery/environmental/WhatsApp Image 2025-09-06 at 5.09.32 PM.jpeg"
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
                We believe that environmental conservation starts at the community level. Our programs focus on creating sustainable practices and fostering environmental stewardship.
              </p>
              <p>
                Through education, hands-on projects, and community engagement, we work to create lasting positive impacts on our environment.
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
            Support Environmental Conservation
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us create a more sustainable future for our communities.
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

export default EnvironmentalConservation;
