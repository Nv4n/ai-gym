"use client";

import { addProduct } from "@/app/actions/product";
import { Button } from "@/src/components/ui/button";
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/src/components/ui/field";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { InsertProduct, InsertProductSchema } from "@/src/db/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const categories = ["food-drinks", "equipment", "suplements"];

export default function ProductForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<InsertProduct>({
		resolver: zodResolver(InsertProductSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 10,
			image: "",
			category: "",
			subcategory: "",
		},
	});

	function onSubmit(data: InsertProduct) {
		startTransition(async () => {
			try {
				await addProduct(data);
				toast.success("Product added successfully!");
				form.reset();
			} catch (error) {
				toast.error("Failed to add product");
				console.error(error);
			}
		});
	}

	return (
		<div className="max-w-2xl mx-auto p-6  rounded-lg shadow-sm border">
			<div className="mb-6">
				<h2 className="text-2xl font-semibold ">Add New Product</h2>
				<p className="text-sm  mt-1">
					Fill in the product details below
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Name *</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g., Wireless Bluetooth Headphones"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description *</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Describe your product in detail..."
										className="resize-none min-h-[120px]"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Provide a detailed description of the
									product
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price *</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
												$
											</span>
											<Input
												type="number"
												step="0.01"
												placeholder="0.00"
												className="pl-7"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Controller
							name="category"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="responsive"
									data-invalid={fieldState.invalid}
								>
									<FieldContent>
										<FieldLabel htmlFor="form-rhf-select-category">
											Product category
										</FieldLabel>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</FieldContent>
									<Select
										name={field.name}
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger
											id="form-rhf-select-category"
											aria-invalid={fieldState.invalid}
											className="min-w-[120px]"
										>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent position="item-aligned">
											<SelectItem value="food-drinks">
												Food and drinks
											</SelectItem>
											<SelectItem value="equipment">
												Equipment
											</SelectItem>
											<SelectItem value="suplements">
												Suplements
											</SelectItem>
										</SelectContent>
									</Select>
								</Field>
							)}
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<Button
							type="submit"
							disabled={isPending}
							className="flex-1"
						>
							{isPending ? "Adding Product..." : "Add Product"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => form.reset()}
							disabled={isPending}
						>
							Reset
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
