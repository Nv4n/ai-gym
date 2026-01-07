"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

export async function updateUserRole(userId: string, role: "user" | "admin") {
	const user = currentUser();
	const {
		data: { user: authUser },
	} = await supabase.auth.getUser();
	if (!authUser) {
		return { error: "Not authenticated" };
	}

	// Check if current user is admin
	const { data: currentUser } = await db
		.from("users")
		.select("role")
		.eq("id", authUser.id)
		.single();

	if (currentUser?.role !== "admin") {
		return { error: "Not authorized" };
	}

	const { error } = await supabase
		.from("users")
		.update({ role })
		.eq("id", userId);

	if (error) return { error: error.message };

	revalidatePath("/dashboard/admin/users");
	return { success: true };
}

export async function updateOrderStatus(orderId: string, status: string) {
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
		.from("orders")
		.update({ status, updated_at: new Date().toISOString() })
		.eq("id", orderId);

	if (error) return { error: error.message };

	revalidatePath("/dashboard/admin/orders");
	return { success: true };
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
