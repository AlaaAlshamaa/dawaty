"use client";

import { useEffect, useState } from "react";
import RSVPForm from "@/components/RSVPForm";

export default function EnvelopeRSVP({
  inviteId,
  theme,
  title = "تأكيد الحضور",
  hint = "اضغطي على الظرف 👇",
}: {
  inviteId: string;
  theme: {
    cardBg: string;
    border: string;
    primary: string;
    text: string;
    mutedText: string;
    inputBg: string;
  };
  title?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="text-center">
        <div className={`text-sm font-bold ${theme.text}`}>{title}</div>
        <div className={`mt-1 text-sm ${theme.mutedText}`}>{hint}</div>

        <button
          onClick={() => setOpen(true)}
          className={`mt-4 w-full rounded-3xl border p-5 ${theme.cardBg} ${theme.border}`}
        >
          {/* Envelope */}
          <div className="relative mx-auto h-28 w-full max-w-sm overflow-hidden rounded-2xl">
            <div className="absolute inset-0 opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
              }}
            />
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-1/2 border-r border-white/15" />
              <div className="absolute right-0 top-0 h-full w-1/2" />
              <div className="absolute inset-x-0 top-0 h-1/2 border-b border-white/15" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                افتح الظرف ✉️
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{
                clipPath: "polygon(0 100%, 50% 20%, 100% 100%, 100% 100%, 0 100%)",
                background: "rgba(255,255,255,0.12)",
              }}
            />
          </div>
        </button>
      </div>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="close"
          />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2">
            <div className={`rounded-3xl border p-5 ${theme.cardBg} ${theme.border} ${theme.text}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="text-base font-black">تأكيد الحضور</div>
                <button
                  onClick={() => setOpen(false)}
                  className={`rounded-xl border px-3 py-1 text-sm ${theme.border}`}
                >
                  إغلاق
                </button>
              </div>

              <div className="mt-3">
                <RSVPForm inviteId={inviteId} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
