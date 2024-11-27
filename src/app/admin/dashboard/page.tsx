import LogoutButton from "@/components/auth/logout-button";
import { DoctorsAction } from "@/server/actions/doctors-action";

export default async function Dashboard() {
  const doctors = await DoctorsAction();

  console.log(doctors);

  return (
    <>
      <LogoutButton />
      <h1>Dashboard</h1>
    </>
  );
}
