/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
}
