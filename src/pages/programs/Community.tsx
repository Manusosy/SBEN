import { motion } from "framer-motion";
import { Heart, Home, Lightbulb, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const CommunityDevelopment = () => {
  const initiatives = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Community Support",
      description: "Empowering local initiatives and groups"
    },
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: "Infrastructure Development",
      description: "Improving community facilities"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation Programs",
      description: "Supporting local entrepreneurship"
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary" />,
      title: "Sustainable Growth",
      description: "Building lasting positive change"
    }
  ];

  const projects = [
    {
      title: "Youth Center Development",
      description: "Creating safe spaces for youth engagement and development",
      status: "Ongoing"
    },
    {
      title: "Community Library",
      description: "Establishing resource centers for learning",
      status: "Completed"
    },
    {
      title: "Skills Training Center",
      description: "Vocational training facilities for community members",
      status: "Planning"
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Community Development - SBEN"
        description="Building stronger communities through sustainable development initiatives, infrastructure improvement, and environmental conservation projects."
        keywords={['community development', 'infrastructure', 'sustainability', 'environmental conservation']}
      />

      <PageHero
        title="Community Development"
        description="Building stronger communities"
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
            Our Initiatives
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

      {/* Current Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Current Projects
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <span className={
                  "text-sm font-medium px-3 py-1 rounded-full " +
                  (project.status === "Ongoing" ? "bg-blue-100 text-blue-700" :
                   project.status === "Completed" ? "bg-green-100 text-green-700" :
                   "bg-yellow-100 text-yellow-700")
                }>
                  {project.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Get Involved
            </motion.h2>
            <motion.div
              className="prose prose-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>
                There are many ways to contribute to our community development initiatives. Whether through volunteering, donations, or partnerships, your support helps us create lasting positive change in our communities.
              </p>
              <p>
                Join us in building stronger, more resilient communities that empower every individual to thrive and succeed.
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
            Support Our Community Initiatives
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us continue building stronger communities through sustainable development.
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

export default CommunityDevelopment;
