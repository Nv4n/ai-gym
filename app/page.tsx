import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Navbar } from "@/src/components/navbar";
import { ShoppingBag, Dumbbell, Users, Sparkles } from "lucide-react";

export default function Home() {
	const mainSections = [
		{
			id: "store",
			title: "Store",
			description:
				"Shop premium supplements, equipment, and healthy food & drinks",
			icon: ShoppingBag,
			href: "/store",
			color: "text-blue-500",
			bgColor: "bg-blue-500/10",
		},
		{
			id: "gym",
			title: "Gym",
			description:
				"Access workouts, diet plans, and AI-powered fitness tools",
			icon: Dumbbell,
			href: "/gym",
			color: "text-green-500",
			bgColor: "bg-green-500/10",
		},
		{
			id: "group-activities",
			title: "Group Activities",
			description:
				"Join expert-led fitness classes and coaching sessions",
			icon: Users,
			href: "/group-activities",
			color: "text-orange-500",
			bgColor: "bg-orange-500/10",
		},
	];

	const features = [
		{
			icon: "🚚",
			title: "Fast Shipping",
			description: "Free shipping on orders over $50",
		},
		{
			icon: "🔒",
			title: "Secure Payment",
			description: "Powered by Stripe for your safety",
		},
		{
			icon: "⭐",
			title: "Quality Guaranteed",
			description: "All products 100% authentic",
		},
		{
			icon: "🤖",
			title: "AI-Powered",
			description: "Personalized workouts and diet plans",
		},
	];

	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
					<div className="mx-auto max-w-7xl px-4 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Welcome to FitHub Gym
						</h1>
						<p className="text-xl mb-8 opacity-90">
							Your complete fitness destination - shop, train, and
							grow with us
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							<Button asChild size="lg" variant="secondary">
								<Link href="/store">Shop Store</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="bg-white/10 border-white/20 hover:bg-white/20"
							>
								<Link href="/gym">Explore Gym</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Main Sections */}
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4">
						<h2 className="text-3xl font-bold mb-12 text-center">
							Explore Our Services
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{mainSections.map((section) => {
								const Icon = section.icon;
								return (
									<Link
										key={section.id}
										href={section.href}
										className="group rounded-lg border border-border p-8 hover:border-primary hover:shadow-lg transition-all"
									>
										<div
											className={`${section.bgColor} ${section.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
										>
											<Icon className="h-8 w-8" />
										</div>
										<h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
											{section.title}
										</h3>
										<p className="text-muted-foreground">
											{section.description}
										</p>
									</Link>
								);
							})}
						</div>
					</div>
				</section>

				{/* AI Features Highlight */}
				<section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 py-16">
					<div className="mx-auto max-w-7xl px-4 text-center">
						<div className="flex items-center justify-center gap-2 mb-4">
							<Sparkles className="h-8 w-8 text-purple-500" />
							<h2 className="text-3xl font-bold">
								AI-Powered Fitness
							</h2>
						</div>
						<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
							Get personalized workout plans and diet
							recommendations powered by artificial intelligence
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							<Button asChild size="lg">
								<Link href="/gym/ai-workouts">
									Try AI Workouts
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link href="/gym/ai-diet-plans">
									Get Diet Plan
								</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{features.map((feature) => (
								<div
									key={feature.title}
									className="text-center"
								>
									<div className="text-4xl mb-4">
										{feature.icon}
									</div>
									<h3 className="font-bold mb-2">
										{feature.title}
									</h3>
									<p className="text-muted-foreground text-sm">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
