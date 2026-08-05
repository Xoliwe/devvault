"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();

    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created! Check your email to confirm your account."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div>
          <h1 className="text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join DevVault
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white"
          >
            Sign up
          </button>
        </form>

        {message && (
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}