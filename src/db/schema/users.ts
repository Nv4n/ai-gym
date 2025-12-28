import { sessions } from "@/src/db/schema";
import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	username: varchar("username", { length: 32 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: roleEnum("role").default("USER").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
}));
