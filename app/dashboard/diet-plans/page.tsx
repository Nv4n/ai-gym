import { redirect } from "next/navigation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";

export default async function UserDietPlansPage() {
	const supabase = await createClient();

	const {
		data: { user: authUser },
	} = await supabase.auth.getUser();

	if (!authUser) {
		redirect("/auth/login");
	}

	const { data: dietPlans } = await supabase
		.from("diet_plans")
		.select("*")
		.eq("user_id", authUser.id)
		.order("created_at", { ascending: false });

	const activePlans = dietPlans?.filter((p) => p.status === "active") || [];

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
					<h1 className="text-4xl font-bold mb-2">My Diet Plans</h1>
					<p className="text-lg text-muted-foreground">
						Manage your nutrition and meal plans
					</p>
				</div>

				{!dietPlans || dietPlans.length === 0 ? (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<Utensils className="h-16 w-16 text-muted-foreground mb-4" />
							<h2 className="text-xl font-semibold mb-2">
								No diet plans yet
							</h2>
							<p className="text-muted-foreground mb-4">
								Create a diet plan to start tracking your
								nutrition
							</p>
							<div className="flex gap-4">
								<Button asChild>
									<Link href="/gym/diet-plans">
										Browse Diet Plans
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="/gym/ai-diet-plans">
										Generate AI Diet Plan
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-6">
						{activePlans.map((plan) => {
							const macros = plan.macros as {
								protein: number;
								carbs: number;
								fats: number;
							};
							return (
								<Card key={plan.id}>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Utensils className="h-5 w-5 text-primary" />
											{plan.plan_name}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid gap-4 md:grid-cols-2">
											<div>
												<p className="text-sm text-muted-foreground mb-2">
													Daily Calories
												</p>
												<p className="text-2xl font-bold">
													{plan.calories} kcal
												</p>
											</div>
											<div>
												<p className="text-sm text-muted-foreground mb-2">
													Meals Per Day
												</p>
												<p className="text-2xl font-bold">
													{plan.meals_per_day}
												</p>
											</div>
										</div>

										<div className="mt-4 p-4 rounded-lg bg-muted">
											<p className="text-sm font-medium mb-2">
												Macros
											</p>
											<div className="grid grid-cols-3 gap-4">
												<div>
													<p className="text-xs text-muted-foreground">
														Protein
													</p>
													<p className="font-semibold">
														{macros.protein}g
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">
														Carbs
													</p>
													<p className="font-semibold">
														{macros.carbs}g
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">
														Fats
													</p>
													<p className="font-semibold">
														{macros.fats}g
													</p>
												</div>
											</div>
										</div>

										<div className="mt-4 flex items-center justify-between">
											<span className="text-sm text-muted-foreground capitalize">
												{plan.dietary_preference} Diet
											</span>
											<span className="text-xs text-muted-foreground">
												Started{" "}
												{new Date(
													plan.created_at
												).toLocaleDateString()}
											</span>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
