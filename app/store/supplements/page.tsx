import { ProductGrid } from "@/src/components/product-grid";
import { db } from "@/src/db/db";
import { SelectProductSchema } from "@/src/db/zod";
import z from "zod";
import { products as productsDrizzle } from "@/src/db/schema";

export const metadata = {
	title: "Supplements - FitHub Gym Store",
	description: "Shop premium nutritional supplements for your fitness goals",
};

export default async function SupplementsPage() {
	const data = await db.select().from(productsDrizzle);
	const products = z
		.array(SelectProductSchema)
		.parse(data)
		.filter((p) => p.category === "supplements");

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-12">
					<h1 className="text-balance text-4xl font-bold mb-4">
						Supplements
					</h1>
					<p className="text-pretty text-lg text-muted-foreground">
						Premium nutritional supplements to fuel your fitness
						journey and maximize recovery
					</p>
				</div>

				<ProductGrid products={products} />
			</div>
		</>
	);
}
