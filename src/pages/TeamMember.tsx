import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const teamMembers = [
  {
    name: "Veronica Juma",
    role: "Founder and Director",
    image: "/team/veronicajuma.jpg",
    bio: "Veronica is the visionary leader behind SBEN, dedicated to creating a resilient and empowered community in Kibera.",
    experience: "5+ years in community development and non-profit management.",
    email: "veronica@shinebridgeempowermentnetwork.org",
  },
  {
    name: "Amos Ouma",
    role: "Co-founder and Programs Manager",
    image: "/team/amosouma.jpg",
    bio: "Amos oversees the planning and implementation of our diverse programs, ensuring they meet the community's needs.",
    experience: "5+ years in program management and community outreach.",
    email: "amos@shinebridgeempowermentnetwork.org",
  },
  {
    name: "Michael Ouma",
    role: "Programs Coordinator",
    image: "/team/michaelouma.jpg",
    bio: "Michael coordinates the day-to-day activities of our programs, working closely with community members.",
    experience: "5+ years in project coordination and fieldwork.",
    email: "michael@shinebridgeempowermentnetwork.org",
  },
  {
    name: "Edmond Bwire",
    role: "Field Officer",
    image: "/team/edmondbwire.jpg",
    bio: "Edmond is our on-the-ground presence, connecting with the community and ensuring our programs are effective.",
    experience: "3+ years in community engagement and support.",
    email: "edmond@shinebridgeempowermentnetwork.org"
  },
];

const TeamMember = () => {
  const { name } = useParams();
  const { toast } = useToast();
  const member = teamMembers.find(m => m.name.toLowerCase().replace(/ /g, '-') === name);

  if (!member) {
    return <div>Team member not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: `Your message to ${member.name} has been sent.`,
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src={member.image} alt={member.name} className="rounded-lg shadow-lg w-full" />
            <h1 className="text-4xl font-bold mt-6">{member.name}</h1>
            <p className="text-primary text-xl">{member.role}</p>
            <p className="mt-4 text-gray-600">{member.bio}</p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Experience</h3>
              <p className="text-gray-600">{member.experience}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="text-gray-600">Email: <a href={`mailto:${member.email}`} className="text-primary">{member.email}</a></p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Contact {member.name}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <Input id="yourName" required placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <Input id="yourEmail" type="email" required placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea id="message" required placeholder={`Your message for ${member.name}...`} className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TeamMember;
