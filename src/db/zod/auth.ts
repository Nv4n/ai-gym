import { users } from "@/src/db/schema/users";
import { insertUserSchema } from "@/src/db/zod/users";
import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string()
		.min(3)
		.max(32)
		.regex(/^[a-zA-Z0-9_]+$/),
	password: z.string().min(6),
});

export const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});
