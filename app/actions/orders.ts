"use server";

import { db } from "@/src/db/db";
import { orders } from "@/src/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function getUserOrders(limit: number = 5) {
	const authUser = await auth();

	if (!authUser.isAuthenticated) {
		throw new Error("Unauthorized");
	}

	const userOrders = await db
		.select()
		.from(orders)
		.where(eq(orders.userId, authUser.userId))
		.orderBy(desc(orders.createdAt))
		.limit(limit);

	return userOrders;
}
