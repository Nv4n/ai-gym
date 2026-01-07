import {
	pgTable,
	uuid,
	boolean,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const memberships = pgTable("memberships", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id)
		.notNull(),
	plan: varchar("plan", { length: 100 }).notNull(),
	active: boolean("active").default(true).notNull(),
	expiresAt: timestamp("expires_at").notNull(),
});
