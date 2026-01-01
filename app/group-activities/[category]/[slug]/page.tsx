"use client"

import { Navbar } from "@/components/navbar"
import { GROUP_ACTIVITIES } from "@/lib/group-activities"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Users, Award, CalendarIcon, MapPin } from "lucide-react"
import { notFound } from "next/navigation"
import { useState } from "react"

const TIME_SLOTS_BY_DAY: Record<string, string[]> = {
  Mon: ["6:00 AM", "7:00 AM", "8:00 AM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  Tue: ["5:30 AM", "7:00 AM", "9:00 AM", "12:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
  Wed: ["6:00 AM", "7:00 AM", "8:00 AM", "12:00 PM", "5:30 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  Thu: ["5:30 AM", "7:00 AM", "9:00 AM", "12:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
  Fri: ["6:00 AM", "7:00 AM", "8:00 AM", "10:00 AM", "5:00 PM", "6:00 PM", "7:00 PM"],
  Sat: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "4:00 PM", "5:00 PM"],
  Sun: ["8:00 AM", "9:00 AM", "3:00 PM", "4:00 PM", "5:00 PM"],
}

export default function ClassDetailPage({ params }: { params: { category: string; slug: string } }) {
  const activity = GROUP_ACTIVITIES.find((c) => c.id === params.slug)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isReserving, setIsReserving] = useState(false)

  if (!activity || activity.category !== params.category) {
    notFound()
  }

  const dayOfWeek = selectedDate?.toLocaleDateString("en-US", { weekday: "short" })
  const availableTimes = dayOfWeek ? TIME_SLOTS_BY_DAY[dayOfWeek] || [] : []

  const handleReserveClick = () => {
    // Note: Clerk authentication - uncomment in production
    // const { isSignedIn } = useAuth()
    // if (!isSignedIn) {
    //   router.push("/sign-in")
    //   return
    // }
    setModalOpen(true)
  }

  const handleConfirmReservation = async () => {
    if (!selectedDate || !selectedTime) return

    setIsReserving(true)

    // Mock reservation API call
    console.log("[v0] Reserving class:", {
      activityId: activity.id,
      activityName: activity.name,
      date: selectedDate.toISOString(),
      time: selectedTime,
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsReserving(false)
    setModalOpen(false)
    alert(`Successfully reserved ${activity.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime}!`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 capitalize">
              {activity.category.replace("-", " ")}
            </Badge>
            <h1 className="text-balance text-4xl font-bold mb-4">{activity.name}</h1>
            <p className="text-pretty text-lg text-muted-foreground mb-6">{activity.description}</p>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-semibold">{activity.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{activity.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{activity.capacity} spots</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {activity.level}
                </Badge>
              </div>
            </div>

            <Button size="lg" onClick={handleReserveClick} className="w-full sm:w-auto">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Reserve Class
            </Button>
          </div>

          {/* Schedule Preview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
              <div className="grid gap-2">
                {activity.schedule.map((time, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Studio {(idx % 3) + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Class Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Class Format</h3>
                  <p>
                    This {activity.duration} class is designed for {activity.level} participants. You'll be guided
                    through a structured session by our experienced instructor, {activity.instructor}.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What to Bring</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Water bottle</li>
                    <li>Towel</li>
                    <li>Comfortable workout attire</li>
                    <li>Positive energy and willingness to challenge yourself</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cancellation Policy</h3>
                  <p>
                    Cancel up to 12 hours before class start time for a full credit. Late cancellations may be subject
                    to fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Improve cardiovascular health",
                  "Build strength and endurance",
                  "Increase flexibility and mobility",
                  "Reduce stress and anxiety",
                  "Connect with fitness community",
                  "Expert guidance and motivation",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Reservation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Reserve {activity.name}</DialogTitle>
            <DialogDescription>Select a date and time for your class reservation</DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            {/* Calendar */}
            <div>
              <h3 className="font-semibold mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-semibold mb-3">
                {selectedDate ? `Available Times (${dayOfWeek})` : "Select a date first"}
              </h3>
              {selectedDate ? (
                availableTimes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No classes available on {dayOfWeek}s</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">Please select a date to view available times</p>
              )}

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">Reservation Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Class:</span> {activity.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span> {selectedTime}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Duration:</span> {activity.duration}
                    </p>
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4"
                disabled={!selectedDate || !selectedTime || isReserving}
                onClick={handleConfirmReservation}
              >
                {isReserving ? "Reserving..." : "Confirm Reservation"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
