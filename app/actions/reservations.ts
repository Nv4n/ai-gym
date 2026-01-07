"use server";

import { eq, and, gte, asc } from "drizzle-orm";
import { db } from "@/src/db";
import { activity_reservations } from "@/src/db/schema";

export async function getUserReservations(limit: number = 5) {
	const authUser = await auth();

	if (!authUser) {
		throw new Error("Unauthorized");
	}

	const reservations = await db
		.select()
		.from(activity_reservations)
		.where(
			and(
				eq(activity_reservations.user_id, authUser.id),
				eq(activity_reservations.status, "confirmed"),
				gte(
					activity_reservations.reservation_date,
					new Date().toISOString().split("T")[0]
				)
			)
		)
		.orderBy(asc(activity_reservations.reservation_date))
		.limit(limit);

	return reservations;
}
