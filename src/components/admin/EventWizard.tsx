import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/supabase';
import {
    Calendar,
    MapPin,
    Clock,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    Check,
    Plus,
    Tag,
    X,
    Link as LinkIcon,
    FileText,
    Eye,
    Loader2,
} from 'lucide-react';
import MediaPicker from './MediaPicker';
import RichTextEditor from './RichTextEditor';

interface EventCategory {
    id: string;
    name: string;
    created_at: string;
}

interface EventWizardProps {
    event: Event | null;
    onSaveSuccess: () => void;
    onCancel: () => void;
}

const STEPS = [
    { id: 1, label: 'Basic Details', icon: FileText },
    { id: 2, label: 'Banner Image', icon: ImageIcon },
    { id: 3, label: 'Description', icon: FileText },
    { id: 4, label: 'Review & Publish', icon: Eye },
];

export default function EventWizard({ event, onSaveSuccess, onCancel }: EventWizardProps) {
    const [step, setStep] = useState(1);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    // Category management
    const [categories, setCategories] = useState<EventCategory[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingCategory, setAddingCategory] = useState(false);
    const newCategoryInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Event>>({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: '',
        registration_link: '',
        image_url: null,
        status: 'draft',
    });

    // Load categories from Supabase
    useEffect(() => {
        fetchCategories();
    }, []);

    // Populate form when editing an event
    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                date: event.date,
                time: event.time || '',
                location: event.location || '',
                description: event.description || '',
                category: event.category || '',
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
                category: '',
                registration_link: '',
                image_url: null,
                status: 'draft',
            });
        }
        setStep(1);
    }, [event]);

    // Focus new category input when shown
    useEffect(() => {
        if (showAddCategory && newCategoryInputRef.current) {
            newCategoryInputRef.current.focus();
        }
    }, [showAddCategory]);

    const fetchCategories = async () => {
        setCategoriesLoading(true);
        try {
            const { data, error } = await supabase
                .from('event_categories')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            setCategories(data as EventCategory[] || []);

            // If no category selected yet and categories exist, pick the first
            if (!formData.category && data && data.length > 0) {
                setFormData((prev) => ({ ...prev, category: (data[0] as EventCategory).name }));
            }
        } catch (error: any) {
            toast({
                title: 'Could not load categories',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setCategoriesLoading(false);
        }
    };

    const handleAddCategory = async () => {
        const trimmed = newCategoryName.trim();
        if (!trimmed) return;

        setAddingCategory(true);
        try {
            const { data, error } = await supabase
                .from('event_categories')
                .insert([{ name: trimmed }])
                .select()
                .single();

            if (error) {
                if (error.code === '23505') {
                    toast({ title: 'Category already exists', variant: 'destructive' });
                } else {
                    throw error;
                }
                return;
            }

            toast({ title: `Category "${trimmed}" added!` });
            const newCat = data as EventCategory;
            setCategories((prev) => [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name)));
            setFormData((prev) => ({ ...prev, category: newCat.name }));
            setNewCategoryName('');
            setShowAddCategory(false);
        } catch (error: any) {
            toast({
                title: 'Failed to add category',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setAddingCategory(false);
        }
    };

    const handleNext = () => {
        if (step === 1 && !formData.title?.trim()) {
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
                toast({ title: '✓ Event updated successfully' });
            } else {
                const { error } = await supabase
                    .from('events')
                    .insert([payload]);

                if (error) throw error;
                toast({ title: '✓ Event created successfully' });
            }

            onSaveSuccess();
        } catch (error: any) {
            toast({
                title: 'Error saving event',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Breadcrumb & Cancel */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={onCancel}
                        className="hover:text-gray-900 transition-colors font-medium"
                    >
                        Events
                    </button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-semibold">
                        {event ? 'Edit Event' : 'Create New Event'}
                    </span>
                </div>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    title="Cancel"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Step Indicator */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 mx-12" />
                    <div
                        className="absolute top-5 left-0 h-0.5 bg-[#000080] mx-12 transition-all duration-500"
                        style={{ width: `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 0px)` }}
                    />

                    {STEPS.map((s) => {
                        const Icon = s.icon;
                        const isCompleted = step > s.id;
                        const isActive = step === s.id;
                        return (
                            <div key={s.id} className="flex flex-col items-center relative z-10">
                                <button
                                    onClick={() => s.id < step && setStep(s.id)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                                        isCompleted
                                            ? 'bg-[#000080] border-[#000080] text-white cursor-pointer'
                                            : isActive
                                            ? 'bg-white border-[#000080] text-[#000080]'
                                            : 'bg-white border-gray-200 text-gray-400'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Icon className="w-4 h-4" />
                                    )}
                                </button>
                                <span
                                    className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                                        isActive
                                            ? 'text-[#000080]'
                                            : isCompleted
                                            ? 'text-gray-600'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

                {/* ─── STEP 1: Basic Details ─── */}
                {step === 1 && (
                    <div className="p-6 space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-bold text-gray-900">Basic Event Details</h2>
                            <p className="text-sm text-gray-500 mt-1">Fill in the core information about your event.</p>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Event Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g. Women's Entrepreneurship Workshop"
                                value={formData.title || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                className="text-base"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Category <span className="text-red-500">*</span>
                            </Label>
                            {categoriesLoading ? (
                                <div className="flex items-center gap-2 text-gray-400 py-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Loading categories…</span>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {/* Category Grid */}
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, category: cat.name }))}
                                                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 flex items-center gap-1.5 ${
                                                    formData.category === cat.name
                                                        ? 'bg-[#000080] text-white border-[#000080] shadow-sm'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#000080] hover:text-[#000080]'
                                                }`}
                                            >
                                                {formData.category === cat.name && <Check className="w-3 h-3" />}
                                                {cat.name}
                                            </button>
                                        ))}

                                        {/* Add new category button */}
                                        {!showAddCategory && (
                                            <button
                                                type="button"
                                                onClick={() => setShowAddCategory(true)}
                                                className="px-3.5 py-1.5 rounded-full text-sm font-semibold border border-dashed border-gray-300 text-gray-400 hover:border-[#000080] hover:text-[#000080] transition-all duration-150 flex items-center gap-1.5"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Add Category
                                            </button>
                                        )}
                                    </div>

                                    {/* Inline Add Category Input */}
                                    {showAddCategory && (
                                        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                            <Tag className="w-4 h-4 text-[#000080] flex-shrink-0" />
                                            <input
                                                ref={newCategoryInputRef}
                                                type="text"
                                                placeholder="New category name…"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleAddCategory();
                                                    if (e.key === 'Escape') {
                                                        setShowAddCategory(false);
                                                        setNewCategoryName('');
                                                    }
                                                }}
                                                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={handleAddCategory}
                                                disabled={addingCategory || !newCategoryName.trim()}
                                                className="bg-[#000080] hover:bg-[#000080]/90 text-white h-7 px-3 text-xs"
                                            >
                                                {addingCategory ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Add'}
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddCategory(false);
                                                    setNewCategoryName('');
                                                }}
                                                className="text-gray-400 hover:text-gray-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Time <span className="text-gray-400 font-normal">(Optional)</span>
                                </Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="time"
                                        placeholder="e.g. 10:00 AM – 1:00 PM"
                                        value={formData.time || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Registration Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Location <span className="text-gray-400 font-normal">(Optional)</span>
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="location"
                                        placeholder="e.g. Kibera Community Center"
                                        value={formData.location || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reg_link" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Registration Link <span className="text-gray-400 font-normal">(Optional)</span>
                                </Label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <Input
                                        id="reg_link"
                                        placeholder="https://…"
                                        value={formData.registration_link || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, registration_link: e.target.value }))}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── STEP 2: Banner Image ─── */}
                {step === 2 && (
                    <div className="p-6 space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-bold text-gray-900">Event Banner</h2>
                            <p className="text-sm text-gray-500 mt-1">Upload or select a Canva banner from your media library.</p>
                        </div>

                        <div className="flex flex-col items-center justify-center py-4">
                            {formData.image_url ? (
                                <div className="w-full space-y-4">
                                    <div className="relative w-full max-h-80 overflow-hidden bg-gray-100 border border-gray-200 rounded-lg">
                                        <img
                                            src={formData.image_url}
                                            alt="Event Banner Preview"
                                            className="w-full h-auto object-contain max-h-80 mx-auto"
                                        />
                                        <button
                                            onClick={() => setFormData((prev) => ({ ...prev, image_url: null }))}
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-colors"
                                            title="Remove banner"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsMediaPickerOpen(true)}
                                            className="flex items-center gap-2"
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                            Change Banner
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setIsMediaPickerOpen(true)}
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#000080] hover:bg-blue-50/30 rounded-xl bg-gray-50 transition-all duration-200 group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-[#000080]/10 flex items-center justify-center mb-3 transition-colors">
                                        <ImageIcon className="w-7 h-7 text-gray-400 group-hover:text-[#000080] transition-colors" />
                                    </div>
                                    <p className="text-base font-semibold text-gray-600 group-hover:text-[#000080] transition-colors">
                                        Select Event Banner
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Choose from media library or upload a new image
                                    </p>
                                    <span className="mt-3 px-4 py-1.5 bg-[#000080] text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        Browse Media
                                    </span>
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-gray-400 text-center">
                            Tip: Use a Canva banner designed at 1200×628px for best results on social media.
                        </p>
                    </div>
                )}

                {/* ─── STEP 3: Description ─── */}
                {step === 3 && (
                    <div className="p-6 space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-bold text-gray-900">Event Description</h2>
                            <p className="text-sm text-gray-500 mt-1">Describe your event — what to expect, who should attend, and any special instructions.</p>
                        </div>

                        <div>
                            <RichTextEditor
                                content={formData.description || ''}
                                onChange={(val) => setFormData((prev) => ({ ...prev, description: val }))}
                            />
                        </div>
                    </div>
                )}

                {/* ─── STEP 4: Review & Publish ─── */}
                {step === 4 && (
                    <div className="p-6 space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-bold text-gray-900">Review & Publish</h2>
                            <p className="text-sm text-gray-500 mt-1">Check your event details before publishing to the website.</p>
                        </div>

                        {/* Preview Card */}
                        <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
                            {formData.image_url && (
                                <div className="w-full h-48 overflow-hidden">
                                    <img
                                        src={formData.image_url}
                                        alt="Banner Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-5 space-y-4">
                                {/* Category badge + Title */}
                                <div>
                                    {formData.category && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#000080] px-2.5 py-1 rounded bg-[#000080]/10">
                                            {formData.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold text-gray-900 mt-2">
                                        {formData.title || <span className="text-gray-400 italic">No title</span>}
                                    </h3>
                                </div>

                                {/* Meta row */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600 border-t border-b py-3 border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span>
                                            {formData.date
                                                ? new Date(formData.date + 'T00:00:00').toLocaleDateString(undefined, {
                                                      weekday: 'short',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      year: 'numeric',
                                                  })
                                                : <span className="text-gray-400">No date set</span>}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span>{formData.time || <span className="text-gray-400">No time set</span>}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{formData.location || <span className="text-gray-400">No location</span>}</span>
                                    </div>
                                </div>

                                {/* Description preview */}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description Preview</p>
                                    <div
                                        className="text-sm text-gray-600 line-clamp-4 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: formData.description || '<span class="text-gray-400 italic">No description provided.</span>',
                                        }}
                                    />
                                </div>

                                {/* Registration link */}
                                {formData.registration_link && (
                                    <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <LinkIcon className="w-4 h-4 flex-shrink-0" />
                                        <a
                                            href={formData.registration_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline truncate"
                                        >
                                            {formData.registration_link}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Publish toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                                <p className="text-sm font-bold text-gray-800">Publish Immediately</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    When enabled, this event becomes publicly visible on the website.
                                </p>
                            </div>
                            <Switch
                                checked={formData.status === 'published'}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, status: checked ? 'published' : 'draft' }))
                                }
                            />
                        </div>

                        {formData.status === 'draft' && (
                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                                This event will be saved as a <strong>draft</strong> and won't be visible to the public until published.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={step === 1 ? onCancel : handlePrev}
                    disabled={saving}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    {step === 1 ? 'Cancel' : 'Back'}
                </Button>

                <div className="text-xs text-gray-400 font-medium">
                    Step {step} of {STEPS.length}
                </div>

                {step < 4 ? (
                    <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-[#000080] hover:bg-[#000080]/90 text-white"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white min-w-[140px]"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                {event ? 'Update Event' : 'Publish Event'}
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* Media Picker */}
            <MediaPicker
                open={isMediaPickerOpen}
                onOpenChange={setIsMediaPickerOpen}
                onSelect={handleBannerSelect}
            />
        </div>
    );
}
