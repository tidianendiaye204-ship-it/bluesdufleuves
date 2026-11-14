import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X, Calendar, Bell } from "lucide-react";

export function FloatingTicketButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Bouton Flottant (Côté droit — masqué sur très petits écrans pour ne jamais gêner la lecture) */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        onClick={() => setShowModal(true)}
        className="hidden md:flex fixed top-1/2 right-0 -translate-y-1/2 z-40 group items-center cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-11 h-32 bg-[#04111f]/90 backdrop-blur-md border border-r-0 border-sky-400/35 rounded-l-2xl shadow-xl hover:w-13 transition-all duration-300">
          <span className="absolute inset-0 bg-linear-to-b from-sky-400/20 to-primary/20 rounded-l-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="rotate-180" style={{ writingMode: "vertical-rl" }}>
            <span className="flex items-center gap-3 text-sky-300 text-xs font-black uppercase tracking-[0.2em]">
              <Ticket size={15} className="rotate-90 animate-pulse text-sky-400" />
              Réserver
            </span>
          </div>
        </div>
      </motion.button>

      {/* Modale de Billetterie */}
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
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-sky-500 to-cyan-400" />

              <button
                onClick={() => setShowModal(false)}
                aria-label="Fermer la modale"
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Ticket className="text-primary" size={32} />
              </div>

              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Billetterie</h2>
              <p className="text-muted-foreground mb-8">
                L'ouverture officielle de la billetterie pour la 18ème édition approche.
                Préparez-vous pour un événement historique à Dakar (Sorano) puis à Podor et Ndioum.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <Calendar className="text-primary" size={24} />
                  <div>
                    <h4 className="font-bold text-sm">Dates Officielles</h4>
                    <p className="text-xs text-muted-foreground">
                      27 Nov 2026 (Sorano) · 04–06 Déc 2026 (Podor & Ndioum)
                    </p>
                  </div>
                </div>

                <a
                  href="#newsletter"
                  onClick={() => setShowModal(false)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors"
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
