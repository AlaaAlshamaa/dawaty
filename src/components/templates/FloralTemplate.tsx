"use client";

import SectionCard from "@/components/shared/SectionCard";
import Countdown from "@/components/shared/Countdown";
import EnvelopeRSVP from "@/components/shared/EnvelopeRSVP";
import BottomNav from "@/components/shared/BottomNav";
import { THEMES } from "@/lib/themes";
import type { Invite } from "@/types";

function fmt(iso?: string | null) {
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

export default function FloralTemplate({ invite }: { invite: Invite }) {
  const theme = THEMES.floral;
  const dt = fmt(invite.event_at || null);
  const cover = invite.cover_image_url || "";
  const gallery = (invite.gallery_image_urls || []).filter(Boolean);

  return (
    <div dir="rtl" className="min-h-screen bg-[#fff7fb] text-[#1c0f18]">
      {/* HERO */}
      <div id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-200/35 blur-3xl" />
          <div className="absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-fuchsia-200/25 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-md px-5 pt-10 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold text-[#7a2b52]">
            ✿ دعوة خاصة
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight">
            {invite.title || "دعوة زفاف"}
          </h1>

          <p className="mt-2 text-sm leading-7 text-[#6a4056]">
            {invite.host_names || "نورتونا"}
          </p>

          {/* Paper card (cover + date) */}
          <div className="mt-6 overflow-hidden rounded-[28px] border border-[#f0cfe2] bg-white shadow-sm">
            {cover ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt="cover"
                  className="h-56 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>
            ) : (
              <div className="h-40 bg-gradient-to-r from-[#fff0f7] via-[#fff8e6] to-[#fff0f7]" />
            )}

            <div className="p-5">
              {/* Calendar block */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-[#fff0f7]">
                  <div className="text-xs font-extrabold text-[#7a2b52]/70">
                    {dt?.month || "---"}
                  </div>
                  <div className="text-2xl font-black tabular-nums text-[#1c0f18]">
                    {dt?.day || "--"}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm font-black text-[#1c0f18]">
                    {dt?.weekday || "—"}
                  </div>
                  <div className="mt-1 text-sm text-[#6a4056]">
                    {dt?.full || "—"} • {dt?.time || "—"}
                  </div>
                </div>

                <div className="rounded-full bg-[#fff8e6] px-3 py-1 text-xs font-black text-[#7a5a1a]">
                  ✨
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={invite.maps_url || "#location"}
                  className="rounded-2xl border border-[#f0cfe2] bg-white px-4 py-3 text-center text-sm font-extrabold text-[#1c0f18]"
                >
                  📍 الموقع
                </a>
                <a
                  href="#rsvp"
                  className="rounded-2xl bg-[#1c0f18] px-4 py-3 text-center text-sm font-extrabold text-white"
                >
                  ✉️ تأكيد
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="mx-auto max-w-md px-5 pb-24">
        <div className="mt-6">
          <SectionCard
            id="location"
            title="الموقع"
            subtitle="افتح الموقع على الخرائط"
            theme={theme}
          >
            <div className="space-y-3">
              <div className="text-sm font-extrabold">{invite.location_name || "—"}</div>

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
                <div className="text-sm text-[#6a4056]">لا يوجد رابط خرائط</div>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="mt-6">
          <SectionCard id="details" title="التفاصيل" theme={theme}>
            <div className="space-y-4 text-sm leading-7 text-[#5b344a]">
              {invite.notes ? (
                <p className="whitespace-pre-wrap">{invite.notes}</p>
              ) : (
                <p>نتشرف بحضوركم ومشاركتكم فرحتنا ✨</p>
              )}

              {gallery.length > 0 ? (
                <div>
                  <div className="mb-3 text-sm font-black text-[#7a2b52]">
                    معرض الصور
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {gallery.slice(0, 9).map((src, idx) => (
                      <div
                        key={idx}
                        className="aspect-square overflow-hidden rounded-2xl bg-[#fff0f7]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`g-${idx}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </SectionCard>
        </div>

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

        {invite.event_at ? (
          <div className="mt-6">
            <SectionCard id="countdown" title="العد التنازلي" subtitle="نلتقي قريباً 💗" theme={theme}>
              <Countdown targetISO={invite.event_at} theme={theme} />
            </SectionCard>
          </div>
        ) : null}
      </div>

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
