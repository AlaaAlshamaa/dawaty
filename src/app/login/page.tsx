"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    setMsg("تم تسجيل الدخول ✅");
    setLoading(false);
    router.push("/dashboard/test"); // مؤقتًا
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>تسجيل الدخول</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 12, borderRadius: 10, border: "1px solid #ccc" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10, borderRadius: 10, border: "1px solid #ccc" }}
      />

      <button
        onClick={login}
        disabled={loading}
        style={{ width: "100%", padding: 12, marginTop: 12, borderRadius: 12, border: "none", fontWeight: 700 }}
      >
        {loading ? "..." : "دخول"}
      </button>

      {msg && <div style={{ marginTop: 12, fontWeight: 700 }}>{msg}</div>}
    </div>
  );
}
