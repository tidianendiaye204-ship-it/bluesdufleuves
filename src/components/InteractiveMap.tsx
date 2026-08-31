import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface InteractiveMapProps {
  bbox?: string;
  marker?: string;
  title?: string;
  className?: string;
}

export function InteractiveMap({
  bbox = "-14.976,16.604,-14.929,16.638",
  marker = "16.621,-14.953",
  title = "Localisation Podor, Sénégal",
  className = "h-80 w-full",
}: InteractiveMapProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`bg-muted animate-pulse rounded-2xl ${className}`} />;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-border/30 bg-card shadow-xl group ${className}`}
    >
      {/* Loading skeleton behind iframe */}
      <div className="absolute inset-0 bg-muted animate-pulse" />

      {/* Map iframe */}
      <iframe
        title={title}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`}
        className={`relative z-10 w-full h-full transition-all duration-700 ${
          isDark
            ? "grayscale invert hue-rotate-180 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 group-hover:hue-rotate-0"
            : "grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
        }`}
        loading="lazy"
      />

      {/* Overlay gradient pour intégration */}
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent pointer-events-none z-20" />

      {/* Marker décoratif */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 z-30 flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/50 px-4 py-2 rounded-xl shadow-lg"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <MapPin size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-foreground">The Village</p>
          <p className="text-[10px] text-muted-foreground uppercase">Podor, Sénégal</p>
        </div>
      </motion.div>
    </div>
  );
}
