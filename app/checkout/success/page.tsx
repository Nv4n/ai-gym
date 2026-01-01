import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Navbar } from "@/src/components/navbar";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
	title: "Order Successful - FitHub Gym",
	description: "Your order has been placed successfully",
};

export default function CheckoutSuccessPage() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background flex items-center justify-center">
				<div className="mx-auto max-w-md px-4 text-center py-12">
					<div className="mb-6 flex justify-center">
						<CheckCircle2 className="h-16 w-16 text-green-600" />
					</div>
					<h1 className="text-3xl font-bold mb-4">
						Order Successful!
					</h1>
					<p className="text-lg text-muted-foreground mb-8">
						Thank you for your purchase. You will receive a
						confirmation email shortly with your order details and
						tracking information.
					</p>
					<div className="space-y-3">
						<Button asChild className="w-full">
							<Link href="/store">Continue Shopping</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							className="w-full bg-transparent"
						>
							<Link href="/">Back to Home</Link>
						</Button>
					</div>
				</div>
			</main>
		</>
	);
}
