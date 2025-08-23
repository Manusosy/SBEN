import { motion } from "framer-motion";
import { Users, Briefcase, Award, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const WomenEmpowerment = () => {
  const initiatives = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Savings Groups",
      description: "Community-based saving and lending circles for financial empowerment"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Business Skills",
      description: "Entrepreneurship and business management training"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Leadership Development",
      description: "Programs to develop women leaders in the community"
    },
    {
      icon: <LineChart className="w-8 h-8 text-primary" />,
      title: "Financial Training",
      description: "Financial literacy and management education"
    }
  ];

  const impacts = [
    {
      stat: "500+",
      label: "Women Empowered",
    },
    {
      stat: "200+",
      label: "Businesses Started",
    },
    {
      stat: "50+",
      label: "Savings Groups",
    },
    {
      stat: "85%",
      label: "Success Rate",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Women Empowerment - SBEN"
        description="Supporting women through savings groups, business skills training, and leadership development programs."
        keywords={['women empowerment', 'savings groups', 'business training', 'leadership development']}
      />

      <PageHero
        title="Women Empowerment"
        description="Supporting women through savings groups, business skills training, and leadership development"
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
                Our women empowerment program takes a holistic approach to supporting women in their journey towards economic independence and leadership roles in their communities.
              </p>
              <p>
                Through a combination of financial literacy, business skills training, and leadership development, we help women build the confidence and capabilities they need to succeed.
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
            Support Women Empowerment
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us continue empowering women in our communities.
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

export default WomenEmpowerment;
