"use client";

import AuthGuard from "@/components/auth/auth-guard";
import { useUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DermaScan: Admin Dashboard",
  description: "DermaScan: Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser();

  if (!user) {
    return <AuthGuard />;
  }

  return <div>{children}</div>;
}
