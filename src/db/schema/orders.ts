import { products } from "@/src/db/schema/products";
import { sql } from "drizzle-orm";
import {
	check,
	integer,
	numeric,
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
	"pending",
	"completed",
	"refunded",
]);

export const orders = pgTable(
	"orders",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		clerkId: text("clerk_id").notNull(),
		stripeId: text("stripe_id").notNull(),
		total: real("total").notNull(),
		address: text("address").notNull(),
		status: orderStatusEnum("status").default("pending").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		check("total_positive", sql`${table.total} > 0`),
		check("clerk_id_not_empty", sql`LENGTH(${table.clerkId}) > 0`),
		check("stripe_id_not_empty", sql`LENGTH(${table.stripeId}) > 0`),
		check("address_not_empty", sql`LENGTH(${table.address}) > 0`),
	]
);

export const orderProducts = pgTable(
	"order_products",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		orderId: uuid("order_id")
			.notNull()
			.references(() => orders.id, { onDelete: "cascade" }),
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "restrict" }),
		priceAtPurchase: numeric("price_at_purchase", {
			precision: 10,
			scale: 2,
		}).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		check("price_at_purchase_positive", sql`${table.priceAtPurchase} > 0`),
	]
);
