import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 150 }).notNull(),
	price: integer("price").notNull(), // cents
});
