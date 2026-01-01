import { Navbar } from "@/components/navbar";
import { WORKOUTS } from "@/src/lib/gym-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Dumbbell, Target } from "lucide-react";
import { notFound } from "next/navigation";
import { choosePlan } from "@/app/actions/gym";

export function generateStaticParams() {
	return WORKOUTS.map((workout) => ({
		slug: workout.id,
	}));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
	const workout = WORKOUTS.find((w) => w.id === params.slug);
	if (!workout) return { title: "Workout Not Found" };

	return {
		title: `${workout.name} - FitHub Gym`,
		description: workout.description,
	};
}

export default function WorkoutDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const workout = WORKOUTS.find((w) => w.id === params.slug);

	if (!workout) {
		notFound();
	}

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-4xl px-4 py-12">
					{/* Header Section */}
					<div className="mb-8">
						<h1 className="text-balance text-4xl font-bold mb-4">
							{workout.name}
						</h1>
						<p className="text-pretty text-lg text-muted-foreground mb-6">
							{workout.description}
						</p>

						<div className="flex items-center gap-4 mb-6">
							<div className="flex items-center gap-2">
								<Target className="h-5 w-5 text-muted-foreground" />
								<Badge
									variant={
										workout.difficulty === "beginner"
											? "secondary"
											: "default"
									}
								>
									{workout.difficulty}
								</Badge>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Clock className="h-5 w-5" />
								<span className="font-medium">
									{workout.duration}
								</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Dumbbell className="h-5 w-5" />
								<span className="font-medium">
									{workout.exercises.length} exercises
								</span>
							</div>
						</div>

						<form action={choosePlan}>
							<input
								type="hidden"
								name="planId"
								value={workout.id}
							/>
							<input
								type="hidden"
								name="planName"
								value={workout.name}
							/>
							<input
								type="hidden"
								name="planType"
								value="workout"
							/>
							<Button
								type="submit"
								size="lg"
								className="w-full sm:w-auto"
							>
								Choose This Plan
							</Button>
						</form>
					</div>

					{/* Exercise List */}
					<div className="rounded-lg border border-border p-6">
						<h2 className="text-2xl font-semibold mb-6">
							Full Workout Routine
						</h2>
						<div className="space-y-6">
							{workout.exercises.map((exercise, idx) => (
								<div
									key={idx}
									className="border-b border-border pb-4 last:border-0 last:pb-0"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
													{idx + 1}
												</span>
												<h3 className="text-lg font-semibold">
													{exercise.name}
												</h3>
											</div>
										</div>
									</div>
									<div className="ml-11 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
										<div>
											<p className="text-sm text-muted-foreground">
												Sets
											</p>
											<p className="font-medium">
												{exercise.sets}
											</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Reps/Duration
											</p>
											<p className="font-medium">
												{exercise.reps}
											</p>
										</div>
										{exercise.rest && (
											<div>
												<p className="text-sm text-muted-foreground">
													Rest
												</p>
												<p className="font-medium">
													{exercise.rest}
												</p>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Tips Section */}
					<div className="mt-8 rounded-lg bg-muted p-6">
						<h3 className="font-semibold mb-3">Training Tips</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								• Warm up with 5-10 minutes of light cardio
								before starting
							</li>
							<li>• Focus on proper form over heavy weight</li>
							<li>• Stay hydrated throughout your workout</li>
							<li>
								• Cool down with stretching after completing all
								exercises
							</li>
							<li>
								{/* Note: Authentication required - will be enforced via Clerk in production */}
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}
