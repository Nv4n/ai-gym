import { createInsertSchema } from "drizzle-zod";
import { activities, bookings } from "../schema/activities";

export const insertActivitySchema = createInsertSchema(activities);

export const insertBookingSchema = createInsertSchema(bookings);
