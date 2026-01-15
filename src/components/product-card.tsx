import type { Product } from "@/src/lib/products";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { SelectProduct } from "@/src/db/zod";

interface ProductCardProps {
	product: SelectProduct;
}

const isImageFound = async (imageName: string | null) => {
	return await fetch(`http://localhost:3000${imageName}`, {
		method: "HEAD",
	});
};

export async function ProductCard({ product }: ProductCardProps) {
	let imageName: string = "/placeholder.svg";
	const result = await isImageFound(product?.image);
	if (result.status === 200) {
		imageName = product.image as string;
	}
	console.log(product);

	return (
		<Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
			<Link
				href={`/store/product/${product.id}`}
				className="relative h-48 overflow-hidden bg-muted"
			>
				<Image
					src={imageName}
					alt={product.name}
					fill
					className="object-cover hover:scale-105 transition-transform"
				/>
			</Link>
			<CardHeader className="pb-2">
				<CardTitle className="line-clamp-2">{product.name}</CardTitle>
				<CardDescription className="line-clamp-2">
					{product.description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="mt-auto flex items-center justify-between pt-0">
				<span className="text-2xl font-bold">${product.price}</span>
				<Button asChild size="sm">
					<Link href={`/store/product/${product.id}`}>View</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
