// app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	// hash password, insert user via Drizzle

	return NextResponse.json({ success: true });
}
