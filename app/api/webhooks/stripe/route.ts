import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    // Update order status to paid
    await supabase
      .from("orders")
      .update({
        status: "paid",
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq("stripe_session_id", session.id)

    // Update training session status if applicable
    if (session.metadata?.type === "training") {
      await supabase.from("training_sessions").update({ status: "scheduled" }).eq("stripe_session_id", session.id)
    }

    // Update diet plan status if applicable
    if (session.metadata?.type === "diet") {
      await supabase.from("diet_plans").update({ status: "active" }).eq("stripe_session_id", session.id)
    }
  }

  return NextResponse.json({ received: true })
}
