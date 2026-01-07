"use server";

import { stripe } from "@/src/lib/stripe";
import { PRODUCTS } from "@/src/lib/products";
import { headers } from "next/headers";

export async function createCheckoutSession(productId: string) {
	const origin: string = (await headers()).get("origin") as string;
	const product = PRODUCTS.find((p) => p.id === productId);

	if (!product) {
		throw new Error(`Product with id "${productId}" not found`);
	}

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						description: product.description,
						images: [`${origin}/${product.image}`],
					},
					unit_amount: Math.round(product.price * 100),
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${origin}/checkout/success?type=product`,
		cancel_url: `${origin}/store`,
	});

	return { sessionId: session.id, url: session.url };
}

export async function createTrainingCheckout(booking: {
	trainerId: string;
	trainerName: string;
	date: string;
	timeSlot: string;
	price: number;
}) {
	// Note: Clerk authentication - uncomment in production
	// const { userId } = await auth()
	// if (!userId) {
	//   throw new Error("Unauthorized")
	// }
	const origin: string = (await headers()).get("origin") as string;

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: `Personal Training Session - ${booking.trainerName}`,
						description: `Training session on ${new Date(
							booking.date
						).toLocaleDateString()} at ${booking.timeSlot}`,
					},
					unit_amount: Math.round(booking.price * 100),
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${origin}/checkout/success?type=training`,
		cancel_url: `${origin}/gym/personal-training`,
		metadata: {
			type: "training",
			trainerId: booking.trainerId,
			date: booking.date,
			timeSlot: booking.timeSlot,
		},
	});

	return { sessionId: session.id, url: session.url };
}

export async function createDietPlanCheckout(plan: {
	planId: string;
	planName: string;
	price: number;
	calories: number;
	protein: number;
	carbs: number;
	fats: number;
	dietaryPreference: string;
	mealsPerDay: number;
}) {
	// Note: Clerk authentication - uncomment in production
	// const { userId } = await auth()
	// if (!userId) {
	//   throw new Error("Unauthorized")
	// }
	const origin: string = (await headers()).get("origin") as string;

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: `Custom Diet Plan - ${plan.planName}`,
						description: `${plan.calories} cal | ${plan.protein}g protein | ${plan.dietaryPreference} | ${plan.mealsPerDay} meals/day`,
					},
					unit_amount: Math.round(plan.price * 100),
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${origin}/checkout/success?type=diet`,
		cancel_url: `${origin}/gym/diet-plans`,
		metadata: {
			type: "diet",
			planId: plan.planId,
			calories: plan.calories.toString(),
			protein: plan.protein.toString(),
			carbs: plan.carbs.toString(),
			fats: plan.fats.toString(),
			dietaryPreference: plan.dietaryPreference,
			mealsPerDay: plan.mealsPerDay.toString(),
		},
	});

	return { sessionId: session.id, url: session.url };
}
