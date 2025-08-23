import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

const Events = () => {
  const upcomingEvents = [
    {
      title: "Youth Leadership Workshop",
      date: "September 15, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Nairobi Community Center",
      description: "A full-day workshop focused on developing leadership skills in young people.",
      category: "Workshop"
    },
    {
      title: "Community Education Forum",
      date: "September 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual Event",
      description: "Join us for an interactive discussion on the future of education in our communities.",
      category: "Forum"
    },
    {
      title: "Mentorship Program Orientation",
      date: "September 25, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "SBEN Headquarters",
      description: "Introduction session for new mentors and mentees joining our program.",
      category: "Orientation"
    }
  ];

  return (
    <PageLayout>
      <PageHero
        title="Upcoming Events"
        description="Join us in making a difference in our community"
        imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
      />

      {/* Events List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/contact?event=register">Register Now</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Want to Host an Event?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Partner with us to organize community events and make a lasting impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;
