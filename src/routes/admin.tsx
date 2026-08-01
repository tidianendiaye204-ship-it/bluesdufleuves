import {
  createFileRoute,
  Outlet,
  redirect,
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { Home, FileText, MessageSquare, Users, LogOut } from "lucide-react";
import { logoutFn } from "./admin.login";

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
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { to: "/admin", label: "Tableau de bord", icon: Home },
    { to: "/admin/articles", label: "Articles", icon: FileText },
    { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
    { to: "/admin/inscriptions", label: "Inscriptions", icon: Users },
  ];

  const handleLogout = async () => {
    if (confirm("Se déconnecter ?")) {
      await logoutFn();
      navigate({ to: "/admin/login" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border flex flex-col shrink-0">
        <div className="p-4 md:p-6 border-b border-border flex justify-between items-center md:block">
          <h1 className="font-display font-bold text-xl uppercase tracking-wider text-primary">
            Admin
          </h1>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition font-medium text-sm"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
        <nav className="flex-1 p-4 md:space-y-2 flex flex-row md:flex-col overflow-x-auto gap-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition font-medium whitespace-nowrap text-sm md:text-base ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} className="md:w-5 md:h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition font-medium"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border py-4">
          <div className="container-page flex items-center justify-between">
            <h2 className="font-bold text-lg">Panel d'administration</h2>
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition">
              Retour au site
            </a>
          </div>
        </header>
        <main className="container-page py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
