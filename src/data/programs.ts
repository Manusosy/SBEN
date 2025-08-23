import { 
  GraduationCap,
  Heart,
  PiggyBank,
  Laptop,
  Coins,
  TreeDeciduous
} from "lucide-react";

export const programs = [
  {
    id: "education",
    title: "Education Support",
    shortDescription: "Providing access to quality education through scholarships, learning materials, and mentorship programs.",
    icon: GraduationCap,
    description: "Our education support program aims to break down barriers to quality education through comprehensive support systems.",
    initiatives: [
      {
        title: "Scholarships",
        description: "Financial support for deserving students"
      },
      {
        title: "Learning Resources",
        description: "Access to books, materials, and digital resources"
      },
      {
        title: "Mentorship",
        description: "Guidance from experienced educators and professionals"
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare Initiatives",
    shortDescription: "Facilitating access to essential healthcare services and promoting community health awareness.",
    icon: Heart,
    description: "Our healthcare initiatives focus on improving access to medical services and promoting health education.",
    initiatives: [
      {
        title: "Medical Camps",
        description: "Free health checkups and basic treatments"
      },
      {
        title: "Health Education",
        description: "Community workshops on health and wellness"
      },
      {
        title: "Healthcare Access",
        description: "Assistance in accessing medical services"
      }
    ]
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    shortDescription: "Supporting women through savings groups, business skills training, and leadership development.",
    icon: PiggyBank,
    description: "Our women empowerment program focuses on economic independence and leadership development.",
    initiatives: [
      {
        title: "Savings Groups",
        description: "Community-based saving and lending circles"
      },
      {
        title: "Business Training",
        description: "Entrepreneurship and business management skills"
      },
      {
        title: "Leadership Programs",
        description: "Developing women leaders in the community"
      }
    ]
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy",
    shortDescription: "Equipping youth with essential digital skills for the modern workforce.",
    icon: Laptop,
    description: "Our digital literacy program prepares participants for success in the digital age.",
    initiatives: [
      {
        title: "Computer Skills",
        description: "Basic to advanced computer training"
      },
      {
        title: "Online Safety",
        description: "Internet safety and digital citizenship"
      },
      {
        title: "Digital Tools",
        description: "Training in essential software and applications"
      }
    ]
  },
  {
    id: "financial-inclusion",
    title: "Financial Inclusion",
    shortDescription: "Promoting financial literacy and access to sustainable saving and lending programs.",
    icon: Coins,
    description: "Our financial inclusion initiatives help community members build financial stability.",
    initiatives: [
      {
        title: "Financial Education",
        description: "Basic financial management skills"
      },
      {
        title: "Savings Programs",
        description: "Structured savings and investment guidance"
      },
      {
        title: "Credit Access",
        description: "Support in accessing responsible credit"
      }
    ]
  },
  {
    id: "environmental",
    title: "Environmental Conservation",
    shortDescription: "Leading community initiatives for a cleaner, greener, and more sustainable environment.",
    icon: TreeDeciduous,
    description: "Our environmental program promotes sustainable practices and conservation efforts.",
    initiatives: [
      {
        title: "Tree Planting",
        description: "Community reforestation projects"
      },
      {
        title: "Waste Management",
        description: "Recycling and waste reduction programs"
      },
      {
        title: "Environmental Education",
        description: "Awareness and conservation training"
      }
    ]
  }
];
