import bcrypt from "bcrypt";
import { db } from "@/src/db/db";
import { users, sessions } from "@/src/db/schema";
import { registerSchema } from "@/src/db/zod/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const { username, password } = registerSchema.parse(await req.json());

	const passwordHash = bcrypt.hashSync(password, 10);

	const [user] = await db
		.insert(users)
		.values({ username, passwordHash })
		.returning();

	const [session] = await db
		.insert(sessions)
		.values({
			userId: user.id,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		})
		.returning();

	cookies().set("session", session.id, {
		httpOnly: true,
		path: "/",
	});

	return Response.json({ success: true });
}
