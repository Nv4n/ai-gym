import { ProductGrid } from "@/src/components/product-grid";
import { SelectProductSchema } from "@/src/db/zod";
import { CATEGORIES } from "@/src/lib/products";
import Link from "next/link";
import z from "zod";
import { products as productsDrizzle } from "@/src/db/schema";
import { db } from "@/src/db/db";


export const metadata = {
	title: "Store - FitHub Gym",
	description: "Shop supplements, gym equipment, and healthy food & drinks",
};

export default async function StorePage() {
	const data = await db.select().from(productsDrizzle);
	const products = z.array(SelectProductSchema).parse(data);

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-12">
					<h1 className="text-4xl font-bold mb-4">Our Store</h1>
					<p className="text-lg text-muted-foreground">
						Explore our complete selection of supplements, gym
						equipment, and healthy food & drinks
					</p>
				</div>

				{/* Category Navigation */}
				<div className="mb-12 grid gap-6 md:grid-cols-3">
					{CATEGORIES.map((category) => (
						<Link
							key={category.id}
							href={`/store/${category.id}`}
							className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-muted transition-colors"
						>
							<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
								{category.name}
							</h3>
							<p className="text-muted-foreground text-sm">
								{category.description}
							</p>
						</Link>
					))}
				</div>

				{/* All Products */}
				<div className="mb-6">
					<h2 className="text-2xl font-bold">All Products</h2>
				</div>
				<ProductGrid products={products} />
			</div>
		</>
	);
}
