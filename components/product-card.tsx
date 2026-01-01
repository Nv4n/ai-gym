"use client"

import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/store/product/${product.id}`} className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform"
        />
      </Link>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between pt-0">
        <span className="text-2xl font-bold">${product.price}</span>
        <Button asChild size="sm">
          <Link href={`/store/product/${product.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
