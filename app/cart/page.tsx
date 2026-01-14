import { CartItemsList } from "@/src/components/cart-items-list";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CartPage() {
	const { isAuthenticated } = await auth();

	if (!isAuthenticated) {
		redirect("/sign-in");
	}
	const cartItems: string | any[] = [];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Shopping Cart</h1>
				<p className="text-muted-foreground">
					Review your items before checkout
				</p>
			</div>

			{!cartItems || cartItems.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
						<h2 className="text-xl font-semibold mb-2">
							Your cart is empty
						</h2>
						<p className="text-muted-foreground mb-4">
							Add some products to get started
						</p>
						<Button asChild>
							<Link href="/store">Browse Store</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<CartItemsList cartItems={cartItems} />
					</div>

					<div>
						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Subtotal
									</span>
									<span>{0}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">
										Shipping
									</span>
									<span>Free</span>
								</div>
								<div className="border-t pt-4">
									<div className="flex justify-between font-semibold text-lg">
										<span>Total</span>
										<span>0</span>
									</div>
								</div>
								<CartItemsList.CheckoutButton
									cartItems={cartItems}
								/>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
