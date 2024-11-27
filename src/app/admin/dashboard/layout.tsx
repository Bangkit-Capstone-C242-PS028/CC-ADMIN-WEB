"use client";

import AuthGuard from "@/components/auth/auth-guard";
import { Navbar } from "@/components/navbar/navbar";
import { useUser } from "@/lib/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser();

  if (!user) {
    return <AuthGuard />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
