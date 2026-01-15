import { sql } from "drizzle-orm";
import {
	boolean,
	check,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const memberships = pgTable(
	"memberships",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id").notNull(), // Clerk ID
		plan: varchar("plan", { length: 100 }).notNull(),
		active: boolean("active").default(true).notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		check(
			"valid_plan",
			sql`${table.plan} IN ('free', 'pro', 'enterprise')`
		),
		check(
			"expires_after_created",
			sql`${table.expiresAt} > ${table.createdAt}`
		),
		check("user_id_not_empty", sql`${table.userId} != ''`),
	]
);
