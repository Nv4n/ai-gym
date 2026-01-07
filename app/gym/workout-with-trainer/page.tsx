import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata = {
  title: "Workout with Trainer - FitHub Gym",
  description: "Book personal training sessions with certified trainers",
}

export default function WorkoutWithTrainerPage() {
  const benefits = [
    "Personalized workout plans tailored to your goals",
    "Form correction and injury prevention",
    "Motivation and accountability",
    "Nutritional guidance and meal planning",
    "Progress tracking and goal setting",
    "Flexible scheduling options",
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Workout with a Trainer</h1>
            <p className="text-lg text-muted-foreground">
              Take your fitness to the next level with one-on-one personal training sessions
            </p>
          </div>

          <div className="rounded-lg border border-border p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Why Train with Us?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Book a free consultation with one of our certified trainers to discuss your fitness goals
            </p>
            <Button size="lg">Book Free Consultation</Button>
          </div>
        </div>
      </main>
    </>
  )
}
