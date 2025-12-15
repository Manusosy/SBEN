import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, Heart, PiggyBank, Laptop, Coins, TreeDeciduous, Activity } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageHero from "@/components/PageHero";
import { supabase } from '@/integrations/supabase/client';
import { Program } from '@/types/supabase';

const iconMap: Record<string, any> = {
  GraduationCap,
  Heart,
  PiggyBank,
  Laptop,
  Coins,
  TreeDeciduous,
};

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs' as any)
          .select('*')
          .eq('status', 'published')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPrograms((data as unknown as Program[]) || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

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
            {loading ? (
              <div className="col-span-full text-center py-12">Loading programs...</div>
            ) : programs.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">No programs found.</div>
            ) : (
              programs.map((program, index) => {
                const Icon = iconMap[program.icon_name] || Activity;
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        {program.short_description}
                      </p>
                      <Link
                        to={`/programs/${program.slug}`}
                        className="text-primary hover:text-primary/90 font-medium flex items-center justify-center"
                      >
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              }))}
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
