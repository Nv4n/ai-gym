import { ProductGrid } from "@/src/components/product-grid";
import { db } from "@/src/db/db";
import { SelectProductSchema } from "@/src/db/zod";
import z from "zod";
import { products as productsDrizzle } from "@/src/db/schema";

export const metadata = {
	title: "Equipment - FitHub Gym Store",
	description: "Shop premium gym equipment and accessories",
};

export default async function EquipmentPage() {
	const data = await db.select().from(productsDrizzle);

	const products = z
		.array(SelectProductSchema)
		.parse(data)
		.filter((p) => p.category === "equipment");

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-12">
					<h1 className="text-4xl font-bold mb-4">Equipment</h1>
					<p className="text-lg text-muted-foreground">
						Premium gym equipment and accessories for all fitness
						levels
					</p>
				</div>

				<ProductGrid products={products} />
			</div>
		</>
	);
}
