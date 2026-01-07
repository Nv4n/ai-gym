"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type WorkoutRequest = {
	goal: string;
	level: string;
	equipment: string[];
};

type DietRequest = {
	goal: string;
	weight: string;
	allergies: string[];
};

export async function generateAIWorkout(request: WorkoutRequest) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	// Mock AI workout generation
	// In production, this would call an LLM API
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const mockWorkout = {
		name: `Custom ${request.goal} Workout Plan`,
		description: `AI-generated ${
			request.level
		} workout for ${request.goal.toLowerCase()}`,
		duration: "45-60 min",
		difficulty: request.level,
		exercises: [
			{
				name: "Warm-up: Dynamic Stretching",
				sets: "1",
				reps: "5 min",
				rest: "0s",
			},
			{
				name: "Compound Movement",
				sets: "4",
				reps: "8-10",
				rest: "90s",
			},
			{
				name: "Accessory Exercise 1",
				sets: "3",
				reps: "10-12",
				rest: "60s",
			},
			{
				name: "Accessory Exercise 2",
				sets: "3",
				reps: "12-15",
				rest: "60s",
			},
			{
				name: "Isolation Exercise",
				sets: "3",
				reps: "12-15",
				rest: "45s",
			},
			{
				name: "Cool-down: Static Stretching",
				sets: "1",
				reps: "5 min",
				rest: "0s",
			},
		],
	};

	return mockWorkout;
}

export async function generateAIDietPlan(request: DietRequest) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	// Mock AI diet plan generation
	// In production, this would call an LLM API
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const mockDietPlan = {
		name: `Custom ${request.goal} Diet Plan`,
		description: `AI-generated meal plan for ${request.goal.toLowerCase()} at ${
			request.weight
		}`,
		calories: "2400 kcal",
		protein: "165g",
		carbs: "270g",
		fats: "70g",
		meals: [
			{
				time: "7:00 AM",
				name: "Breakfast",
				description:
					"Balanced breakfast with protein, carbs, and healthy fats",
			},
			{
				time: "10:00 AM",
				name: "Mid-Morning Snack",
				description: "Light snack to maintain energy levels",
			},
			{
				time: "1:00 PM",
				name: "Lunch",
				description: "Main meal with lean protein and complex carbs",
			},
			{
				time: "4:00 PM",
				name: "Pre-Workout",
				description: "Quick energy source before training",
			},
			{
				time: "7:00 PM",
				name: "Dinner",
				description: "Protein-rich dinner with vegetables",
			},
		],
	};

	return mockDietPlan;
}

export async function choosePlan(formData: FormData) {
	// Note: Clerk authentication - uncomment in production
	// const { userId } = await auth()
	// if (!userId) {
	//   redirect("/sign-in")
	// }

	const planId = formData.get("planId") as string;
	const planName = formData.get("planName") as string;
	const planType = formData.get("planType") as string;

	// Mock: Save plan selection to user profile
	// In production, save to database
	console.log("Plan selected:", { planId, planName, planType });

	// Mock delay for saving
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Redirect to dashboard with success message
	redirect("/dashboard?plan=selected");
}

export async function bookTrainer(formData: FormData) {
	// Note: Clerk authentication - uncomment in production
	// const { userId } = await auth()
	// if (!userId) {
	//   redirect("/sign-in")
	// }

	const trainerId = formData.get("trainerId") as string;
	const date = formData.get("date") as string;
	const timeSlot = formData.get("timeSlot") as string;

	// Mock: Save booking to database
	console.log("Training session booked:", { trainerId, date, timeSlot });

	await new Promise((resolve) => setTimeout(resolve, 500));

	return { success: true, bookingId: `booking-${Date.now()}` };
}
