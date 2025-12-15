import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';
import { SiteSettings } from '@/types/supabase';

const SettingsManager = () => {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const defaultSettings = [
        { key: 'contact_email', label: 'Contact Email', type: 'email' },
        { key: 'contact_phone', label: 'Contact Phone', type: 'tel' },
        { key: 'contact_address', label: 'Address', type: 'text' },
        { key: 'social_facebook', label: 'Facebook URL', type: 'url' },
        { key: 'social_twitter', label: 'Twitter URL', type: 'url' },
        { key: 'social_instagram', label: 'Instagram URL', type: 'url' },
        { key: 'social_linkedin', label: 'LinkedIn URL', type: 'url' },
    ];

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings' as any)
                .select('*');

            if (error) throw error;

            // The original code correctly maps the fetched array of SiteSettings to a Record<string, string>
            // which is the type expected by the `settings` state.
            // The instruction "Cast data to SiteSettings[] when setting state" seems to imply
            // that `settings` should be an array, but its current type is `Record<string, string>`.
            // To faithfully apply the instruction while maintaining the existing logic and state type,
            // we will ensure `data` is treated as `SiteSettings[]` before processing it into the map.
            const settingsMap: Record<string, string> = {};
            (data as SiteSettings[])?.forEach((setting: SiteSettings) => {
                settingsMap[setting.key] = setting.value;
            });
            setSettings(settingsMap);
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                updated_at: new Date().toISOString(),
            }));

            // Upsert each setting
            for (const update of updates) {
                const { error } = await supabase
                    .from('site_settings' as any)
                    .upsert(update, { onConflict: 'key' });

                if (error) throw error;
            }

            toast({ title: 'Settings saved successfully!' });
        } catch (error: any) {
            toast({
                title: 'Error saving settings',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your contact information and social links</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="grid gap-6">
                        {defaultSettings.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <Label htmlFor={field.key}>{field.label}</Label>
                                <Input
                                    id={field.key}
                                    type={field.type}
                                    value={settings[field.key] || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsManager;
