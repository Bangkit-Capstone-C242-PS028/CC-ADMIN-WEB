"use server";

import { eq } from "drizzle-orm";
import db from "../db";
import { doctors, users } from "../db/schema";

export const DoctorsAction = async () => {
  const doctorsList = await db
    .select({
      uid: doctors.uid,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      specialization: doctors.specialization,
      workplace: doctors.workplace,
    })
    .from(doctors)
    .leftJoin(users, eq(doctors.uid, users.uid));
  return doctorsList;
};
