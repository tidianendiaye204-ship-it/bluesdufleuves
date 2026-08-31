import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, AlertTriangle, Star, Mic, ExternalLink, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getActiveAnnouncementsFn } from "@/lib/announcements";

export function LiveAnnouncement() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: announcements = [] } = useQuery({
    queryKey: ["activeAnnouncements"],
    queryFn: () => getActiveAnnouncementsFn(),
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (!isVisible || announcements.length === 0) {
      document.documentElement.style.setProperty("--announcement-height", "0px");
      return;
    }

    // Set variable for navbar
    document.documentElement.style.setProperty("--announcement-height", "40px");

    const interval = setInterval(() => {
      // Don't auto-rotate if a modal is open
      if (!modalOpen) {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }
    }, 6000);

    return () => {
      clearInterval(interval);
      document.documentElement.style.setProperty("--announcement-height", "0px");
    };
  }, [isVisible, announcements.length, modalOpen]);

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-red-600",
          text: "text-white",
          border: "border-white/20",
          badgeBg: "bg-black/20",
          icon: <AlertTriangle size={16} className="animate-[pulse_1s_ease-in-out_infinite]" />,
          label: "Urgent",
        };
      case "promo":
        return {
          bg: "bg-linear-to-r from-purple-600 to-amber-500",
          text: "text-white",
          border: "border-white/20",
          badgeBg: "bg-black/20",
          icon: <Star size={16} className="animate-spin-slow" />,
          label: "Partenaire",
        };
      case "event":
        return {
          bg: "bg-blue-600",
          text: "text-white",
          border: "border-white/20",
          badgeBg: "bg-black/20",
          icon: <Mic size={16} className="animate-[bounce_2s_infinite]" />,
          label: "Événement",
        };
      default: // info
        return {
          bg: "bg-primary",
          text: "text-primary-foreground",
          border: "border-primary-foreground/20",
          badgeBg: "bg-black/20",
          icon: <Info size={16} />,
          label: "Info",
        };
    }
  };

  const styles = getTypeStyles(currentAnnouncement?.type || "info");
  const isClickable =
    currentAnnouncement?.type === "promo" &&
    (currentAnnouncement.mediaUrl || currentAnnouncement.actionUrl);

  const formatExternalUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  const handleClick = () => {
    if (!isClickable) return;
    if (currentAnnouncement.mediaUrl) {
      setModalOpen(true);
    } else if (currentAnnouncement.actionUrl) {
      window.open(formatExternalUrl(currentAnnouncement.actionUrl), "_blank");
    }
  };

  // Check if mediaUrl is a youtube ID (very simple check: length is 11 without slashes)
  const isYoutube =
    currentAnnouncement?.mediaUrl &&
    currentAnnouncement.mediaUrl.length === 11 &&
    !currentAnnouncement.mediaUrl.includes("/");

  return (
    <>
      <div
        onClick={handleClick}
        className={`${styles.bg} ${styles.text} px-4 py-2 relative overflow-hidden flex items-center justify-between z-60 shadow-md border-b ${styles.border} transition-colors duration-500 ${isClickable ? "cursor-pointer hover:brightness-110" : ""}`}
        title={isClickable ? "Cliquez pour en savoir plus" : ""}
      >
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <div
            className={`flex items-center gap-2 font-bold whitespace-nowrap ${styles.badgeBg} px-3 py-1 rounded-md text-xs sm:text-sm uppercase tracking-wider`}
          >
            {styles.icon}
            {styles.label}
          </div>

          <div className="flex-1 relative h-6 overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement?.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute font-medium text-sm sm:text-base truncate w-full flex items-center gap-2"
              >
                {currentAnnouncement?.message}
                {isClickable && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                    {currentAnnouncement.mediaUrl ? <Play size={10} /> : <ExternalLink size={10} />}
                    Voir
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="ml-4 p-1.5 hover:bg-black/20 rounded-full transition-colors shrink-0"
            aria-label="Fermer l'annonce"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && currentAnnouncement && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col z-10"
            >
              <div className="p-4 flex items-center justify-between border-b bg-muted/50">
                <div className="flex items-center gap-3">
                  <Star className="text-amber-500" />
                  <h3 className="font-bold text-lg">{currentAnnouncement.message}</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-0 sm:p-6 flex flex-col items-center justify-center bg-black/95 aspect-video w-full relative">
                {isYoutube ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentAnnouncement.mediaUrl}?autoplay=1&rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={currentAnnouncement.mediaUrl}
                    alt="Partenaire"
                    className="max-h-[60vh] object-contain rounded-lg"
                  />
                )}
              </div>
              {currentAnnouncement.actionUrl && (
                <div className="p-4 border-t flex justify-end bg-card">
                  <a
                    href={formatExternalUrl(currentAnnouncement.actionUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all"
                  >
                    Visiter le site <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
