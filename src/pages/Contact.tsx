import { useState } from 'react';
import { motion } from "framer-motion";
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHero from "@/components/PageHero";
import SEO from '@/components/SEO';
import emailjs from 'emailjs-com';

const subjects = [
  'General Inquiries',
  'Volunteer Opportunities',
  'Partnership & Collaboration',
  'Donation Inquiries',
  'Media & Press',
  'Program Information'
] as const;

type Subject = typeof subjects[number];

// EmailJS configuration - Using same credentials as ContactForm
const EMAILJS_SERVICE_ID = "service_i3h66xg";
const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjects[0] as Subject,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'SBEN Team',
        to_email: 'info@shinebridgeempowermentnetwork.org',
        reply_to: formData.email
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', subject: subjects[0], message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
          imagePath="/lovable-uploads/2e4ff685-7212-4b95-9338-d2a7d96500bd.png"
        />

        <div className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value: Subject) => setFormData({...formData, subject: value})}
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
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder="Your message..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                <p className="text-muted-foreground">
                  Kibera, Nairobi<br />
                  Kenya
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: contact@sben.org</p>
                  <p>Phone: +254 XXX XXX XXX</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {/* Add social media links here */}
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
