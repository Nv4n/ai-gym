import {
	doublePrecision,
	pgTable,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 150 }).notNull(),
	price: doublePrecision("price").notNull(),
	description: text("description").notNull(),
});
