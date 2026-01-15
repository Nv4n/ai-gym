import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import { products } from "../schema/products";
import z from "zod";

export const InsertProductSchema = createInsertSchema(products);

export const SelectProductSchema = createSelectSchema(products);

export const UpdateProductSchema = createUpdateSchema(products);

export type InsertProduct = z.infer<typeof InsertProductSchema>;
export type SelectProduct = z.infer<typeof SelectProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;