"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { approveDoctorAction } from "@/server/actions/doctor-verification-action";
import { toast } from "sonner";

interface AcceptDoctorButtonProps {
  uid: string;
  isVerified: number;
}

export function AcceptDoctorButton({
  uid,
  isVerified,
}: AcceptDoctorButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleApprove = async () => {
    try {
      setIsPending(true);
      const result = await approveDoctorAction(uid);

      if (result.success) {
        toast.success("Doctor has been approved successfully");
      } else {
        throw new Error(result.error || "Failed to approve doctor");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsPending(false);
    }
  };

  if (isVerified === 1) {
    return null;
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleApprove}
      disabled={isPending}>
      {isPending ? "Approving..." : "Approve"}
    </Button>
  );
}
