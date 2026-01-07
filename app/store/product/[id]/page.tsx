import { Navbar } from "@/src/components/navbar";
import { Button } from "@/src/components/ui/button";
import { PRODUCTS } from "@/src/lib/products";
import { notFound, redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { id } = await params;
	const product = PRODUCTS.find((p) => p.id === id);

	return {
		title: product ? `${product.name} - FitHub Gym` : "Product",
		description: product?.description,
	};
}

export function generateStaticParams() {
	return PRODUCTS.map((product) => ({
		id: product.id,
	}));
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = PRODUCTS.find((p) => p.id === id);

	if (!product) {
		notFound();
	}

	const categoryUrl = `/store/${product.category}`;

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12">
					{/* Back Link */}
					<Link
						href={categoryUrl}
						className="inline-flex items-center text-primary hover:underline mb-8"
					>
						← Back to {product.category.replace("-", " ")}
					</Link>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{/* Product Image */}
						<div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-96">
							<Image
								src={product.image || "/placeholder.svg"}
								alt={product.name}
								width={400}
								height={400}
								className="object-cover w-full h-full"
							/>
						</div>

						{/* Product Details */}
						<div className="flex flex-col justify-center">
							<h1 className="text-4xl font-bold mb-4">
								{product.name}
							</h1>
							<p className="text-xl text-muted-foreground mb-6">
								{product.description}
							</p>

							{/* Price */}
							<div className="mb-8">
								<span className="text-4xl font-bold">
									${product.price}
								</span>
							</div>

							{/* Stock Status */}
							<div className="mb-8 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
								<p className="text-green-700 dark:text-green-300 font-semibold">
									In Stock - Ships within 2-3 business days
								</p>
							</div>

							{/* Purchase Button */}
							<div className="space-y-4">
								<CheckoutButton productId={product.id} />

								<SignedOut>
									<Button
										asChild
										size="lg"
										className="w-full"
									>
										<Link href="/sign-in">
											Sign In to Purchase
										</Link>
									</Button>
									<p className="text-sm text-muted-foreground text-center">
										Must be signed in to purchase
									</p>
								</SignedOut>
								<SignedIn>
									<CheckoutButton productId={product.id} />
								</SignedIn>
							</div>

							{/* Additional Info */}
							<div className="mt-12 space-y-4 pt-8 border-t">
								<div>
									<h3 className="font-semibold mb-2">
										Product Category
									</h3>
									<p className="text-muted-foreground capitalize">
										{product.category.replace("-", " ")}
									</p>
								</div>
								<div>
									<h3 className="font-semibold mb-2">
										Quality Guarantee
									</h3>
									<p className="text-muted-foreground">
										100% authentic products with full
										satisfaction guarantee
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function CheckoutButton({ productId }: { productId: string }) {
	return (
		<form
			action={async () => {
				"use server";
				const { createCheckoutSession } = await import(
					"@/app/actions/stripe"
				);

				let result: {
					sessionId: string;
					url: string | null;
				} | null = null;
				try {
					result = await createCheckoutSession(productId);
				} catch (error) {
					console.error("Purchase error:", error);
				} finally {
					if (result?.url) {
						redirect(result.url);
					}
				}
			}}
		>
			<Button type="submit" size="lg" className="w-full">
				Buy Now - ${PRODUCTS.find((p) => p.id === productId)?.price}
			</Button>
		</form>
	);
}
