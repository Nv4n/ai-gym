import { db } from "@/src/db/db";
import { products } from "@/src/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	console.log(request.nextUrl.searchParams.get("id"));

	const id = request.nextUrl.searchParams.get("id");

	if (!id) {
		return NextResponse.json(
			{ error: "Missing product id" },
			{ status: 400 }
		);
	}

	const productsRes = await db.select().from(products).limit(1);

	if (productsRes.length === 0) {
		return NextResponse.json(
			{ error: "Product not found" },
			{ status: 404 }
		);
	}

	return NextResponse.json(productsRes[0]);
}
