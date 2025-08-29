"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface CoupleData {
  brideName: string
  groomName: string
  story: string
  proposalStory: string
  couplePhoto: string
  bridePhoto: string
  groomPhoto: string
}

export function CoupleStory() {
  const [coupleData, setCoupleData] = useState<CoupleData>({
    brideName: "Emily",
    groomName: "Michael",
    story:
      "We met in college during our first year and have been inseparable ever since. Our love story began in the library where we both reached for the same book - it was meant to be! From that moment, we knew we had found something special.",
    proposalStory:
      'On a beautiful sunset evening at our favorite park, Michael got down on one knee and asked Emily to be his forever. With tears of joy and an overwhelming "Yes!", we began planning our dream wedding.',
    couplePhoto: "/happy-couple-engagement-photo-romantic.png",
    bridePhoto: "/happy-couple-engagement-photo-romantic.png",
    groomPhoto: "/happy-couple-engagement-photo-romantic.png",
  })

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const photos = [
    {
      src: coupleData.couplePhoto,
      alt: `${coupleData.brideName} and ${coupleData.groomName} together`,
      label: "Together",
    },
    { src: coupleData.bridePhoto, alt: `${coupleData.brideName}`, label: coupleData.brideName },
    { src: coupleData.groomPhoto, alt: `${coupleData.groomName}`, label: coupleData.groomName },
  ].filter((photo) => photo.src && photo.src !== "/placeholder.svg")

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  useEffect(() => {
    const fetchCoupleData = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch("/api/content/couple", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          setCoupleData((prev) => ({
            ...prev,
            ...data,
            story: data.loveStory || prev.story,
            proposalStory: data.proposalStory || prev.proposalStory,
            couplePhoto: data.couplePhoto || prev.couplePhoto,
            bridePhoto: data.bridePhoto || prev.bridePhoto,
            groomPhoto: data.groomPhoto || prev.groomPhoto,
          }))
        }
      } catch (error) {
        // Use default data on error
      }
    }

    fetchCoupleData()
  }, [])

  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(nextPhoto, 4000)
      return () => clearInterval(interval)
    }
  }, [photos.length])

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance animate-slide-up">
            Our Love Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-slide-up animation-delay-200">
            Every love story is beautiful, but ours is our favorite
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up animation-delay-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">How We Met</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{coupleData.story}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up animation-delay-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">The Proposal</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{coupleData.proposalStory}</p>
              </CardContent>
            </Card>
          </div>

          <div className="relative animate-scale-in animation-delay-400">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative group">
              {photos.length > 0 && (
                <>
                  <img
                    src={photos[currentPhotoIndex]?.src || "/placeholder.svg"}
                    alt={photos[currentPhotoIndex]?.alt || "Wedding photo"}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Photo label */}
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {photos[currentPhotoIndex]?.label}
                  </div>

                  {/* Navigation arrows - only show if multiple photos */}
                  {photos.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity"
                        onClick={prevPhoto}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity"
                        onClick={nextPhoto}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>

                      {/* Photo indicators */}
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        {photos.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentPhotoIndex ? "bg-white" : "bg-white/50"
                            }`}
                            onClick={() => setCurrentPhotoIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-slow hover:animate-pulse">
              <Heart className="w-12 h-12 text-primary-foreground fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
