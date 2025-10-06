import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

const SuccessStories = () => {
  const stories = [
    {
      name: "Sarah Kamau",
      program: "Mentorship Program",
      image: "/lovable-uploads/success-story-1.jpg",
      quote: "Through SBEN's mentorship program, I gained the confidence and skills to start my own business. Today, I'm not just supporting myself but creating opportunities for others in my community.",
      achievement: "Founded a successful social enterprise"
    },
    {
      name: "John Omondi",
      program: "Education Initiative",
      image: "/lovable-uploads/success-story-2.jpg",
      quote: "The educational support from SBEN helped me complete my studies when I thought it was impossible. Now I'm pursuing my dream career in technology.",
      achievement: "Graduated top of class in Computer Science"
    },
    {
      name: "Mary Wanjiku",
      program: "Leadership Development",
      image: "/lovable-uploads/success-story-3.jpg",
      quote: "SBEN's leadership program transformed my perspective on community service. I learned that true leadership is about empowering others to achieve their potential.",
      achievement: "Community leader impacting over 1000 youth"
    }
  ];

  const impactStats = [
    { number: "500+", label: "Success Stories" },
    { number: "80%", label: "Employment Rate" },
    { number: "90%", label: "Program Completion" },
    { number: "70%", label: "Started Own Ventures" }
  ];

  return (
    <PageLayout>
      <PageHero
        title="Success Stories"
        description="Real stories of transformation and achievement"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.27.50 PM (1).jpeg"
      />

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-4xl mx-auto">
            {stories.map((story, index) => (
              <motion.div
                key={story.name}
                className="grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={index % 2 === 0 ? "order-1 md:order-1" : "order-1 md:order-2"}>
                  <img
                    src={story.image}
                    alt={story.name}
                    className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                  />
                </div>
                <div className={index % 2 === 0 ? "order-2 md:order-2" : "order-2 md:order-1"}>
                  <Quote className="w-10 h-10 text-primary mb-4" />
                  <p className="text-lg text-gray-600 italic mb-6">{story.quote}</p>
                  <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                  <p className="text-primary mb-2">{story.program}</p>
                  <p className="text-sm text-gray-500">{story.achievement}</p>
                </div>
              </motion.div>
            ))}
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
            Write Your Success Story
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join our programs and become part of our growing community of achievers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link to="/programs">Explore Programs</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SuccessStories;
