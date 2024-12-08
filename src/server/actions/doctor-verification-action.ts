"use server";

import { eq } from "drizzle-orm";
import db from "../db";
import { doctors } from "../db/schema";
import { revalidatePath } from "next/cache";
import { initializeApp } from "../firebase/config";

async function sendNotificationToDoctor(uid: string) {
  const app = initializeApp();
  const message = {
    notification: {
      title: "Account has been approved",
      body: `Your account has been approved. You can now access the app.`,
    },
    topic: `${uid}`,
  };

  try {
    await app.messaging().send(message);
    console.log("Notification sent to doctor");
  } catch (error) {
    console.error("Error sending notification to doctor:", error);
  }
}

export async function approveDoctorAction(uid: string) {
  await sendNotificationToDoctor(uid);
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
