import { pgEnum, pgTable, uuid, text, json, timestamp, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const aiLog = pgTable("ai_log", {
	id: uuid().defaultRandom().primaryKey(),
	userId: text("user_id"),
	data: json(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
});
