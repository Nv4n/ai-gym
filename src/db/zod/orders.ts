import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
import { orderProducts, orders } from "../schema/orders";

export const InserOrderSchema = createInsertSchema(orders);
export const SelectOrderSchema = createSelectSchema(orders);

export type InsertOrderSchema = z.infer<typeof InserOrderSchema>;
export type SelectOrderSchema = z.infer<typeof SelectOrderSchema>;

export const SelectOrderProductsSchema = createSelectSchema(orderProducts);
export const InsertOrderProductsSchema = createInsertSchema(orderProducts);
export const UpdateOrderProductsSchema = createUpdateSchema(orderProducts);

export type SelectOrderProductsSchema = z.infer<
	typeof SelectOrderProductsSchema
>;
export type InsertOrderProductsSchema = z.infer<
	typeof InsertOrderProductsSchema
>;
export type UpdateOrderProductsSchema = z.infer<
	typeof UpdateOrderProductsSchema
>;
