"use client";

import AuthGuard from "@/components/auth/auth-guard";
import { useUser } from "@/lib/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser();

  if (!user) {
    return <AuthGuard />;
  }

  return <div>{children}</div>;
}
