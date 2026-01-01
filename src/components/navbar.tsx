"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            💪
          </div>
          <Link href="/" className="text-xl font-bold">
            FitHub Gym
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                Store
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/store/supplements">Supplements</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/store/equipment">Equipment</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/store/food-drinks">Food & Drinks</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                Gym
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/gym/workouts">Workouts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gym/workout-with-trainer">Workout with Trainer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gym/ai-workouts">AI Workouts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gym/diet-plans">Diet Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gym/ai-diet-plans">AI Diet Plans</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild>
            <Link href="/group-activities">Group Activities</Link>
          </Button>

          <SignedIn>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
