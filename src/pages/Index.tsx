
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import ImpactStats from '@/components/ImpactStats';
import MissionSection from '@/components/MissionSection';
import Programs from '@/components/Programs';
import BlogPreview from '@/components/BlogPreview';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <PageLayout>
      <SEO 
        title="SBEN - Shine Bridge Empowerment Network | Empowering Communities" 
        description="Join SBEN in empowering communities through education, mentorship, leadership development, and sustainable initiatives. Together, we're building bridges to success."
        imageUrl="/og-image.png"
      keywords={['SBEN', 'community empowerment', 'education', 'mentorship', 'Kibera', 'youth development', 'leadership']}
      />
      <Hero />
      <ImpactStats />
      <MissionSection />
      <Programs />
      <BlogPreview />
    </PageLayout>
  );
};

export default Index;