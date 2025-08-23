import { motion } from "framer-motion";
import { Award, Users, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';

const LeadershipDevelopment = () => {
  const programs = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Youth Leadership",
      description: "Developing tomorrow's leaders today"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Team Building",
      description: "Collaborative leadership skills"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Strategic Planning",
      description: "Vision and goal setting"
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Personal Growth",
      description: "Individual development plans"
    }
  ];

  const skillsets = [
    {
      title: "Communication",
      skills: ["Public Speaking", "Active Listening", "Conflict Resolution"]
    },
    {
      title: "Management",
      skills: ["Project Management", "Team Leadership", "Decision Making"]
    },
    {
      title: "Strategy",
      skills: ["Vision Development", "Strategic Planning", "Problem Solving"]
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Leadership Development - SBEN"
        description="Cultivating effective leaders through comprehensive leadership development programs, mentoring, and practical experience."
        keywords={['leadership development', 'youth leadership', 'team building', 'strategic planning']}
      />

      <PageHero
        title="Leadership Development"
        description="Cultivating effective leaders for tomorrow"
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Leadership Programs
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                className="bg-gray-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">{program.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Development */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Core Leadership Skills
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillsets.map((skillset, index) => (
              <motion.div
                key={skillset.title}
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{skillset.title}</h3>
                <ul className="space-y-2">
                  {skillset.skills.map((skill) => (
                    <li key={skill} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
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
              Program Overview
            </motion.h2>
            <motion.div
              className="prose prose-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Our leadership development program is designed to nurture and develop effective leaders who can drive positive change in their communities. Through a combination of workshops, mentoring, and practical experience, participants develop essential leadership skills and qualities.
              </p>
              <p>
                The program focuses on both personal and professional development, ensuring participants are well-equipped to take on leadership roles in various contexts.
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
            Develop Your Leadership Potential
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join our leadership development program and become the leader you aspire to be.
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

export default LeadershipDevelopment;
