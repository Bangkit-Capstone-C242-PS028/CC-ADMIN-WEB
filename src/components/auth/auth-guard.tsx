import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthGuard() {
  const pathname = usePathname();

  return (
    <div>
      <pre>You are on {pathname}</pre>
      Please{" "}
      <Link href="/login" className="underline">
        login
      </Link>{" "}
      to continue.
    </div>
  );
}
