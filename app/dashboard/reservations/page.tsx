import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserReservationsPage() {
	// const supabase = await createClient();

	// const {
	// 	data: { user: authUser },
	// } = await supabase.auth.getUser();

	// if (!authUser) {
	// 	redirect("/auth/login");
	// }

	// const { data: reservations } = await supabase
	// 	.from("activity_reservations")
	// 	.select("*")
	// 	.eq("user_id", authUser.id)
	// 	.order("reservation_date", { ascending: false });

	// const upcomingReservations =
	// 	reservations?.filter(
	// 		(r) => r.reservation_date >= new Date().toISOString().split("T")[0]
	// 	) || [];
	// const pastReservations =
	// 	reservations?.filter(
	// 		(r) => r.reservation_date < new Date().toISOString().split("T")[0]
	// 	) || [];

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="mb-8">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/dashboard">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<h1 className="text-4xl font-bold mb-2">My Reservations</h1>
					<p className="text-lg text-muted-foreground">
						View your class bookings and schedule
					</p>
				</div>

				{/* {!reservations || reservations.length === 0 ? ( */}
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-12">
							<Calendar className="h-16 w-16 text-muted-foreground mb-4" />
							<h2 className="text-xl font-semibold mb-2">
								No reservations yet
							</h2>
							<p className="text-muted-foreground mb-4">
								Book a class to see your reservations here
							</p>
							<Button asChild>
								<Link href="/group-activities">
									Browse Classes
								</Link>
							</Button>
						</CardContent>
					</Card>
				{/* ) : (
					<div className="space-y-8">
						{upcomingReservations.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold mb-4">
									Upcoming Reservations
								</h2>
								<div className="space-y-4">
									{upcomingReservations.map((reservation) => (
										<Card key={reservation.id}>
											<CardContent className="pt-6">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4">
														<div className="bg-primary/10 p-3 rounded-lg">
															<Calendar className="h-6 w-6 text-primary" />
														</div>
														<div>
															<p className="font-semibold text-lg">
																{
																	reservation.activity_name
																}
															</p>
															<p className="text-sm text-muted-foreground">
																{new Date(
																	reservation.reservation_date
																).toLocaleDateString()}{" "}
																at{" "}
																{
																	reservation.time_slot
																}
															</p>
															<p className="text-xs text-muted-foreground mt-1">
																{
																	reservation.activity_category
																}
															</p>
														</div>
													</div>
													<span
														className={`px-3 py-1 rounded-full text-xs font-medium ${
															reservation.status ===
															"confirmed"
																? "bg-green-500/10 text-green-500"
																: reservation.status ===
																  "cancelled"
																? "bg-red-500/10 text-red-500"
																: "bg-gray-500/10 text-gray-500"
														}`}
													>
														{reservation.status}
													</span>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						)}

						{pastReservations.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold mb-4">
									Past Reservations
								</h2>
								<div className="space-y-4">
									{pastReservations.map((reservation) => (
										<Card
											key={reservation.id}
											className="opacity-75"
										>
											<CardContent className="pt-6">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4">
														<div className="bg-muted p-3 rounded-lg">
															<Calendar className="h-6 w-6 text-muted-foreground" />
														</div>
														<div>
															<p className="font-semibold">
																{
																	reservation.activity_name
																}
															</p>
															<p className="text-sm text-muted-foreground">
																{new Date(
																	reservation.reservation_date
																).toLocaleDateString()}{" "}
																at{" "}
																{
																	reservation.time_slot
																}
															</p>
														</div>
													</div>
													<span className="text-xs text-muted-foreground">
														Completed
													</span>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						)}
					</div>
				)} */}
			</div>
		</>
	);
}
