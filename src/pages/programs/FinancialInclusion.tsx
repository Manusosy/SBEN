import { motion } from "framer-motion";
import { Coins, Calculator, PiggyBank, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const FinancialInclusion = () => {
  const initiatives = [
    {
      icon: <Calculator className="w-8 h-8 text-primary" />,
      title: "Financial Education",
      description: "Basic financial literacy and money management"
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-primary" />,
      title: "Savings Programs",
      description: "Structured savings and investment guidance"
    },
    {
      icon: <Coins className="w-8 h-8 text-primary" />,
      title: "Credit Access",
      description: "Support in accessing responsible credit options"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Business Planning",
      description: "Financial planning for small businesses"
    }
  ];

  const impacts = [
    {
      stat: "2000+",
      label: "People Trained",
    },
    {
      stat: "75%",
      label: "Savings Increase",
    },
    {
      stat: "500+",
      label: "Credit Access",
    },
    {
      stat: "90%",
      label: "Program Success",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Financial Inclusion - SBEN"
        description="Promoting financial literacy and access to sustainable saving and lending programs for community development."
        keywords={['financial inclusion', 'financial literacy', 'savings', 'credit access']}
      />

      <PageHero
        title="Financial Inclusion"
        description="Promoting financial literacy and access to sustainable saving and lending programs"
        imagePath="/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.32 PM.jpeg"
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
                We believe that financial literacy and access to financial services are key to economic empowerment. Our programs focus on building both knowledge and practical skills.
              </p>
              <p>
                Through partnerships with financial institutions and community organizations, we create pathways for sustainable financial inclusion and growth.
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
            Support Financial Inclusion
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us expand financial literacy and access in our communities.
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

export default FinancialInclusion;
