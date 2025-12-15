import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { GalleryImage } from "@/types/supabase";

// Gallery categories for the filter.
const categories = [
  { value: "all", label: "All Photos" },
  { value: "education", label: "Education" },
  { value: "women-empowerment", label: "Women Empowerment" },
  { value: "digital-literacy", label: "Digital Literacy" },
  { value: "environmental", label: "Environmental" },
  { value: "community", label: "Community" },
  { value: "healthcare", label: "Healthcare" }
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images' as any)
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setGalleryImages((data as unknown as GalleryImage[]) || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filter images based on category and search term
  const filteredImages = galleryImages.filter(image => {
    // Category filter
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;

    // Search filter
    const matchesSearch = !searchTerm ||
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt_text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
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

      {/* Gallery Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">Loading gallery...</div>
            ) : filteredImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => openImageModal(image.image_url)}
                  >
                    {/* Pure Image */}
                    <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || image.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                      {/* Optional: Show title on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs truncate">{image.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20">
                <ImageIcon className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No photos found</h3>
                <p className="text-gray-500 mb-6">Start adding your photos via Admin Dashboard</p>
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
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