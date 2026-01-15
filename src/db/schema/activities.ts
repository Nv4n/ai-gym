import { sql } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	integer,
	timestamp,
	unique,
	text,
	pgEnum,
	check,
} from "drizzle-orm/pg-core";
export const categoryEnum = pgEnum("category", [
	"dances",
	"mind-body",
	"group-fitness",
]);

export const levelEnum = pgEnum("level", [
	"beginner",
	"intermediate",
	"advanced",
	"all-levels",
]);

export const activities = pgTable(
	"activities",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: varchar("name", { length: 255 }).notNull(),
		category: categoryEnum("category").notNull(),
		description: text("description").notNull(),
		image: varchar("image", { length: 500 }),
		duration: varchar("duration", { length: 50 }).notNull(),
		capacity: integer("capacity").notNull(),
		instructor: varchar("instructor", { length: 255 }).notNull(),
		level: levelEnum("level").notNull(),
		schedule: varchar("schedule", { length: 255 }).array().notNull(),
	},
	(table) => [
		check("name_not_empty", sql`length(${table.name}) > 0`),
		check("instructor_not_empty", sql`length(${table.instructor}) > 0`),
		check("description_not_empty", sql`length(${table.description}) > 0`),
		check("duration_not_empty", sql`length(${table.duration}) > 0`),
		check(
			"schedule_not_empty",
			sql`array_length(${table.schedule}, 1) > 0`
		),
	]
);

export const bookings = pgTable(
	"bookings",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id").notNull(), // Clerk ID
		activityId: uuid("activity_id")
			.references(() => activities.id, { onDelete: "cascade" })
			.notNull(),
		scheduledTime: timestamp("scheduled_time", {
			withTimezone: true,
		}).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(t) => [
		unique("unique_booking").on(t.userId, t.activityId, t.scheduledTime),
		check("valid_user_id", sql`LENGTH(${t.userId}) > 0`),
		check("scheduled_time_future", sql`${t.scheduledTime} > NOW()`),
		check(
			"scheduled_time_reasonable",
			sql`${t.scheduledTime} < NOW() + INTERVAL '2 years'`
		),
	]
);
