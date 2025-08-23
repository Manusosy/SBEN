import { motion } from "framer-motion";
import { Book, GraduationCap, LaptopIcon, Users } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from '@/components/SEO';

const EducationInitiatives = () => {
  const initiatives = [
    {
      icon: <Book className="w-8 h-8 text-primary" />,
      title: "Academic Support",
      description: "Providing tutoring, study materials, and mentorship to help students excel in their studies."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Scholarship Program",
      description: "Financial support for promising students to continue their education and achieve their dreams."
    },
    {
      icon: <LaptopIcon className="w-8 h-8 text-primary" />,
      title: "Digital Literacy",
      description: "Teaching essential computer skills and providing access to digital learning resources."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Learning",
      description: "Creating spaces for collaborative learning and peer support within the community."
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

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold">Our Approach to Education</h2>
              <p className="text-muted-foreground">
                We believe that education is the foundation of community development and individual empowerment. 
                Our initiatives focus on providing comprehensive support to students at all levels, ensuring they 
                have the resources and guidance needed to succeed.
              </p>
              <p className="text-muted-foreground">
                Through our various programs, we address both academic and practical needs, creating an 
                environment where learning can flourish and students can reach their full potential.
              </p>
              <Button asChild>
                <Link to="/get-involved">Support Our Programs</Link>
              </Button>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg shadow-sm"
                >
                  <div className="mb-4">
                    {initiative.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-sm text-muted-foreground">{initiative.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Through our education initiatives, we've made significant progress in improving 
              access to quality education and academic outcomes.
            </p>
          </div>
          <div className="grid sm:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Students Supported" },
              { number: "90%", label: "Pass Rate" },
              { number: "100+", label: "Scholarships Awarded" },
              { number: "1000+", label: "Digital Skills Training" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our students who have achieved remarkable success through our programs.
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/success-stories">Read Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4">Support Education</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help us continue providing quality education and support to students in need. 
              Your contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/donate">Make a Donation</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/get-involved">Volunteer as a Tutor</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EducationInitiatives;
