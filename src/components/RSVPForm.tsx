"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Theme } from "@/types";

const DEFAULT_THEME: Theme = {
    cardBg: "#ffffff",
    border: "#e5e7eb",
    primary: "#7c3aed",
    text: "#111827",
    mutedText: "#6b7280",
    inputBg: "#ffffff",
  };
  

  export default function RSVPForm({
    inviteId,
    theme,
  }: {
    inviteId: string;
    theme?: Theme;
  })  {
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<"yes" | "no">("yes");
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState("");
  const [sentMsg, setSentMsg] = useState<string | null>(null);
  const t = theme ?? DEFAULT_THEME;


  useEffect(() => {
    if (status === "no") setGuestsCount(1);
  }, [status]);

  async function submitRSVP() {
    if (!guestName.trim()) {
      setSentMsg("الرجاء إدخال الاسم");
      return;
    }

    const { error } = await supabase.from("rsvps").insert({
      invite_id: inviteId,
      guest_name: guestName.trim(),
      status,
      guests_count: guestsCount,
      message: message.trim() || null,
    });

    if (error) {
      setSentMsg("حدث خطأ أثناء الإرسال");
      return;
    }

    setSentMsg("تم تسجيل ردّك بنجاح ✅");
    setGuestName("");
    setGuestsCount(1);
    setMessage("");
    setStatus("yes");
  }

  const inputStyle = {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: `1px solid ${t.border}`,
    background: t.inputBg,
    color: t.text,
    outline: "none",
  } as const;

  return (
    <div
      style={{
        marginTop: 18,
        padding: 16,
        borderRadius: 18,
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        color: t.text,
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="الاسم"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: 14, color: t.text }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              checked={status === "yes"}
              onChange={() => setStatus("yes")}
              className="gold-radio"
            />{" "}
            حضور
          </label>

          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              checked={status === "no"}
              onChange={() => setStatus("no")}
              className="gold-radio"
            />{" "}
            اعتذار
          </label>
        </div>

        {status === "yes" && (
           <div style={{ display: "grid", gap: 8 }}>
    <h4>
      عدد الأشخاص:
    </h4>

    <input
      type="number"
      min={1}
      max={20}
      value={guestsCount}
      onChange={(e) => setGuestsCount(Number(e.target.value))}
      style={inputStyle}
      
    />
  </div>
        )}

        <textarea
          placeholder="ملاحظة (اختياري)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <button
          onClick={submitRSVP}
          style={{
            padding: 12,
            borderRadius: 14,
            border: `1px solid ${t.border}`,
            background: "var(--color-gold-dark)",
            color:  "var(--color-cream)"  ,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          إرسال
        </button>

        {sentMsg && <div style={{ fontWeight: 800 }}>{sentMsg}</div>}
      </div>
    </div>
  );
}
