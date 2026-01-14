import z from "zod";

export type WorkoutRequest = {
	goal: string;
	level: string;
	equipment: string[];
};

export const DietRequestSchema = z.object({
	goal: z.string(),
	height: z.string(),
	weight: z.string(),
	allergies: z.array(z.string()),
});

export type DietRequest = z.infer<typeof DietRequestSchema>;
