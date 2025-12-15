import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/supabase';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events' as any)
          .select('*')
          .eq('status', 'published')
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents((data as unknown as Event[]) || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Upcoming Events"
        description="Join us in making a difference in our community"
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.42.38 PM.jpeg"
      />

      {/* Events List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No upcoming events at the moment. Check back soon!</div>
            ) : (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{event.title}</h3>
                      <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {event.category || 'Event'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      {event.registration_link ? (
                        <Button asChild>
                          <a href={event.registration_link} target="_blank" rel="noopener noreferrer">Register Now</a>
                        </Button>
                      ) : (
                        <Button asChild>
                          <Link to="/contact?event=register">Register Now</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
