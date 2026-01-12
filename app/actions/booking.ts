"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createReservation(formData: {
  activitySlug: string
  activityName: string
  activityCategory: string
  reservationDate: string
  timeSlot: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("activity_reservations").insert({
    user_id: user.id,
    activity_slug: formData.activitySlug,
    activity_name: formData.activityName,
    activity_category: formData.activityCategory,
    reservation_date: formData.reservationDate,
    time_slot: formData.timeSlot,
    status: "confirmed",
  })

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/reservations")
  return { success: true }
}

export async function cancelReservation(reservationId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase
    .from("activity_reservations")
    .update({ status: "cancelled" })
    .eq("id", reservationId)
    .eq("user_id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/dashboard/reservations")
  return { success: true }
}
