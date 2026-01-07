"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateProductStock } from "@/app/actions/admin"
import { useState, useTransition } from "react"
import { Minus, Plus } from "lucide-react"

interface ProductStockManagerProps {
  productId: string
  currentStock: number
  productName: string
}

export function ProductStockManager({ productId, currentStock, productName }: ProductStockManagerProps) {
  const [stock, setStock] = useState(currentStock)
  const [isPending, startTransition] = useTransition()

  const handleStockChange = (newStock: number) => {
    if (newStock < 0) return
    setStock(newStock)
    startTransition(async () => {
      await updateProductStock(productId, newStock)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={() => handleStockChange(stock - 1)}
        disabled={isPending || stock <= 0}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        min="0"
        value={stock}
        onChange={(e) => handleStockChange(Number.parseInt(e.target.value) || 0)}
        className="h-8 w-20 text-center"
        disabled={isPending}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={() => handleStockChange(stock + 1)}
        disabled={isPending}
      >
        <Plus className="h-3 w-3" />
      </Button>
      <span
        className={`ml-2 text-sm ${
          stock < 10 ? "text-orange-500" : stock === 0 ? "text-red-500" : "text-muted-foreground"
        }`}
      >
        {stock === 0 ? "Out of stock" : stock < 10 ? "Low stock" : `${stock} units`}
      </span>
    </div>
  )
}
