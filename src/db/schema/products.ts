import { sql } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	integer,
	check,
	numeric,
	text,
	real,
} from "drizzle-orm/pg-core";

export const products = pgTable(
	"products",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		description: text("description").notNull(),
		price: real("price").notNull(),
		image: text("image"),
		category: varchar("category", { length: 255 }).notNull(),
		subcategory: varchar("subcategory", { length: 255 }),
	},
	(table) => [
		check("price_positive", sql`${table.price} > 0`),
		check("name_not_empty", sql`LENGTH(${table.name}) > 0`),
		check("description_not_empty", sql`LENGTH(${table.description}) > 0`),
		check("category_not_empty", sql`LENGTH(${table.category}) > 0`),
	]
);
