import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { contacts, inscriptions, articles as articlesTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { FileText, Download, Users, Mail, GraduationCap, BarChart2 } from "lucide-react";
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

  return { recentContacts, recentInscriptions, recentArticles, allInscriptions, allContacts };
});

export const Route = createFileRoute("/admin/")({
  loader: async () => await getAdminData(),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { recentContacts, recentInscriptions, recentArticles, allInscriptions, allContacts } =
    Route.useLoaderData();

  // ──────────────── DATA AGGREGATION FOR CHARTS ────────────────

  // 1. Group registrations by training program
  const formationCounts = allInscriptions.reduce(
    (acc, curr) => {
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

  allInscriptions.forEach((item) => {
    const d = new Date(item.dateInscription);
    const dateStr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
    if (!activityByDate[dateStr]) {
      activityByDate[dateStr] = { date: dateStr, inscriptions: 0, messages: 0 };
    }
    activityByDate[dateStr].inscriptions += 1;
  });

  allContacts.forEach((item) => {
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
    const rows = allInscriptions.map((i) => ({
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
    const rows = allContacts.map((c) => ({
      id: c.id,
      nom: c.nom,
      email: c.email,
      sujet: c.sujet,
      message: c.message,
      dateEnvoi: new Date(c.dateEnvoi).toISOString(),
    }));
    triggerCSVDownload(rows, "contacts.csv", headers);
  };

  const triggerCSVDownload = (data: any[], filename: string, headers: string[]) => {
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
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:bg-muted transition text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download size={14} />
            Export Inscriptions
          </button>
          <button
            onClick={exportContactsCSV}
            className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl font-bold hover:bg-muted transition text-xs uppercase tracking-wider cursor-pointer"
          >
            <Download size={14} />
            Export Contacts
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center gap-5">
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

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center gap-5">
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

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex items-center gap-5">
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
      </div>

      {/* ──────────────── CHARTS SECTION ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Inscriptions by formation */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
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
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
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
              {recentArticles.map((a) => (
                <div key={a.id} className="p-4 bg-muted/50 rounded-lg">
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
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">
            Derniers Messages (Contact)
          </h3>
          {recentContacts.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{c.nom}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.dateEnvoi).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{c.sujet}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.message}</p>
                  <div className="mt-2 text-xs">
                    <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">
            Inscriptions aux Formations
          </h3>
          {recentInscriptions.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucune inscription pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentInscriptions.map((i) => (
                <div key={i.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">
                      {i.prenom} {i.nom}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(i.dateInscription).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary mb-1">{i.formation}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{i.motivation}</p>
                  <div className="mt-2 text-xs flex gap-4">
                    <a href={`mailto:${i.email}`} className="text-primary hover:underline">
                      {i.email}
                    </a>
                    <span>{i.tel}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
