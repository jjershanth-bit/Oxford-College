import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';

const galleryImages = [
  { src: '/images/program-diploma-english.jpg', caption: 'Students in Lecture Hall' },
  { src: '/images/program-sinhala.jpg', caption: 'Language Learning Session' },
  { src: '/images/program-ielts.jpg', caption: 'IELTS Training Class' },
  { src: '/images/program-higher-diploma.jpg', caption: 'Graduation Ceremony' },
  { src: '/images/program-corporate.jpg', caption: 'Corporate Training' },
  { src: '/images/program-kids.jpg', caption: 'Kids Learning Program' },
  { src: '/images/program-primary-teaching.jpg', caption: 'Primary Teaching Class' },
  { src: '/images/program-teacher-training.jpg', caption: 'Teacher Training Workshop' },
  { src: '/images/program-migrant-workers.jpg', caption: 'English for Migrant Workers' },
  { src: '/images/hero-programs.jpg', caption: 'Oxford College Campus' },
  { src: '/images/program-diploma-english.jpg', caption: 'Interactive Learning' },
  { src: '/images/program-kids.jpg', caption: 'Children Activities' },
];

export default function Gallery() {
  useScrollReveal();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <main>
      <HeroBanner
        title="Gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-4">
              Our Gallery
            </h2>
            <p className="text-gray-text font-light max-w-2xl mx-auto">
              Glimpses of life at Oxford College — from classrooms to celebrations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden cursor-pointer group reveal reveal-delay-${Math.min(index + 1, 8)}`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                    {image.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-brand-blue transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-blue transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-blue transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="max-w-4xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].caption}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <p className="text-white text-center mt-4 font-medium">
              {galleryImages[currentImage].caption}
            </p>
            <p className="text-white/50 text-center text-sm mt-1">
              {currentImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
