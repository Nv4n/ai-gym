import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/src/db/db";
import { users, sessions } from "@/src/db/schema";
import { loginSchema } from "@/src/db/zod/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const { username, password } = loginSchema.parse(await req.json());

	const user = await db.query.users.findFirst({
		where: eq(users.username, username),
	});

	if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
		return new Response("Invalid credentials", { status: 401 });
	}

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
