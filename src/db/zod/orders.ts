import { createInsertSchema } from "drizzle-zod";
import { orders } from "../schema/orders";

export const insertOrderSchema = createInsertSchema(orders);
