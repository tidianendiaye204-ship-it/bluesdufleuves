import { createServerFn } from "@tanstack/react-start";

const CSRF_COOKIE_NAME = "csrf_token";

function generateCSRFToken(): string {
  return crypto.randomUUID();
}

function setCSRFCookie(token: string): void {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { setCookie } = require("@tanstack/react-start/server");
  setCookie(CSRF_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

function getCSRFCookie(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getCookie } = require("@tanstack/react-start/server");
  return getCookie(CSRF_COOKIE_NAME);
}

function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFCookie();
  if (!storedToken || !token) {
    return false;
  }
  return storedToken === token;
}

export const getCSRFToken = createServerFn({ method: "GET" }).handler(async () => {
  const token = generateCSRFToken();
  setCSRFCookie(token);
  return { token };
});

export const validateCSRFTokenServer = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const isValid = validateCSRFToken(data.token);
    return { valid: isValid };
  });
