"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartBadge() {
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const fetchCartCount = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data } = await supabase
				.from("cart_items")
				.select("quantity")
				.eq("user_id", user.id);

			if (data) {
				const total = data.reduce(
					(sum, item) => sum + item.quantity,
					0
				);
				setCartCount(total);
			}
		};

		fetchCartCount();

		// Set up realtime subscription for cart updates
		const supabase = createClient();
		const channel = supabase
			.channel("cart-changes")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "cart_items" },
				() => {
					fetchCartCount();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, []);

	return (
		<Button variant="ghost" size="icon" asChild className="relative">
			<Link href="/cart">
				<ShoppingCart className="h-5 w-5" />
				{cartCount > 0 && (
					<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
						{cartCount}
					</span>
				)}
			</Link>
		</Button>
	);
}
