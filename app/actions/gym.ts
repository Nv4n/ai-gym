"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { workoutPlanSchema } from "@/app/actions/schemas/gym";

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
// const mockWorkout = {
// 	name: `Custom ${request.goal} Workout Plan`,
// 	description: `AI-generated ${
// 		request.level
// 	} workout for ${request.goal.toLowerCase()}`,
// 	duration: "45-60 min",
// 	difficulty: request.level,
// 	exercises: [
// 		{
// 			name: "Warm-up: Dynamic Stretching",
// 			sets: "1",
// 			reps: "5 min",
// 			rest: "0s",
// 		},
// 		{
// 			name: "Compound Movement",
// 			sets: "4",
// 			reps: "8-10",
// 			rest: "90s",
// 		},
// 		{
// 			name: "Accessory Exercise 1",
// 			sets: "3",
// 			reps: "10-12",
// 			rest: "60s",
// 		},
// 		{
// 			name: "Accessory Exercise 2",
// 			sets: "3",
// 			reps: "12-15",
// 			rest: "60s",
// 		},
// 		{
// 			name: "Isolation Exercise",
// 			sets: "3",
// 			reps: "12-15",
// 			rest: "45s",
// 		},
// 		{
// 			name: "Cool-down: Static Stretching",
// 			sets: "1",
// 			reps: "5 min",
// 			rest: "0s",
// 		},
// 	],
// };

function generateWorkoutPrompt(
	level: string,
	goal: string,
	equipment: string[]
) {
	const equipmentList = equipment.join(", ");

	return `
Generate a comprehensive workout plan based on the following requirements:

The user is at a ${level} fitness level and their primary goal is: ${goal}.

Available equipment: ${equipmentList}.

Create a complete workout session that:
- Includes a proper warm-up phase (2-10 minutes of dynamic stretching or light cardio)
- Features 6-15 main exercises that utilize ONLY the available equipment listed above
- Matches the ${level} difficulty level with appropriate exercise selection, volume, and intensity
- Directly targets the goal: ${goal}
- Includes a cool-down phase (1-5 minutes of stretching)
- Has a total duration of 45-60 minutes

For each exercise, specify:
- The exact exercise name with any variations (e.g., "Barbell Back Squat" not just "Squats")
- Number of sets (typically 2-4 depending on experience level)
- Reps or duration (e.g., "12", "8-10", "30s", "5 min")
- Weight or intensity (e.g., "12 kg", "Sprint", "Walking", "Walk on 10% incline")
- Rest periods between sets (e.g., "60s", "90s", "2 min")

Ensure the workout is balanced, safe for the ${level} level, and effectively works toward ${goal}.
Use proper exercise progression and avoid exercises that would be too advanced or too simple for this level.
`;
}

export async function generateAIWorkout(request: WorkoutRequest) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

	const prompt = generateWorkoutPrompt(
		request.level,
		request.goal,
		request.equipment
	);

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: prompt,
		config: {
			responseMimeType: "application/json",
			responseJsonSchema: z.toJSONSchema(workoutPlanSchema),
		},
	});

	if (!response.text) {
		console.error("Model returned empty response");
		throw new Error("Error with the model, please try again");
	}

	const workout = workoutPlanSchema.parse(JSON.parse(response.text));
	console.log(workout);

	return workout;
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
