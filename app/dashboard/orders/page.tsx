import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserOrdersPage() {
	// const supabase = await createClient();

	// const {
	// 	data: { user: authUser },
	// } = await supabase.auth.getUser();

	// if (!authUser) {
	// 	redirect("/auth/login");
	// }

	// const { data: orders } = await supabase
	// 	.from("orders")
	// 	.select(
	// 		`
	//   *,
	//   order_items(
	//     *,
	//     product:products(*)
	//   )
	// `
	// 	)
	// 	.eq("user_id", authUser.id)
	// 	.order("created_at", { ascending: false });

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-8">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/dashboard">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<h1 className="text-4xl font-bold mb-2">My Orders</h1>
					<p className="text-lg text-muted-foreground">
						View your order history and track deliveries
					</p>
				</div>

				{/* {!orders || orders.length === 0 ? ( */}
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Package className="h-16 w-16 text-muted-foreground mb-4" />
						<h2 className="text-xl font-semibold mb-2">
							No orders yet
						</h2>
						<p className="text-muted-foreground mb-4">
							Start shopping to see your orders here
						</p>
						<Button asChild>
							<Link href="/store">Browse Store</Link>
						</Button>
					</CardContent>
				</Card>
				{/* ) : (
					<div className="space-y-6">
						{orders.map((order) => (
							<Card key={order.id}>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div>
											<CardTitle className="text-lg">
												Order #{order.id.slice(0, 8)}
											</CardTitle>
											<p className="text-sm text-muted-foreground mt-1">
												Placed on{" "}
												{new Date(
													order.created_at
												).toLocaleDateString()}
											</p>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${
												order.status === "paid"
													? "bg-green-500/10 text-green-500"
													: order.status === "shipped"
													? "bg-blue-500/10 text-blue-500"
													: order.status ===
													  "delivered"
													? "bg-purple-500/10 text-purple-500"
													: "bg-gray-500/10 text-gray-500"
											}`}
										>
											{order.status}
										</span>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{order.order_items?.map((item: any) => (
											<div
												key={item.id}
												className="flex items-center gap-4 p-3 rounded-lg border"
											>
												<div className="flex-1">
													<p className="font-medium">
														{item.product?.name ||
															"Product"}
													</p>
													<p className="text-sm text-muted-foreground">
														Quantity:{" "}
														{item.quantity} × $
														{item.price.toFixed(2)}
													</p>
												</div>
												<p className="font-semibold">
													$
													{(
														item.quantity *
														item.price
													).toFixed(2)}
												</p>
											</div>
										))}
									</div>
									<div className="mt-4 pt-4 border-t flex justify-between items-center">
										<span className="font-semibold">
											Total
										</span>
										<span className="text-xl font-bold">
											${order.total.toFixed(2)}
										</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)} */}
			</div>
		</main>
	);
}
