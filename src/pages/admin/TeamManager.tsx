import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, Linkedin, Twitter, Github, Mail, Save } from 'lucide-react';
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
import { TeamMember } from '@/types/supabase';

const TeamManager = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image_url: '',
        social_links: { linkedin: '', twitter: '', github: '', email: '' },
        display_order: 0,
        status: 'active',
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members' as any)
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setMembers((data as any[])?.map(item => item as TeamMember) || []);
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `team/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
            toast({ title: 'Image uploaded successfully!' });
        } catch (error: any) {
            toast({
                title: 'Upload failed',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const memberData = {
                name: formData.name,
                role: formData.role,
                bio: formData.bio,
                image_url: formData.image_url,
                social_links: formData.social_links,
                display_order: formData.display_order,
                status: formData.status,
            };

            if (editingMember) {
                const { error } = await supabase
                    .from('team_members' as any)
                    .update(memberData)
                    .eq('id', editingMember.id);

                if (error) throw error;
                toast({ title: 'Team member updated successfully!' });
            } else {
                const { error } = await supabase
                    .from('team_members' as any)
                    .insert([memberData]);

                if (error) throw error;
                toast({ title: 'Team member added successfully!' });
            }

            setDialogOpen(false);
            resetForm();
            fetchMembers();
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

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio || '',
            image_url: member.image_url || '',
            social_links: {
                linkedin: member.social_links?.linkedin || '',
                twitter: member.social_links?.twitter || '',
                github: member.social_links?.github || '',
                email: member.social_links?.email || '',
            },
            display_order: member.display_order,
            status: member.status,
        });
        setDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        try {
            const { error } = await supabase
                .from('team_members' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast({ title: 'Team member deleted successfully!' });
            fetchMembers();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setEditingMember(null);
        setFormData({
            name: '',
            role: '',
            bio: '',
            image_url: '',
            social_links: { linkedin: '', twitter: '', github: '', email: '' },
            display_order: 0,
            status: 'active',
        });
    };

    const handleNewMember = () => {
        resetForm();
        setDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
                        <p className="text-gray-600 mt-2">Manage your team and volunteers</p>
                    </div>
                    <Button onClick={handleNewMember}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                {member.image_url ? (
                                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Upload className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-medium">{member.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.display_order}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${member.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {member.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleEdit(member)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(member.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {members.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No team members found. Add your first member!
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
                            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Profile Image</Label>
                            <div className="flex items-center gap-4">
                                {formData.image_url && (
                                    <img src={formData.image_url} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                                )}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Social Links</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="LinkedIn URL"
                                        value={formData.social_links.linkedin}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, linkedin: e.target.value }
                                        })}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Twitter URL"
                                        value={formData.social_links.twitter}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, twitter: e.target.value }
                                        })}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="relative">
                                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="GitHub URL"
                                        value={formData.social_links.github}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, github: e.target.value }
                                        })}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Email Address"
                                        value={formData.social_links.email}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, email: e.target.value }
                                        })}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Display Order</Label>
                                <Input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
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
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
                                {editingMember ? 'Update' : 'Add'} Member
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default TeamManager;
