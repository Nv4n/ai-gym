import { db } from "@/src/db/db";
import { products } from "@/src/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	ctx: RouteContext<"/api/products/[id]">
) {
	const { id } = await ctx.params;

	const productsRes = await db.select().from(products);

	return NextResponse.json(productsRes.filter((p) => p.id === id)[0]);
}
