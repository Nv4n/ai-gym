"use server";

import { clerk } from "@/src/lib/clerk";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function checkForAdmin() {
	const user = await currentUser();
	if (!user) {
		throw new Error("Unauthorized");
	}

	if (user?.privateMetadata?.role !== "admin") {
		throw new Error("Forbidden");
	}
}

export async function updateUserRole(userId: string, role: "user" | "admin") {
	await checkForAdmin();
	await clerk.users.updateUserMetadata(userId, {
		privateMetadata: { role },
	});

	revalidatePath("/dashboard/admin/users");
	return NextResponse.json({ success: true });
}

export async function updateOrderStatus(orderId: string, status: string) {
	await checkForAdmin();

	revalidatePath("/dashboard/admin/orders");
	return { success: true };
}

export async function updateProductStock(productId: string, stock: number) {
	await checkForAdmin();

	revalidatePath("/dashboard/admin/products");
	return { success: true };
}
