"use client";

import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        signOut(auth);
        return router.push("/login");
      }}>
      Logout
    </Button>
  );
}
