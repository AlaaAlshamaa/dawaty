"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

import type { Invite } from "@/types";


export default function InvitePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [invite, setInvite] = useState<Invite | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  
  const [guestName, setGuestName] = useState("");
const [status, setStatus] = useState<"yes" | "no">("yes");
const [guestsCount, setGuestsCount] = useState(1);
const [message, setMessage] = useState("");
const [sentMsg, setSentMsg] = useState<string | null>(null);

useEffect(() => {
    if (status === "no") {
      setGuestsCount(1);
    }
  }, [status]);
  

  useEffect(() => {
    if (!slug) return;

    (async () => {
      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        setErr(error.message);
        setInvite(null);
      } else {
        setInvite(data as Invite);
      }

      setLoading(false);
    })();
  }, [slug]);

  const eventDate = useMemo(() => {
    if (!invite) return "";
    return new Date(invite.event_at).toLocaleString("ar", {
      dateStyle: "full",
      timeStyle: "short",
    });
  }, [invite]);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (err) return <div style={{ padding: 24 }}>Error: {err}</div>;
  if (!invite) return <div style={{ padding: 24 }}>الدعوة غير موجودة</div>;

  async function submitRSVP() {
    if (!invite) return;
  
    if (!guestName.trim()) {
      setSentMsg("الرجاء إدخال الاسم");
      return;
    }
  
    const { error } = await supabase.from("rsvps").insert({
      invite_id: invite.id,
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

    return <TemplateRenderer invite={invite} />;

}
