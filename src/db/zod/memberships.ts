import { createInsertSchema } from "drizzle-zod";
import { memberships } from "../schema/memberships";

export const insertMembershipSchema = createInsertSchema(memberships);
