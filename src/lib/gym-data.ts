export type Workout = {
  id: string
  name: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  exercises: {
    name: string
    sets: string
    reps: string
    rest: string
  }[]
}

export type DietPlan = {
  id: string
  name: string
  description: string
  calories: string
  protein: string
  carbs: string
  fats: string
  meals: {
    time: string
    name: string
    description: string
  }[]
}

export const WORKOUTS: Workout[] = [
  {
    id: "push-day",
    name: "Push Day (Chest, Shoulders, Triceps)",
    description: "Build upper body pushing strength with this comprehensive workout",
    duration: "60-75 min",
    difficulty: "intermediate",
    exercises: [
      { name: "Bench Press", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Incline Dumbbell Press", sets: "3", reps: "10-12", rest: "60s" },
      { name: "Overhead Press", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Lateral Raises", sets: "3", reps: "12-15", rest: "45s" },
      { name: "Tricep Dips", sets: "3", reps: "10-12", rest: "60s" },
      { name: "Tricep Pushdowns", sets: "3", reps: "12-15", rest: "45s" },
    ],
  },
  {
    id: "pull-day",
    name: "Pull Day (Back, Biceps)",
    description: "Develop a strong, wide back and powerful biceps",
    duration: "60-75 min",
    difficulty: "intermediate",
    exercises: [
      { name: "Deadlifts", sets: "4", reps: "6-8", rest: "120s" },
      { name: "Pull-ups", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Bent-Over Rows", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Face Pulls", sets: "3", reps: "12-15", rest: "45s" },
      { name: "Barbell Curls", sets: "3", reps: "10-12", rest: "60s" },
      { name: "Hammer Curls", sets: "3", reps: "10-12", rest: "60s" },
    ],
  },
  {
    id: "leg-day",
    name: "Leg Day (Quads, Hamstrings, Glutes)",
    description: "Build powerful lower body strength and muscle",
    duration: "60-75 min",
    difficulty: "advanced",
    exercises: [
      { name: "Squats", sets: "4", reps: "6-8", rest: "120s" },
      { name: "Romanian Deadlifts", sets: "4", reps: "8-10", rest: "90s" },
      { name: "Leg Press", sets: "3", reps: "10-12", rest: "90s" },
      { name: "Leg Curls", sets: "3", reps: "10-12", rest: "60s" },
      { name: "Calf Raises", sets: "4", reps: "12-15", rest: "45s" },
      { name: "Leg Extensions", sets: "3", reps: "12-15", rest: "60s" },
    ],
  },
  {
    id: "cardio-hiit",
    name: "HIIT Cardio Blast",
    description: "High-intensity intervals for maximum fat burning",
    duration: "30 min",
    difficulty: "intermediate",
    exercises: [
      { name: "Burpees", sets: "5", reps: "20s on / 40s off", rest: "" },
      { name: "Mountain Climbers", sets: "5", reps: "20s on / 40s off", rest: "" },
      { name: "Jump Squats", sets: "5", reps: "20s on / 40s off", rest: "" },
      { name: "High Knees", sets: "5", reps: "20s on / 40s off", rest: "" },
      { name: "Plank Jacks", sets: "5", reps: "20s on / 40s off", rest: "" },
    ],
  },
  {
    id: "full-body",
    name: "Full Body Strength",
    description: "Complete workout hitting all major muscle groups",
    duration: "60 min",
    difficulty: "beginner",
    exercises: [
      { name: "Goblet Squats", sets: "3", reps: "12-15", rest: "60s" },
      { name: "Push-ups", sets: "3", reps: "10-15", rest: "60s" },
      { name: "Dumbbell Rows", sets: "3", reps: "12-15", rest: "60s" },
      { name: "Shoulder Press", sets: "3", reps: "10-12", rest: "60s" },
      { name: "Plank", sets: "3", reps: "30-60s hold", rest: "60s" },
      { name: "Lunges", sets: "3", reps: "10-12 each", rest: "60s" },
    ],
  },
]

export const DIET_PLANS: DietPlan[] = [
  {
    id: "muscle-gain",
    name: "Muscle Gain (Bulking)",
    description: "High-protein, calorie surplus diet for building muscle mass",
    calories: "3200 kcal",
    protein: "180g",
    carbs: "400g",
    fats: "90g",
    meals: [
      {
        time: "7:00 AM",
        name: "Breakfast",
        description: "4 whole eggs, 2 cups oatmeal with banana, orange juice",
      },
      {
        time: "10:00 AM",
        name: "Mid-Morning Snack",
        description: "Greek yogurt with granola and berries, protein shake",
      },
      {
        time: "1:00 PM",
        name: "Lunch",
        description: "8oz grilled chicken, 2 cups brown rice, steamed vegetables",
      },
      {
        time: "4:00 PM",
        name: "Pre-Workout",
        description: "Banana with peanut butter, pre-workout supplement",
      },
      {
        time: "6:00 PM",
        name: "Post-Workout",
        description: "Protein shake with banana and oats",
      },
      {
        time: "8:00 PM",
        name: "Dinner",
        description: "8oz salmon, sweet potato, asparagus",
      },
    ],
  },
  {
    id: "fat-loss",
    name: "Fat Loss (Cutting)",
    description: "High-protein, moderate carb diet for fat loss while preserving muscle",
    calories: "2000 kcal",
    protein: "160g",
    carbs: "180g",
    fats: "60g",
    meals: [
      {
        time: "7:00 AM",
        name: "Breakfast",
        description: "4 egg whites, 1 whole egg, 1 cup oatmeal, berries",
      },
      {
        time: "10:00 AM",
        name: "Mid-Morning Snack",
        description: "Protein shake with almond milk",
      },
      {
        time: "1:00 PM",
        name: "Lunch",
        description: "6oz grilled chicken, quinoa, large salad with olive oil",
      },
      {
        time: "4:00 PM",
        name: "Pre-Workout",
        description: "Apple with almonds",
      },
      {
        time: "7:00 PM",
        name: "Dinner",
        description: "6oz lean beef, broccoli, small sweet potato",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance (Balanced)",
    description: "Balanced macros for maintaining current weight and performance",
    calories: "2500 kcal",
    protein: "170g",
    carbs: "280g",
    fats: "75g",
    meals: [
      {
        time: "7:30 AM",
        name: "Breakfast",
        description: "3 whole eggs, 2 slices whole grain toast, avocado",
      },
      {
        time: "10:30 AM",
        name: "Mid-Morning Snack",
        description: "Greek yogurt with nuts and honey",
      },
      {
        time: "1:00 PM",
        name: "Lunch",
        description: "7oz turkey breast, brown rice, mixed vegetables",
      },
      {
        time: "4:30 PM",
        name: "Pre-Workout",
        description: "Banana with peanut butter",
      },
      {
        time: "7:30 PM",
        name: "Dinner",
        description: "7oz salmon, quinoa, roasted vegetables",
      },
    ],
  },
]
