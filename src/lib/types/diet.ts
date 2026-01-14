import z from "zod";

const DietProductSchema = z.object({
	name: z.string().describe("Name of the dish or ingredient"),
	amount: z
		.string()
		.describe(
			"Quantity of the product with unit (e.g. '200g', '2 cups', '1 piece', '200 ml')"
		),

	recipe: z
		.string()
		.optional()
		.describe(
			"Optional short preparation instructions or recipe for this dish"
		),
});

const DietDaySchema = z.object({
	name: z.string().describe("Name of the day (eg. Day 1)"),
	meals: z
		.array(DietProductSchema)
		.describe("Structured daily meal plan divided into meals with products")
		.describe(
			"Structured daily meal plan divided into meals with products"
		),
});

export const DietPlanSchema = z.object({
	name: z
		.string()
		.describe(
			"Short name of the diet plan based on the user's goal (e.g. 'Muscle Gain (Bulking)')"
		),

	description: z
		.string()
		.describe(
			"Brief explanation of the diet strategy and how it helps achieve the user's goal"
		),

	calories: z
		.string()
		.describe("Total daily calories with unit (e.g. '2600 kcal')"),

	protein: z
		.string()
		.describe("Total daily protein intake with unit (e.g. '180g')"),

	carbs: z
		.string()
		.describe("Total daily carbohydrate intake with unit (e.g. '335g')"),

	fats: z.string().describe("Total daily fat intake with unit (e.g. '60g')"),
	days: z.array(DietDaySchema),
});

export type DietPlan = z.infer<typeof DietPlanSchema>;
