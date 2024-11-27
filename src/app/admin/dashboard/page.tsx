"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  if (!user) {
    redirect("/login");
  }
  console.log(user);

  return (
    <>
      <Button onClick={() => signOut(auth)}>Logout</Button>
      <div>Dashboard</div>
    </>
  );
}
