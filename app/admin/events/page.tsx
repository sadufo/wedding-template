import { requireAuth } from "@/lib/auth"
import { EventsEditor } from "@/components/admin/events-editor"

export const dynamic = "force-dynamic"

export default async function AdminEventsPage() {
  const user = await requireAuth()

  return <EventsEditor user={user} />
}
