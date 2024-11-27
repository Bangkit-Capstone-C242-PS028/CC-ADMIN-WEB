"use server";

import { and, eq, sql } from "drizzle-orm";
import db from "../db";
import { doctors, users } from "../db/schema";

export const DoctorsAction = async (
  page: number = 1,
  limit: number = 10,
  showPending: boolean = false,
  showDocument: boolean = false
) => {
  // Calculate offset
  const offset = (page - 1) * limit;

  // Build where conditions
  const whereConditions = [];

  // Separate conditions for pending and document
  if (showPending) {
    whereConditions.push(eq(doctors.isVerified, 0));
  }

  if (showDocument) {
    whereConditions.push(sql`${doctors.documentUrl} IS NOT NULL`);
  }

  // Get total count with joined tables and filters
  const [countResult] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(doctors)
    .leftJoin(users, eq(doctors.uid, users.uid))
    .where(whereConditions.length ? and(...whereConditions) : undefined);

  const total = Number(countResult.count);

  // Get paginated doctors with joined data and filters
  const doctorsList = await db
    .select({
      uid: doctors.uid,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      specialization: doctors.specialization,
      workplace: doctors.workplace,
      isVerified: doctors.isVerified,
      documentUrl: doctors.documentUrl,
    })
    .from(doctors)
    .leftJoin(users, eq(doctors.uid, users.uid))
    .where(whereConditions.length ? and(...whereConditions) : undefined)
    .limit(limit)
    .offset(offset);

  // Calculate last page
  const lastPage = Math.ceil(total / limit);

  return {
    doctors: doctorsList,
    meta: {
      total,
      page,
      lastPage,
    },
  };
};
