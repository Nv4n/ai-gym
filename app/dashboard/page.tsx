import { Navbar } from "@/src/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Calendar, Dumbbell, ShoppingBag } from "lucide-react";

export const metadata = {
	title: "Dashboard - FitHub Gym",
	description: "Your personal fitness dashboard",
};

export default async function DashboardPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const stats = [
		{
			title: "Upcoming Reservations",
			value: "3",
			icon: Calendar,
			color: "text-blue-500",
		},
		{
			title: "Workouts This Week",
			value: "5",
			icon: Dumbbell,
			color: "text-green-500",
		},
		{
			title: "Store Orders",
			value: "2",
			icon: ShoppingBag,
			color: "text-orange-500",
		},
	];

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
						<p className="text-lg text-muted-foreground">
							Track your fitness journey and manage your
							activities
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-3 mb-12">
						{stats.map((stat) => {
							const Icon = stat.icon;
							return (
								<div
									key={stat.title}
									className="rounded-lg border border-border p-6"
								>
									<div className="flex items-center gap-4">
										<div className={stat.color}>
											<Icon className="h-8 w-8" />
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
								</div>
							);
						})}
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="rounded-lg border border-border p-6">
							<h2 className="text-xl font-semibold mb-4">
								Recent Activity
							</h2>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 rounded-lg bg-muted">
									<div>
										<p className="font-medium">
											Yoga Class Reserved
										</p>
										<p className="text-sm text-muted-foreground">
											Tomorrow at 9:00 AM
										</p>
									</div>
									<Calendar className="h-5 w-5 text-muted-foreground" />
								</div>
								<div className="flex items-center justify-between p-3 rounded-lg bg-muted">
									<div>
										<p className="font-medium">
											Completed Push Day Workout
										</p>
										<p className="text-sm text-muted-foreground">
											Yesterday
										</p>
									</div>
									<Dumbbell className="h-5 w-5 text-muted-foreground" />
								</div>
								<div className="flex items-center justify-between p-3 rounded-lg bg-muted">
									<div>
										<p className="font-medium">
											Ordered Whey Protein
										</p>
										<p className="text-sm text-muted-foreground">
											2 days ago
										</p>
									</div>
									<ShoppingBag className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
						</div>

						<div className="rounded-lg border border-border p-6">
							<h2 className="text-xl font-semibold mb-4">
								Quick Actions
							</h2>
							<div className="space-y-3">
								<a
									href="/group-activities"
									className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<p className="font-medium">
										Reserve a Class
									</p>
									<p className="text-sm text-muted-foreground">
										Book your next group activity
									</p>
								</a>
								<a
									href="/gym/ai-workouts"
									className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<p className="font-medium">
										Generate AI Workout
									</p>
									<p className="text-sm text-muted-foreground">
										Get a personalized workout plan
									</p>
								</a>
								<a
									href="/store"
									className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
								>
									<p className="font-medium">Browse Store</p>
									<p className="text-sm text-muted-foreground">
										Shop supplements and equipment
									</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
