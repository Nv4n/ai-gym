"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/app/actions/cart"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  productId: string
  productName: string
  variant?: "default" | "outline" | "ghost"
  className?: string
}

export function AddToCartButton({ productId, productName, variant = "default", className }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(productId)
      if (result.error) {
        if (result.error === "Not authenticated") {
          router.push("/auth/login")
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Added to cart",
          description: `${productName} has been added to your cart`,
        })
        router.refresh()
      }
    })
  }

  return (
    <Button variant={variant} onClick={handleAddToCart} disabled={isPending} className={className}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
