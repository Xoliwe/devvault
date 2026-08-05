import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 rounded-lg border p-8">
        <h1 className="text-3xl font-bold">
          Welcome to DevVault 
        </h1>

        <p>
          Logged in as:
        </p>

        <p className="font-mono text-sm">
          {user.email}
        </p>
         <LogoutButton />
      </div>
    </main>
  );
}