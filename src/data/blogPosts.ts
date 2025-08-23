export interface ContentSection {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'icon-list' | 'bibliography' | 'stats' | 'chart' | 'table' | 'quote';
  content?: string;
  items?: string[];
  statsData?: {
    icon: string;
    value: string;
    label: string;
  }[];
  chartData?: {
    title: string;
    data: { name: string; value: number }[];
  };
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentSection[];
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  keywords?: string[];
  metaDescription?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Empowering Women Through Economic Independence: SBEN\'s Success Story',
    slug: 'women-empowerment-success',
    excerpt: 'Discover how SBEN\'s women empowerment program is transforming lives through savings groups, business training, and leadership development in Kibera.',
    content: [
      {
        type: 'heading',
        content: 'Breaking Barriers to Economic Independence'
      },
      {
        type: 'paragraph',
        content: 'In Kibera, Nairobi, women face significant challenges in accessing financial resources and business opportunities. SBEN\'s women empowerment program is changing this narrative by providing comprehensive support systems that enable women to build sustainable livelihoods.'
      },
      {
        type: 'heading',
        content: 'Our Holistic Approach'
      },
      {
        type: 'paragraph',
        content: 'SBEN\'s women empowerment initiative focuses on three key areas:'
      },
      {
        type: 'icon-list',
        items: [
          'Savings Groups: Community-based saving and lending circles that provide financial security and access to credit.',
          'Business Training: Comprehensive entrepreneurship and business management skills development.',
          'Leadership Programs: Developing women leaders who can advocate for their communities and drive positive change.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Users', value: '150+', label: 'Women Empowered' },
          { icon: 'TrendingUp', value: '25+', label: 'Businesses Started' },
          { icon: 'DollarSign', value: '40%', label: 'Income Increase' }
        ]
      },
      {
        type: 'quote',
        content: 'When women are economically empowered, entire communities thrive. At SBEN, we\'re committed to creating pathways for women to achieve financial independence and become leaders in their communities.'
      }
    ],
    author: 'SBEN Team',
    date: 'January 15, 2025',
    category: 'Women Empowerment',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.42.38 PM.jpeg',
    keywords: ['women empowerment', 'economic independence', 'savings groups', 'business training', 'Kibera'],
    metaDescription: 'Learn how SBEN is empowering women in Kibera through economic independence programs and leadership development.'
  },
  {
    id: '2',
    title: 'Digital Literacy: Bridging the Technology Gap in Our Community',
    slug: 'digital-literacy-bridging-gap',
    excerpt: 'How SBEN\'s digital literacy program is equipping youth with essential computer skills and preparing them for the modern workforce.',
    content: [
      {
        type: 'heading',
        content: 'The Digital Divide in Kibera'
      },
      {
        type: 'paragraph',
        content: 'Access to technology and digital skills is crucial for economic opportunity in today\'s world. However, many youth in Kibera lack access to computers and digital education, putting them at a disadvantage in the job market.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Digital Solutions'
      },
      {
        type: 'paragraph',
        content: 'Our digital literacy program addresses this gap through:'
      },
      {
        type: 'icon-list',
        items: [
          'Computer Skills Training: From basic computer operations to advanced software applications.',
          'Online Safety Education: Teaching internet safety and responsible digital citizenship.',
          'Career Preparation: Equipping participants with skills needed for modern workplaces.',
          'Access to Technology: Providing computer access and internet connectivity for learning.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Laptop', value: '80+', label: 'Youth Trained' },
          { icon: 'Users', value: '15+', label: 'Computers Available' },
          { icon: 'TrendingUp', value: '60%', label: 'Employment Rate' }
        ]
      },
      {
        type: 'quote',
        content: 'Digital literacy is not just about using computers—it\'s about opening doors to new opportunities and empowering our youth to compete in the global economy.'
      }
    ],
    author: 'SBEN Team',
    date: 'January 10, 2025',
    category: 'Digital Literacy',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (3).jpeg',
    keywords: ['digital literacy', 'computer skills', 'technology education', 'youth development', 'Kibera'],
    metaDescription: 'Discover how SBEN is bridging the digital divide in Kibera through comprehensive computer skills training and technology education.'
  },
  {
    id: '3',
    title: 'Environmental Conservation: Building a Greener Future for Kibera',
    slug: 'environmental-conservation-greener-future',
    excerpt: 'Exploring SBEN\'s environmental initiatives that are creating a cleaner, more sustainable community through tree planting and waste management programs.',
    content: [
      {
        type: 'heading',
        content: 'Environmental Challenges in Urban Communities'
      },
      {
        type: 'paragraph',
        content: 'Urban areas like Kibera face significant environmental challenges, including waste management issues, air pollution, and lack of green spaces. These challenges affect both the environment and community health.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Green Initiatives'
      },
      {
        type: 'paragraph',
        content: 'Our environmental conservation program focuses on:'
      },
      {
        type: 'icon-list',
        items: [
          'Tree Planting: Community reforestation projects that create green spaces and improve air quality.',
          'Waste Management: Recycling programs and waste reduction initiatives that keep our community clean.',
          'Environmental Education: Raising awareness about conservation and sustainable practices.',
          'Community Cleanup: Regular community cleanup events that bring people together for environmental action.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'TreeDeciduous', value: '500+', label: 'Trees Planted' },
          { icon: 'Users', value: '200+', label: 'Community Members' },
          { icon: 'TrendingUp', value: '30%', label: 'Waste Reduction' }
        ]
      },
      {
        type: 'quote',
        content: 'Environmental conservation is about more than just planting trees—it\'s about creating a sustainable future for our children and building a community that values and protects its natural resources.'
      }
    ],
    author: 'SBEN Team',
    date: 'January 5, 2025',
    category: 'Environmental Conservation',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg',
    keywords: ['environmental conservation', 'tree planting', 'waste management', 'sustainability', 'Kibera'],
    metaDescription: 'Learn about SBEN\'s environmental conservation efforts in Kibera, including tree planting and waste management initiatives.'
  },
  {
    id: '4',
    title: 'Healthcare Access: Improving Community Wellness in Kibera',
    slug: 'healthcare-access-community-wellness',
    excerpt: 'How SBEN\'s healthcare initiatives are making quality medical care accessible to vulnerable community members through outreach programs and health education.',
    content: [
      {
        type: 'heading',
        content: 'Healthcare Challenges in Informal Settlements'
      },
      {
        type: 'paragraph',
        content: 'Access to quality healthcare remains a significant challenge in informal settlements like Kibera. Many community members struggle with basic health services, preventive care, and health education.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Health Solutions'
      },
      {
        type: 'paragraph',
        content: 'Our healthcare program addresses these challenges through:'
      },
      {
        type: 'icon-list',
        items: [
          'Medical Camps: Free health checkups and basic treatments for community members.',
          'Health Education: Workshops on nutrition, hygiene, and preventive healthcare.',
          'Healthcare Access: Assistance in navigating the healthcare system and accessing medical services.',
          'Community Outreach: Regular health awareness campaigns and screenings.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Heart', value: '300+', label: 'People Served' },
          { icon: 'Users', value: '12+', label: 'Medical Camps' },
          { icon: 'TrendingUp', value: '45%', label: 'Health Awareness' }
        ]
      },
      {
        type: 'quote',
        content: 'Good health is the foundation of a strong community. Through our healthcare initiatives, we\'re working to ensure that every member of our community has access to the care they need.'
      }
    ],
    author: 'SBEN Team',
    date: 'December 28, 2024',
    category: 'Healthcare',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM (1).jpeg',
    keywords: ['healthcare access', 'medical camps', 'health education', 'community wellness', 'Kibera'],
    metaDescription: 'Discover how SBEN is improving healthcare access in Kibera through medical camps, health education, and community outreach programs.'
  },
  {
    id: '5',
    title: 'Education Support: Building Brighter Futures Through Learning',
    slug: 'education-support-brighter-futures',
    excerpt: 'SBEN\'s comprehensive education support program is helping students overcome barriers to learning and achieve their academic goals.',
    content: [
      {
        type: 'heading',
        content: 'Educational Barriers in Our Community'
      },
      {
        type: 'paragraph',
        content: 'Many children in Kibera face significant barriers to education, including lack of school supplies, financial constraints, and limited access to learning resources. These challenges can prevent students from reaching their full potential.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Educational Support'
      },
      {
        type: 'paragraph',
        content: 'Our education support program provides:'
      },
      {
        type: 'icon-list',
        items: [
          'Scholarships: Financial support for deserving students to access quality education.',
          'Learning Resources: Access to books, materials, and digital resources for enhanced learning.',
          'Mentorship: Guidance from experienced educators and professionals.',
          'Academic Support: Tutoring and homework assistance to help students succeed.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'GraduationCap', value: '100+', label: 'Students Supported' },
          { icon: 'BookOpen', value: '500+', label: 'Books Distributed' },
          { icon: 'TrendingUp', value: '85%', label: 'Academic Improvement' }
        ]
      },
      {
        type: 'quote',
        content: 'Education is the most powerful tool for breaking the cycle of poverty. Through our support programs, we\'re helping students build the foundation for successful futures.'
      }
    ],
    author: 'SBEN Team',
    date: 'December 20, 2024',
    category: 'Education',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM.jpeg',
    keywords: ['education support', 'scholarships', 'learning resources', 'academic success', 'Kibera'],
    metaDescription: 'Learn how SBEN is supporting education in Kibera through scholarships, learning resources, and mentorship programs.'
  },
  {
    id: '6',
    title: 'Youth Mentorship: Developing the Next Generation of Leaders',
    slug: 'youth-mentorship-next-generation-leaders',
    excerpt: 'SBEN\'s youth mentorship program is cultivating leadership skills and providing guidance to help young people become agents of positive change in their communities.',
    content: [
      {
        type: 'heading',
        content: 'The Need for Youth Leadership Development'
      },
      {
        type: 'paragraph',
        content: 'Young people in Kibera have incredible potential to drive positive change, but they often lack the guidance, skills, and opportunities needed to become effective leaders. Our mentorship program addresses this gap.'
      },
      {
        type: 'heading',
        content: 'Our Mentorship Approach'
      },
      {
        type: 'paragraph',
        content: 'The SBEN youth mentorship program focuses on:'
      },
      {
        type: 'icon-list',
        items: [
          'Leadership Training: Developing essential leadership skills and confidence.',
          'Career Guidance: Helping youth identify and pursue their career goals.',
          'Community Engagement: Encouraging active participation in community development.',
          'Personal Development: Building self-esteem, communication skills, and resilience.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Users', value: '75+', label: 'Youth Mentored' },
          { icon: 'Target', value: '20+', label: 'Leadership Projects' },
          { icon: 'TrendingUp', value: '90%', label: 'Confidence Boost' }
        ]
      },
      {
        type: 'quote',
        content: 'Our youth are not just the leaders of tomorrow—they are the leaders of today. Through mentorship, we\'re helping them realize their potential and make a difference in their communities.'
      }
    ],
    author: 'SBEN Team',
    date: 'December 15, 2024',
    category: 'Youth Development',
    imageUrl: '/gallery/WhatsApp Image 2025-08-23 at 12.27.50 PM (1).jpeg',
    keywords: ['youth mentorship', 'leadership development', 'career guidance', 'community engagement', 'Kibera'],
    metaDescription: 'Discover how SBEN\'s youth mentorship program is developing the next generation of leaders in Kibera through comprehensive leadership training and guidance.'
  }
];
