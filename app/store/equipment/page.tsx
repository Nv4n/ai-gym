import { ProductGrid } from "@/src/components/product-grid";
import { SelectProductSchema } from "@/src/db/zod";
import z from "zod";

export const metadata = {
	title: "Equipment - FitHub Gym Store",
	description: "Shop premium gym equipment and accessories",
};

export default async function EquipmentPage() {
	const data = await fetch("http://localhost:3000/api/products");
	const productsJson = await data.json();
	const products = z
		.array(SelectProductSchema)
		.parse(productsJson)
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
