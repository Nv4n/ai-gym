import { db } from "@/src/db/db";
import { products } from "@/src/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { isAuthenticated } = await auth();

	// if (!isAuthenticated) {
	// 	const loginUrl = new URL("/sign-in", request.url);
	// 	loginUrl.searchParams.set("from", request.nextUrl.pathname);

	// 	return NextResponse.redirect(loginUrl);
	// }

	const productsRes = await db.select().from(products);

	return NextResponse.json(productsRes);
}
