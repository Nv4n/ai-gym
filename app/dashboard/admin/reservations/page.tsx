import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

export default async function AdminReservationsPage() {
  const supabase = await createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

//  if (!authUser) {
//    redirect("/auth/login")
 // }

  const { data: currentUser } = await supabase.from("users").select("*").eq("id", authUser.id).single()

  if (currentUser?.role !== "admin") {
    redirect("/dashboard")
  }

  const { data: reservations } = await supabase
    .from("activity_reservations")
    .select(`
      *,
      user:users(name, email)
    `)
    .order("reservation_date", { ascending: false })

  const upcomingReservations =
    reservations?.filter((r) => r.reservation_date >= new Date().toISOString().split("T")[0]) || []

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
          <h1 className="text-4xl font-bold mb-2">Reservation Management</h1>
          <p className="text-lg text-muted-foreground">View and manage all class reservations</p>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Reservations</p>
                  <p className="text-2xl font-bold">{reservations?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingReservations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {
                      reservations?.filter((r) => {
                        const resDate = new Date(r.reservation_date)
                        const today = new Date()
                        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                        return resDate >= today && resDate <= weekFromNow
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations?.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-medium">{reservation.activity_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Customer: {reservation.user?.name || "Unknown"} ({reservation.user?.email})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {new Date(reservation.reservation_date).toLocaleDateString()} at {reservation.time_slot}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reservation.status === "confirmed"
                        ? "bg-green-500/10 text-green-500"
                        : reservation.status === "cancelled"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
