"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Users, User } from "lucide-react"

type ActivityCardProps = {
  activity: {
    id: string
    name: string
    description: string
    image: string
    duration: string
    capacity: number
    instructor: string
  }
  onReserve: (activityId: string) => void
}

export function ActivityCard({ activity, onReserve }: ActivityCardProps) {
  return (
    <div className="group rounded-lg border border-border overflow-hidden hover:border-primary transition-colors">
      <div className="relative h-48 bg-muted">
        <Image
          src={`/.jpg?height=192&width=384&query=${encodeURIComponent(activity.name)}`}
          alt={activity.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{activity.capacity} spots</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{activity.instructor}</span>
        </div>

        <Button onClick={() => onReserve(activity.id)} className="w-full">
          Reserve Spot
        </Button>
      </div>
    </div>
  )
}
