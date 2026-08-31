import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music, SkipForward } from "lucide-react";

// Liste des audios de la playlist (à placer dans le dossier public)
const PLAYLIST = ["/ambiance.mp3", "/baaba-maal-1.mp3", "/baaba-maal-2.mp3"];

export function ImmersiveAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialisation et gestion de la fin de piste
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[0]);
      audioRef.current.volume = 0.4;
    }

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => {
        const next = (prev + 1) % PLAYLIST.length;
        if (audioRef.current) {
          audioRef.current.src = PLAYLIST[next];
          audioRef.current.play().catch(console.error);
        }
        return next;
      });
    };

    const currentAudio = audioRef.current;
    currentAudio.addEventListener("ended", handleEnded);

    return () => {
      currentAudio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Nettoyage au démontage
  useEffect(() => {
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

  const handleNext = () => {
    setCurrentTrackIndex((prev) => {
      const next = (prev + 1) % PLAYLIST.length;
      if (audioRef.current) {
        audioRef.current.src = PLAYLIST[next];
        if (isPlaying) {
          audioRef.current.play().catch(console.error);
        }
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="relative group flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full border border-primary/30 p-1 shadow-lg hover:border-primary/60 transition-colors">
        {/* Texte informatif au survol */}
        <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-card/90 backdrop-blur-md px-3 py-2 rounded-lg border border-border text-xs font-semibold text-foreground flex items-center gap-2 shadow-xl">
          <Music size={12} className="text-primary animate-pulse" />
          {isPlaying ? `Lecture en cours (Piste ${currentTrackIndex + 1}/3)` : "Ambiance du Fleuve"}
        </div>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mettre en pause" : "Jouer la musique"}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
            isPlaying
              ? "bg-primary shadow-[0_0_15px_rgba(245,158,11,0.5)] text-white"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          {/* Effet vinyle/ondes si en lecture */}
          {isPlaying && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/40"
            ></motion.div>
          )}

          <div className="relative z-10 transition-colors">
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current ml-1" />
            )}
          </div>
        </button>

        {/* Bouton Suivant */}
        <button
          onClick={handleNext}
          aria-label="Piste suivante"
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors mr-1"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </motion.div>
  );
}
