"use client"

import { Navbar } from "@/components/navbar"
import { DIET_PLANS } from "@/lib/gym-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { createDietPlanCheckout } from "@/app/actions/stripe"
import { Check } from "lucide-react"

const DIETARY_PREFERENCES = [
  { value: "balanced", label: "Balanced" },
  { value: "keto", label: "Keto" },
  { value: "vegan", label: "Vegan" },
  { value: "paleo", label: "Paleo" },
  { value: "vegetarian", label: "Vegetarian" },
]

const MEALS_PER_DAY = [3, 4, 5, 6]

const BASE_PLAN_PRICE = 49.99

export default function DietPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [calories, setCalories] = useState([2400])
  const [dietaryPreference, setDietaryPreference] = useState("balanced")
  const [mealsPerDay, setMealsPerDay] = useState(5)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const plan = DIET_PLANS.find((p) => p.id === selectedPlan)

  // Calculate macros based on calories and dietary preference
  const calculateMacros = () => {
    const cals = calories[0]
    let protein = 0
    let carbs = 0
    let fats = 0

    switch (dietaryPreference) {
      case "keto":
        protein = Math.round((cals * 0.25) / 4)
        fats = Math.round((cals * 0.7) / 9)
        carbs = Math.round((cals * 0.05) / 4)
        break
      case "vegan":
      case "vegetarian":
        protein = Math.round((cals * 0.15) / 4)
        carbs = Math.round((cals * 0.6) / 4)
        fats = Math.round((cals * 0.25) / 9)
        break
      case "paleo":
        protein = Math.round((cals * 0.3) / 4)
        carbs = Math.round((cals * 0.35) / 4)
        fats = Math.round((cals * 0.35) / 9)
        break
      default: // balanced
        protein = Math.round((cals * 0.3) / 4)
        carbs = Math.round((cals * 0.45) / 4)
        fats = Math.round((cals * 0.25) / 9)
    }

    return { protein, carbs, fats }
  }

  const macros = calculateMacros()

  const handlePurchase = async () => {
    if (!plan) return

    setIsPurchasing(true)
    try {
      // Note: Clerk authentication - uncomment in production
      // This will redirect unauthenticated users to sign-in

      const result = await createDietPlanCheckout({
        planId: plan.id,
        planName: plan.name,
        price: BASE_PLAN_PRICE,
        calories: calories[0],
        protein: macros.protein,
        carbs: macros.carbs,
        fats: macros.fats,
        dietaryPreference,
        mealsPerDay,
      })

      if (result.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error("[v0] Purchase error:", error)
      alert("Failed to process purchase. Please try again.")
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-12">
            <h1 className="text-balance text-4xl font-bold mb-4">Customizable Diet Plans</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Choose a plan template and customize it to your exact nutritional needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plan Templates */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Choose a Base Plan</h2>
                <div className="grid gap-4">
                  {DIET_PLANS.map((planOption) => (
                    <Card
                      key={planOption.id}
                      className={`cursor-pointer transition-all ${
                        selectedPlan === planOption.id
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPlan(planOption.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{planOption.name}</CardTitle>
                            <CardDescription>{planOption.description}</CardDescription>
                          </div>
                          {selectedPlan === planOption.id && (
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{planOption.calories}</Badge>
                          <Badge variant="outline">Protein: {planOption.protein}</Badge>
                          <Badge variant="outline">Carbs: {planOption.carbs}</Badge>
                          <Badge variant="outline">Fats: {planOption.fats}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              {selectedPlan && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Customize Your Plan</h2>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      {/* Calories */}
                      <div className="space-y-3">
                        <Label className="text-base">Daily Calories: {calories[0]} kcal</Label>
                        <Slider
                          value={calories}
                          onValueChange={setCalories}
                          min={1500}
                          max={4000}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1,500 kcal</span>
                          <span>4,000 kcal</span>
                        </div>
                      </div>

                      {/* Dietary Preference */}
                      <div className="space-y-3">
                        <Label className="text-base">Dietary Preference</Label>
                        <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DIETARY_PREFERENCES.map((pref) => (
                              <SelectItem key={pref.value} value={pref.value}>
                                {pref.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Meals Per Day */}
                      <div className="space-y-3">
                        <Label className="text-base">Meals Per Day</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {MEALS_PER_DAY.map((num) => (
                            <Button
                              key={num}
                              variant={mealsPerDay === num ? "default" : "outline"}
                              onClick={() => setMealsPerDay(num)}
                              className="w-full"
                            >
                              {num}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Live Preview & Checkout */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Plan Summary</CardTitle>
                  <CardDescription>Your customized nutrition plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Base Plan</p>
                        <p className="font-semibold">{plan.name}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Nutritional Goals</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Calories</span>
                            <span className="font-medium">{calories[0]} kcal</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Protein</span>
                            <span className="font-medium">{macros.protein}g</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Carbs</span>
                            <span className="font-medium">{macros.carbs}g</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fats</span>
                            <span className="font-medium">{macros.fats}g</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Dietary Preference</p>
                        <p className="font-semibold capitalize">{dietaryPreference}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Meals Per Day</p>
                        <p className="font-semibold">{mealsPerDay} meals</p>
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between text-lg font-bold mb-4">
                          <span>Total</span>
                          <span>${BASE_PLAN_PRICE}</span>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          disabled={!selectedPlan || isPurchasing}
                          onClick={handlePurchase}
                        >
                          {isPurchasing ? "Processing..." : "Buy Plan"}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center mt-3">
                          One-time payment • Includes 30-day meal plan
                        </p>
                      </div>

                      <div className="border-t border-border pt-4">
                        <p className="text-sm font-medium mb-2">What's Included:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            30-day meal plan
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            Shopping lists
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            Meal prep instructions
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            Recipe variations
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Select a plan to customize and purchase
                    </p>
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
