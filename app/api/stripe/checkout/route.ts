import Stripe from "stripe";

export async function POST() {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: [],
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/cancel",
	});

	return Response.json({ url: session.url });
}
