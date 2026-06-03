import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";

// Définir un type pour le prompt d'installation PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt" as keyof WindowEventMap, handler);

    return () => {
      window.removeEventListener("beforeinstallprompt" as keyof WindowEventMap, handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 bg-card border border-border rounded-xl p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-start gap-3">
        <Smartphone className="text-primary shrink-0 mt-1" size={24} />
        <div className="flex-1">
          <h4 className="font-bold text-foreground mb-1">Installer l'app</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Ajoutez le festival à votre écran d'accueil !
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition"
            >
              Installer
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
