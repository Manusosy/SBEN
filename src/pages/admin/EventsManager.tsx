import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, MapPin, Users, ClipboardList, ChevronRight } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Event, EventRegistration } from '@/types/supabase';
import EventWizard from '@/components/admin/EventWizard';

type View = 'list' | 'create' | 'edit';

const EventsManager = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<View>('list');
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    // RSVPs states
    const [selectedEventForRsvps, setSelectedEventForRsvps] = useState<Event | null>(null);
    const [rsvps, setRsvps] = useState<EventRegistration[]>([]);
    const [rsvpsLoading, setRsvpsLoading] = useState(false);
    const [rsvpsDialogOpen, setRsvpsDialogOpen] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });

            if (error) throw error;
            setEvents((data as any[])?.map(item => item as Event) || []);
        } catch (error: any) {
            toast({
                title: 'Error loading events',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setView('edit');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNewEvent = () => {
        setEditingEvent(null);
        setView('create');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWizardCancel = () => {
        setView('list');
        setEditingEvent(null);
    };

    const handleWizardSaveSuccess = () => {
        fetchEvents();
        setView('list');
        setEditingEvent(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event? This will also delete any related RSVPs.')) return;

        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast({ title: '✓ Event deleted successfully' });
            fetchEvents();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const handleViewRsvps = async (event: Event) => {
        setSelectedEventForRsvps(event);
        setRsvpsDialogOpen(true);
        setRsvpsLoading(true);
        try {
            const { data, error } = await supabase
                .from('event_registrations')
                .select('*')
                .eq('event_id', event.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRsvps((data as any[])?.map(item => item as EventRegistration) || []);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'Failed to fetch registrations: ' + error.message,
                variant: 'destructive',
            });
        } finally {
            setRsvpsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 max-w-7xl mx-auto pb-12">

                {/* ─── List View ─── */}
                {view === 'list' && (
                    <>
                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                                <p className="text-gray-500 mt-1 text-sm">
                                    Manage workshops, community gatherings, and view registrations.
                                </p>
                            </div>
                            <Button
                                onClick={handleNewEvent}
                                className="bg-[#000080] hover:bg-[#000080]/90 text-white flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                New Event
                            </Button>
                        </div>

                        {/* Events Table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000080]" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 hover:bg-gray-50/80">
                                            <TableHead className="font-bold text-gray-700">Event</TableHead>
                                            <TableHead className="font-bold text-gray-700">Date & Time</TableHead>
                                            <TableHead className="font-bold text-gray-700">Location</TableHead>
                                            <TableHead className="font-bold text-gray-700">Status</TableHead>
                                            <TableHead className="font-bold text-gray-700 text-right pr-6">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {events.map((event) => (
                                            <TableRow key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        {event.image_url ? (
                                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                                                                <img
                                                                    src={event.image_url}
                                                                    alt={event.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-[#000080]/10 border border-[#000080]/10 flex items-center justify-center flex-shrink-0">
                                                                <Calendar className="w-5 h-5 text-[#000080]" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-bold text-gray-900 leading-tight">{event.title}</div>
                                                            {event.category && (
                                                                <div className="text-xs text-[#000080] mt-0.5 font-semibold uppercase tracking-wider">
                                                                    {event.category}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex flex-col text-sm">
                                                        <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                            {new Date(event.date + 'T00:00:00').toLocaleDateString(undefined, {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                        {event.time && (
                                                            <span className="text-gray-500 text-xs mt-1 ml-5">{event.time}</span>
                                                        )}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {event.location ? (
                                                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                                                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                            <span className="truncate max-w-[160px]">{event.location}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-300 text-sm">—</span>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                                                            event.status === 'published'
                                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                                : event.status === 'draft'
                                                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                        }`}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="text-right pr-6">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleViewRsvps(event)}
                                                            className="flex items-center gap-1 text-xs h-8"
                                                            title="View RSVPs"
                                                        >
                                                            <Users className="w-3.5 h-3.5" />
                                                            RSVPs
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => handleEdit(event)}
                                                            className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                            title="Edit Event"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => handleDelete(event.id)}
                                                            className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                                                            title="Delete Event"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {events.length === 0 && !loading && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-16 text-gray-500">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <ClipboardList className="w-10 h-10 text-gray-300" />
                                                        <p className="font-semibold text-gray-700">No events yet</p>
                                                        <p className="text-sm text-gray-400">
                                                            Click <strong>New Event</strong> to create your first event.
                                                        </p>
                                                        <Button
                                                            onClick={handleNewEvent}
                                                            className="mt-2 bg-[#000080] hover:bg-[#000080]/90 text-white"
                                                            size="sm"
                                                        >
                                                            <Plus className="w-4 h-4 mr-1" />
                                                            Create First Event
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </>
                )}

                {/* ─── Create / Edit View ─── */}
                {(view === 'create' || view === 'edit') && (
                    <>
                        {/* Page header with breadcrumb context */}
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <button
                                    onClick={handleWizardCancel}
                                    className="hover:text-gray-900 font-medium transition-colors"
                                >
                                    Events
                                </button>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-gray-900 font-semibold">
                                    {view === 'create' ? 'Create New Event' : `Edit: ${editingEvent?.title}`}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {view === 'create' ? 'Create New Event' : 'Edit Event'}
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm">
                                {view === 'create'
                                    ? 'Use the wizard below to fill in event details step by step.'
                                    : 'Update the event details using the wizard below.'}
                            </p>
                        </div>

                        {/* Inline EventWizard */}
                        <EventWizard
                            event={editingEvent}
                            onSaveSuccess={handleWizardSaveSuccess}
                            onCancel={handleWizardCancel}
                        />
                    </>
                )}
            </div>

            {/* RSVPs Viewer Dialog */}
            <Dialog open={rsvpsDialogOpen} onOpenChange={setRsvpsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col p-6">
                    <DialogHeader className="border-b pb-4 mb-4">
                        <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#000080]" />
                            <span>RSVPs: {selectedEventForRsvps?.title}</span>
                        </DialogTitle>
                        <DialogDescription className="mt-1">
                            List of registered participants for this event.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto">
                        {rsvpsLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000080]" />
                            </div>
                        ) : rsvps.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <Users className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                                <p className="font-medium text-gray-700">No RSVPs yet</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    When participants register on the event page, they will appear here.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold text-gray-700">Name</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Email</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Registered</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rsvps.map((rsvp) => (
                                        <TableRow key={rsvp.id}>
                                            <TableCell className="font-medium text-gray-900">{rsvp.name}</TableCell>
                                            <TableCell className="text-gray-600">
                                                <a href={`mailto:${rsvp.email}`} className="hover:underline text-blue-600">
                                                    {rsvp.email}
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {rsvp.phone || <span className="text-gray-300">—</span>}
                                            </TableCell>
                                            <TableCell className="text-gray-500 text-xs">
                                                {new Date(rsvp.created_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    <div className="border-t pt-4 mt-4 flex justify-end">
                        <Button variant="outline" onClick={() => setRsvpsDialogOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default EventsManager;
