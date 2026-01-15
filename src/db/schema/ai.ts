import { sql } from "drizzle-orm";
import {
	json,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const aiCategory = pgEnum("ai_category", ["WORKOUT", "DIET"]);

export const aiLog = pgTable("ai_log", {
	id: uuid().defaultRandom().primaryKey(),
	userId: text("user_id"),
	data: json(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`now()`)
		.notNull(),
	type: aiCategory().notNull(),
});
