"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { THEMES } from "@/lib/themes";
import type { ThemeKey } from "@/types";

type RSVPRow = {
  id: string;
  invite_id: string;
  guest_name: string;
  status: "yes" | "no";
  guests_count: number;
  message: string | null;
  created_at: string;
};

export default function DashboardBySlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [inviteId, setInviteId] = useState<string>("");
  const [themeKey, setThemeKey] = useState<ThemeKey>("elegant");
  const [rsvps, setRsvps] = useState<RSVPRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const theme = THEMES[themeKey];

  const stats = useMemo(() => {
    const yes = rsvps.filter((r) => r.status === "yes");
    const no = rsvps.filter((r) => r.status === "no");
    const totalGuests = yes.reduce((sum, r) => sum + (r.guests_count || 0), 0);

    

    return {
      yesCount: yes.length,
      noCount: no.length,
      totalGuests,
    };
  }, [rsvps]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  function exportCSV() {
    const header = ["الاسم", "الحالة", "عدد الأشخاص", "ملاحظة", "التاريخ"];
    const rows = rsvps.map((r) => [
      r.guest_name,
      r.status === "yes" ? "حضور" : "اعتذار",
      String(r.guests_count ?? ""),
      (r.message ?? "").replaceAll("\n", " "),
      new Date(r.created_at).toLocaleString("ar"),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvps-${slug}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }

  async function loadData() {
    if (!slug) return;

    setLoading(true);
    setErrorMsg(null);

    // Auth guard
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      window.location.href = "/login";
      return;
    }

    // Get invite id + template_id
    const { data: invite, error: inviteErr } = await supabase
      .from("invites")
      .select("id, template_id")
      .eq("slug", slug)
      .single();

    if (inviteErr || !invite?.id) {
      setInviteId("");
      setRsvps([]);
      setErrorMsg("لم يتم العثور على الدعوة أو لا تملكين صلاحية الوصول.");
      setLoading(false);
      return;
    }

    setInviteId(invite.id);
    setThemeKey(((invite.template_id || "elegant") as ThemeKey) ?? "elegant");

    // Fetch RSVPs
    const { data: rsvpsData, error: rsvpsErr } = await supabase
      .from("rsvps")
      .select("id, invite_id, guest_name, status, guests_count, message, created_at")
      .eq("invite_id", invite.id)
      .order("created_at", { ascending: false });

    if (rsvpsErr) {
      setRsvps([]);
      setErrorMsg("تعذر تحميل الردود.");
      setLoading(false);
      return;
    }

    setRsvps((rsvpsData || []) as RSVPRow[]);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const pageBg =
    themeKey === "floral"
      ? "bg-[#fff7fb]"
      : themeKey === "elegant"
      ? "bg-[#0b0b0f]"
      : "bg-[#0f1115]";

  return (
    <div dir="rtl" className="dashboard-golden min-h-screen bg-[var(--dash-bg)] text-[var(--dash-text)]">
      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between  dashboard-header-wrap">
          <h1 className="heading-display text-4xl golden-title">لوحة التحكم</h1>
          {inviteId ? `Slug: ${slug}` : "—"}
          <p className="mt-2 text-sm text-[var(--dash-muted)]">إدارة ردود الدعوة ومتابعة الحضور</p>

        <div className="flex flex-wrap gap-3">
  <button
    onClick={loadData}
    className="dashboard-btn"
  >
    تحديث
  </button>

  <button
    onClick={exportCSV}
    className="dashboard-btn dashboard-btn-outline"
  >
    تصدير CSV
  </button>

  <button
    onClick={logout}
    className="dashboard-btn dashboard-btn-primary"
  >
    تسجيل خروج
  </button>
</div>
        </div>

        {/* Content */}
        {loading ? (
          <div className={`mt-6 rounded-2xl border p-5 `}>
            <div className="text-sm font-bold">جارٍ التحميل…</div>
          </div>
        ) : errorMsg ? (
          <div className={`mt-6 rounded-2xl border p-5 `}>
            <div className="text-sm font-bold">{errorMsg}</div>
          </div>
        ) : (
          <>
            {/* RSVPs Table */}
            <div className="grid grid-cols-3 gap-4 md:grid-cols-3 mt-8  dashboard-grid-wrap">
  <div className="dashboard-stat-card">
    <div className="dashboard-stat-label">عدد الحضور</div>
    <div className="dashboard-stat-value">{stats.yesCount}</div>
  </div>

  <div className="dashboard-stat-card">
    <div className="dashboard-stat-label">عدد المعتذرين</div>
    <div className="dashboard-stat-value">{stats.noCount}</div>
  </div>

  <div className="dashboard-stat-card">
    <div className="dashboard-stat-label">مجموع الأشخاص</div>
    <div className="dashboard-stat-value">{stats.totalGuests}</div>
  </div>
</div>
            {/* RSVPs Table */}
          <div className="dashboard-table-wrap">
  <table className="dashboard-table">
    <thead>
      <tr>
        <th>الاسم</th>
        <th>الحالة</th>
        <th>عدد الأشخاص</th>
        <th>ملاحظة</th>
        <th>التاريخ</th>
      </tr>
    </thead>
    <tbody>
      {rsvps.map((rsvp) => (
        <tr key={rsvp.id}>
          <td>{rsvp.guest_name}</td>
          <td>
            <span className={`status-badge ${rsvp.status === "yes" ? "status-yes" : "status-no"}`}>
              {rsvp.status === "yes" ? "حضور" : "اعتذار"}
            </span>
          </td>
          <td>{rsvp.guests_count}</td>
          <td>{rsvp.message || "-"}</td>
          <td>{new Date(rsvp.created_at).toLocaleDateString("ar")}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  theme,
}: {
  label: string;
  value: number;
  theme: { cardBg: string; border: string; mutedText: string };
}) {
  return (
    <div className={`rounded-2xl border p-4 ${theme.border} ${theme.cardBg}`}>
      <div className={`text-xs ${theme.mutedText}`}>{label}</div>
      <div className="mt-1 text-2xl font-black">{value}</div>
    </div>
  );
}
