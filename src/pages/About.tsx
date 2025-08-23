import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export const About = () => {
  return (
    <PageLayout>
      <SEO 
        title="About SBEN - Our Mission and Vision"
        description="Learn about Shine Bridge Empowerment Network (SBEN) and our mission to empower communities in Kibera through education, healthcare, and sustainable development."
        keywords={['about SBEN', 'community development', 'Kibera', 'mission', 'vision', 'values']}
      />
      
      <PageHero
        title="About SBEN"
        description="Building bridges to dignity, equity, and sustainable development through education, healthcare, and empowerment in Kibera."
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg"
      />

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To create a resilient, empowered, and inclusive community where every individual, 
                especially the vulnerable, have access to quality education, healthcare, equal opportunities, 
                and a safe, sustainable environment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower vulnerable members of the Kibera community through education support, 
                girl-child protection, healthcare initiatives, and environmental conservation, 
                building bridges to dignity, equity, and sustainable development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Focus Areas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Education Support",
                description: "Providing access to quality education and digital literacy training for community members."
              },
              {
                title: "Women Empowerment",
                description: "Supporting women through savings groups and small business training initiatives."
              },
              {
                title: "Youth Development",
                description: "Offering mentorship programs and skills training for youth empowerment."
              },
              {
                title: "Healthcare Initiatives",
                description: "Facilitating access to essential health services and wellness programs."
              },
              {
                title: "Environmental Conservation",
                description: "Leading community-based climate action and conservation projects."
              },
              {
                title: "Girl-Child Protection",
                description: "Creating safe spaces and opportunities for girls in the community."
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <h3 className="text-lg font-medium mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Integrity", "Empowerment", "Inclusivity", "Sustainability", "Collaboration"].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <p className="font-medium">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              Help us create positive change in the Kibera community
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
