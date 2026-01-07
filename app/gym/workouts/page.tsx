import { Navbar } from "@/src/components/navbar";
import { WORKOUTS } from "@/src/lib/gym-data";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Workouts - FitHub Gym",
	description: "Pre-made workout plans for all fitness levels",
};

export default function WorkoutsPage() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-balance text-4xl font-bold mb-4">
							Workout Plans
						</h1>
						<p className="text-pretty text-lg text-muted-foreground">
							Choose from our expert-designed workout plans for
							different goals and experience levels
						</p>
					</div>

					<div className="grid gap-6">
						{WORKOUTS.map((workout) => (
							<Link
								key={workout.id}
								href={`/gym/workouts/${workout.id}`}
								className="block rounded-lg border border-border p-6 transition-all hover:border-primary hover:shadow-lg"
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-2xl font-semibold mb-2">
											{workout.name}
										</h3>
										<p className="text-muted-foreground mb-3">
											{workout.description}
										</p>
										<div className="flex items-center gap-3">
											<Badge
												variant={
													workout.difficulty ===
													"beginner"
														? "secondary"
														: "default"
												}
											>
												{workout.difficulty}
											</Badge>
											<div className="flex items-center gap-1 text-sm text-muted-foreground">
												<Clock className="h-4 w-4" />
												<span>{workout.duration}</span>
											</div>
										</div>
									</div>
									<Button
										variant="outline"
										className="ml-4 bg-transparent"
									>
										View Details
									</Button>
								</div>

								<div className="border-t border-border pt-4">
									<h4 className="font-semibold mb-3">
										Exercises Preview
									</h4>
									<div className="grid gap-2">
										{workout.exercises
											.slice(0, 3)
											.map((exercise, idx) => (
												<div
													key={idx}
													className="flex items-center justify-between text-sm"
												>
													<span className="font-medium">
														{exercise.name}
													</span>
													<span className="text-muted-foreground">
														{exercise.sets} sets ×{" "}
														{exercise.reps}
													</span>
												</div>
											))}
										{workout.exercises.length > 3 && (
											<p className="text-sm text-muted-foreground">
												+ {workout.exercises.length - 3}{" "}
												more exercises
											</p>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
