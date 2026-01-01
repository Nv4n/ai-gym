"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Clock, Check } from "lucide-react"

type ReservationModalProps = {
  open: boolean
  onClose: () => void
  activity: {
    id: string
    name: string
    duration: string
    capacity: number
    instructor: string
  } | null
}

const TIME_SLOTS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "12:00 PM",
  "01:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
]

export function ReservationModal({ open, onClose, activity }: ReservationModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time")
      return
    }
    // Mock reservation confirmation
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      onClose()
    }, 2000)
  }

  const handleClose = () => {
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setConfirmed(false)
    onClose()
  }

  if (!activity) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Reserve: {activity.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for this {activity.duration} session with {activity.instructor}
          </DialogDescription>
        </DialogHeader>

        {!confirmed ? (
          <div className="grid gap-6 md:grid-cols-2 py-4">
            <div>
              <h3 className="font-semibold mb-4">Select Date</h3>
              <Calendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>

            <div>
              <h3 className="font-semibold mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary hover:bg-muted"
                    }`}
                  >
                    <Clock className="h-4 w-4 inline mr-1" />
                    {time}
                  </button>
                ))}
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">Reservation Summary</h4>
                  <div className="space-y-1 text-sm">
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
                    <p>
                      <span className="text-muted-foreground">Instructor:</span> {activity.instructor}
                    </p>
                  </div>
                  <Button onClick={handleConfirm} className="w-full mt-4">
                    Confirm Reservation
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reservation Confirmed!</h3>
            <p className="text-muted-foreground">You'll receive a confirmation email shortly with all the details.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
