import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/supabase';
import { Calendar, MapPin, Clock, Image as ImageIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import MediaPicker from './MediaPicker';
import RichTextEditor from './RichTextEditor';

interface EventWizardProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Event | null;
    onSaveSuccess: () => void;
}

const categories = [
    'Workshop',
    'Seminar',
    'Community Outreach',
    'Fundraiser',
    'General Meeting',
    'Training',
];

export default function EventWizard({ open, onOpenChange, event, onSaveSuccess }: EventWizardProps) {
    const [step, setStep] = useState(1);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<Event>>({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: 'Workshop',
        registration_link: '',
        image_url: null,
        status: 'draft',
    });

    useEffect(() => {
        if (open) {
            if (event) {
                setFormData({
                    title: event.title,
                    date: event.date,
                    time: event.time || '',
                    location: event.location || '',
                    description: event.description || '',
                    category: event.category || 'Workshop',
                    registration_link: event.registration_link || '',
                    image_url: event.image_url || null,
                    status: event.status || 'draft',
                });
            } else {
                setFormData({
                    title: '',
                    date: '',
                    time: '',
                    location: '',
                    description: '',
                    category: 'Workshop',
                    registration_link: '',
                    image_url: null,
                    status: 'draft',
                });
            }
            setStep(1);
        }
    }, [open, event]);

    const handleNext = () => {
        if (step === 1 && !formData.title) {
            toast({ title: 'Please enter an event title', variant: 'destructive' });
            return;
        }
        if (step === 1 && !formData.date) {
            toast({ title: 'Please select a date', variant: 'destructive' });
            return;
        }
        setStep((prev) => Math.min(prev + 1, 4));
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleBannerSelect = (image: { image_url: string }) => {
        setFormData((prev) => ({ ...prev, image_url: image.image_url }));
        toast({ title: 'Banner selected successfully' });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                title: formData.title,
                date: formData.date,
                time: formData.time || null,
                location: formData.location || null,
                description: formData.description || null,
                category: formData.category || null,
                registration_link: formData.registration_link || null,
                image_url: formData.image_url || null,
                status: formData.status || 'draft',
            };

            if (event?.id) {
                const { error } = await supabase
                    .from('events')
                    .update(payload)
                    .eq('id', event.id);

                if (error) throw error;
                toast({ title: 'Event updated successfully' });
            } else {
                const { error } = await supabase
                    .from('events')
                    .insert([payload]);

                if (error) throw error;
                toast({ title: 'Event created successfully' });
            }

            onSaveSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="p-6 border-b border-gray-100 bg-white">
                    <DialogTitle className="text-xl font-bold flex items-center justify-between">
                        <span>{event ? 'Edit Event Wizard' : 'Create Event Wizard'}</span>
                        <span className="text-sm font-normal text-gray-500 mr-6">
                            Step {step} of 4
                        </span>
                    </DialogTitle>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </DialogHeader>

                {/* Step Contents */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-5 max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Step 1: Basic Event Details</h3>

                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-bold text-gray-700">EVENT TITLE *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter a descriptive title"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-bold text-gray-700">CATEGORY *</Label>
                                    <Select
                                        value={formData.category || 'Workshop'}
                                        onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-sm font-bold text-gray-700">DATE *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="time" className="text-sm font-bold text-gray-700">TIME (Optional)</Label>
                                    <Input
                                        id="time"
                                        placeholder="e.g. 10:00 AM - 1:00 PM"
                                        value={formData.time || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-bold text-gray-700">LOCATION (Optional)</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g. Kibera Community Center"
                                        value={formData.location || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Media */}
                    {step === 2 && (
                        <div className="space-y-5 max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 text-left">Step 2: Event Banner (Canva Banner)</h3>

                            <div className="py-4">
                                {formData.image_url ? (
                                    <div className="space-y-4">
                                        <div className="relative w-full max-h-72 overflow-hidden bg-gray-100 border border-gray-200" style={{ borderRadius: 7 }}>
                                            <img
                                                src={formData.image_url}
                                                alt="Event Banner Preview"
                                                className="w-full h-auto object-contain max-h-72 mx-auto"
                                            />
                                        </div>
                                        <div className="flex justify-center gap-3">
                                            <Button variant="outline" onClick={() => setIsMediaPickerOpen(true)}>
                                                Change Banner
                                            </Button>
                                            <Button variant="destructive" onClick={() => setFormData((prev) => ({ ...prev, image_url: null }))}>
                                                Remove Banner
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => setIsMediaPickerOpen(true)}
                                        className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 bg-gray-50 transition-colors"
                                        style={{ borderRadius: 7 }}
                                    >
                                        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                                        <p className="text-base text-gray-600 font-semibold">Select Event Canva Banner</p>
                                        <p className="text-sm text-gray-400 mt-1">Select from media library or upload a new one</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Description */}
                    {step === 3 && (
                        <div className="space-y-5 max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Step 3: Event Description & Details</h3>
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700 block mb-2">DESCRIPTION</Label>
                                <RichTextEditor
                                    content={formData.description || ''}
                                    onChange={(val) => setFormData((prev) => ({ ...prev, description: val }))}
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Review & Publish */}
                    {step === 4 && (
                        <div className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Step 4: Review & Publish</h3>

                            {/* Event Preview Summary */}
                            <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50 space-y-4">
                                {formData.image_url && (
                                    <div className="w-full h-40 overflow-hidden bg-gray-100 rounded-md border border-gray-100">
                                        <img
                                            src={formData.image_url}
                                            alt="Banner Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary/10">
                                        {formData.category}
                                    </span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2">{formData.title}</h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600 border-t border-b py-3 border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{formData.date ? new Date(formData.date).toLocaleDateString() : 'No date set'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{formData.time || 'No time set'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="truncate">{formData.location || 'No location set'}</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description Preview</p>
                                    <div
                                        className="text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: formData.description || 'No description provided.' }}
                                    />
                                </div>
                            </div>

                            {/* Status / Publish Options */}
                            <div className="border-t pt-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-sm font-bold text-gray-700">PUBLISH IMMEDIATELY</Label>
                                        <p className="text-xs text-gray-500">Enable to make the event visible to the public immediately.</p>
                                    </div>
                                    <Switch
                                        checked={formData.status === 'published'}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, status: checked ? 'published' : 'draft' }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer controls */}
                <DialogFooter className="p-4 border-t border-gray-100 bg-white flex items-center justify-between sm:justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        disabled={step === 1 || saving}
                        className="flex items-center gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={saving}
                        >
                            Cancel
                        </Button>

                        {step < 4 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-1"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-1"
                            >
                                {saving ? 'Saving...' : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {event ? 'Update Event' : 'Publish Event'}
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>

            <MediaPicker
                open={isMediaPickerOpen}
                onOpenChange={setIsMediaPickerOpen}
                onSelect={handleBannerSelect}
            />
        </Dialog>
    );
}
