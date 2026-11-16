import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const CSRF_COOKIE_NAME = "csrf_token";

function generateCSRFToken(): string {
  return crypto.randomUUID();
}

function setCSRFCookie(token: string): void {
  setCookie(CSRF_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

function getCSRFCookie(): string | undefined {
  return getCookie(CSRF_COOKIE_NAME);
}

function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFCookie();
  if (!storedToken || !token) {
    return false;
  }
  return storedToken === token;
}

export const getCSRFToken = createServerFn({ method: "POST" }).handler(async () => {
  const existingToken = getCSRFCookie();
  const token = existingToken || generateCSRFToken();
  setCSRFCookie(token);
  return { token };
});

export const validateCSRFTokenServer = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const isValid = validateCSRFToken(data.token);
    return { valid: isValid };
  });
