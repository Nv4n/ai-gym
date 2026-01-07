import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const orders = pgTable("orders", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),
	total: integer("total").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
