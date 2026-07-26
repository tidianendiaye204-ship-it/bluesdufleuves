import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";

export function ImmersiveAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialiser l'audio. L'utilisateur doit mettre un fichier "ambiance.mp3" dans le dossier public/
    audioRef.current = new Audio("/ambiance.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="relative group flex items-center gap-3">
        {/* Texte qui s'affiche au survol */}
        <div className="absolute left-14 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground flex items-center gap-2 shadow-lg">
          <Music size={12} className="text-primary animate-pulse" />
          {isPlaying ? "Pause" : "Ambiance du Fleuve"}
        </div>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mettre en pause" : "Jouer la musique d'ambiance"}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
            isPlaying
              ? "bg-primary shadow-[0_0_20px_rgba(245,158,11,0.5)] border-transparent"
              : "bg-card/80 backdrop-blur-md border border-primary/30 hover:border-primary/60"
          }`}
        >
          {/* Effet vinyle/ondes si en lecture */}
          {isPlaying && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
            ></motion.div>
          )}

          <div className="relative z-10 text-current transition-colors">
            {isPlaying ? (
              <Pause size={18} className="text-white fill-white" />
            ) : (
              <Play size={18} className="text-primary fill-primary ml-1" />
            )}
          </div>
        </button>
      </div>
    </motion.div>
  );
}
