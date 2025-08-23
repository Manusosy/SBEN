import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const EducationInitiatives = () => {
  const initiatives = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Academic Support",
      description: "Tutoring and academic resources for students"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Scholarship Programs",
      description: "Financial support for promising students"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Study Groups",
      description: "Collaborative learning environments"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Skills Workshops",
      description: "Practical skill development sessions"
    }
  ];

  const impacts = [
    {
      stat: "500+",
      label: "Students Supported",
    },
    {
      stat: "90%",
      label: "Program Completion Rate",
    },
    {
      stat: "100+",
      label: "Partner Schools",
    },
    {
      stat: "85%",
      label: "Academic Improvement",
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Education Initiatives - SBEN"
        description="Supporting academic excellence through comprehensive education programs, scholarships, and digital literacy initiatives."
        keywords={['education', 'academic support', 'scholarships', 'digital literacy', 'tutoring']}
      />

      <PageHero
        title="Education Initiatives"
        description="Supporting academic excellence"
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
            Our Educational Programs
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
                We believe that education is the cornerstone of community development. Our initiatives focus on providing comprehensive academic support, resources, and opportunities for students at all levels.
              </p>
              <p>
                Through partnerships with local schools and educational institutions, we create sustainable programs that address the specific needs of our communities and help students achieve their full potential.
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
            Support Our Educational Programs
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us continue providing quality education and support to our communities.
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

export default EducationInitiatives;
