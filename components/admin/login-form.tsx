"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (authError) {
      setError("No pudimos iniciar sesion. Revisa el correo y la contrasena.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-seashell p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[1.5rem] bg-white p-8 shadow-soft">
        <p className="font-title text-4xl">Origen Admin</p>
        <p className="mt-2 text-sm text-ink/60">Ingresa con el usuario creado en Supabase Auth.</p>
        <label className="mt-8 block text-sm font-semibold">Correo</label>
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-pastel bg-cultured px-4 py-3 outline-none focus:border-spanish" />
        <label className="mt-5 block text-sm font-semibold">Contrasena</label>
        <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-pastel bg-cultured px-4 py-3 outline-none focus:border-spanish" />
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-7 w-full rounded-full bg-ink px-5 py-3 font-bold text-white disabled:opacity-60">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
