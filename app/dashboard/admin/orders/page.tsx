import { OrderStatusSelect } from "@/src/components/admin/order-status-select";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}

	if (user.privateMetadata.role !== "admin") {
		redirect("/dashboard");
	}

	const orders: object[] = [];
	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-8">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/dashboard/admin">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<h1 className="text-4xl font-bold mb-2">
						Order Management
					</h1>
					<p className="text-lg text-muted-foreground">
						View and manage all customer orders
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>
							All Orders ({orders?.length || 0})
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* {orders?.map((order) => (
							<div
								key={order.id}
								className="flex items-center justify-between p-4 rounded-lg border"
							>
								<div className="flex-1">
									<p className="font-medium">
										Order #{order.id.slice(0, 8)}
									</p>
									<p className="text-sm text-muted-foreground">
										Customer:{" "}
										{order.user?.name || "Unknown"} (
										{order.user?.email})
									</p>
									<p className="text-sm text-muted-foreground">
										Total: ${order.total.toFixed(2)} |{" "}
										{new Date(
											order.created_at
										).toLocaleDateString()}
									</p>
								</div>
								<div className="flex items-center gap-4">
									<OrderStatusSelect
										orderId={order.id}
										currentStatus={order.status}
									/>
								</div>
							</div>
							 ))} */}
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
