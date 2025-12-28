import { createInsertSchema } from "drizzle-zod";
import { products } from "../schema/products";

export const insertProductSchema = createInsertSchema(products);
