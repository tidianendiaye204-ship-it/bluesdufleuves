import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

const slides = [
  {
    id: 1,
    title: "Un Musée Interactif",
    subtitle: "Patrimoine & Histoire",
    description: "Plongez dans l'histoire de la vallée du fleuve Sénégal à travers des expositions uniques et interactives.",
    image: "/carousel-musee.jpg",
  },
  {
    id: 2,
    title: "Espaces de Création",
    subtitle: "Formations Artisanales",
    description: "Découvrez nos ateliers de lutherie, de couture et de métiers d'art, dédiés à la transmission du savoir-faire.",
    image: "/carousel-formations.jpg",
  },
  {
    id: 3,
    title: "Le Festival",
    subtitle: "Blues du Fleuve",
    description: "L'épicentre des cultures halpulaar, célébrant la musique, la danse et l'intégration africaine.",
    image: "/carousel-festival.jpg",
  }
];

export function CulturalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000); // Défilement toutes les 5 secondes
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <div 
      className="relative w-full aspect-video md:h-[600px] overflow-hidden rounded-2xl group shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[3px] border-border/50 bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Carrousel de présentation du centre culturel"
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Effet Cinématographique (Ken Burns) */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          

        </motion.div>
      </AnimatePresence>

      {/* Flèches de navigation (Visibles au survol sur Desktop) */}
      <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black/30 hover:bg-primary/90 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all shadow-lg hover:scale-110"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black/30 hover:bg-primary/90 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all shadow-lg hover:scale-110"
          aria-label="Slide suivant"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicateurs de navigation (Dots) */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 shadow-md ${
              idx === currentIndex ? "w-12 bg-primary" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
