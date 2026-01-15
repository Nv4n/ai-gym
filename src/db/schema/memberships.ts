import {
	pgTable,
	uuid,
	boolean,
	timestamp,
	varchar,
	text,
} from "drizzle-orm/pg-core";

export const memberships = pgTable("memberships", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").notNull(),
	plan: varchar("plan", { length: 100 }).notNull(),
	active: boolean("active").default(true).notNull(),
	expiresAt: timestamp("expires_at").notNull(),
});
