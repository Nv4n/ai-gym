import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Dumbbell, Utensils } from "lucide-react"

export const metadata = {
  title: "Order Successful - FitHub Gym",
  description: "Your order has been placed successfully",
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; type?: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (searchParams.session_id) {
    await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("stripe_session_id", searchParams.session_id)
      .eq("user_id", user.id)
  }

  const purchaseType = searchParams.type || "product"

  const getContent = () => {
    switch (purchaseType) {
      case "training":
        return {
          icon: <Dumbbell className="h-16 w-16 text-green-600" />,
          title: "Training Session Booked!",
          description:
            "Your personal training session has been confirmed. You will receive an email with session details and your trainer's contact information.",
          primaryAction: { href: "/dashboard/reservations", label: "View My Sessions" },
        }
      case "diet":
        return {
          icon: <Utensils className="h-16 w-16 text-green-600" />,
          title: "Diet Plan Purchased!",
          description:
            "Your custom diet plan is ready. Access your personalized meal plan and nutrition guide from your dashboard.",
          primaryAction: { href: "/dashboard/diet-plans", label: "View My Diet Plans" },
        }
      default:
        return {
          icon: <ShoppingBag className="h-16 w-16 text-green-600" />,
          title: "Order Successful!",
          description:
            "Thank you for your purchase. You will receive a confirmation email shortly with your order details and tracking information.",
          primaryAction: { href: "/dashboard/orders", label: "View My Orders" },
        }
    }
  }

  const content = getContent()

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center py-12">
        <div className="mb-6 flex justify-center">{content.icon}</div>
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{content.description}</p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={content.primaryAction.href}>{content.primaryAction.label}</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/store">Continue Shopping</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
