import { motion } from "framer-motion";
import { Building, Home, Sprout, Heart } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from '@/components/SEO';

const CommunityDevelopment = () => {
  const initiatives = [
    {
      icon: <Building className="w-8 h-8 text-primary" />,
      title: "Infrastructure Improvement",
      description: "Working with local communities to improve basic infrastructure and living conditions."
    },
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: "Community Centers",
      description: "Creating safe spaces for learning, gathering, and community activities."
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary" />,
      title: "Environmental Projects",
      description: "Implementing sustainable practices and environmental conservation initiatives."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Health & Wellness",
      description: "Promoting community health through education and access to basic healthcare."
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
              <h2 className="text-3xl font-semibold">Community-Led Development</h2>
              <p className="text-muted-foreground">
                Our community development initiatives are built on the principle of empowering 
                local communities to lead their own development. We work closely with community 
                members to identify needs, develop solutions, and implement sustainable projects.
              </p>
              <p className="text-muted-foreground">
                Through participatory approaches and sustainable practices, we help create lasting 
                positive change that continues to benefit communities for generations to come.
              </p>
              <Button asChild>
                <Link to="/get-involved">Join Our Efforts</Link>
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
              Through collaborative efforts with local communities, we've achieved significant 
              improvements in quality of life and sustainable development.
            </p>
          </div>
          <div className="grid sm:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Community Projects" },
              { number: "5000+", label: "Lives Impacted" },
              { number: "15", label: "Partner Organizations" },
              { number: "100%", label: "Community Involvement" }
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

      {/* Project Showcase */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore some of our ongoing and completed community development projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Clean Water Initiative",
                description: "Improving access to clean water through sustainable water projects.",
                image: "/lovable-uploads/water-project.jpg"
              },
              {
                title: "Green Spaces Project",
                description: "Creating community gardens and recreational areas.",
                image: "/lovable-uploads/garden-project.jpg"
              },
              {
                title: "Community Center",
                description: "Building spaces for community gatherings and activities.",
                image: "/lovable-uploads/center-project.jpg"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-semibold mb-4">Support Our Communities</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us in building stronger, more resilient communities. Your support makes 
              these transformative projects possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/donate">Support a Project</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/get-involved">Volunteer</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CommunityDevelopment;
