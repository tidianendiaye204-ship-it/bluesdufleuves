import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ne pas activer sur mobile ou tactile
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Vérifie si on survole un élément interactif
      const isInteractive = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";
        
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Point central rapide */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-9999"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.1 }}
      />
      {/* Cercle suiveur fluide (Aura) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/40 rounded-full pointer-events-none z-9998"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(12, 74, 110, 0.08)" : "transparent",
          borderColor: isHovering ? "rgba(12, 74, 110, 0.1)" : "rgba(12, 74, 110, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
