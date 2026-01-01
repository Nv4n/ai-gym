"use client";

import { Navbar } from "@/components/navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, GROUP_ACTIVITIES } from "@/src/lib/group-activities";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GroupActivitiesPage() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-balance text-4xl font-bold mb-4">
							Group Activities
						</h1>
						<p className="text-pretty text-lg text-muted-foreground">
							Join our expert-led fitness classes and discover
							your perfect workout community
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3 mb-12">
						{CATEGORIES.map((category) => {
							const classCount = GROUP_ACTIVITIES.filter(
								(c) => c.category === category.id
							).length;
							return (
								<Link
									key={category.id}
									href={`/group-activities/${category.id}`}
								>
									<Card className="h-full transition-all hover:border-primary hover:shadow-lg cursor-pointer">
										<CardHeader>
											<div className="flex items-start justify-between mb-2">
												<CardTitle className="text-2xl">
													{category.name}
												</CardTitle>
												<Badge variant="secondary">
													{classCount} classes
												</Badge>
											</div>
											<CardDescription className="text-base">
												{category.description}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="flex items-center gap-2 text-primary font-medium">
												<span>Explore Classes</span>
												<ArrowRight className="h-4 w-4" />
											</div>
										</CardContent>
									</Card>
								</Link>
							);
						})}
					</div>

					<div className="border-t border-border pt-8">
						<h2 className="text-2xl font-semibold mb-6">
							All Classes
						</h2>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{GROUP_ACTIVITIES.map((activity) => (
								<Link
									key={activity.id}
									href={`/group-activities/${activity.category}/${activity.id}`}
								>
									<Card className="h-full transition-all hover:border-primary hover:shadow-md cursor-pointer">
										<CardHeader className="pb-3">
											<Badge
												variant="outline"
												className="w-fit mb-2 capitalize"
											>
												{activity.category.replace(
													"-",
													" "
												)}
											</Badge>
											<CardTitle className="text-lg">
												{activity.name}
											</CardTitle>
											<CardDescription className="text-sm line-clamp-2">
												{activity.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="text-sm text-muted-foreground">
											<div className="space-y-1">
												<p>
													<span className="font-medium">
														Instructor:
													</span>{" "}
													{activity.instructor}
												</p>
												<p>
													<span className="font-medium">
														Duration:
													</span>{" "}
													{activity.duration}
												</p>
												<Badge
													variant="secondary"
													className="text-xs"
												>
													{activity.level}
												</Badge>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
