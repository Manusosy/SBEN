import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle, ShieldCheck, CheckCircle2, CalendarX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/supabase';
import DOMPurify from 'dompurify';

const isEventPast = (date: string): boolean => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
};

export default function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    // RSVP Form States
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpEmail, setRsvpEmail] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
    const [rsvpSuccess, setRsvpSuccess] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        if (id) {
            fetchEvent();
        }
    }, [id]);

    const fetchEvent = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setEvent(data as any);
        } catch (error: any) {
            console.error('Error fetching event details:', error);
            toast({
                title: 'Error',
                description: 'Failed to load event details: ' + error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRsvpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rsvpName || !rsvpEmail) {
            toast({ title: 'Please fill in name and email', variant: 'destructive' });
            return;
        }

        setRsvpSubmitting(true);
        try {
            const { error } = await supabase
                .from('event_registrations')
                .insert([{
                    event_id: id,
                    name: rsvpName,
                    email: rsvpEmail,
                    phone: rsvpPhone || null,
                }]);

            if (error) throw error;
            setRsvpSuccess(true);
            toast({
                title: 'RSVP Confirmed!',
                description: 'Your spot has been reserved successfully.',
            });
        } catch (error: any) {
            toast({
                title: 'RSVP Failed',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setRsvpSubmitting(false);
        }
    };

    if (loading) {
        return (
            <PageLayout>
                <div className="flex justify-center items-center py-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
            </PageLayout>
        );
    }

    if (!event) {
        return (
            <PageLayout>
                <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                    <p className="text-gray-500 mb-8">The event you are looking for doesn't exist or has been removed.</p>
                    <Link to="/resources/events" className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </Link>
                </div>
            </PageLayout>
        );
    }

    // Sanitize event description
    const sanitizedDescription = DOMPurify.sanitize(event.description || '', {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img'
        ],
        ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class'],
    });

    return (
        <PageLayout>
            <div className="bg-gray-50 min-h-screen pt-24 pb-20">

                {/* Breadcrumb Navigation */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <Link
                        to="/resources/events"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to All Events
                    </Link>
                </div>

                {/* Canva Banner Top Header - Full Width Banner layout */}
                {event.image_url && (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                        <div className="relative w-full h-64 sm:h-96 md:h-[400px] overflow-hidden bg-gray-100 border border-gray-200" style={{ borderRadius: 10 }}>
                            <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left/Middle Columns: Event Details */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 sm:p-8 border border-gray-100 shadow-sm" style={{ borderRadius: 8 }}>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary/10">
                                        {event.category || 'Event'}
                                    </span>
                                    {isEventPast(event.date) && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-white bg-gray-600 px-2.5 py-1 rounded flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Completed
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{event.title}</h1>

                                {/* Meta details strip */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b py-4 border-gray-100 my-6 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-gray-900">Date</p>
                                            <p className="text-gray-500 text-xs mt-0.5">
                                                {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-gray-900">Time</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{event.time || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-gray-900">Location</p>
                                            <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[150px]">{event.location || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Rich text description */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs text-gray-400">About the Event</h3>
                                    <div
                                        className="prose prose-lg max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-gray-900"
                                        dangerouslySetInnerHTML={{ __html: sanitizedDescription || '<p className="text-gray-500 italic">No details provided.</p>' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: RSVP / Register Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 border border-gray-100 shadow-sm sticky top-28" style={{ borderRadius: 8 }}>
                                {isEventPast(event.date) ? (
                                    /* Past event — show "event ended" panel */
                                    <div className="text-center py-6 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                                            <CalendarX className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-700">This Event Has Ended</h3>
                                            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                                Registration for this event is now closed. Check out our upcoming events!
                                            </p>
                                        </div>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link to="/resources/events">View Upcoming Events</Link>
                                        </Button>
                                    </div>
                                ) : !rsvpSuccess ? (
                                    <form onSubmit={handleRsvpSubmit} className="space-y-4">
                                        <div className="text-center pb-2 mb-2 border-b border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-900">Confirm Attendance</h3>
                                            <p className="text-xs text-gray-500 mt-1">Reserve your spot and get updates about this event.</p>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="rsvp-name" className="text-xs font-bold text-gray-700 uppercase">Your Name *</Label>
                                            <Input
                                                id="rsvp-name"
                                                placeholder="John Doe"
                                                required
                                                value={rsvpName}
                                                onChange={(e) => setRsvpName(e.target.value)}
                                                disabled={rsvpSubmitting}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="rsvp-email" className="text-xs font-bold text-gray-700 uppercase">Email Address *</Label>
                                            <Input
                                                id="rsvp-email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                value={rsvpEmail}
                                                onChange={(e) => setRsvpEmail(e.target.value)}
                                                disabled={rsvpSubmitting}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="rsvp-phone" className="text-xs font-bold text-gray-700 uppercase">Phone Number</Label>
                                            <Input
                                                id="rsvp-phone"
                                                type="tel"
                                                placeholder="e.g. +254 712 345678"
                                                value={rsvpPhone}
                                                onChange={(e) => setRsvpPhone(e.target.value)}
                                                disabled={rsvpSubmitting}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full mt-4 bg-primary hover:bg-primary/95 text-white py-6"
                                            disabled={rsvpSubmitting}
                                        >
                                            {rsvpSubmitting ? 'Confirming...' : 'RSVP & Confirm Spot'}
                                        </Button>

                                        <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 mt-3">
                                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                                            <span>Your information is protected by our Privacy Policy.</span>
                                        </p>
                                    </form>
                                ) : (
                                    <div className="text-center py-6 space-y-4">
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
                                        <h3 className="text-xl font-bold text-gray-900">Attendance Confirmed!</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Thank you, <strong>{rsvpName}</strong>. Your registration for <strong>{event.title}</strong> is confirmed.
                                        </p>
                                        <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t">
                                            We have sent confirmation and details to your email <strong>{rsvpEmail}</strong>.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4"
                                            onClick={() => {
                                                setRsvpSuccess(false);
                                                setRsvpName('');
                                                setRsvpEmail('');
                                                setRsvpPhone('');
                                            }}
                                        >
                                            Register Another Person
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
