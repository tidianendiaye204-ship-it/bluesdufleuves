import { motion } from "framer-motion";
import type { ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  el?: ElementType;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, el: Wrapper = "h2", className = "", delay = 0 }: AnimatedTextProps) {
  // Découpe le texte en mots
  const words = text.split(" ");
  
  // Variants pour le conteneur global (gère le délai et le stagger)
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: delay 
      },
    },
  };

  // Variants pour chaque mot (fondu + slide vers le haut)
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 0.3
      },
    },
  };

  return (
    <Wrapper className={className} aria-label={text}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline-block"
        aria-hidden="true"
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            // Conserve l'espace entre les mots avec mr-[0.25em] sauf pour le dernier mot
            className={`inline-block ${index !== words.length - 1 ? "mr-[0.25em]" : ""}`}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
