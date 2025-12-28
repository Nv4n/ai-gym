import { cookies } from "next/headers";
import { db } from "@/src/db/db";
import { sessions, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
	const sessionId = (await cookies()).get("session")?.value;
	if (!sessionId) return null;

	const session = await db.query.sessions.findFirst({
		where: eq(sessions.id, sessionId),
		with: { user: true },
	});

	if (!session || session.expiresAt < new Date()) return null;

	return session.user;
}
