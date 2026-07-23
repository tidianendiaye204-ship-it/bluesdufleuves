import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OptimizedImage } from "./OptimizedImage";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  offset?: number; // Décalage maximal en pourcentage ou pixels
  priority?: boolean;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  offset = 10,
  priority = false,
  objectPosition = "center",
  objectFit = "cover",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile pour réduire ou désactiver le parallaxe (meilleures perfs)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // L'effet de parallaxe démarre quand le composant entre dans le viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sur mobile, on divise l'effet par 2 pour garder une fluidité parfaite
  const actualOffset = isMobile ? offset / 2 : offset;
  
  // Transforme la progression du scroll (0 à 1) en déplacement vertical
  // On utilise des pourcentages pour que l'effet soit proportionnel à la taille de l'image
  const y = useTransform(scrollYProgress, [0, 1], [`-${actualOffset}%`, `${actualOffset}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        // Scale 1.25 covers up to 12.5% shift in each direction without revealing background
        style={{ y, scale: 1.25 }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          className={`w-full h-full ${imageClassName}`}
          priority={priority}
          objectPosition={objectPosition}
          objectFit={objectFit}
        />
      </motion.div>
    </div>
  );
}
