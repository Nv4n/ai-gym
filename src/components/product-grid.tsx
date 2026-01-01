import type { Product } from "@/src/lib/products";
import { ProductCard } from "./product-card";

interface ProductGridProps {
	products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
