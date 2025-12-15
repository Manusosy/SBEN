import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentSection } from '@/types/supabase';
import { Plus, Trash2, GripVertical, Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MediaPicker from '@/components/admin/MediaPicker';

interface BlogEditorProps {
    sections: ContentSection[];
    onChange: (sections: ContentSection[]) => void;
}

const sectionTypes = [
    { value: 'heading', label: 'Heading' },
    { value: 'subheading', label: 'Subheading' },
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'list', label: 'List' },
    { value: 'image', label: 'Image' },
    { value: 'quote', label: 'Quote' },
];

const BlogEditor = ({ sections, onChange }: BlogEditorProps) => {
    const { toast } = useToast();

    const addSection = () => {
        onChange([...sections, { type: 'paragraph', content: '' }]);
    };

    const removeSection = (index: number) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        onChange(newSections);
    };

    const updateSection = (index: number, field: keyof ContentSection, value: any) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], [field]: value };
        onChange(newSections);
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === sections.length - 1) return;

        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        onChange(newSections);
    };

    return (
        <div className="space-y-4">
            {sections.map((section, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSection(index, 'up')}
                            disabled={index === 0}
                        >
                            ↑
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSection(index, 'down')}
                            disabled={index === sections.length - 1}
                        >
                            ↓
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSection(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        <div className="w-48">
                            <Select
                                value={section.type}
                                onValueChange={(value: any) => updateSection(index, 'type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {sectionTypes.map(t => (
                                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {section.type === 'image' ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {section.imageUrl && (
                                        <img
                                            src={section.imageUrl}
                                            alt={section.altText || 'Preview'}
                                            className="w-32 h-32 object-cover rounded bg-white border"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <MediaPicker
                                            onSelect={(url) => updateSection(index, 'imageUrl', url)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Caption"
                                        value={section.caption || ''}
                                        onChange={(e) => updateSection(index, 'caption', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Alt Text"
                                        value={section.altText || ''}
                                        onChange={(e) => updateSection(index, 'altText', e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : section.type === 'list' ? (
                            <div className="space-y-2">
                                {(section.items || []).map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => {
                                                const newItems = [...(section.items || [])];
                                                newItems[itemIndex] = e.target.value;
                                                updateSection(index, 'items', newItems);
                                            }}
                                            placeholder={`List item ${itemIndex + 1}`}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newItems = [...(section.items || [])];
                                                newItems.splice(itemIndex, 1);
                                                updateSection(index, 'items', newItems);
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateSection(index, 'items', [...(section.items || []), ''])}
                                >
                                    Add Item
                                </Button>
                            </div>
                        ) : (
                            <Textarea
                                value={section.content || ''}
                                onChange={(e) => updateSection(index, 'content', e.target.value)}
                                placeholder={`Enter ${section.type} content...`}
                                rows={section.type === 'paragraph' ? 4 : 2}
                                className={section.type === 'heading' ? 'font-bold text-lg' : ''}
                            />
                        )}

                        {/* Internal Link Helper (Simple text input for now, could be enhanced) */}
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <LinkIcon className="w-3 h-3" />
                            <span>Tip: Use markdown for links: [Link Text](/path/to/page)</span>
                        </div>
                    </div>
                </div>
            ))}

            <Button onClick={addSection} className="w-full border-dashed" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Content Block
            </Button>
        </div>
    );
};

export default BlogEditor;
