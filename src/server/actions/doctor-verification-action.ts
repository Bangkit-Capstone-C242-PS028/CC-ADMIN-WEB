"use server";

import { eq } from "drizzle-orm";
import db from "../db";
import { doctors } from "../db/schema";
import { revalidatePath } from "next/cache";

export async function approveDoctorAction(uid: string) {
  try {
    await db.update(doctors).set({ isVerified: 1 }).where(eq(doctors.uid, uid));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error approving doctor:", error);
    return { success: false, error: "Failed to approve doctor" };
  }
}

export async function rejectDoctorAction(uid: string) {
  try {
    await db.delete(doctors).where(eq(doctors.uid, uid));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting doctor:", error);
    return { success: false, error: "Failed to reject doctor" };
  }
}
