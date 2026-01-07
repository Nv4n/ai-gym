import { pgTable, uuid, integer, timestamp, text } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").notNull(),
	total: integer("total").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
