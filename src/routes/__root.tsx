import "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb, withRetry } from "@/lib/db";
import { newsletter } from "@/db/schema";
import { useEffect, Suspense, lazy } from "react";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import "../styles.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { DEFAULT_SEO } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { FloatingTicketButton } from "@/components/FloatingTicketButton";
import { SplashScreen } from "@/components/SplashScreen";

// Lazy load ImmersiveAudio pour ne pas bloquer le thread principal (amélioration du TBT)
const ImmersiveAudio = lazy(() =>
  import("@/components/ImmersiveAudio").then((mod) => ({ default: mod.ImmersiveAudio })),
);

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const subscribeNewsletterFn = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof newsletterSchema>) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const db = getDb();

      await withRetry(async () => {
        await db.insert(newsletter).values({
          email: data.email,
          dateInscription: new Date(),
        });
      });

      return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Newsletter error detail:", {
        message: e.message,
        cause: e.cause,
        stack: e.stack,
        fullError: e,
      });

      const errorMessage = e.message || "";
      if (
        errorMessage.includes("UNIQUE") ||
        errorMessage.includes("UNIQUE constraint failed") ||
        errorMessage.includes("D1_ERROR: UNIQUE")
      ) {
        return { error: "Cet email est déjà inscrit à notre newsletter." };
      }

      if (
        errorMessage.includes("D1_BINDING_MISSING") ||
        errorMessage.includes("binding is not defined")
      ) {
        return { error: "Service temporairement indisponible (DB)." };
      }

      return {
        error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.",
      };
    }
  });

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("root.pageNotFound")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("root.pageNotFoundDesc")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("root.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("root.pageError")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("root.pageErrorDesc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("root.retry")}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("root.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: DEFAULT_SEO.title },
      { name: "description", content: DEFAULT_SEO.description },
      { name: "keywords", content: DEFAULT_SEO.keywords },
      { name: "author", content: "Daande Lenol" },
      { property: "og:title", content: DEFAULT_SEO.title },
      { property: "og:description", content: DEFAULT_SEO.description },
      { property: "og:image", content: DEFAULT_SEO.ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_SEO.ogImage },
      { name: "theme-color", content: "#ffc107" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Fonts avec display=swap — non-bloquant côté rendu
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Montserrat:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        type: "image/webp",
        href: "/logo the village.webp",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo the village.webp",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preload poster vidéo hero pour améliorer le LCP */}
        <link rel="preload" as="image" href="/centre%20culturel.webp" fetchPriority="high" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__name = (target, value) => Object.defineProperty(target, "name", { value, configurable: true });`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Restaurer la langue après l'hydratation côté client
    // Cela évite l'erreur React #418 (Hydration mismatch) tout en gardant le choix de l'utilisateur
    const savedLng = localStorage.getItem("village_lang");
    if (savedLng && savedLng !== "fr") {
      i18n.changeLanguage(savedLng);
    } else if (!savedLng && navigator.language.startsWith("en")) {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  useEffect(() => {
    // Enregistrer le service worker pour le PWA (différé pour ne pas bloquer le rendu)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((error) => {
          console.error("Échec de l'enregistrement du Service Worker:", error);
        });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdminRoute && <SplashScreen />}
      <div className="flex flex-col min-h-screen">
        {/* Skip to Content Link */}
        <a
          href="#main-content"
          className="fixed -top-10 left-0 bg-primary text-primary-foreground px-4 py-2 z-50 transition-all duration-200 focus:top-0"
          suppressHydrationWarning
        >
          {t("root.skipToContent")}
        </a>
        {!isAdminRoute && <Navbar />}
        <main id="main-content" className="flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAdminRoute && (
          <>
            <NewsletterCTA />
            <Footer />
            <PWAInstallPrompt />
            <FloatingTicketButton />
            <Suspense fallback={null}>
              <ImmersiveAudio />
            </Suspense>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
