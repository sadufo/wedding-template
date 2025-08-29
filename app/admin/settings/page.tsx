import { requireAuth } from "@/lib/auth"
import { SiteSettings } from "@/components/admin/site-settings"

export default async function AdminSettingsPage() {
  const user = await requireAuth()

  return <SiteSettings user={user} />
}
