import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/login");
  return <div>Home</div>;
}
