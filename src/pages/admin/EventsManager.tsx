import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, MapPin, Save } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Event } from '@/types/supabase';

const EventsManager = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: 'Workshop',
        registration_link: '',
        status: 'draft',
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events' as any)
                .select('*')
                .order('date', { ascending: true });

            if (error) throw error;
            setEvents((data as any[])?.map(item => item as Event) || []);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const eventData = { ...formData };

            if (editingEvent) {
                const { error } = await supabase
                    .from('events' as any)
                    .update(eventData)
                    .eq('id', editingEvent.id);

                if (error) throw error;
                toast({ title: 'Event updated successfully!' });
            } else {
                const { error } = await supabase
                    .from('events' as any)
                    .insert([eventData]);

                if (error) throw error;
                toast({ title: 'Event created successfully!' });
            }

            setDialogOpen(false);
            resetForm();
            fetchEvents();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            date: event.date,
            time: event.time || '',
            location: event.location || '',
            description: event.description || '',
            category: event.category || 'Workshop',
            registration_link: event.registration_link || '',
            status: event.status,
        });
        setDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const { error } = await supabase
                .from('events' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast({ title: 'Event deleted successfully!' });
            fetchEvents();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            category: 'Workshop',
            registration_link: '',
            status: 'draft',
        });
    };

    const handleNewEvent = () => {
        resetForm();
        setDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                        <p className="text-gray-600 mt-2">Manage upcoming workshops and community gatherings</p>
                    </div>
                    <Button onClick={handleNewEvent}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Event
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-xs text-gray-500">{event.category}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </span>
                                            {event.time && <span className="text-gray-500">{event.time}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {event.location && (
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <MapPin className="w-3 h-3" />
                                                {event.location}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : event.status === 'draft'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {event.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleEdit(event)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {events.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No events found. Create your first event!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingEvent ? 'Edit Event' : 'Create New Event'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Event Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Time</Label>
                                <Input
                                    placeholder="e.g. 2:00 PM - 5:00 PM"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. Workshop"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Registration Link (Optional)</Label>
                            <Input
                                value={formData.registration_link}
                                onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                <Save className="w-4 h-4 mr-2" />
                                {editingEvent ? 'Update' : 'Create'} Event
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default EventsManager;
