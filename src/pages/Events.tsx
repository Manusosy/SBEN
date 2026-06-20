import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/supabase';

const isEventPast = (date: string): boolean => {
  const eventDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
};

interface EventCardProps {
  event: Event;
  index: number;
  past?: boolean;
}

const EventCard = ({ event, index, past = false }: EventCardProps) => (
  <motion.div
    key={event.id}
    className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col group transition-shadow duration-300 ${
      past ? 'border-gray-200 opacity-80 hover:opacity-100' : 'border-gray-100 hover:shadow-md'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Event Banner */}
    <div className="h-48 overflow-hidden bg-gray-100 relative">
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${past ? '' : 'group-hover:scale-105'}`}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center p-6 text-center text-white ${
          past
            ? 'bg-gradient-to-br from-gray-400 to-gray-600'
            : 'bg-gradient-to-br from-primary/80 to-primary-800'
        }`}>
          <div className="space-y-2">
            <Calendar className="w-10 h-10 mx-auto opacity-80" />
            <p className="font-bold text-lg leading-tight truncate max-w-[240px]">{event.title}</p>
          </div>
        </div>
      )}

      {/* Status badges */}
      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
        {event.category || 'Event'}
      </span>

      {past && (
        <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
          <span className="bg-gray-800/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            Completed
          </span>
        </div>
      )}
    </div>

    {/* Event Details */}
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <h3 className={`text-xl font-bold leading-snug line-clamp-1 mb-2 transition-colors ${
          past ? 'text-gray-600' : 'text-gray-900 group-hover:text-primary'
        }`}>
          {event.title}
        </h3>
        <div
          className="text-gray-600 text-sm mb-6 line-clamp-3 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: event.description || '' }}
        />
      </div>

      <div className="space-y-3.5 border-t pt-4 border-gray-100">
        <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 flex-shrink-0 ${past ? 'text-gray-400' : 'text-primary'}`} />
            <span className="font-medium text-gray-700">
              {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 flex-shrink-0 ${past ? 'text-gray-400' : 'text-primary'}`} />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 flex-shrink-0 ${past ? 'text-gray-400' : 'text-primary'}`} />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button
            className={`w-full flex items-center justify-center gap-1.5 ${
              past ? 'variant-outline text-gray-600 border-gray-300 bg-gray-50 hover:bg-gray-100' : ''
            }`}
            variant={past ? 'outline' : 'default'}
            asChild
          >
            <Link to={`/resources/events/${event.id}`}>
              {past ? 'View Summary' : 'View Event & RSVP'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')
          .order('date', { ascending: false });

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

  const upcomingEvents = events.filter((e) => !isEventPast(e.date));
  const pastEvents = events.filter((e) => isEventPast(e.date));

  return (
    <PageLayout>
      <PageHero
        title="Events"
        description="Join us in making a difference in our community. Attend our workshops, outreach programs, and community gatherings."
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.42.38 PM.jpeg"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">No Events Yet</h3>
              <p className="text-gray-500 mt-2">We don't have any scheduled events at the moment. Please check back soon!</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto space-y-16">

              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Reserve your spot — spaces are limited.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} past={false} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-gray-300 rounded-full" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-700">Past Events</h2>
                      <p className="text-sm text-gray-400 mt-0.5">Events that have already taken place.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} past={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* If only past events exist, show a notice */}
              {upcomingEvents.length === 0 && pastEvents.length > 0 && (
                <div className="text-center py-6 bg-blue-50 border border-blue-100 rounded-lg mb-4 max-w-2xl mx-auto">
                  <Calendar className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                  <p className="text-blue-700 font-semibold text-sm">No upcoming events right now.</p>
                  <p className="text-blue-500 text-xs mt-1">Stay tuned — new events will be announced soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-20 bg-white border-t border-gray-100">
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
            Partner with us to organize community events and make a lasting impact in Kibera.
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
