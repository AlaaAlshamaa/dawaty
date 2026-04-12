"use client";

import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function diffParts(target: Date) {
  const now = new Date();
  const ms = target.getTime() - now.getTime();
  const clamped = Math.max(0, ms);

  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { ms: clamped, days, hours, minutes, seconds };
}

export default function Countdown({
  dateISO,
  title = "يومنا المميز",
}: {
  dateISO: string;
  title?: string;
}) {
  const target = useMemo(() => new Date(dateISO), [dateISO]);
  const [parts, setParts] = useState(() => diffParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const ended = parts.ms <= 0;

  return (
    <section className="countdown section">
      <div className="container">
        <h2 className="heading-display section-title golden-title">{title}</h2>
        <p className="text-body" style={{ opacity: 0.85, marginTop: 6 }}>
         كونوا معنا .. بدأ العد التنازلي
        </p>

        <div className="countdown-grid" aria-label="العدّ التنازلي">
          <div className="count-card">
            <div className="count-num">{pad(parts.days)}</div>
            <div className="count-label">أيام</div>
          </div>
          <div className="count-card">
            <div className="count-num">{pad(parts.hours)}</div>
            <div className="count-label">ساعات</div>
          </div>
          <div className="count-card">
            <div className="count-num">{pad(parts.minutes)}</div>
            <div className="count-label">دقائق</div>
          </div>
          <div className="count-card">
            <div className="count-num">{pad(parts.seconds)}</div>
            <div className="count-label">ثوانٍ</div>
          </div>
        </div>

        <div className="countdown-datebox">
          {ended ? (
            <span>بدأت المناسبة ❤️</span>
          ) : (
            <span>سيبدأ الحفل قريباً بإذن الله</span>
          )}
        </div>
      </div>
    </section>
  );
}