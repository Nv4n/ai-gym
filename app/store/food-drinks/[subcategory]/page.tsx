import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { PRODUCTS } from "@/src/lib/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface SubcategoryPageProps {
	params: Promise<{ subcategory: string }>;
}

const SUBCATEGORIES = [
	{
		id: "healthy-meals",
		name: "Healthy Meals",
		description: "Nutritious meal prep options",
	},
	{
		id: "protein-bars",
		name: "Protein Bars",
		description: "High-protein snacks",
	},
	{
		id: "energy-drinks",
		name: "Energy Drinks",
		description: "Energizing beverages",
	},
];

export async function generateMetadata({
	params,
}: SubcategoryPageProps): Promise<Metadata> {
	const { subcategory } = await params;
	const subcategoryData = SUBCATEGORIES.find((s) => s.id === subcategory);

	return {
		title: subcategoryData
			? `${subcategoryData.name} - FitHub Gym`
			: "Food & Drinks",
		description: subcategoryData?.description,
	};
}

export function generateStaticParams() {
	return SUBCATEGORIES.map((subcategory) => ({
		subcategory: subcategory.id,
	}));
}

export default async function SubcategoryPage({
	params,
}: SubcategoryPageProps) {
	const { subcategory } = await params;
	const subcategoryData = SUBCATEGORIES.find((s) => s.id === subcategory);

	if (!subcategoryData) {
		notFound();
	}

	const products = PRODUCTS.filter(
		(p) => p.category === "food-drinks" && p.subcategory === subcategory
	);

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4">
							{subcategoryData.name}
						</h1>
						<p className="text-lg text-muted-foreground">
							{subcategoryData.description}
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							{products.length} products available
						</p>
					</div>

					<ProductGrid products={products} />
				</div>
			</main>
		</>
	);
}
