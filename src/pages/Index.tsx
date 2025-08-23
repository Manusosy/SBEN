
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import MissionSection from '@/components/MissionSection';
import Programs from '@/components/Programs';
import ImpactStats from '@/components/ImpactStats';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
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
      <MissionSection />
      <Programs />
      <ImpactStats />
      <BlogPreview />
      <Newsletter />
    </PageLayout>
  );
};

export default Index;