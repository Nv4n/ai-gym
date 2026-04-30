"use server";

import { db } from "@/src/db/db";
import { products } from "@/src/db/schema";
import { InsertProduct, InsertProductSchema } from "@/src/db/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addProduct(data: InsertProduct) {
	try {
		// Validate the input data
		const validatedData = InsertProductSchema.parse(data);

		// Prepare data for insertion (convert empty strings to null)
		const insertData = {
			name: validatedData.name,
			description: validatedData.description,
			price: validatedData.price,
			image: validatedData.image || null,
			category: validatedData.category,
			subcategory: validatedData.subcategory || null,
		};

		// Insert into database using Drizzle ORM
		const [newProduct] = await db
			.insert(products)
			.values(insertData)
			.returning();

		// Revalidate the products page to show the new product
		revalidatePath("/store");

		return {
			success: true,
			product: newProduct,
			message: "Product added successfully",
		};
	} catch (error) {
		console.error("Failed to add product:", error);

		// Handle validation errors
		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: "Validation failed",
				details: error.message,
			};
		}

		// Handle database errors
		throw new Error("Failed to add product. Please try again.");
	}
}
