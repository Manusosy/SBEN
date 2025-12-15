import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHero from "@/components/PageHero";
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings } from '@/types/supabase';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const subjects = [
  'General Inquiries',
  'Volunteer Opportunities',
  'Partnership & Collaboration',
  'Donation Inquiries',
  'Media & Press',
  'Program Information'
] as const;

type Subject = typeof subjects[number];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjects[0] as Subject,
    message: ''
  });
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings' as any)
          .select('*');

        if (error) throw error;

        if (data) {
          const settingsMap: Record<string, string> = {};
          (data as unknown as SiteSettings[]).forEach(setting => {
            settingsMap[setting.key] = setting.value;
          });
          setSettings(settingsMap);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: subjects[0], message: '' });
  };

  return (
    <PageLayout>
      <SEO
        title="Contact SBEN - Get Involved with Our Community"
        description="Connect with Shine Bridge Empowerment Network (SBEN). Together, we can create positive change in Kibera through education, healthcare, and community empowerment."
        keywords={['contact SBEN', 'volunteer', 'donate', 'partnership', 'community development', 'Kibera']}
      />

      <div className="min-h-screen bg-background">
        <PageHero
          title="Get in Touch"
          description="Building bridges to dignity, equity, and sustainable development through education, healthcare, and empowerment."
          imagePath="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop"
        />

        <div className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value: Subject) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Your message..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {settings.address || "Kibera, Nairobi\nKenya"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: {settings.contact_email || "info@shinebridgeempowermentnetwork.org"}</p>
                  <p>Phone: {settings.contact_phone || "+254 745 577530 / +254 795 549619"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {settings.social_facebook && (
                    <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                  {/* Default social links if settings are present or we can hardcode some placeholders if needed, 
                      but checking settings is cleaner for CMS integration */}
                  {settings.social_twitter && (
                    <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {settings.social_instagram && (
                    <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {settings.social_linkedin && (
                    <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {/* If no social links in settings and loading is done, maybe show nothing or generic ones? 
                       The logic above hides them if not set. */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
