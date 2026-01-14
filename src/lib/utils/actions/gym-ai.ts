import { DietRequest, WorkoutRequest } from "@/src/lib/types/actions";

export function generateWorkoutPrompt({
	level,
	goal,
	equipment,
}: WorkoutRequest) {
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

export function generateDietPrompt({
	goal,
	weight,
	height,
	allergies,
}: DietRequest) {
	return `
Generate a comprehensive 7-day diet plan based on the following user information:

Primary dietary goal: ${goal}
Height: ${height}
Weight: ${weight}
Food allergies or intolerances: ${
		allergies.length ? allergies.join(", ") : "None"
	}

Create a complete weekly meal plan that:
- Covers exactly 7 days (Day 1 through Day 7)
- Is specifically tailored to the goal: ${goal}
- Uses the user's height and weight to estimate appropriate calorie and macronutrient needs
- STRICTLY avoids all listed allergens
- Represents a realistic, healthy, and sustainable nutrition plan for an entire week
- Includes multiple meals per day (e.g. breakfast, lunch, dinner, snacks)
- Uses common, easy-to-find food products
- Uses clear and consistent units for all quantities (grams, cups, pieces, kcal, etc.)
- Maintains reasonable variety across days while keeping nutrition consistent

Guidelines for the generated plan:
- Provide a clear and descriptive name for the overall diet plan
- Include a short explanation describing how the plan supports the stated goal
- Specify total daily calories, protein, carbohydrates, and fats (daily targets, not per meal)
- Each day must have a clear name (e.g. "Day 1", "Day 2", etc.)
- Each day must include a full daily meal plan with multiple meals
- Each meal must have a clear name
- Each meal must contain multiple food products
- Each product must include a realistic amount
- Optionally include short preparation instructions where helpful

Important rules:
- Ensure the output strictly matches the required structured format provided externally
- Include exactly 7 days — no more, no fewer
- Do NOT include any extra fields
- Do NOT include explanations, comments, or markdown
- Ensure no allergens appear anywhere in any day or meal
- Keep the tone professional, as if written by a certified nutritionist

Focus on clarity, correctness, structure, and consistency across all 7 days.
`;
}
