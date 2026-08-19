/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { contacts, inscriptions, articles as articlesTable, newsletter } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  FileText,
  Download,
  Users,
  Mail,
  GraduationCap,
  BarChart2,
  Trash2,
  Reply,
  Search,
  ChevronDown,
  Rss,
} from "lucide-react";
import { requireAuth } from "@/lib/session-middleware";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const getAdminData = createServerFn({ method: "GET" }).handler(async () => {
  // Validate session
  await requireAuth();

  const db = getDb();

  const recentContacts = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.dateEnvoi))
    .limit(10);
  const recentInscriptions = await db
    .select()
    .from(inscriptions)
    .orderBy(desc(inscriptions.dateInscription))
    .limit(10);
  const recentArticles = await db
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.publishedAt))
    .limit(5);

  // Fetch all for charts and CSV
  const allInscriptions = await db
    .select()
    .from(inscriptions)
    .orderBy(desc(inscriptions.dateInscription));
  const allContacts = await db.select().from(contacts).orderBy(desc(contacts.dateEnvoi));
  const allNewsletter = await db.select().from(newsletter).orderBy(desc(newsletter.dateInscription));

  return { recentContacts, recentInscriptions, recentArticles, allInscriptions, allContacts, allNewsletter };
});

const updateContactStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; status: "non_lu" | "lu" | "traite" }) => d)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.update(contacts).set({ statut: data.status }).where(eq(contacts.id, data.id));
    return { success: true };
  });

const updateInscriptionStatusFn = createServerFn({ method: "POST" })
  .validator((d: { id: number; status: "en_attente" | "accepte" | "refuse" }) => d)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.update(inscriptions).set({ statut: data.status }).where(eq(inscriptions.id, data.id));
    return { success: true };
  });

const deleteContactFn = createServerFn({ method: "POST" })
  .validator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.delete(contacts).where(eq(contacts.id, data.id));
    return { success: true };
  });

const deleteInscriptionFn = createServerFn({ method: "POST" })
  .validator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.delete(inscriptions).where(eq(inscriptions.id, data.id));
    return { success: true };
  });

const deleteNewsletterFn = createServerFn({ method: "POST" })
  .validator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.delete(newsletter).where(eq(newsletter.id, data.id));
    return { success: true };
  });

export const Route = createFileRoute("/admin/")({
  loader: async () => await getAdminData(),
  component: AdminDashboard,
});

function AdminDashboard() {
  const router = useRouter();
  const { recentArticles, allInscriptions, allContacts, allNewsletter } = Route.useLoaderData();

  const [contactSearch, setContactSearch] = useState("");
  const [inscriptionSearch, setInscriptionSearch] = useState("");
  const [newsletterSearch, setNewsletterSearch] = useState("");
  const [visibleContactsCount, setVisibleContactsCount] = useState(10);
  const [visibleInscriptionsCount, setVisibleInscriptionsCount] = useState(10);
  const [visibleNewsletterCount, setVisibleNewsletterCount] = useState(20);

  const handleUpdateContactStatus = async (id: number, status: "non_lu" | "lu" | "traite") => {
    await updateContactStatusFn({ data: { id, status } });
    router.invalidate();
  };

  const handleUpdateInscriptionStatus = async (
    id: number,
    status: "en_attente" | "accepte" | "refuse",
  ) => {
    await updateInscriptionStatusFn({ data: { id, status } });
    router.invalidate();
  };

  const getInscriptionStatusColor = (status: string) => {
    switch (status) {
      case "accepte":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "refuse":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
    }
  };

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case "lu":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      case "traite":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      await deleteContactFn({ data: { id } });
      router.invalidate();
    }
  };

  const handleDeleteInscription = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette inscription ?")) {
      await deleteInscriptionFn({ data: { id } });
      router.invalidate();
    }
  };

  const handleDeleteNewsletter = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet abonné ?")) {
      await deleteNewsletterFn({ data: { id } });
      router.invalidate();
    }
  };

  const allFilteredContacts = allContacts.filter((c: any) => {
    if (!contactSearch) return true;
    const term = contactSearch.toLowerCase();
    return (
      c.nom.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.sujet.toLowerCase().includes(term)
    );
  });
  const filteredContacts = allFilteredContacts.slice(0, visibleContactsCount);

  const allFilteredInscriptions = allInscriptions.filter((i: any) => {
    if (!inscriptionSearch) return true;
    const term = inscriptionSearch.toLowerCase();
    return (
      i.prenom.toLowerCase().includes(term) ||
      i.nom.toLowerCase().includes(term) ||
      i.email.toLowerCase().includes(term) ||
      i.formation.toLowerCase().includes(term)
    );
  });
  const filteredInscriptions = allFilteredInscriptions.slice(0, visibleInscriptionsCount);

  const allFilteredNewsletter = allNewsletter.filter((n: any) => {
    if (!newsletterSearch) return true;
    return n.email.toLowerCase().includes(newsletterSearch.toLowerCase());
  });
  const filteredNewsletter = allFilteredNewsletter.slice(0, visibleNewsletterCount);

  // ──────────────── DATA AGGREGATION FOR CHARTS ────────────────

  // 1. Group registrations by training program
  const formationCounts = allInscriptions.reduce(
    (acc: Record<string, number>, curr: any) => {
      const key = curr.formation || "Autre";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const formationChartData = Object.entries(formationCounts).map(([name, value]) => ({
    name: name.length > 22 ? name.substring(0, 20) + "..." : name,
    inscriptions: value,
  }));

  // 2. Timeline of inscriptions and messages (last 7 active days)
  const activityByDate = {} as Record<
    string,
    { date: string; inscriptions: number; messages: number }
  >;

  allInscriptions.forEach((item: any) => {
    const d = new Date(item.dateInscription);
    const dateStr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
    if (!activityByDate[dateStr]) {
      activityByDate[dateStr] = { date: dateStr, inscriptions: 0, messages: 0 };
    }
    activityByDate[dateStr].inscriptions += 1;
  });

  allContacts.forEach((item: any) => {
    const d = new Date(item.dateEnvoi);
    const dateStr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
    if (!activityByDate[dateStr]) {
      activityByDate[dateStr] = { date: dateStr, inscriptions: 0, messages: 0 };
    }
    activityByDate[dateStr].messages += 1;
  });

  const timelineChartData = Object.values(activityByDate)
    .sort((a, b) => {
      const [dayA, monthA] = a.date.split("/").map(Number);
      const [dayB, monthB] = b.date.split("/").map(Number);
      return monthA !== monthB ? monthA - monthB : dayA - dayB;
    })
    .slice(-7);

  // ──────────────── CSV EXPORT UTILITY ────────────────
  const exportInscriptionsCSV = () => {
    const headers = [
      "id",
      "prenom",
      "nom",
      "email",
      "tel",
      "formation",
      "motivation",
      "dateInscription",
      "statut",
    ];
    const rows = allInscriptions.map((i: any) => ({
      id: i.id,
      prenom: i.prenom,
      nom: i.nom,
      email: i.email,
      tel: i.tel,
      formation: i.formation,
      motivation: i.motivation,
      dateInscription: new Date(i.dateInscription).toISOString(),
      statut: i.statut,
    }));
    triggerCSVDownload(rows, "inscriptions.csv", headers);
  };

  const exportContactsCSV = () => {
    const headers = ["id", "nom", "email", "sujet", "message", "dateEnvoi"];
    const rows = allContacts.map((c: any) => ({
      id: c.id,
      nom: c.nom,
      email: c.email,
      sujet: c.sujet,
      message: c.message,
      dateEnvoi: new Date(c.dateEnvoi).toISOString(),
    }));
    triggerCSVDownload(rows, "contacts.csv", headers);
  };

  const exportNewsletterCSV = () => {
    const headers = ["id", "email", "dateInscription"];
    const rows = allNewsletter.map((n: any) => ({
      id: n.id,
      email: n.email,
      dateInscription: new Date(n.dateInscription).toISOString(),
    }));
    triggerCSVDownload(rows, "newsletter.csv", headers);
  };

  const triggerCSVDownload = (
    data: Record<string, unknown>[],
    filename: string,
    headers: string[],
  ) => {
    const csvRows = [];
    csvRows.push(headers.join(","));
    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header];
        const escaped = ("" + (val || "")).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    const csvString = csvRows.join("\r\n");
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display uppercase tracking-tight">
            Tableau de Bord Admin
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Suivi des formations, inscriptions, messages et publications.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportInscriptionsCSV}
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 shadow-sm hover:shadow text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download size={14} />
            Export Inscriptions
          </button>
          <button
            onClick={exportContactsCSV}
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 shadow-sm hover:shadow text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download size={14} />
            Export Contacts
          </button>
          <button
            onClick={exportNewsletterCSV}
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:bg-emerald-500/5 hover:border-emerald-500/30 hover:text-emerald-500 transition-all duration-300 shadow-sm hover:shadow text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download size={14} />
            Export Newsletter
          </button>
          <Link
            to="/admin/articles"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold hover:bg-primary/95 transition text-xs uppercase tracking-wider shadow-lg"
          >
            <FileText size={14} />
            Gérer les articles
          </Link>
        </div>
      </div>

      {/* Highlights Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:-translate-y-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="p-4 bg-primary/10 text-primary rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="block text-2xl font-black">{allInscriptions.length}</span>
            <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
              Inscriptions Totales
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:-translate-y-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <Mail size={24} />
          </div>
          <div>
            <span className="block text-2xl font-black">{allContacts.length}</span>
            <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
              Messages Reçus
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:-translate-y-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="p-4 bg-amber-500/10 text-amber-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <span className="block text-2xl font-black">{recentArticles.length}</span>
            <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
              Articles Publiés
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:-translate-y-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="p-4 bg-purple-500/10 text-purple-600 rounded-xl">
            <Rss size={24} />
          </div>
          <div>
            <span className="block text-2xl font-black">{allNewsletter.length}</span>
            <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
              Abonnés Newsletter
            </span>
          </div>
        </div>
      </div>

      {/* ──────────────── CHARTS SECTION ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Inscriptions by formation */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            <span>Répartition des Inscriptions par Formation</span>
          </h3>
          <div className="h-80 w-full text-xs">
            {formationChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Aucune donnée disponible
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formationChartData} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    angle={-15}
                    textAnchor="end"
                    interval={0}
                    stroke="currentColor"
                    opacity={0.7}
                  />
                  <YAxis allowDecimals={false} stroke="currentColor" opacity={0.7} />
                  <Tooltip cursor={{ fill: "rgba(12, 74, 110, 0.05)" }} />
                  <Bar dataKey="inscriptions" fill="#0c4a6e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Timeline activity */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            <span>Activité des Inscriptions & Messages Récentes</span>
          </h3>
          <div className="h-80 w-full text-xs">
            {timelineChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Aucune activité récente
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" stroke="currentColor" opacity={0.7} />
                  <YAxis allowDecimals={false} stroke="currentColor" opacity={0.7} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    name="Inscriptions"
                    type="monotone"
                    dataKey="inscriptions"
                    stroke="#0c4a6e"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    name="Messages"
                    type="monotone"
                    dataKey="messages"
                    stroke="#10b981"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">Derniers Articles</h3>
          {recentArticles.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun article pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((a: any) => (
                <div
                  key={a.id}
                  className="p-4 bg-muted/30 hover:bg-muted/80 border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold line-clamp-1">{a.title}</span>
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 border-b border-border pb-4">
            <h3 className="font-bold text-xl">Derniers Messages (Contact)</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher (nom, email...)"
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          {filteredContacts.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucun message ne correspond à votre recherche.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((c: any) => (
                <div
                  key={c.id}
                  className="p-4 bg-muted/30 hover:bg-muted/80 border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2 gap-2">
                    <span className="font-semibold">{c.nom}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <select
                        value={c.statut}
                        onChange={(e) =>
                          handleUpdateContactStatus(
                            c.id,
                            e.target.value as "non_lu" | "lu" | "traite",
                          )
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer appearance-none transition-colors ${getContactStatusColor(c.statut)} outline-none focus:ring-2 focus:ring-primary/20`}
                      >
                        <option value="non_lu">Non Lu</option>
                        <option value="lu">Lu</option>
                        <option value="traite">Traité</option>
                      </select>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.dateEnvoi).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{c.sujet}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.message}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`mailto:${c.email}?subject=RE: ${c.sujet}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                    >
                      <Reply size={14} />
                      Répondre
                    </a>
                    <button
                      onClick={() => handleDeleteContact(c.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
              {allFilteredContacts.length > visibleContactsCount && (
                <button
                  onClick={() => setVisibleContactsCount((prev) => prev + 10)}
                  className="w-full mt-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex justify-center items-center gap-2 cursor-pointer"
                >
                  Voir plus <ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 border-b border-border pb-4">
            <h3 className="font-bold text-xl">Inscriptions aux Formations</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher (nom, formation...)"
                value={inscriptionSearch}
                onChange={(e) => setInscriptionSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          {filteredInscriptions.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucune inscription ne correspond à votre recherche.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredInscriptions.map((i: any) => (
                <div
                  key={i.id}
                  className="p-4 bg-muted/30 hover:bg-muted/80 border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300 hover:shadow-sm group"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2 gap-2">
                    <span className="font-semibold">
                      {i.prenom} {i.nom}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <select
                        value={i.statut}
                        onChange={(e) =>
                          handleUpdateInscriptionStatus(
                            i.id,
                            e.target.value as "en_attente" | "accepte" | "refuse",
                          )
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer appearance-none transition-colors ${getInscriptionStatusColor(i.statut)} outline-none focus:ring-2 focus:ring-primary/20`}
                      >
                        <option value="en_attente">En attente</option>
                        <option value="accepte">Accepté</option>
                        <option value="refuse">Refusé</option>
                      </select>
                      <span className="text-xs text-muted-foreground">
                        {new Date(i.dateInscription).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary mb-1">{i.formation}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{i.motivation}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${i.email}?subject=Concernant votre inscription à ${i.formation}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                    >
                      <Reply size={14} />
                      Répondre
                    </a>
                    <button
                      onClick={() => handleDeleteInscription(i.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                    <span className="ml-auto text-xs text-muted-foreground">{i.tel}</span>
                  </div>
                </div>
              ))}
              {allFilteredInscriptions.length > visibleInscriptionsCount && (
                <button
                  onClick={() => setVisibleInscriptionsCount((prev) => prev + 10)}
                  className="w-full mt-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex justify-center items-center gap-2 cursor-pointer"
                >
                  Voir plus <ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 border-b border-border pb-4">
          <h3 className="font-bold text-xl">Abonnés Newsletter ({allNewsletter.length})</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un email..."
              value={newsletterSearch}
              onChange={(e) => setNewsletterSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        {filteredNewsletter.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun abonné trouvé.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredNewsletter.map((n: any) => (
                <div
                  key={n.id}
                  className="p-3 bg-muted/30 border border-transparent hover:border-primary/20 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-sm truncate">{n.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(n.dateInscription).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNewsletter(n.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-all cursor-pointer shrink-0"
                    title="Supprimer l'abonné"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            {allFilteredNewsletter.length > visibleNewsletterCount && (
              <button
                onClick={() => setVisibleNewsletterCount((prev) => prev + 20)}
                className="w-full mt-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex justify-center items-center gap-2 cursor-pointer"
              >
                Voir plus <ChevronDown size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
