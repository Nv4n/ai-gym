import {
	pgTable,
	uuid,
	varchar,
	integer,
	timestamp,
	unique,
	text,
} from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 150 }).notNull(),
	capacity: integer("capacity").notNull(),
	startsAt: timestamp("starts_at").notNull(),
});

export const bookings = pgTable(
	"bookings",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id").notNull(),
		activityId: uuid("activity_id")
			.references(() => activities.id)
			.notNull(),
	},
	(t) => ({
		uniqueBooking: unique().on(t.userId, t.activityId),
	})
);
