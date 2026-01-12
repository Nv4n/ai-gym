import z from "zod";

const difficultySchema = z
	.enum(["Beginner", "Intermediate", "Advanced"])
	.describe("The difficulty level of the workout plan");

const exerciseSchema = z
	.object({
		name: z
			.string()
			.min(1)
			.describe(
				"The name of the exercise, including any specific variations or equipment needed"
			),
		sets: z
			.string()
			.describe(
				'The number of sets to perform, or duration for timed exercises (e.g., "3" or "1")'
			),
		reps: z
			.string()
			.describe(
				'The number of repetitions per set, or duration (e.g., "12" or "5 min" or "30s")'
			),
		weight: z
			.string()
			.describe("The weight or intensity used for the exercise"),
		rest: z
			.string()
			.describe(
				'The rest period between sets in seconds or minutes (e.g., "60s" or "2 min" or "0s")'
			),
	})
	.describe("An individual exercise within the workout plan");

export const workoutPlanSchema = z
	.object({
		name: z
			.string()
			.min(1)
			.describe(
				'A descriptive name for the workout plan that includes the goal (e.g., "Custom Strength Workout Plan")'
			),
		description: z
			.string()
			.describe(
				'A brief description of the workout including the difficulty level and primary goal (e.g., "AI-generated Beginner workout for strength building")'
			),
		duration: z
			.string()
			.describe(
				'The estimated total duration of the workout session (e.g., "45-60 min")'
			),
		difficulty: difficultySchema,
		exercises: z
			.array(exerciseSchema)
			.min(1)
			.describe(
				"An array of exercises that make up the complete workout plan, including warm-up and cool-down"
			),
	})
	.describe(
		"A complete workout plan tailored to a specific fitness goal and experience level"
	);

export type WorkoutPlan = z.infer<typeof workoutPlanSchema>;
