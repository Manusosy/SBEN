import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import PageHero from "@/components/PageHero";
import SEO from '@/components/SEO';

const Contact = () => {
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
          imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.13.44 PM (2).jpeg"
        />

        <ContactForm />
        <ContactInfo />
      </div>
    </PageLayout>
  );
};

export default Contact;