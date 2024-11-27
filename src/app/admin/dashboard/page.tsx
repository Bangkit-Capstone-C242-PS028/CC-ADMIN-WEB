import { DoctorApprovalDashboard } from "@/components/doctors/doctor-approval";
import { DoctorsAction } from "@/server/actions/doctors-action";

interface SearchParams {
  page?: string;
  showPending?: string;
  showDocument?: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const showPending = searchParams.showPending === "true";
  const showDocument = searchParams.showDocument === "true";

  const { doctors, meta } = await DoctorsAction(
    page,
    10,
    showPending,
    showDocument
  );

  return (
    <DoctorApprovalDashboard
      doctors={doctors}
      meta={meta}
      showPending={showPending}
      showDocument={showDocument}
    />
  );
}
