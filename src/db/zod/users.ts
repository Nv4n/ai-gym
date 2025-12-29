import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../schema/users";

export const insertUserSchema = createInsertSchema(users, {
	username: (s) =>
		s
			.min(3)
			.max(32)
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: "Username must be alphanumeric",
			}),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
