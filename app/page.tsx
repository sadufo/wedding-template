import { WeddingHero } from "@/components/wedding-hero"
import { CoupleStory } from "@/components/couple-story"
import { EventDetails } from "@/components/event-details"
import { RSVPSection } from "@/components/rsvp-section"
import { WeddingFooter } from "@/components/wedding-footer"
import { DemoAdminButton } from "@/components/demo-admin-button"

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-background">
      <WeddingHero />
      <CoupleStory />
      <EventDetails />
      <RSVPSection />
      <WeddingFooter />
      <DemoAdminButton />
    </main>
  )
}
