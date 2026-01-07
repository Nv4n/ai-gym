"use server";

import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/src/db/db";
import { orders, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function updateOrderStatus(orderId: string, status: string) {
	const user = await currentUser();

	if (!user) {
		return { error: "Not authenticated" };
	}

	if (user.publicMetadata.role !== "admin") {
		return { error: "Not authenticated" };
	}

	// // Check if current user is admin
	// const currentUser = await db
	// 	.select({ role: users.role })
	// 	.from(users)
	// 	.where(eq(users., userId))
	// 	.limit(1);

	// if (!currentUser[0] || currentUser[0].role !== "admin") {
	// 	return { error: "Not authorized" };
	// }

	try {
		await db
			.update(orders)
			.set({
				status,
				updatedAt: new Date(),
			})
			.where(eq(orders.id, orderId));

		revalidatePath("/dashboard/admin/orders");
		return { success: true };
	} catch (error) {
		return { error: "Failed to update order status" };
	}
}

export async function updateProductStock(productId: string, stock: number) {
	const supabase = await createClient();

	const {
		data: { user: authUser },
	} = await supabase.auth.getUser();
	if (!authUser) {
		return { error: "Not authenticated" };
	}

	// Check if current user is admin
	const { data: currentUser } = await supabase
		.from("users")
		.select("role")
		.eq("id", authUser.id)
		.single();

	if (currentUser?.role !== "admin") {
		return { error: "Not authorized" };
	}

	const { error } = await supabase
		.from("products")
		.update({ stock, updated_at: new Date().toISOString() })
		.eq("id", productId);

	if (error) return { error: error.message };

	revalidatePath("/dashboard/admin/products");
	return { success: true };
}
