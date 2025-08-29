"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Send, CheckCircle } from "lucide-react"

export function RSVPSection() {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    attendanceStatus: "",
    numberOfGuests: "1",
    dietaryRestrictions: "",
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/content/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          attendanceStatus: formData.attendanceStatus,
          numberOfGuests: Number.parseInt(formData.numberOfGuests),
          dietaryRestrictions: formData.dietaryRestrictions,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to submit RSVP")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
              <p className="text-xl text-muted-foreground">
                Your RSVP has been submitted successfully. We can't wait to celebrate with you!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp-section" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">RSVP</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Please let us know if you'll be joining us for our special day. We can't wait to celebrate with you!
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Kindly Respond by May 1st, 2024</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange("guestName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.guestEmail}
                    onChange={(e) => handleInputChange("guestEmail", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.guestPhone}
                  onChange={(e) => handleInputChange("guestPhone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-foreground font-medium">Will you be attending? *</Label>
                <RadioGroup
                  value={formData.attendanceStatus}
                  onValueChange={(value) => handleInputChange("attendanceStatus", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attending" id="attending" />
                    <Label htmlFor="attending" className="text-foreground">
                      Yes, I'll be there with bells on!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_attending" id="not_attending" />
                    <Label htmlFor="not_attending" className="text-foreground">
                      Sorry, I can't make it
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-foreground font-medium">
                  Number of Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.numberOfGuests}
                  onChange={(e) => handleInputChange("numberOfGuests", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-foreground font-medium">
                  Dietary Restrictions
                </Label>
                <Input
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Special Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share your excitement or well wishes!"
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Sending RSVP...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send RSVP
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export { RSVPSection as RsvpSection }
