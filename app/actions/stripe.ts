"use server";

import { stripe } from "@/src/lib/stripe";
import { PRODUCTS } from "@/src/lib/products";

export async function createCheckoutSession(productId: string) {
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
						images: [product.image],
					},
					unit_amount: Math.round(product.price * 100),
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/store`,
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
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

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
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?type=training`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/gym/personal-training`,
		metadata: {
			type: "training",
			trainerId: booking.trainerId,
			date: booking.date,
			timeSlot: booking.timeSlot,
			userId: user.id,
		},
	});

	await supabase.from("training_sessions").insert({
		user_id: user.id,
		trainer_name: booking.trainerName,
		session_type: "personal-training",
		session_date: booking.date,
		session_time: booking.timeSlot,
		price: booking.price,
		stripe_session_id: session.id,
		status: "scheduled",
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
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

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
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?type=diet`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/gym/diet-plans`,
		metadata: {
			type: "diet",
			planId: plan.planId,
			calories: plan.calories.toString(),
			protein: plan.protein.toString(),
			carbs: plan.carbs.toString(),
			fats: plan.fats.toString(),
			dietaryPreference: plan.dietaryPreference,
			mealsPerDay: plan.mealsPerDay.toString(),
			userId: user.id,
		},
	});

	await supabase.from("diet_plans").insert({
		user_id: user.id,
		plan_name: plan.planName,
		calories: plan.calories,
		dietary_preference: plan.dietaryPreference,
		meals_per_day: plan.mealsPerDay,
		macros: {
			protein: plan.protein,
			carbs: plan.carbs,
			fats: plan.fats,
		},
		stripe_session_id: session.id,
		status: "active",
	});

	return { sessionId: session.id, url: session.url };
}

export async function createCartCheckoutSession(
	cartItems: Array<{ product: any; quantity: number }>
) {
	if (!cartItems || cartItems.length === 0) {
		throw new Error("Cart is empty");
	}

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const line_items = cartItems.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.product.name,
				description: item.product.description || "",
				images: item.product.image_url ? [item.product.image_url] : [],
			},
			unit_amount: Math.round(item.product.price * 100),
		},
		quantity: item.quantity,
	}));

	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
		metadata: {
			userId: user.id,
		},
	});

	const { data: order, error: orderError } = await supabase
		.from("orders")
		.insert({
			user_id: user.id,
			total,
			status: "pending",
			stripe_session_id: session.id,
		})
		.select()
		.single();

	if (orderError || !order) {
		throw new Error("Failed to create order");
	}

	const orderItems = cartItems.map((item) => ({
		order_id: order.id,
		product_id: item.product.id,
		quantity: item.quantity,
		price: item.product.price,
	}));

	await supabase.from("order_items").insert(orderItems);

	await supabase.from("cart_items").delete().eq("user_id", user.id);

	return { sessionId: session.id, url: session.url };
}
