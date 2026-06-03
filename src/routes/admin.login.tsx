import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { admins, sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, generateId } from "@/lib/auth";
import { setCookie, deleteCookie } from "@tanstack/react-start/server";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof loginSchema>) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    const adminRows = await db.select().from(admins).where(eq(admins.email, data.email));

    if (adminRows.length === 0) {
      return { error: "Identifiants invalides" };
    }

    const admin = adminRows[0];
    const valid = await verifyPassword(data.password, admin.passwordHash);

    if (!valid) {
      return { error: "Identifiants invalides" };
    }

    const sessionId = generateId();
    await db.insert(sessions).values({
      id: sessionId,
      adminId: admin.id,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    setCookie("admin_session", sessionId, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return { success: true };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("admin_session", { path: "/" });
  return { success: true };
});

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await loginAdmin({ data: { email, password } });
    if (res.error) {
      setError(res.error);
    } else {
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-card p-8 border border-border rounded-2xl shadow-sm">
      <h2 className="font-display font-bold text-2xl mb-6 text-center">Connexion Administrateur</h2>
      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
