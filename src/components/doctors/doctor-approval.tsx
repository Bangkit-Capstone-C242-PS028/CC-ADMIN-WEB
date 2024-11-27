"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DoctorApprovalDashboardProps } from "@/lib/types";
import { DoctorFilters } from "./table/filters";
import { DoctorTable } from "./table/table";
import { DoctorPagination } from "./table/pagination";

export function DoctorApprovalDashboard({
  doctors,
  meta,
  showPending,
  showDocument,
}: DoctorApprovalDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.set("page", "1");
    router.push(`/admin/dashboard?${params.toString()}`);
  };

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/admin/dashboard?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Doctor Approval Dashboard</h1>

      <DoctorFilters
        showPending={showPending}
        showDocument={showDocument}
        onFilterChange={updateFilters}
      />

      <DoctorTable doctors={doctors} />

      <DoctorPagination
        page={meta.page}
        lastPage={meta.lastPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
