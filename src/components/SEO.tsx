import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  isBlogPost?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'SBEN',
  description = 'Shine Bridge Empowerment Network: Empowering communities through education, healthcare, and sustainable development initiatives in Kibera.',
  type = 'website',
  name = 'Shine Bridge Empowerment Network',
  imageUrl = '/logo.png',
  publishDate,
  modifiedDate,
  author,
  category,
  keywords = [
    'SBEN',
    'Shine Bridge Empowerment Network',
    'community empowerment',
    'education initiatives',
    'mentorship program',
    'youth development',
    'leadership development',
    'women empowerment',
    'community service',
    'nonprofit organization',
    'social impact',
    'Kenya'
  ],
  isBlogPost = false
}) => {
  const location = useLocation();
  const currentUrl = `https://shinebridgeempowermentnetwork.org${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://shinebridgeempowermentnetwork.org${imageUrl}`;

  // Enhanced keywords for specific posts
  const enhancedKeywords = location.pathname.includes('smart-ppe-revolution') 
    ? [
        ...keywords,
        'personal protective equipment',
        'workplace safety solutions',
        'smart safety gear',
        'construction safety technology',
        'industrial safety monitoring',
        'occupational health technology',
        'safety compliance',
        'worker protection systems',
        'smart hard hats',
        'connected safety equipment'
      ]
    : location.pathname.includes('wearable-safety-tech-protecting-workers-roi')
    ? [
        ...keywords,
        'workplace injury costs',
        'safety ROI',
        'workers compensation savings',
        'ergonomic sensors',
        'workplace safety investment',
        'safety technology ROI',
        'industrial wearables',
        'safety cost reduction',
        'occupational safety economics',
        'safety technology partnerships',
        'workplace injury statistics',
        'safety equipment financing',
        'injury prevention technology'
      ]
    : keywords;

  // Create base Organization JSON-LD structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shine Bridge Empowerment Network',
    url: 'https://shinebridgeempowermentnetwork.org',
    logo: '/logo.png',
    description: 'Empowering Communities, Transforming Lives through sustainable development and community empowerment',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@shinebridgeempowermentnetwork.org'
    },
    sameAs: [
      'https://www.linkedin.com/company/shinebridgeempowermentnetwork',
      'https://twitter.com/SBEN_org'
    ]
  };

  // Enhanced BlogPosting JSON-LD structured data
  const blogPostStructuredData = isBlogPost && publishDate ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: absoluteImageUrl,
      width: 1200,
      height: 630
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      '@type': 'Organization',
      name: author || 'Shine Bridge Empowerment Network',
      url: 'https://shinebridgeempowermentnetwork.org'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shine Bridge Empowerment Network',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shinebridgeempowermentnetwork.org/logo.png',
        width: 512,
        height: 512
      },
      url: 'https://shinebridgeempowermentnetwork.org'
    },
    description: description,
    keywords: enhancedKeywords.join(', '),
    articleSection: category,
    inLanguage: 'en-US',
    isAccessibleForFree: true
  } : null;

  // Add FAQ structured data for Smart PPE post
  const smartPPEFAQData = location.pathname.includes('smart-ppe-revolution') ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Smart PPE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart PPE (Personal Protective Equipment) refers to traditional safety gear enhanced with sensors, connectivity, and intelligence. Unlike ordinary PPE that acts as a passive barrier, smart PPE actively monitors conditions and provides real-time alerts to prevent accidents.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does smart PPE improve workplace safety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart PPE improves safety by providing real-time monitoring of environmental conditions, worker health metrics, and potential hazards. It can detect falls, monitor vital signs, sense toxic gases, and automatically alert emergency responders when needed.'
        }
      },
      {
        '@type': 'Question',
        name: 'What industries benefit from smart PPE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart PPE benefits multiple industries including construction, manufacturing, oil & gas, fire & rescue, healthcare, mining, and any workplace where safety is paramount. Each industry can customize the technology to address specific safety challenges.'
        }
      }
    ]
  } : null;

  // Add FAQ structured data for Wearable Safety Tech ROI post
  const wearableSafetyROIFAQData = location.pathname.includes('wearable-safety-tech-protecting-workers-roi') ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much do workplace injuries cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'According to the National Safety Council, the average cost for a medically consulted work injury is $43,000 in 2023. With 2.2 injuries per 100 full-time workers, a 200-person site can expect about $215,000 in injury costs annually before accounting for downtime or replacement training.'
        }
      },
      {
        '@type': 'Question',
        name: 'What ROI can wearable safety technology deliver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Real-world deployments show significant returns: one study found 54% lower OSHA recordables and 88% fewer lost workdays. Another warehouse study showed 62% of workers reduced risky movements by half, with total ergonomic hazards falling 39%.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do insurance companies support wearable safety technology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, many insurers now bundle wearable device costs into workers compensation premiums. Employers keep the hardware as long as usage stays high because fewer claims leave insurers ahead financially. Regional carriers are expanding similar rebate schemes.'
        }
      }
    ]
  } : null;

  // Combine keywords with any additional category terms
  const keywordString = category 
    ? [...enhancedKeywords, category.toLowerCase()].join(', ') 
    : enhancedKeywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta name="keywords" content={keywordString} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="ShineBridge Empowerment Network (SBEN)" />
      <meta property="og:type" content={isBlogPost ? "article" : "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {isBlogPost && <meta property="article:publisher" content="https://shinebridgeempowermentnetwork.org" />}
      {isBlogPost && <meta property="article:author" content="SBEN Team" />}
      {isBlogPost && <meta property="article:published_time" content={new Date().toISOString()} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shinebridgeempowerment" />
      <meta name="twitter:creator" content="@shinebridgeempowerment" />
      
      {/* LinkedIn specific */}
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta name="author" content={author || name} />
      
      {/* Pinterest specific */}
      <meta name="pinterest:description" content={description} />
      <meta name="pinterest:image" content={absoluteImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      
      {blogPostStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
