import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
	Calendar,
	DollarSign,
	Package,
	ShoppingBag,
	TrendingUp,
	Users,
} from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Admin Dashboard - FitHub Gym",
	description: "Manage your gym business",
};

export default async function AdminDashboardPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	if (user?.privateMetadata?.role !== "admin") {
		redirect("/dashboard");
	}

	const stats = [
		{
			title: "Total Users",
			value: "10",
			icon: Users,
			color: "text-blue-500",
			bgColor: "bg-blue-500/10",
			trend: "+12% from last month",
		},
		{
			title: "Total Revenue",
			value: "10",
			icon: DollarSign,
			color: "text-green-500",
			bgColor: "bg-green-500/10",
			trend: "+23% from last month",
		},
		{
			title: "Total Orders",
			value: "10",
			icon: ShoppingBag,
			color: "text-orange-500",
			bgColor: "bg-orange-500/10",
			trend: "+8% from last month",
		},
		{
			title: "Active Reservations",
			value: "10",
			icon: Calendar,
			color: "text-purple-500",
			bgColor: "bg-purple-500/10",
			trend: "+15% from last month",
		},
		{
			title: "Total Products",
			value: "10",
			icon: Package,
			color: "text-indigo-500",
			bgColor: "bg-indigo-500/10",
			trend: `"10", low stock`,
		},
		{
			title: "Growth Rate",
			value: "18%",
			icon: TrendingUp,
			color: "text-teal-500",
			bgColor: "bg-teal-500/10",
			trend: "Monthly average",
		},
	];

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-12">
					<div className="flex gap-4">
						<h1 className="text-4xl font-bold mb-2">
							Admin Dashboard
						</h1>

						<UserButton />
					</div>
					<p className="text-lg text-muted-foreground">
						Manage your gym business and monitor performance
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
					{stats.map((stat) => {
						const Icon = stat.icon;
						return (
							<Card key={stat.title}>
								<CardContent className="pt-6">
									<div className="flex items-start justify-between mb-4">
										<div
											className={`${stat.bgColor} p-3 rounded-lg`}
										>
											<Icon
												className={`h-6 w-6 ${stat.color}`}
											/>
										</div>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">
											{stat.title}
										</p>
										<p className="text-3xl font-bold mb-2">
											{stat.value}
										</p>
										<p className="text-xs text-muted-foreground">
											{stat.trend}
										</p>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<a
									href="/dashboard/admin/users"
									className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<div className="flex items-center gap-3">
										<Users className="h-5 w-5 text-primary" />
										<div>
											<p className="font-medium">
												Manage Users
											</p>
											<p className="text-sm text-muted-foreground">
												View and edit user accounts
											</p>
										</div>
									</div>
								</a>
								<a
									href="/dashboard/admin/products"
									className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<div className="flex items-center gap-3">
										<Package className="h-5 w-5 text-primary" />
										<div>
											<p className="font-medium">
												Manage Products
											</p>
											<p className="text-sm text-muted-foreground">
												Add, edit, and manage inventory
											</p>
										</div>
									</div>
								</a>
								<a
									href="/dashboard/admin/orders"
									className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<div className="flex items-center gap-3">
										<ShoppingBag className="h-5 w-5 text-primary" />
										<div>
											<p className="font-medium">
												Manage Orders
											</p>
											<p className="text-sm text-muted-foreground">
												Process and track orders
											</p>
										</div>
									</div>
								</a>
								<a
									href="/dashboard/admin/reservations"
									className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<div className="flex items-center gap-3">
										<Calendar className="h-5 w-5 text-primary" />
										<div>
											<p className="font-medium">
												Manage Reservations
											</p>
											<p className="text-sm text-muted-foreground">
												View and manage class bookings
											</p>
										</div>
									</div>
								</a>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
									<ShoppingBag className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="font-medium text-sm">
											New order received
										</p>
										<p className="text-xs text-muted-foreground">
											Order #8347 - $89.99
										</p>
										<p className="text-xs text-muted-foreground">
											2 minutes ago
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
									<Users className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="font-medium text-sm">
											New user registered
										</p>
										<p className="text-xs text-muted-foreground">
											john.doe@example.com
										</p>
										<p className="text-xs text-muted-foreground">
											15 minutes ago
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
									<Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="font-medium text-sm">
											Class reservation made
										</p>
										<p className="text-xs text-muted-foreground">
											Yoga - Tomorrow 9:00 AM
										</p>
										<p className="text-xs text-muted-foreground">
											1 hour ago
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
									<Package className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div className="flex-1">
										<p className="font-medium text-sm">
											Low stock alert
										</p>
										<p className="text-xs text-muted-foreground">
											Whey Protein - 8 units left
										</p>
										<p className="text-xs text-muted-foreground">
											3 hours ago
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
