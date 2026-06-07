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

import "../styles.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DEFAULT_SEO } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

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
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.png",
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
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
          <Footer />
        </main>
        <PWAInstallPrompt />
      </div>
    </QueryClientProvider>
  );
}
