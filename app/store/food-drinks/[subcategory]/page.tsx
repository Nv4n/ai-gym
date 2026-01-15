import { ProductGrid } from "@/src/components/product-grid";
import { SelectProductSchema } from "@/src/db/zod";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import z from "zod";

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

	const data = await fetch("http://localhost:3000/api/products");
	const productsJson = await data.json();
	const products = z
		.array(SelectProductSchema)
		.parse(productsJson)
		.filter(
			(p) => p.category === "food-drinks" && p.subcategory === subcategory
		);

	return (
		<>
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
		</>
	);
}
