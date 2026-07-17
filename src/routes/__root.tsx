import "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb, withRetry } from "@/lib/db";
import { newsletter } from "@/db/schema";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../styles.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DEFAULT_SEO } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const subscribeNewsletterFn = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof newsletterSchema>) => newsletterSchema.parse(data))
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
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap",
      },
      {
        rel: "icon",
        type: "image/jpeg",
        href: "/logo the village.jpg",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo the village.jpg",
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
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsHydrated(true);
    // Enregistrer le service worker pour le PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès:", registration);
        })
        .catch((error) => {
          console.error("Échec de l'enregistrement du Service Worker:", error);
        });
    }
  }, []);

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <CustomCursor />
        <div className="flex flex-col min-h-screen">
          {/* Skip to Content Link */}
          <a
            href="#main-content"
            className="fixed -top-10 left-0 bg-primary text-primary-foreground px-4 py-2 z-50 transition-all duration-200 focus:top-0"
          >
            {t("root.skipToContent")}
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <PWAInstallPrompt />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
