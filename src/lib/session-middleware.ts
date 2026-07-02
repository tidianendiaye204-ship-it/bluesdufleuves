import { getCookie } from "@tanstack/react-start/server";
import { getDb } from "./db";
import { sessions, admins } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface SessionUser {
  id: string;
  email: string;
}

export async function validateSession(): Promise<SessionUser | null> {
  const sessionId = getCookie("admin_session");

  if (!sessionId) {
    return null;
  }

  try {
    const db = getDb();

    const sessionResult = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .limit(1);

    if (sessionResult.length === 0) {
      return null;
    }

    const session = sessionResult[0];

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return null;
    }

    // Get admin details
    const adminResult = await db
      .select()
      .from(admins)
      .where(eq(admins.id, session.adminId))
      .limit(1);

    if (adminResult.length === 0) {
      return null;
    }

    return adminResult[0];
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await validateSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
