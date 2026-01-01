import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { PRODUCTS } from "@/src/lib/products";

export const metadata = {
	title: "Supplements - FitHub Gym Store",
	description: "Shop premium nutritional supplements for your fitness goals",
};

export default function SupplementsPage() {
	const supplementProducts = PRODUCTS.filter(
		(p) => p.category === "supplements"
	);

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
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

					<ProductGrid products={supplementProducts} />
				</div>
			</main>
		</>
	);
}
