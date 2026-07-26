import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X, Calendar, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FloatingTicketButton() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Bouton Flottant (Côté droit) */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        onClick={() => setShowModal(true)}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-40 group flex items-center"
      >
        <div className="relative flex items-center justify-center w-12 h-32 bg-card/90 backdrop-blur-md border border-r-0 border-primary/30 rounded-l-2xl shadow-[-10px_0_30px_-10px_rgba(245,158,11,0.3)] hover:w-14 hover:shadow-[-15px_0_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300">
          <span className="absolute inset-0 bg-linear-to-b from-amber-400/20 to-primary/20 rounded-l-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <div className="rotate-180" style={{ writingMode: "vertical-rl" }}>
            <span className="flex items-center gap-3 text-primary text-sm font-black uppercase tracking-[0.2em]">
              <Ticket size={16} className="rotate-90 animate-pulse" />
              Réserver
            </span>
          </div>
        </div>
      </motion.button>

      {/* Modale de Billetterie (Coming Soon) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-card border border-primary/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-amber-400 via-primary to-amber-600"></div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Ticket className="text-primary" size={32} />
              </div>

              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Billetterie</h2>
              <p className="text-muted-foreground mb-8">
                L'ouverture officielle de la billetterie pour l'édition 2026 n'a pas encore commencé. Préparez-vous pour un événement historique.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <Calendar className="text-primary" size={24} />
                  <div>
                    <h4 className="font-bold text-sm">Ouverture prévue</h4>
                    <p className="text-xs text-muted-foreground">Automne 2026</p>
                  </div>
                </div>

                <a 
                  href="#newsletter"
                  onClick={() => setShowModal(false)}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl font-bold hover:bg-primary transition-colors"
                >
                  <Bell size={18} />
                  Être alerté de l'ouverture
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
