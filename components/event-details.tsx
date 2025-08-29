"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Camera } from "lucide-react"

export function EventDetails() {
  const events = [
    {
      type: "Wedding Ceremony",
      date: "June 15, 2024",
      time: "4:00 PM",
      venue: "St. Mary's Church",
      address: "123 Church Street, Downtown, NY 10001",
      icon: Calendar,
      color: "text-primary",
    },
    {
      type: "Wedding Reception",
      date: "June 15, 2024",
      time: "6:30 PM",
      venue: "Grand Ballroom Hotel",
      address: "456 Celebration Ave, Downtown, NY 10001",
      icon: Camera,
      color: "text-secondary",
    },
  ]

  // Function to open maps with the address
  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <section id="wedding-details" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance animate-slide-up">
            Wedding Details
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-slide-up animation-delay-200">
            All the important information you need for our special day
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 animate-slide-up ${
                index === 0 ? "animation-delay-300" : "animation-delay-500"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <event.icon className={`w-12 h-12 mx-auto mb-4 ${event.color} animate-pulse hover:animate-bounce`} />
                <CardTitle className="text-2xl font-bold text-foreground">{event.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-lg hover:text-primary transition-colors duration-300">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-lg hover:text-primary transition-colors duration-300">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{event.time}</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{event.venue}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{event.address}</p>
                </div>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    onClick={() => handleGetDirections(event.address)}
                  >
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in animation-delay-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4 animate-slide-up animation-delay-800">Dress Code</h3>
            <p className="text-muted-foreground text-lg text-pretty animate-slide-up animation-delay-900">
              Cocktail attire requested. We can't wait to celebrate with you in style!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
