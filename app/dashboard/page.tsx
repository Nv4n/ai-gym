import { redirect } from "next/navigation";
import { Calendar, Dumbbell, ShoppingBag } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserAvatar, UserButton, UserProfile } from "@clerk/nextjs";

export const metadata = {
	title: "Dashboard - FitHub Gym",
	description: "Your personal fitness dashboard",
};

export default async function DashboardPage() {
	const user = await currentUser();
	console.log(user?.privateMetadata);

	if (user?.privateMetadata?.role === "admin") {
		redirect("/dashboard/admin");
	}

	const orders: any[] = [];
	const reservations: any[] = [];
	const workoutPlans = [];

	const stats = [
		{
			title: "Upcoming Reservations",
			value: reservations.length.toString(),
			icon: Calendar,
			color: "text-blue-500",
			bgColor: "bg-blue-500/10",
		},
		{
			title: "Active Workout Plans",
			value: workoutPlans.length.toString(),
			icon: Dumbbell,
			color: "text-green-500",
			bgColor: "bg-green-500/10",
		},
		{
			title: "Total Orders",
			value: orders.length.toString(),
			icon: ShoppingBag,
			color: "text-orange-500",
			bgColor: "bg-orange-500/10",
		},
	];

	return (
		<>
			<div className="m-4">
				<UserButton />
			</div>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-12">
					<div className="flex gap-4">
						<h1 className="text-4xl font-bold mb-2">
							Welcome back, {user?.firstName || "User"}!
						</h1>

						<UserButton />
					</div>

					<p className="text-lg text-muted-foreground">
						Track your fitness journey and manage your activities
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3 mb-12">
					{stats.map((stat) => {
						const Icon = stat.icon;
						return (
							<Card key={stat.title}>
								<CardContent className="pt-6">
									<div className="flex items-center gap-4">
										<div
											className={`${stat.bgColor} p-3 rounded-lg`}
										>
											<Icon
												className={`h-6 w-6 ${stat.color}`}
											/>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												{stat.title}
											</p>
											<p className="text-3xl font-bold">
												{stat.value}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Upcoming Reservations</CardTitle>
						</CardHeader>
						<CardContent>
							{reservations.length === 0 ? (
								<div className="text-center py-8">
									<Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground mb-4">
										No upcoming reservations
									</p>
									<Button asChild>
										<Link href="/group-activities">
											Reserve a Class
										</Link>
									</Button>
								</div>
							) : (
								<div className="space-y-3">
									{reservations.map((reservation) => (
										<div
											key={reservation.id}
											className="flex items-center justify-between p-3 rounded-lg border"
										>
											<div>
												<p className="font-medium">
													{reservation.activity_name}
												</p>
												<p className="text-sm text-muted-foreground">
													{new Date(
														reservation.reservation_date
													).toLocaleDateString()}{" "}
													at {reservation.time_slot}
												</p>
											</div>
											<Calendar className="h-5 w-5 text-muted-foreground" />
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Recent Orders</CardTitle>
						</CardHeader>
						<CardContent>
							{orders.length === 0 ? (
								<div className="text-center py-8">
									<ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground mb-4">
										No orders yet
									</p>
									<Button asChild>
										<Link href="/store">Browse Store</Link>
									</Button>
								</div>
							) : (
								<div className="space-y-3">
									{orders.map((order) => (
										<div
											key={order.id}
											className="flex items-center justify-between p-3 rounded-lg border"
										>
											<div>
												<p className="font-medium">
													Order #
													{order.id.slice(0, 8)}
												</p>
												<p className="text-sm text-muted-foreground">
													{new Date(
														order.created_at
													).toLocaleDateString()}{" "}
													- ${order.total.toFixed(2)}
												</p>
											</div>
											<span
												className={`px-2 py-1 rounded text-xs font-medium ${
													order.status === "paid"
														? "bg-green-500/10 text-green-500"
														: order.status ===
														  "shipped"
														? "bg-blue-500/10 text-blue-500"
														: "bg-gray-500/10 text-gray-500"
												}`}
											>
												{order.status}
											</span>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 md:grid-cols-3">
								<Link
									href="/group-activities"
									className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<Calendar className="h-8 w-8 text-primary mb-2" />
									<p className="font-medium">
										Reserve a Class
									</p>
									<p className="text-sm text-muted-foreground">
										Book your next group activity
									</p>
								</Link>
								<Link
									href="/gym/ai-workouts"
									className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<Dumbbell className="h-8 w-8 text-primary mb-2" />
									<p className="font-medium">
										Generate AI Workout
									</p>
									<p className="text-sm text-muted-foreground">
										Get a personalized workout plan
									</p>
								</Link>
								<Link
									href="/store"
									className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<ShoppingBag className="h-8 w-8 text-primary mb-2" />
									<p className="font-medium">Browse Store</p>
									<p className="text-sm text-muted-foreground">
										Shop supplements and equipment
									</p>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
