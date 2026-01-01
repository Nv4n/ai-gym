import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { PRODUCTS } from "@/src/lib/products";

export const metadata = {
	title: "Equipment - FitHub Gym Store",
	description: "Shop premium gym equipment and accessories",
};

export default function EquipmentPage() {
	const equipmentProducts = PRODUCTS.filter(
		(p) => p.category === "equipment"
	);

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4">Equipment</h1>
						<p className="text-lg text-muted-foreground">
							Premium gym equipment and accessories for all
							fitness levels
						</p>
					</div>

					<ProductGrid products={equipmentProducts} />
				</div>
			</main>
		</>
	);
}
