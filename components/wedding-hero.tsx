"use client"

import { Button } from "@/components/ui/button"
import { Heart, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

interface CoupleData {
  brideName: string
  groomName: string
  weddingDate: string
  weddingVenue: string
  story: string
  proposalStory: string
  bridePhoto?: string
  groomPhoto?: string
  couplePhoto?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface EventData {
  ceremony: {
    date: string
    venue: string
  }
}

export function WeddingHero() {
  const [coupleData, setCoupleData] = useState<CoupleData>({
    brideName: "Emily",
    groomName: "Michael",
    weddingDate: "2024-06-15",
    weddingVenue: "St. Mary's Church, Downtown NY",
    story: "We met in college...",
    proposalStory: "He proposed...",
  })
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coupleResponse, eventsResponse] = await Promise.all([
          fetch("/api/content/couple"),
          fetch("/api/content/events"),
        ])

        if (coupleResponse.ok) {
          const coupleData = await coupleResponse.json()
          setCoupleData(coupleData)
        }

        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          setEventData(eventsData)
        }
      } catch (error) {
        // Keep fallback data if API fails
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const weddingDate = eventData?.ceremony?.date || coupleData?.weddingDate
    if (!weddingDate) return

    const calculateTimeLeft = () => {
      const weddingDateTime = new Date(weddingDate).getTime()
      const now = new Date().getTime()
      const difference = weddingDateTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [eventData?.ceremony?.date, coupleData?.weddingDate])

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp-section")
    rsvpSection?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToDetails = () => {
    const detailsSection = document.getElementById("wedding-details")
    detailsSection?.scrollIntoView({ behavior: "smooth" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-card to-background">
      <div className="absolute inset-0 bg-[url('/romantic-wedding-background-with-soft-florals.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6 fade-in">
          <Heart className="w-8 h-8 text-primary mr-2 pulse-heart" />
          <span className="text-muted-foreground text-lg font-medium">We're Getting Married!</span>
          <Heart className="w-8 h-8 text-primary ml-2 pulse-heart" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4 text-balance slide-up gradient-text">
          {coupleData.brideName} <span className="text-primary">&</span> {coupleData.groomName}
        </h1>

        <p
          className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Join us as we celebrate our love and begin our journey together as husband and wife!
        </p>

        <div className="mb-8 fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
              <div className="text-sm text-muted-foreground">Seconds</div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 scale-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center text-lg text-foreground">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            <span className="font-medium">{formatDate(eventData?.ceremony?.date || coupleData.weddingDate)}</span>
          </div>
          <div className="hidden sm:block w-2 h-2 bg-primary rounded-full" />
          <span className="text-lg text-muted-foreground">{eventData?.ceremony?.venue || coupleData.weddingVenue}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: "0.7s" }}>
          <Button size="lg" className="text-lg px-8 py-6 hover-lift button-glow" onClick={scrollToRSVP}>
            RSVP Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 bg-transparent hover-lift"
            onClick={scrollToDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </section>
  )
}
