import { useMemo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { galleryImages } from '@/data/galleryImages';

type GallerySliderProps = {
  limit?: number;
};

const GallerySlider = ({ limit = 30 }: GallerySliderProps) => {
  const images = useMemo(() => galleryImages.slice(0, limit), [limit]);

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Work in Pictures</h2>
        </div>
        <Carousel
          opts={{ loop: true, align: 'start' }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={`${img.src}-${idx}`} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-2">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default GallerySlider;


