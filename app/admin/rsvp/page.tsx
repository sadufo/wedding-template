import { requireAuth } from "@/lib/auth"
import { RSVPManager } from "@/components/admin/rsvp-manager"

export const dynamic = "force-dynamic"

export default async function AdminRSVPPage() {
  const user = await requireAuth()

  return <RSVPManager user={user} />
}
