import { motion } from "framer-motion";
import { Users, BookOpen, Target, Award } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SEO from '@/components/SEO';

const MentorshipProgram = () => {
  const programFeatures = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "One-on-One Mentoring",
      description: "Personalized guidance from experienced mentors who understand the local context and challenges."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Skills Development",
      description: "Focus on academic, professional, and life skills essential for personal growth."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goal Setting",
      description: "Support in setting and achieving educational and career objectives."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Leadership Training",
      description: "Developing future community leaders through practical experience and guidance."
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
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />

      {/* Program Overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6">Program Overview</h2>
              <p className="text-muted-foreground mb-4">
                Our mentorship program is designed to empower young people in Kibera through 
                meaningful relationships with experienced mentors who provide guidance, support, 
                and opportunities for personal growth.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe that every young person deserves access to positive role models 
                and the support needed to achieve their full potential.
              </p>
              <Button asChild>
                <Link to="/get-involved">Become a Mentor</Link>
              </Button>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {programFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg shadow-sm"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Program Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mentorship program has made significant strides in youth development and community empowerment.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { number: "200+", label: "Youth Mentored" },
              { number: "85%", label: "Program Completion Rate" },
              { number: "90%", label: "Mentee Satisfaction" }
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

      {/* Get Involved CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4">Make a Difference</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're interested in becoming a mentor or supporting our program, 
              there are many ways to get involved and make a positive impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/get-involved">Become a Mentor</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/donate">Support the Program</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MentorshipProgram;
