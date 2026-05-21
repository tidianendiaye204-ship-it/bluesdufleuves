import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "vinxi/http";

export const getSessionId = createServerFn({ method: "GET" }).handler(async () => {
  return getCookie("admin_session");
});

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    // If we're already on login, do nothing
    if (location.pathname === "/admin/login") return;

    const session = await getSessionId();
    if (!session) {
      throw redirect({
        to: "/admin/login",
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border py-4">
        <div className="container-page flex items-center justify-between">
          <h1 className="font-display font-bold text-xl uppercase tracking-wider text-primary">
            Administration
          </h1>
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition">
            Retour au site
          </a>
        </div>
      </header>
      <main className="container-page py-8">
        <Outlet />
      </main>
    </div>
  );
}
