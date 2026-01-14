import { redirect } from "next/navigation";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserRoleToggle } from "@/src/components/admin/user-role-toggle";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminUsersPage() {
	// const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false })

	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	if (user?.privateMetadata?.role !== "admin") {
		redirect("/dashboard");
	}
	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-8">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/dashboard/admin">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<h1 className="text-4xl font-bold mb-2">User Management</h1>
					<p className="text-lg text-muted-foreground">
						Manage user accounts and permissions
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>
							All Users {/*({users?.length || 0})*/}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/*	{users?.map((user) => (
								<div
									key={user.id}
									className="flex items-center justify-between p-4 rounded-lg border"
								>
									<div className="flex-1">
										<p className="font-medium">
											{user.name || "No name"}
										</p>
										<p className="text-sm text-muted-foreground">
											{user.email}
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											Joined{" "}
											{new Date(
												user.created_at
											).toLocaleDateString()}
										</p>
									</div>
									<div className="flex items-center gap-4">
										<UserRoleToggle
											userId={user.id}
											currentRole={user.role}
										/>
									</div>
								</div>
							))}*/}
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
