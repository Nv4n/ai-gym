"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity = 1) {
	const { isAuthenticated } = await auth();
	if (!isAuthenticated) {
		throw new Error("Unauthorized");
	}
	// // Check if item already exists in cart
	// const { data: existingItem } = await supabase
	// 	.from("cart_items")
	// 	.select("*")
	// 	.eq("user_id", user.id)
	// 	.eq("product_id", productId)
	// 	.single();

	// if (existingItem) {
	// 	// Update quantity
	// 	const { error } = await supabase
	// 		.from("cart_items")
	// 		.update({ quantity: existingItem.quantity + quantity })
	// 		.eq("id", existingItem.id);

	// 	if (error) return { error: error.message };
	// } else {
	// 	// Insert new cart item
	// 	const { error } = await supabase
	// 		.from("cart_items")
	// 		.insert({ user_id: user.id, product_id: productId, quantity });

	// 	if (error) return { error: error.message };
	// }

	revalidatePath("/cart");
	return { success: true };
}

export async function updateCartQuantity(cartItemId: string, quantity: number) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return { error: "Not authenticated" };
	}

	if (quantity <= 0) {
		return removeFromCart(cartItemId);
	}

	const { error } = await supabase
		.from("cart_items")
		.update({ quantity })
		.eq("id", cartItemId)
		.eq("user_id", user.id);

	if (error) return { error: error.message };

	revalidatePath("/cart");
	return { success: true };
}

export async function removeFromCart(cartItemId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return { error: "Not authenticated" };
	}

	const { error } = await supabase
		.from("cart_items")
		.delete()
		.eq("id", cartItemId)
		.eq("user_id", user.id);

	if (error) return { error: error.message };

	revalidatePath("/cart");
	return { success: true };
}

export async function getCartItems() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return { data: [], error: "Not authenticated" };
	}

	const { data, error } = await supabase
		.from("cart_items")
		.select(
			`
      *,
      product:products(*)
    `
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) return { data: [], error: error.message };

	return { data, error: null };
}
