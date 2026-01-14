"use client";

import { updateUserRole } from "@/app/actions/admin";
import { Button } from "@/src/components/ui/button";
import type { UserRole } from "@/src/lib/types";
import { useTransition } from "react";

interface UserRoleToggleProps {
	userId: string;
	currentRole: UserRole;
}

export function UserRoleToggle({ userId, currentRole }: UserRoleToggleProps) {
	const [isPending, startTransition] = useTransition();

	const handleToggleRole = () => {
		const newRole = currentRole === "admin" ? "user" : "admin";
		startTransition(async () => {
			await updateUserRole(userId, newRole);
		});
	};

	return (
		<div className="flex items-center gap-2">
			<span
				className={`px-3 py-1 rounded-full text-xs font-medium ${
					currentRole === "admin"
						? "bg-purple-500/10 text-purple-500"
						: "bg-gray-500/10 text-gray-500"
				}`}
			>
				{currentRole}
			</span>
			<Button
				variant="outline"
				size="sm"
				onClick={handleToggleRole}
				disabled={isPending}
			>
				{isPending
					? "..."
					: currentRole === "admin"
					? "Make User"
					: "Make Admin"}
			</Button>
		</div>
	);
}
