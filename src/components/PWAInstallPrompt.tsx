import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
      setIsIOS(isIOSDevice);
    }
  }, []);

  useEffect(() => {
    // Si l'application est déjà installée (ouverte en mode standalone), on ne fait rien
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window.navigator as any).standalone === true) {
      return; // iOS standalone check
    }

    // Listen for PWA install event
    const handleBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the prompt after a short delay so it doesn't attack the user immediately
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener(
      "beforeinstallprompt" as keyof WindowEventMap,
      handleBeforeInstallPrompt,
    );

    // Si on est sur iOS, beforeinstallprompt n'existe pas, on l'affiche quand même au bout d'un moment
    let fallbackTimer: NodeJS.Timeout;
    if (isIOS) {
      fallbackTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt" as keyof WindowEventMap,
        handleBeforeInstallPrompt,
      );
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [deferredPrompt, isIOS]);

  const handleInstallClick = async () => {
    if (isIOS && !deferredPrompt) {
      alert(
        "Pour installer sur iPhone/iPad : appuyez sur l'icône 'Partager' (le carré avec une flèche) en bas de l'écran, puis sélectionnez 'Sur l'écran d'accueil'.",
      );
      return;
    }

    if (!deferredPrompt) {
      alert("L'application est déjà installée ou votre navigateur ne la supporte pas.");
      setShowPrompt(false);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-sm"
        >
          {/* Animated glow background */}
          <div className="absolute -inset-1 bg-linear-to-r from-amber-400 via-primary to-sky-500 rounded-3xl blur opacity-30 animate-pulse"></div>

          <div className="relative flex items-center gap-4 p-4 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden group">
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Phone Icon */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 shrink-0 border border-primary/20">
              <Smartphone className="text-primary" size={24} />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border-2 border-black"
              >
                <Download size={8} className="text-black" />
              </motion.div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">Installer l'Application</h4>
              <p className="text-white/60 text-xs mt-0.5 font-serif leading-tight">
                Vivez le festival depuis votre écran d'accueil.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="relative overflow-hidden bg-linear-to-r from-amber-500 to-primary hover:from-amber-400 hover:to-primary/80 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-1">Obtenir</span>
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
