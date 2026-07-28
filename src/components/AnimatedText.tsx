import { motion } from "framer-motion";
import type { ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  el?: ElementType;
  className?: string;
  delay?: number;
}

// Variants optimisés : animation par bloc au lieu de mot par mot
// Réduit le nombre de motion elements créés → moins de TBT
const container = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

export function AnimatedText({
  text,
  el: Wrapper = "h2",
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  return (
    <Wrapper className={className}>
      <motion.span
        custom={delay}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Wrapper>
  );
}
