"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { updateCartQuantity, removeFromCart } from "@/app/actions/cart";
// import { createCartCheckoutSession } from "@/app/actions/stripe";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/src/lib/types";

interface CartItemsListProps {
	cartItems: Array<CartItem & { product: any }>;
}

export function CartItemsList({ cartItems }: CartItemsListProps) {
	return (
		<div className="space-y-4">
			{cartItems.map((item) => (
				<CartItemCard key={item.id} item={item} />
			))}
		</div>
	);
}

function CartItemCard({ item }: { item: CartItem & { product: any } }) {
	const [isPending, startTransition] = useTransition();
	const [quantity, setQuantity] = useState(item.quantity);

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity < 1) return;
		setQuantity(newQuantity);
		startTransition(async () => {
			await updateCartQuantity(item.id, newQuantity);
		});
	};

	const handleRemove = () => {
		startTransition(async () => {
			await removeFromCart(item.id);
		});
	};

	return (
		<Card>
			<CardContent className="flex gap-4 p-4">
				<div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
					<Image
						src={item.product.image_url || "/placeholder.svg"}
						alt={item.product.name}
						fill
						className="object-cover"
					/>
				</div>

				<div className="flex flex-1 flex-col justify-between">
					<div className="flex justify-between">
						<div>
							<h3 className="font-semibold">
								{item.product.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								${item.product.price.toFixed(2)}
							</p>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleRemove}
							disabled={isPending}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => handleQuantityChange(quantity - 1)}
							disabled={isPending || quantity <= 1}
						>
							<Minus className="h-3 w-3" />
						</Button>
						<Input
							type="number"
							min="1"
							value={quantity}
							onChange={(e) =>
								handleQuantityChange(
									Number.parseInt(e.target.value) || 1
								)
							}
							className="h-8 w-16 text-center"
							disabled={isPending}
						/>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => handleQuantityChange(quantity + 1)}
							disabled={isPending}
						>
							<Plus className="h-3 w-3" />
						</Button>
						<span className="ml-auto font-semibold">
							${(item.product.price * quantity).toFixed(2)}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

CartItemsList.CheckoutButton = function CheckoutButton({
	cartItems,
}: {
	cartItems: Array<CartItem & { product: any }>;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleCheckout = () => {
		startTransition(async () => {
			try {
				// const { url } = await createCartCheckoutSession(cartItems);
				// if (url) {
				// 	router.push(url);
				// }
			} catch (error) {
				console.error("Checkout failed:", error);
			}
		});
	};

	return (
		<Button
			className="w-full"
			size="lg"
			onClick={handleCheckout}
			disabled={isPending}
		>
			{isPending ? "Processing..." : "Proceed to Checkout"}
		</Button>
	);
};
