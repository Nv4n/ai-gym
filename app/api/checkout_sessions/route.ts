import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
	const { amount } = await request.json();

	const params: Stripe.Checkout.SessionCreateParams = {
		submit_type: "donate",
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Custom amount donation",
					},
					unit_amount: amount,
				},
				quantity: 1,
			},
		],
		success_url: `${request.headers.get(
			"origin"
		)}/result?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${request.headers.get(
			"origin"
		)}/result?session_id={CHECKOUT_SESSION_ID}`,
		mode: "payment",
	};

	const checkoutSession = await stripe.checkout.sessions.create(params);

	return NextResponse.json(checkoutSession);
}
