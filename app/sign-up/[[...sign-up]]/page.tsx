import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return <SignUp ></SignUp>;
}

// "use client";

// import { Button } from "@/src/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@/src/components/ui/card";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/src/components/ui/form";
// import { Input } from "@/src/components/ui/input";
// import { useSignUp, useUser } from "@clerk/nextjs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import { redirect, useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const signUpSchema = z.object({
// 	username: z.string().min(3, "Username must be at least 3 characters"),
// 	password: z.string().min(8, "Password must be at least 8 characters"),
// 	firstName: z.string().min(2, "First name must be at least 2 characters"),
// 	lastName: z.string().min(2, "Last name must be at least 2 characters"),
// 	address: z.string().min(2, "Address must be at least 2 characters"),
// });

// export default function SignUpPage() {
// 	const { isSignedIn } = useUser();
// 	const { isLoaded, signUp, setActive } = useSignUp();
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const router = useRouter();

// 	if (isSignedIn) {
// 		redirect("/");
// 	}
// 	const signUpForm = useForm<z.infer<typeof signUpSchema>>({
// 		resolver: zodResolver(signUpSchema),
// 		defaultValues: {
// 			username: "",
// 			password: "",
// 			firstName: "",
// 			lastName: "",
// 			address: "",
// 		},
// 	});

// 	const onSignUpSubmit = async (values: z.infer<typeof signUpSchema>) => {
// 		console.log(values);

// 		if (!isLoaded) return;
// 		setIsSubmitting(true);

// 		try {
// 			const result = await signUp.create({
// 				username: values.username,
// 				password: values.password,
// 				firstName: values.firstName,
// 				lastName: values.lastName,
// 				unsafeMetadata: {
// 					address: values.address,
// 				},
// 			});

// 			// Username/password strategy doesn't require verification
// 			if (result.status === "complete") {
// 				await setActive({ session: result.createdSessionId });
// 				router.push("/dashboard");
// 			}
// 		} catch (err: any) {
// 			console.log(err);

// 			toast(err);
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	if (!isLoaded) {
// 		return (
// 			<div className="min-h-screen flex items-center justify-center">
// 				<Loader2 className="h-8 w-8 animate-spin" />
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
// 			<Card className="w-full max-w-md">
// 				<CardHeader>
// 					<CardTitle>Create your account</CardTitle>
// 					<CardDescription>
// 						Enter your information to get started
// 					</CardDescription>
// 				</CardHeader>
// 				<CardContent>
// 					<Form {...signUpForm}>
// 						<form
// 							onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
// 							className="space-y-4"
// 						>
// 							<FormField
// 								control={signUpForm.control}
// 								name="username"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>Username</FormLabel>
// 										<FormControl>
// 											<Input
// 												placeholder="johndoe"
// 												autoComplete="username"
// 												{...field}
// 											/>
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>

// 							<FormField
// 								control={signUpForm.control}
// 								name="password"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>Password</FormLabel>
// 										<FormControl>
// 											<Input
// 												type="password"
// 												placeholder="••••••••"
// 												autoComplete="new-password"
// 												{...field}
// 											/>
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>

// 							<div className="grid grid-cols-2 gap-4">
// 								<FormField
// 									control={signUpForm.control}
// 									name="firstName"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>First Name</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="John"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={signUpForm.control}
// 									name="lastName"
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormLabel>Last Name</FormLabel>
// 											<FormControl>
// 												<Input
// 													placeholder="Doe"
// 													{...field}
// 												/>
// 											</FormControl>
// 											<FormMessage />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							<FormField
// 								control={signUpForm.control}
// 								name="address"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>Address</FormLabel>
// 										<FormControl>
// 											<Input
// 												placeholder="New York"
// 												{...field}
// 											/>
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>

// 							<Button
// 								type="submit"
// 								className="w-full"
// 								disabled={isSubmitting}
// 							>
// 								{isSubmitting ? (
// 									<>
// 										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 										Creating account...
// 									</>
// 								) : (
// 									"Sign Up"
// 								)}
// 							</Button>
// 						</form>
// 					</Form>

// 					<p className="text-center text-sm text-muted-foreground mt-4">
// 						Already have an account?{" "}
// 						<Link
// 							href="/sign-in"
// 							className="text-primary underline-offset-4 hover:underline"
// 						>
// 							Sign in
// 						</Link>
// 					</p>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }
