"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { createTrainingCheckout } from "@/app/actions/stripe"
import { Clock, Star, Award } from "lucide-react"

const TRAINERS = [
  {
    id: "trainer-1",
    name: "Mike Rodriguez",
    specialty: "Strength & Conditioning",
    experience: "10 years",
    rating: 4.9,
    price: 79.99,
    image: "/trainer-mike.jpg",
    bio: "Certified strength coach specializing in powerlifting and Olympic lifting",
  },
  {
    id: "trainer-2",
    name: "Sarah Johnson",
    specialty: "Yoga & Flexibility",
    experience: "8 years",
    rating: 4.8,
    price: 69.99,
    image: "/trainer-sarah.jpg",
    bio: "Experienced yoga instructor focused on mobility and injury prevention",
  },
  {
    id: "trainer-3",
    name: "Alex Martinez",
    specialty: "Boxing & Combat Sports",
    experience: "12 years",
    rating: 5.0,
    price: 89.99,
    image: "/trainer-alex.jpg",
    bio: "Former professional boxer with expertise in technique and conditioning",
  },
  {
    id: "trainer-4",
    name: "Emily Chen",
    specialty: "HIIT & Weight Loss",
    experience: "6 years",
    rating: 4.7,
    price: 74.99,
    image: "/trainer-emily.jpg",
    bio: "High-energy trainer specializing in metabolic conditioning",
  },
]

const TIME_SLOTS = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
]

export default function PersonalTrainingPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  const trainer = TRAINERS.find((t) => t.id === selectedTrainer)

  const handleBookSession = async () => {
    if (!selectedTrainer || !selectedDate || !selectedTime) return

    setIsBooking(true)
    try {
      // Note: Clerk authentication - uncomment in production
      // This will redirect unauthenticated users to sign-in

      const result = await createTrainingCheckout({
        trainerId: selectedTrainer,
        trainerName: trainer?.name || "",
        date: selectedDate.toISOString(),
        timeSlot: selectedTime,
        price: trainer?.price || 0,
      })

      if (result.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error("[v0] Booking error:", error)
      alert("Failed to create booking. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-12">
            <h1 className="text-balance text-4xl font-bold mb-4">Personal Training</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Book one-on-one sessions with our certified trainers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trainer Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Select Your Trainer</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {TRAINERS.map((trainerOption) => (
                    <Card
                      key={trainerOption.id}
                      className={`cursor-pointer transition-all ${
                        selectedTrainer === trainerOption.id
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTrainer(trainerOption.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{trainerOption.name}</CardTitle>
                            <CardDescription>{trainerOption.specialty}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            {trainerOption.rating}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{trainerOption.bio}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="h-4 w-4" />
                            <span>{trainerOption.experience}</span>
                          </div>
                          <span className="text-lg font-bold">${trainerOption.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              {selectedTrainer && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Choose a Date</h2>
                  <Card>
                    <CardContent className="p-6">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Time Selection */}
              {selectedTrainer && selectedDate && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Select Time Slot</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="w-full"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your session details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trainer ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Trainer</p>
                        <p className="font-semibold">{trainer.name}</p>
                        <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                      </div>

                      {selectedDate && (
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      )}

                      {selectedTime && (
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-semibold">{selectedTime}</p>
                        </div>
                      )}

                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Session (60 min)</span>
                          <span className="font-semibold">${trainer.price}</span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>${trainer.price}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        disabled={!selectedTrainer || !selectedDate || !selectedTime || isBooking}
                        onClick={handleBookSession}
                      >
                        {isBooking ? "Processing..." : "Book & Pay"}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        You'll be redirected to secure checkout
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">Select a trainer to start booking</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
