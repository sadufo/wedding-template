"use client"

import type React from "react"
import type { User } from "@/lib/auth"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminHeader } from "@/components/admin/admin-header"
import { Calendar, Save, ArrowLeft, MapPin, Clock, Map } from "lucide-react"
import Link from "next/link"

interface EventsEditorProps {
  user: User
}

export function EventsEditor({ user }: EventsEditorProps) {
  const [events, setEvents] = useState([
    {
      id: 1,
      type: "Wedding Ceremony",
      date: "2024-06-15",
      time: "16:00",
      venueName: "St. Mary's Church",
      venueAddress: "123 Church Street, Downtown, NY 10001",
      additionalInfo: "",
    },
    {
      id: 2,
      type: "Wedding Reception",
      date: "2024-06-15",
      time: "18:30",
      venueName: "Grand Ballroom Hotel",
      venueAddress: "456 Celebration Ave, Downtown, NY 10001",
      additionalInfo: "",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)

  const handleEventChange = (eventId: number, field: string, value: string) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, [field]: value } : event)))
  }

  const handleSelectOnMap = (eventId: number, currentAddress: string) => {
    const encodedAddress = encodeURIComponent(currentAddress || "New York, NY")
    const mapUrl = `https://www.google.com/maps/search/${encodedAddress}/@40.7128,-74.0060,15z`

    // Открываем карту в новом окне с инструкциями
    const mapWindow = window.open(mapUrl, "_blank", "width=800,height=600")

    // Показываем инструкции пользователю
    alert(`Instructions:
1. Find your venue on the map that just opened
2. Right-click on the exact location
3. Select "What's here?" or copy the address
4. Come back and paste the address in the field below
    
Tip: You can also search for the venue name directly in the map.`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    alert("Event details updated successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Wedding Events</h1>
          <p className="text-muted-foreground">Edit ceremony and reception details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {events.map((event, index) => (
            <Card key={event.id} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {event.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={event.date}
                      onChange={(e) => handleEventChange(event.id, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </Label>
                    <Input
                      type="time"
                      value={event.time}
                      onChange={(e) => handleEventChange(event.id, "time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Venue Name
                  </Label>
                  <Input
                    value={event.venueName}
                    onChange={(e) => handleEventChange(event.id, "venueName", e.target.value)}
                    placeholder="Enter venue name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Venue Address</Label>
                  <div className="flex gap-2">
                    <Input
                      value={event.venueAddress}
                      onChange={(e) => handleEventChange(event.id, "venueAddress", e.target.value)}
                      placeholder="Enter full address"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectOnMap(event.id, event.venueAddress)}
                      className="shrink-0"
                    >
                      <Map className="w-4 h-4 mr-2" />
                      Select on Map
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click "Select on Map" to find the exact location and get the precise address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Additional Information</Label>
                  <Textarea
                    value={event.additionalInfo}
                    onChange={(e) => handleEventChange(event.id, "additionalInfo", e.target.value)}
                    placeholder="Any special instructions or notes for guests..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
