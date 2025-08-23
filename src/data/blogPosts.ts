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
    title: 'Circular Plastic Economy: Rethinking Waste Management',
    slug: 'circular-plastic-economy',
    excerpt: 'Exploring how circular economy principles can transform plastic waste from a problem into a resource for sustainable development in Kenya.',
    content: [
      {
        type: 'heading',
        content: 'The Problem with Linear Plastic Economy'
      },
      {
        type: 'paragraph',
        content: 'Kenya, like many developing countries, faces significant challenges with plastic waste management. With over 500 million plastic bags entering the waste stream annually, the traditional approach of disposal in landfills or burning has created environmental and health crises.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Circular Approach'
      },
      {
        type: 'paragraph',
        content: 'At SBEN, we\'ve reimagined plastic waste as a valuable resource. Our circular economy model includes:'
      },
      {
        type: 'icon-list',
        items: [
          'Community Collection Networks: We work directly with coastal communities to establish collection points where plastic waste is gathered, sorted, and prepared for processing.',
          'Waste Mapping Platform: We are developing a real-time mapping system for plastic waste accumulation, giving recyclers live data on available plastic for collection and order placement.',
          'Product Innovation: We develop new products from recycled plastics, including construction materials, textiles, and packaging solutions.',
          'Community Empowerment: Our model creates employment opportunities and provides training to community members, ensuring sustainable economic benefits.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'TrendingUp', value: '50+', label: 'Tons of Plastic Collected' },
          { icon: 'Users', value: '200+', label: 'Jobs Created' },
          { icon: 'DollarSign', value: '120', label: 'Tons CO₂ Reduced Annually' }
        ]
      },
      {
        type: 'quote',
        content: 'The transition to a circular plastic economy requires collaboration between government, businesses, and communities. At SBEN, we\'re committed to leading this transformation in Kenya and across East Africa.'
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Circular Economy',
    imageUrl: '/lovable-uploads/63c2a3e2-053b-4365-abd3-97afbf384fdc.png',
    keywords: ['circular economy', 'plastic waste', 'sustainability', 'recycling', 'Kenya'],
    metaDescription: 'Discover how SBEN Limited is transforming plastic waste management through circular economy principles in Kenya.'
  },
  {
    id: '2',
    title: 'Turning Ocean Waste into Opportunity: Innovations in Cleanup',
    slug: 'ocean-waste-opportunity',
    excerpt: 'How innovative cleanup technologies and community partnerships are transforming ocean plastic waste into valuable products along Kenya\'s coastline.',
    content: [
      {
        type: 'heading',
        content: 'The Scale of Ocean Plastic Pollution'
      },
      {
        type: 'paragraph',
        content: 'Marine plastic pollution affects Kenya\'s coastal ecosystems, fisheries, and tourism industry. Every year, millions of tons of plastic waste enter our oceans, with significant portions washing up on our beaches.'
      },
      {
        type: 'heading',
        content: 'SBEN\'s Ocean Cleanup Initiative'
      },
      {
        type: 'paragraph',
        content: 'Our comprehensive ocean cleanup program combines technology, community engagement, and sustainable business practices:'
      },
      {
        type: 'list',
        items: [
          'Beach Cleanup Operations: Regular organized cleanups involving local communities, schools, and volunteer groups.',
          'At-Sea Collection Systems: Partnering with local fishing communities to collect plastic waste during fishing activities.',
          'Smart Sorting Technology: Mobile sorting units that process collected ocean plastics on-site.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Shield', value: '25+', label: 'Tons Collected from Beaches' },
          { icon: 'Users', value: '150+', label: 'Coastal Community Jobs' },
          { icon: 'TrendingUp', value: '500+', label: 'Individuals Trained' }
        ]
      },
      {
        type: 'quote',
        content: 'Join our ocean cleanup efforts by participating in community cleanup events or supporting our sustainable products made from ocean plastic.'
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Ocean Cleanup',
    imageUrl: '/lovable-uploads/3d9b4ab1-4b93-49d1-a762-4b852a76c4b8.png',
    keywords: ['ocean cleanup', 'marine plastic', 'coastal communities', 'recycling', 'sustainability'],
    metaDescription: 'Learn how SBEN\'s ocean cleanup initiative is transforming marine plastic waste into valuable products while empowering coastal communities.'
  },
  {
    id: '3',
    title: 'The Science of Recycling: Converting Plastics into New Materials',
    slug: 'science-of-recycling',
    excerpt: 'Deep dive into the technical processes behind converting waste plastics into high-quality recycled materials for various applications.',
    content: [
      {
        type: 'heading',
        content: 'Types of Plastic and Their Properties'
      },
      {
        type: 'paragraph',
        content: 'Different plastic types require different recycling approaches:'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Plastic Type', 'Common Uses', 'Recycling Process', 'New Applications'],
          rows: [
            ['PET', 'Bottles, food containers', 'Chemical washing, melting', 'Textiles, carpets, new bottles'],
            ['HDPE', 'Milk jugs, detergent bottles', 'Shredding, washing, melting', 'Pipes, lumber, playground equipment'],
            ['PP', 'Food containers, bottle caps', 'Sorting, cleaning, re-melting', 'Automotive parts, textiles']
          ]
        }
      },
      {
        type: 'heading',
        content: 'SBEN\'s Plastic Mapping Tech'
      },
      {
        type: 'icon-list',
        items: [
          'Live Waste Tracking: A platform that maps plastic waste accumulation in real time across different regions.',
          'Recycler Access: Providing recyclers with immediate data on available plastic waste for efficient collection.',
          'Order Management: Allowing recyclers to place orders for both raw and repurposed materials through the platform.',
          'Supply Chain Integration: Connecting waste collectors, processors, and buyers in a streamlined ecosystem.'
        ]
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Zap', value: '60%', label: 'Energy Reduction vs Virgin Plastic' },
          { icon: 'Shield', value: '80%', label: 'CO₂ Emissions Reduction' },
          { icon: 'Database', value: '95%', label: 'Water Consumption Reduction' }
        ]
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Technology',
    imageUrl: '/lovable-uploads/efc70b5b-f93a-41e4-af42-fd0c98e1221d.png',
    keywords: ['plastic recycling', 'recycling technology', 'circular economy', 'sustainability', 'materials science'],
    metaDescription: 'Explore the advanced scientific processes SBEN uses to convert waste plastics into high-quality recycled materials.'
  },
  {
    id: '4',
    title: 'Recycling Technology in Industry: A Strategic Approach',
    slug: 'recycling-technology-industry',
    excerpt: 'How advanced recycling technologies are transforming industrial waste management and creating new business opportunities in Kenya.',
    content: [
      {
        type: 'heading',
        content: 'The Industrial Waste Challenge'
      },
      {
        type: 'paragraph',
        content: 'Kenyan industries generate thousands of tons of plastic waste annually. Traditional disposal methods are not only environmentally harmful but also represent missed economic opportunities.'
      },
      {
        type: 'heading',
        content: 'Strategic Technology Implementation'
      },
      {
        type: 'list',
        items: [
          'Comprehensive waste stream analysis and technology selection based on waste types',
          'ROI calculations for recycling investments and integration planning with existing operations',
          'Automated sorting systems for mixed waste streams with AI and machine learning',
          'Real-time monitoring and reporting systems with scalable processing equipment'
        ]
      },
      {
        type: 'chart',
        chartData: {
          title: 'Industrial Recycling Impact',
          data: [
            { name: 'Cost Reduction', value: 70 },
            { name: 'Revenue Generation', value: 45 },
            { name: 'Compliance Improvement', value: 90 },
            { name: 'Sustainability Metrics', value: 85 }
          ]
        }
      },
      {
        type: 'quote',
        content: 'Ready to implement recycling technology in your industry? Contact us for a comprehensive waste assessment and technology recommendation.'
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Industry Solutions',
    imageUrl: '/lovable-uploads/90e451d3-3516-43ec-90cc-cb92ba544302.png',
    keywords: ['industrial recycling', 'recycling technology', 'waste management', 'circular economy', 'sustainability'],
    metaDescription: 'Discover how SBEN\'s recycling technologies are helping Kenyan industries transform waste into valuable resources.'
  },
  {
    id: '5',
    title: 'From Plastic Waste to Products: Our Sustainable Development Process',
    slug: 'plastic-waste-to-products',
    excerpt: 'A detailed look at SBEN\'s comprehensive process for transforming plastic waste into valuable products while supporting community development.',
    content: [
      {
        type: 'heading',
        content: 'Five-Stage Transformation Process'
      },
      {
        type: 'paragraph',
        content: 'At SBEN, we\'ve developed a comprehensive five-stage process that transforms plastic waste into valuable products while creating sustainable economic opportunities for communities across Kenya.'
      },
      {
        type: 'icon-list',
        items: [
          'Stage 1: Waste Assessment & Collection Design - Partnering with local leaders and understanding existing waste management practices.',
          'Stage 2: Plastic Mapping Tech - Digital platform that maps plastic waste accumulation in real time and connects recyclers with available materials.',
          'Stage 3: Product Development & Innovation - Creating market-relevant products from recycled materials through extensive market research.',
          'Stage 4: Production & Quality Assurance - Scaling production while maintaining quality through manufacturing setup and quality control.',
          'Stage 5: Community Impact & Support - Ensuring sustainable long-term benefits through employment creation and ongoing support.'
        ]
      },
      {
        type: 'heading',
        content: 'Case Study: Kilifi County Implementation'
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'Settings', value: '15', label: 'Collection Points Established' },
          { icon: 'Users', value: '200+', label: 'Community Members Trained' },
          { icon: 'TrendingUp', value: '25', label: 'Tons Processed Monthly' }
        ]
      },
      {
        type: 'quote',
        content: 'Want to implement our sustainable development process in your community? Contact us to discuss partnership opportunities and technical support.'
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Development Process',
    imageUrl: '/lovable-uploads/644f9f2a-9d26-428f-bead-914bf3d45fe7.png',
    keywords: ['sustainable development', 'plastic recycling', 'community development', 'circular economy', 'product development'],
    metaDescription: 'Learn about SBEN\'s five-stage process for transforming plastic waste into valuable products while supporting community development.'
  },
  {
    id: '6',
    title: 'Future of the Blue Economy: Trends in Sustainable Development',
    slug: 'future-blue-economy-trends',
    excerpt: 'Exploring emerging trends in sustainable ocean-based economic development and how plastic recycling plays a crucial role in Kenya\'s blue economy future.',
    content: [
      {
        type: 'heading',
        content: 'Understanding the Blue Economy'
      },
      {
        type: 'paragraph',
        content: 'The blue economy encompasses all economic activities related to oceans, seas, and coasts, including sustainable fisheries, marine tourism, renewable ocean energy, and ocean waste management.'
      },
      {
        type: 'heading',
        content: 'Current State of Kenya\'s Blue Economy'
      },
      {
        type: 'stats',
        statsData: [
          { icon: 'DollarSign', value: '$1B+', label: 'Annual Tourism Revenue' },
          { icon: 'Users', value: '500K+', label: 'Livelihoods Supported by Fisheries' },
          { icon: 'TrendingUp', value: '95%', label: 'International Trade via Maritime' }
        ]
      },
      {
        type: 'heading',
        content: 'Emerging Trends in Blue Economy Development'
      },
      {
        type: 'list',
        items: [
          'Technology Integration: IoT sensors for monitoring ocean health and AI-powered waste collection optimization',
          'Circular Economy Models: Zero-waste coastal tourism initiatives and closed-loop aquaculture systems',
          'Climate Resilience: Blue carbon projects and ecosystem-based adaptation strategies',
          'Policy and Governance: Extended producer responsibility regulations and marine protected area expansion'
        ]
      },
      {
        type: 'chart',
        chartData: {
          title: 'Blue Economy Growth Sectors',
          data: [
            { name: 'Sustainable Tourism', value: 35 },
            { name: 'Ocean Technology', value: 25 },
            { name: 'Waste Management', value: 20 },
            { name: 'Renewable Energy', value: 20 }
          ]
        }
      },
      {
        type: 'quote',
        content: 'Ready to contribute to Kenya\'s blue economy future? Partner with SBEN to develop sustainable solutions that protect our marine resources while creating economic opportunities.'
      }
    ],
    author: 'SBEN Team',
    date: 'July 17, 2024',
    category: 'Blue Economy',
    imageUrl: '/lovable-uploads/faed02d3-6f87-4c72-bb77-520aa4c1182e.png',
    keywords: ['blue economy', 'sustainable development', 'ocean conservation', 'marine pollution', 'circular economy'],
    metaDescription: 'Explore the future of Kenya\'s blue economy and how SBEN\'s plastic recycling initiatives support sustainable ocean-based development.'
  }
];
