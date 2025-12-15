export interface Event {
    id: string;
    title: string;
    date: string;
    time: string | null;
    location: string | null;
    description: string | null;
    category: string | null;
    registration_link: string | null;
    status: 'published' | 'draft' | 'archived';
    created_at: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    image_url: string | null;
    social_links: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        email?: string;
    } | null;
    display_order: number;
    status: 'active' | 'inactive';
    created_at: string;
}

export interface SiteSettings {
    id: string;
    key: string;
    value: string;
    description: string | null;
    created_at: string;
}

export interface Program {
    id: string;
    slug: string;
    title: string;
    short_description: string;
    description: string;
    icon_name: string;
    initiatives: any;
    image_url: string | null;
    display_order: number;
    status: string;
    created_at: string;
}

export interface ContentSection {
    type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'icon-list' | 'bibliography' | 'stats' | 'chart' | 'table' | 'quote' | 'image';
    content?: string;
    items?: string[];
    imageUrl?: string;
    caption?: string;
    altText?: string;
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
    category: string;
    image_url: string | null;
    keywords: string[] | null;
    meta_description: string | null;
    status: string;
    published_at: string | null;
    created_at: string;
}

export interface GalleryImage {
    id: string;
    title: string;
    alt_text: string;
    image_url: string;
    category: string;
    display_order: number;
    created_at: string;
}
