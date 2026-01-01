"use client";

import { Navbar } from "@/src/components/navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { CATEGORIES, GROUP_ACTIVITIES } from "@/src/lib/group-activities";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, Award } from "lucide-react";

export default function CategoryPage({
	params,
}: {
	params: { category: string };
}) {
	const category = CATEGORIES.find((c) => c.id === params.category);

	if (!category) {
		notFound();
	}

	const classes = GROUP_ACTIVITIES.filter(
		(c) => c.category === params.category
	);

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-balance text-4xl font-bold mb-4">
							{category.name}
						</h1>
						<p className="text-pretty text-lg text-muted-foreground">
							{category.description}
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							{classes.length} classes available
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{classes.map((activity) => (
							<Link
								key={activity.id}
								href={`/group-activities/${activity.category}/${activity.id}`}
							>
								<Card className="h-full transition-all hover:border-primary hover:shadow-lg cursor-pointer">
									<CardHeader>
										<div className="flex items-start justify-between mb-2">
											<CardTitle className="text-xl">
												{activity.name}
											</CardTitle>
											<Badge
												variant="secondary"
												className="text-xs"
											>
												{activity.level}
											</Badge>
										</div>
										<CardDescription className="line-clamp-2">
											{activity.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Award className="h-4 w-4" />
											<span>{activity.instructor}</span>
										</div>
										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4" />
												<span>{activity.duration}</span>
											</div>
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4" />
												<span>
													{activity.capacity} spots
												</span>
											</div>
										</div>
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Available times:
											</p>
											<div className="flex flex-wrap gap-1">
												{activity.schedule
													.slice(0, 2)
													.map((time, idx) => (
														<Badge
															key={idx}
															variant="outline"
															className="text-xs"
														>
															{time}
														</Badge>
													))}
												{activity.schedule.length >
													2 && (
													<Badge
														variant="outline"
														className="text-xs"
													>
														+
														{activity.schedule
															.length - 2}{" "}
														more
													</Badge>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
