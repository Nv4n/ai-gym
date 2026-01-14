"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { updateOrderStatus } from "@/app/actions/admin"
import { useTransition } from "react"

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus)
    })
  }

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isPending}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
        <SelectItem value="shipped">Shipped</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  )
}
