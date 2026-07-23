import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configuration du ressort (spring) doux pour le retour à 0 et le suivi de la souris
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    // Désactiver sur tactile
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Limitation de l'amplitude (ex: max 15px)
    const maxDistance = 15;
    const limitedX = Math.max(-maxDistance, Math.min(maxDistance, middleX * 0.3));
    const limitedY = Math.max(-maxDistance, Math.min(maxDistance, middleY * 0.3));

    x.set(limitedX);
    y.set(limitedY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // S'assurer que le composant revient à 0 si démonté (optionnel mais propre)
  useEffect(() => {
    return () => {
      x.set(0);
      y.set(0);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
