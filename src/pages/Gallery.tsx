import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

// Gallery categories for the filter. Removed Events, Partnership, Healthcare, Volunteer from the UI.
const categories = [
  { value: "all", label: "All Photos" },
  { value: "education", label: "Education" },
  { value: "women-empowerment", label: "Women Empowerment" },
  { value: "digital-literacy", label: "Digital Literacy" },
  { value: "environmental", label: "Environmental" },
  { value: "community", label: "Community" }
];

// Helper function to validate image file extensions
const isValidImageFile = (filename: string): boolean => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowerFilename = filename.toLowerCase();
  return validExtensions.some(ext => lowerFilename.endsWith(ext));
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Function to get all images from a specific category folder
  const getImagesFromCategory = (category: string) => {
    if (category === "all") {
      // Include images from all known categories, even those not shown in the filter
      const allCategoryKeys = [
        "education",
        "women-empowerment",
        "digital-literacy",
        "environmental",
        "community",
        "healthcare" // keep healthcare images visible under All if present
      ];
      const allImages: string[] = [];
      allCategoryKeys.forEach((key) => {
        const categoryImages = getCategoryImages(key);
        allImages.push(...categoryImages);
      });
      // de-duplicate in case paths overlap
      return Array.from(new Set(allImages));
    } else {
      // Get images from specific category folder
      return getCategoryImages(category);
    }
  };

  // Function to get images for a specific category
  // Dynamically loads all image types: jpg, jpeg, png, gif, webp, svg
  const getCategoryImages = (category: string): string[] => {
    // Define image extensions to support
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.SVG'];
    
    // Comprehensive image map with all images from subfolders and root
    const imageMap: { [key: string]: string[] } = {
      education: [
        "/gallery/education/WhatsApp Image 2025-08-23 at 12.13.44 PM (1).jpeg",
        "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.36 PM (2).jpeg",
        "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.37 PM (2).jpeg",
        "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.38 PM (1).jpeg",
        "/gallery/education/WhatsApp Image 2025-08-23 at 12.42.38 PM (2).jpeg"
      ],
      healthcare: [
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM (2).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM (1).jpeg"
      ],
      "women-empowerment": [
        "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.32 PM (1).jpeg",
        "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.32 PM.jpeg",
        "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.33 PM (1).jpeg",
        "/gallery/women-empowerment/WhatsApp Image 2025-09-06 at 5.26.33 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM.jpeg"
      ],
      "digital-literacy": [
        "/gallery/digital-literacy/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.16.26 PM.jpeg"
      ],
      environmental: [
        "/gallery/environmental/WhatsApp Image 2025-09-06 at 5.09.32 PM (1).jpeg",
        "/gallery/environmental/WhatsApp Image 2025-09-06 at 5.09.32 PM.jpeg",
        "/gallery/environmental/WhatsApp Image 2025-09-06 at 5.09.33 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.14.19 PM.jpeg"
      ],
      community: [
        "/gallery/WhatsApp Image 2025-08-23 at 12.42.38 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (1).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM (1).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.13.45 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.13.44 PM (2).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.13.44 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.42.37 PM (3).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.50 PM.jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.49 PM (3).jpeg",
        "/gallery/WhatsApp Image 2025-08-23 at 12.27.50 PM (1).jpeg"
      ],
      volunteer: [],
      partnership: [],
      events: []
    };
    
    return imageMap[category] || [];
  };

  // Update images when category changes
  useEffect(() => {
    const images = getImagesFromCategory(selectedCategory);
    setGalleryImages(images);
  }, [selectedCategory]);

  // Filter images based on search term
  const filteredImages = galleryImages.filter(imagePath => {
    if (!searchTerm) return true;
    // You can add image metadata here later if needed
    return imagePath.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const openImageModal = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <PageLayout>
      <SEO 
        title="Gallery - SBEN | Visual Stories of Community Impact" 
        description="Explore our photo gallery showcasing SBEN's community development programs, events, and the positive impact we're making in Kibera through education, healthcare, and empowerment initiatives."
        imageUrl="/og-image.png"
        keywords={['gallery', 'photos', 'community development', 'SBEN', 'Kibera', 'programs', 'events']}
      />
      
      {/* Consistent Hero Section */}
      <PageHero
        title="Our Gallery"
        description="Explore visual stories of transformation, community engagement, and the positive impact we're creating together in Kibera. Each image tells a story of hope, empowerment, and sustainable change."
        imagePath="/gallery/WhatsApp Image 2025-08-23 at 12.42.36 PM (1).jpeg"
      />

      {/* Gallery Controls Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section - Pure Images Only */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((imagePath, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => openImageModal(imagePath)}
                  >
                    {/* Pure Image - No Card, No Text */}
                    <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src={imagePath} 
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Handle broken image - show placeholder
                          const target = e.target as HTMLImageElement;
                          if (!imageErrors.has(imagePath)) {
                            setImageErrors(prev => new Set(prev).add(imagePath));
                            target.src = '/gallery/placeholder.svg';
                            console.warn(`Failed to load image: ${imagePath}`);
                          }
                        }}
                      />
                      
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <ImageIcon className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No photos found</h3>
                <p className="text-gray-500 mb-6">Start adding your photos to the gallery subfolders</p>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-2xl mx-auto">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How to add photos:</h4>
                  <div className="text-left space-y-3 text-sm text-gray-600">
                    <p>1. <strong>Supported formats:</strong> JPG, JPEG, PNG, GIF, WEBP, SVG (all case-insensitive)</p>
                    <p>2. <strong>Add photos</strong> to the appropriate subfolders in <code className="bg-gray-100 px-2 py-1 rounded">public/gallery/</code></p>
                    <p>3. <strong>Update the getCategoryImages function</strong> in Gallery.tsx with your photo paths</p>
                    <p>4. <strong>Photos will automatically appear</strong> in the image grid</p>
                    <p>5. <strong>Filter by category</strong> to see photos from specific folders</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Share Your Story</h2>
            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Have photos from our programs or events? We'd love to see them! Share your images and help us document the incredible impact we're making together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                Submit Photos
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-xl">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal - Full Screen Image View */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image */}
            <img 
              src={selectedImage} 
              alt="Full size gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery; 