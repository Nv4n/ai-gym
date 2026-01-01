import { Navbar } from "@/src/components/navbar";
import Link from "next/link";

export const metadata = {
	title: "Food & Drinks - FitHub Gym",
	description:
		"Healthy meals, protein bars, and energy drinks for your fitness goals",
};

export default function FoodDrinksPage() {
	const subcategories = [
		{
			id: "healthy-meals",
			name: "Healthy Meals",
			description:
				"Nutritious meal prep options designed for muscle growth and recovery",
			href: "/store/food-drinks/healthy-meals",
		},
		{
			id: "protein-bars",
			name: "Protein Bars",
			description:
				"Convenient high-protein snacks for on-the-go nutrition",
			href: "/store/food-drinks/protein-bars",
		},
		{
			id: "energy-drinks",
			name: "Energy Drinks",
			description:
				"Energizing beverages to fuel your workouts and training",
			href: "/store/food-drinks/energy-drinks",
		},
	];

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4">
							Food & Drinks
						</h1>
						<p className="text-lg text-muted-foreground">
							Premium nutrition to support your fitness goals and
							training
						</p>
					</div>

					{/* Subcategory Cards */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{subcategories.map((subcategory) => (
							<Link
								key={subcategory.id}
								href={subcategory.href}
								className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-muted transition-colors"
							>
								<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
									{subcategory.name}
								</h3>
								<p className="text-muted-foreground text-sm">
									{subcategory.description}
								</p>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
