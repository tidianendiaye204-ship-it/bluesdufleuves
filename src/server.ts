import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getDb } from "./lib/db";
import { articles } from "./db/schema";
import { eq } from "drizzle-orm";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

import * as serverEntryModule from "@tanstack/react-start/server-entry";

async function getServerEntry(): Promise<ServerEntry> {
  return (
    (serverEntryModule as { default?: ServerEntry }).default ??
    (serverEntryModule as unknown as ServerEntry)
  );
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetch(request: Request, env: any, ctx: unknown) {
    try {
      if (typeof process !== "undefined" && process.env) {
        Object.assign(process.env, env);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).process = { env: { ...env } };
      }
      // Always store full env on globalThis to preserve D1/KV object bindings
      // (process.env only holds string values reliably)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).__CF_ENV__ = env;

      if (env?.MY_RATE_LIMITER) {
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const { success } = await env.MY_RATE_LIMITER.limit({ key: ip });
        if (!success) {
          return new Response("Too Many Requests", { status: 429 });
        }
      }

      // Désactivé pour la présentation : pas de dépendance à la BD
      // if (env?.DB) {
      //   await ensureD1Schema(env.DB);
      // }

      const urlObj = new URL(request.url);

      // Intercepter la requête pour le Sitemap XML dynamique
      if (urlObj.pathname === "/api/sitemap.xml") {
        const db = getDb();
        const publishedArticles = await db
          .select()
          .from(articles)
          .where(eq(articles.isPublished, true));
        const staticPages = [
          "",
          "/contact",
          "/blues-du-fleuve",
          "/nann-k-media",
          "/formations",
          "/nannka-tv",
          "/billetterie",
        ];
        const baseUrl = "https://lesbluesdufleuve.sn";
        const date = new Date().toISOString().split("T")[0];
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        staticPages.forEach((page) => {
          xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>\n    <priority>${page === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
        });
        publishedArticles.forEach((article: typeof articles.$inferSelect) => {
          const articleDate = new Date(article.publishedAt || article.createdAt);
          xml += `  <url>\n    <loc>${baseUrl}/articles/${article.slug}</loc>\n    <lastmod>${articleDate.toISOString().split("T")[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });
        xml += `</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "text/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
          },
        });
      }

      // Intercepter la requête pour la recherche globale
      if (urlObj.pathname === "/api/search") {
        const q = urlObj.searchParams.get("q");
        if (!q) return new Response("[]", { headers: { "Content-Type": "application/json" } });

        const db = getDb();
        const searchResults = await db
          .select({ title: articles.title, slug: articles.slug, category: articles.category })
          .from(articles)
          .where(eq(articles.isPublished, true)) // Temporary fallback for basic filtering
          .limit(10);

        // On filtre en JS car l'import dynamique de "like" pose parfois des problèmes selon le module
        const filtered = searchResults.filter(
          (a: { title: string; slug: string; category: string }) =>
            a.title.toLowerCase().includes(q.toLowerCase()),
        );

        return new Response(JSON.stringify(filtered), {
          headers: { "Content-Type": "application/json" },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

      const newResponse = new Response(normalizedResponse.body, normalizedResponse);

      // En-têtes de sécurité (Lighthouse Best Practices)
      newResponse.headers.set("X-Content-Type-Options", "nosniff");
      newResponse.headers.set("X-Frame-Options", "DENY");
      newResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

      const url = new URL(request.url);

      // Cache ultra-agressif (1 an) pour les assets statiques (images, css, js, fonts)
      if (url.pathname.match(/\.(jpg|jpeg|png|webp|avif|css|js|woff2)$/)) {
        newResponse.headers.set("Cache-Control", "public, max-age=31536000, immutable");
      }
      // Mise en cache intelligente pour le HTML (stale-while-revalidate)
      else if (url.pathname.endsWith("/") || url.pathname.endsWith(".html")) {
        newResponse.headers.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        );
      }

      return newResponse;
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
