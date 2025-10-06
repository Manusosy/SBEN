import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const HealthcareInitiatives = () => {
  const initiatives = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Medical Camps",
      description: "Regular health checkups and basic medical services for communities"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Health Education",
      description: "Comprehensive health awareness and prevention programs"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Healthcare",
      description: "Training community health workers and volunteers"
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "Wellness Programs",
      description: "Promoting healthy lifestyle and preventive care"
    }
  ];

  const impacts = [
    {
      stat: "1000+",
      label: "Medical Consultations",
    },
    {
      stat: "50+",
      label: "Health Camps",
    },
    {
      stat: "200+",
      label: "Health Workers Trained",
    },
    {
      stat: "80%",
      label: "Health Awareness Increase",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Healthcare Initiatives - SBEN"
        description="Facilitating access to essential healthcare services and promoting community health awareness through our healthcare initiatives."
        keywords={['healthcare', 'medical camps', 'health education', 'community health', 'wellness']}
      />

      <PageHero
        title="Healthcare Initiatives"
        description="Facilitating access to essential healthcare services and promoting community health awareness"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM (1).jpeg"
      />

      {/* Initiatives */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Healthcare Programs
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
                We believe that access to quality healthcare is a fundamental right. Our healthcare initiatives focus on bringing essential medical services directly to communities and empowering them with health knowledge.
              </p>
              <p>
                Through partnerships with medical professionals, healthcare institutions, and community organizations, we create sustainable healthcare solutions that address the specific needs of our communities.
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
            Support Our Healthcare Programs
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us continue providing essential healthcare services to our communities.
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

export default HealthcareInitiatives;
