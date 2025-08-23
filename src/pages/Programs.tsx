import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { programs } from "@/data/programs";
import PageHero from "@/components/PageHero";

export default function Programs() {
  return (
    <PageLayout>
      <SEO 
        title="SBEN Programs - Community Development Initiatives"
        description="Explore SBEN's comprehensive programs in education, youth development, women empowerment, and more."
        keywords={['women empowerment', 'youth development', 'gender equality', 'digital literacy', 'education support']}
      />

      <PageHero
        title="Our Programs"
        description="Comprehensive initiatives designed to create lasting positive change in our community"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (3).jpeg"
      />

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {program.shortDescription}
                    </p>
                    <Link
                      to={`/programs/${program.id}`}
                      className="text-primary hover:text-primary/90 font-medium flex items-center justify-center"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join us in our mission to create positive change in our community. Together, we can build a better future for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved">
                <Button size="lg" variant="default">
                  Get Involved
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline">
                  Support Our Work
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
