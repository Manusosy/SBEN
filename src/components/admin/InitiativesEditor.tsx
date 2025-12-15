import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical, Laptop, GraduationCap, Heart, PiggyBank, Coins, TreeDeciduous, Users, Target, Award } from 'lucide-react';

interface Initiative {
    title: string;
    description: string;
    icon: string;
}

interface InitiativesEditorProps {
    value: Initiative[];
    onChange: (value: Initiative[]) => void;
}

const iconOptions = [
    'GraduationCap', 'Heart', 'PiggyBank', 'Laptop', 'Coins', 'TreeDeciduous', 'Users', 'Target', 'Award'
];

// Helper to render icon dynamically
const renderIcon = (name: string) => {
    switch (name) {
        case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
        case 'Heart': return <Heart className="w-4 h-4" />;
        case 'PiggyBank': return <PiggyBank className="w-4 h-4" />;
        case 'Laptop': return <Laptop className="w-4 h-4" />;
        case 'Coins': return <Coins className="w-4 h-4" />;
        case 'TreeDeciduous': return <TreeDeciduous className="w-4 h-4" />;
        case 'Users': return <Users className="w-4 h-4" />;
        case 'Target': return <Target className="w-4 h-4" />;
        case 'Award': return <Award className="w-4 h-4" />;
        default: return <GraduationCap className="w-4 h-4" />;
    }
}

const InitiativesEditor = ({ value, onChange }: InitiativesEditorProps) => {
    const initiatives = Array.isArray(value) ? value : [];

    const addInitiative = () => {
        onChange([...initiatives, { title: '', description: '', icon: 'GraduationCap' }]);
    };

    const removeInitiative = (index: number) => {
        const newInitiatives = [...initiatives];
        newInitiatives.splice(index, 1);
        onChange(newInitiatives);
    };

    const updateInitiative = (index: number, field: keyof Initiative, fieldValue: string) => {
        const newInitiatives = [...initiatives];
        newInitiatives[index] = { ...newInitiatives[index], [field]: fieldValue };
        onChange(newInitiatives);
    };

    return (
        <div className="space-y-4">
            {initiatives.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeInitiative(index)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid gap-4 pr-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Title (Heading)</Label>
                                <Input
                                    value={item.title}
                                    onChange={(e) => updateInitiative(index, 'title', e.target.value)}
                                    placeholder="e.g. Academic Support"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon</Label>
                                <Select
                                    value={item.icon}
                                    onValueChange={(val) => updateInitiative(index, 'icon', val)}
                                >
                                    <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                            {renderIcon(item.icon)}
                                            <span>{item.icon}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {iconOptions.map(icon => (
                                            <SelectItem key={icon} value={icon}>
                                                <div className="flex items-center gap-2">
                                                    {renderIcon(icon)}
                                                    <span>{icon}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={item.description}
                                onChange={(e) => updateInitiative(index, 'description', e.target.value)}
                                placeholder="Describe this initiative..."
                                rows={2}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button onClick={addInitiative} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" />
                Add Initiative Box
            </Button>
        </div>
    );
};

export default InitiativesEditor;
