import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

import * as serverEntryModule from "@tanstack/react-start/server-entry";

async function getServerEntry(): Promise<ServerEntry> {
  return (serverEntryModule as { default?: ServerEntry }).default ?? (serverEntryModule as unknown as ServerEntry);
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

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

      const newResponse = new Response(normalizedResponse.body, normalizedResponse);
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
