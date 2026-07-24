import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const auraX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.6 });
  const auraY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.6 });

  useEffect(() => {
    // Ne pas activer sur mobile ou tactile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Vérifie si on survole un élément interactif
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
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
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Point central rapide */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-9999"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.1 }}
      />
      {/* Cercle suiveur fluide (Aura) */}
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-9998 flex items-center justify-center transition-colors duration-300 ${
          isHovering ? "border-transparent bg-primary/10" : "border border-primary/50 bg-transparent"
        }`}
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
      />
    </>
  );
}
