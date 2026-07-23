import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Bienvenue",
  "The Village",
  "Centre Culturel du Fouta"
];

export function RotatingWelcomeText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-24 flex items-center justify-center text-center h-40 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-primary tracking-tighter"
        >
          {phrases[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
