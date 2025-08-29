"use client"
import { WeddingHero } from "@/components/wedding-hero"
import { CoupleStory } from "@/components/couple-story"
import { EventDetails } from "@/components/event-details"
import { RsvpSection } from "@/components/rsvp-section"
import { WeddingFooter } from "@/components/wedding-footer"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/demo/admin">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm hover-lift">
            <Settings className="w-4 h-4 mr-2" />
            Demo Admin
          </Button>
        </Link>
      </div>

      <WeddingHero />
      <CoupleStory />
      <EventDetails />
      <RsvpSection />
      <WeddingFooter />
    </div>
  )
}
