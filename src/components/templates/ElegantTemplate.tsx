"use client";

import SectionCard from "@/components/shared/SectionCard";
import Countdown from "@/components/shared/Countdown";
import EnvelopeRSVP from "@/components/shared/EnvelopeRSVP";
import BottomNav from "@/components/shared/BottomNav";
import { THEMES } from "@/lib/themes";
import type { Invite } from "@/types";

function formatHeaderDate(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;

  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const weekday = new Intl.DateTimeFormat("ar", { weekday: "long" }).format(d);
  const full = new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("ar", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

  return { month, day, weekday, full, time };
}

export default function ElegantTemplate({ invite }: { invite: Invite }) {
  const theme = THEMES.elegant;
  const dt = formatHeaderDate(invite.event_at || null);

  const cover = invite.cover_image_url || "";
  const gallery = (invite.gallery_image_urls || []).filter(Boolean);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0b0b0f] text-white">
      {/* HERO */}
      <div id="home" className="relative overflow-hidden">
        {/* cover */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: cover ? `url(${cover})` : undefined,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-[#0b0b0f]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.18) 0, transparent 45%)",
          }}
        />

        <div className="relative mx-auto max-w-md px-5 pt-10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            دعوة خاصة
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight">
            {invite.title || "دعوة زفاف"}
          </h1>

          <p className="mt-2 text-white/80">
            {invite.host_names || "نورتونا بوجودكم"}
          </p>

          {/* Calendar block (Eventy-like) */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/30">
                  <div className="text-xs font-bold text-white/70">
                    {dt?.month || "---"}
                  </div>
                  <div className="text-2xl font-black tabular-nums">
                    {dt?.day || "--"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-black">{dt?.weekday || "—"}</div>
                  <div className="mt-1 text-sm text-white/70">
                    {dt?.full || "—"} • {dt?.time || "—"}
                  </div>
                </div>
              </div>

              <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                💍
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={invite.maps_url || "#location"}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-bold"
            >
              📍 الموقع
            </a>
            <a
              href="#rsvp"
              className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-black"
            >
              ✉️ تأكيد الحضور
            </a>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="mx-auto max-w-md px-5 pb-24">
        {/* Location */}
        <div className="mt-6">
          <SectionCard
            id="location"
            title="الموقع"
            subtitle="اضغط لفتح الموقع على الخرائط"
            theme={theme}
          >
            <div className="space-y-3">
              <div className="text-sm font-semibold">
                {invite.location_name || "—"}
              </div>

              {invite.maps_url ? (
                <a
                  href={invite.maps_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-black ${theme.primary}`}
                >
                  فتح الخرائط
                </a>
              ) : (
                <div className="text-sm text-white/60">لا يوجد رابط خرائط</div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Details */}
        <div className="mt-6">
          <SectionCard id="details" title="التفاصيل" theme={theme}>
            <div className="space-y-4 text-sm leading-7 text-white/80">
              {invite.notes ? (
                <p className="whitespace-pre-wrap">{invite.notes}</p>
              ) : (
                <p>نتشرف بحضوركم ومشاركتكم فرحتنا ✨</p>
              )}

              {/* Gallery */}
              {gallery.length > 0 ? (
                <div>
                  <div className="mb-3 text-sm font-black text-white">
                    صور
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {gallery.slice(0, 6).map((src, idx) => (
                      <div
                        key={idx}
                        className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`img-${idx}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </SectionCard>
        </div>

        {/* RSVP */}
        <div className="mt-6">
          <SectionCard
            id="rsvp"
            title="تأكيد الحضور"
            subtitle="اضغط على الظرف لفتح النموذج"
            theme={theme}
          >
            <EnvelopeRSVP inviteId={invite.id} theme={theme} />
          </SectionCard>
        </div>

        {/* Countdown */}
        {invite.event_at ? (
          <div className="mt-6">
          
          </div>
        ) : null}
      </div>

      {/* Bottom Nav */}
      <BottomNav
        theme={theme}
        items={[
          { id: "home", label: "الرئيسية" },
          { id: "location", label: "الموقع" },
          { id: "details", label: "التفاصيل" },
          { id: "rsvp", label: "تأكيد" },
        ]}
      />
    </div>
  );
}
