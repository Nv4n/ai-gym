import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { ProductStockManager } from "@/components/admin/product-stock-manager"
import Image from "next/image"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  //if (!authUser) {
 //   redirect("/auth/login")
 // }

  const { data: currentUser } = await supabase.from("users").select("*").eq("id", authUser.id).single()

  if (currentUser?.role !== "admin") {
    redirect("/dashboard")
  }

  const { data: products } = await supabase.from("products").select("*").order("name", { ascending: true })

  const lowStockProducts = products?.filter((p) => p.stock < 10) || []

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Product Management</h1>
          <p className="text-lg text-muted-foreground">Manage inventory and product stock levels</p>
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="mb-6 border-orange-500/50">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Low Stock Alert ({lowStockProducts.length} products)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">The following products have stock levels below 10 units:</p>
              <div className="mt-4 space-y-2">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-orange-500">{product.stock} units left</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)} | Category: {product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ProductStockManager
                      productId={product.id}
                      currentStock={product.stock}
                      productName={product.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
