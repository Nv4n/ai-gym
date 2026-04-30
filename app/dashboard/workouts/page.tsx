import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { ArrowLeft, Dumbbell } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserWorkoutsPage() {
	const supabase = await createClient();

	const {
		data: { user: authUser },
	} = await supabase.auth.getUser();

	if (!authUser) {
		redirect("/auth/login");
	}

	const { data: workoutPlans } = await supabase
		.from("workout_plans")
		.select("*")
		.eq("user_id", authUser.id)
		.order("created_at", { ascending: false });

	const activePlans =
		workoutPlans?.filter((p) => p.status === "active") || [];
	const completedPlans =
		workoutPlans?.filter((p) => p.status === "completed") || [];

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-8">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/dashboard">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<h1 className="text-4xl font-bold mb-2">
						My Workout Plans
					</h1>
					<p className="text-lg text-muted-foreground">
						Track your workout plans and progress
					</p>
				</div>

				{!workoutPlans || workoutPlans.length === 0 ? (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<Dumbbell className="h-16 w-16 text-muted-foreground mb-4" />
							<h2 className="text-xl font-semibold mb-2">
								No workout plans yet
							</h2>
							<p className="text-muted-foreground mb-4">
								Choose a workout plan to get started
							</p>
							<div className="flex gap-4">
								<Button asChild>
									<Link href="/gym/workouts">
										Browse Workout Plans
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="/gym/ai-workouts">
										Generate AI Workout
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-8">
						{activePlans.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold mb-4">
									Active Plans
								</h2>
								<div className="grid gap-4 md:grid-cols-2">
									{activePlans.map((plan) => (
										<Card key={plan.id}>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<Dumbbell className="h-5 w-5 text-primary" />
													{plan.plan_name}
												</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="text-sm text-muted-foreground mb-4">
													Started on{" "}
													{new Date(
														plan.created_at
													).toLocaleDateString()}
												</p>
												<div className="flex gap-2">
													<Button
														asChild
														size="sm"
														className="flex-1"
													>
														<Link
															href={`/gym/workouts/${plan.plan_slug}`}
														>
															View Plan
														</Link>
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="flex-1 bg-transparent"
													>
														Track Workout
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						)}

						{completedPlans.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold mb-4">
									Completed Plans
								</h2>
								<div className="grid gap-4 md:grid-cols-2">
									{completedPlans.map((plan) => (
										<Card
											key={plan.id}
											className="opacity-75"
										>
											<CardHeader>
												<CardTitle className="flex items-center gap-2 text-muted-foreground">
													<Dumbbell className="h-5 w-5" />
													{plan.plan_name}
												</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="text-sm text-muted-foreground">
													Completed on{" "}
													{new Date(
														plan.updated_at
													).toLocaleDateString()}
												</p>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}
