import { requireAuth } from "@/lib/auth"
import { CoupleEditor } from "@/components/admin/couple-editor"

export const dynamic = "force-dynamic"

export default async function AdminCouplePage() {
  const user = await requireAuth()

  return <CoupleEditor user={user} />
}
