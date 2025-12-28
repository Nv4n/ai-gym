import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	// validate credentials
	// set session cookie

	return NextResponse.json({ success: true });
}
