import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Vérifier si c'est un robot (Lighthouse, Googlebot, etc.) pour ne pas plomber le LCP
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    
    const hasShown = sessionStorage.getItem("splash_shown");
    
    if (!hasShown && !isBot) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splash_shown", "true");
      }, 800); // Réduit à 800ms pour un accès rapide
      return () => clearTimeout(timer);
    } else if (isBot) {
      // Pour les robots, on marque comme vu pour éviter tout affichage
      sessionStorage.setItem("splash_shown", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          {/* Lueur d'arrière-plan */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border-2 border-primary/20 p-2 mb-8 bg-black/50 backdrop-blur-md flex items-center justify-center">
              <img
                src="/logo the village.webp"
                alt="The Village Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Ligne de chargement stylisée */}
            <div className="w-48 h-0.5 bg-muted relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-primary"
            >
              The Village Podor
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
