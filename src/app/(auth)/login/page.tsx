"use client";

import AuthCard from "@/components/auth/auth-card";
import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const user = useUser();
  const router = useRouter();
  if (user) {
    return router.push("/admin");
  }

  return <AuthCard />;
}
