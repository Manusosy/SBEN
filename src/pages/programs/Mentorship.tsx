import { motion } from "framer-motion";
import { Users, Target, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const MentorshipProgram = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "One-on-One Guidance",
      description: "Personalized mentorship from experienced professionals"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goal Setting",
      description: "Support in setting and achieving personal and professional goals"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Skill Development",
      description: "Access to resources and workshops for skill enhancement"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Career Growth",
      description: "Career guidance and professional networking opportunities"
    }
  ];

  const testimonials = [
    {
      quote: "The mentorship program has been transformative for my career development.",
      author: "Sarah M.",
      role: "Program Graduate"
    },
    {
      quote: "I gained invaluable insights and connections through this program.",
      author: "John D.",
      role: "Current Mentee"
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Mentorship Program - SBEN"
        description="Our mentorship program provides guidance and support for youth development through one-on-one mentoring, skills development, and leadership training."
        keywords={['mentorship', 'youth development', 'leadership', 'education', 'skills development']}
      />

      <PageHero
        title="Mentorship Program"
        description="Guidance and support for youth"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM (3).jpeg"
      />

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Program Benefits
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              About the Program
            </motion.h2>
            <motion.div
              className="prose prose-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Our mentorship program pairs experienced professionals with ambitious individuals looking to advance their careers and personal development. Through structured guidance and support, mentees gain valuable insights, develop new skills, and build lasting professional relationships.
              </p>
              <p>
                The program runs for 6 months, with regular one-on-one sessions, group workshops, and networking events. Mentors are carefully selected based on their expertise and commitment to nurturing the next generation of leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Success Stories
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-gray-50 p-8 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-lg italic mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
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
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join our mentorship program and take the next step in your personal and professional development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Apply Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MentorshipProgram;
