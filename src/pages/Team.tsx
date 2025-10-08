import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

const Team = () => {
  const teamMembers = [
    {
      name: "Veronica Juma",
      role: "Founder and Director",
      image: "/team/veronicajuma.jpg",
      bio: "Veronica is the visionary leader behind SBEN, dedicated to creating a resilient and empowered community in Kibera.",
    },
    {
      name: "Amos Ouma",
      role: "Co-founder and Programs Manager",
      image: "/team/amosouma.jpg",
      bio: "Amos oversees the planning and implementation of our diverse programs, ensuring they meet the community's needs.",
    },
    {
      name: "Michael Ouma",
      role: "Programs Coordinator",
      image: "/team/michaelouma.jpg",
      bio: "Michael coordinates the day-to-day activities of our programs, working closely with community members.",
    },
    {
      name: "Edmond Bwire",
      role: "Field Officer",
      image: "/team/edmondbwire.jpg",
      bio: "Edmond is our on-the-ground presence, connecting with the community and ensuring our programs are effective.",
    },
    {
      name: "Mitshel Agutu",
      role: "Volunteer",
      image: "/team/mitshelagutu.jpg",
      bio: "Mitshel is a dedicated volunteer who brings her passion and skills to support our various initiatives.",
    },
    {
      name: "Ruth Akinyi",
      role: "Volunteer",
      image: "/team/ruthakinyi.jpg",
      bio: "Ruth is a committed volunteer who plays a vital role in the success of our community outreach efforts.",
    },
  ];

  return (
    <PageLayout>
      <PageHero
        title="Our Team"
        description="Meet the passionate individuals behind SBEN"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.13.45 PM.jpeg"
      />

      {/* Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Link to={`/team/${member.name.toLowerCase().replace(/ /g, '-')}`} key={member.name}>
                <motion.div
                  className="bg-white rounded-lg shadow-sm overflow-hidden relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.role}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-75 text-white p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-center">{member.bio}</p>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join Our Team
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We're always looking for passionate individuals who want to make a difference in their community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Team;
