"use client"

import type React from "react"
import type { User } from "@/lib/auth"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AdminHeader } from "@/components/admin/admin-header"
import { Settings, Save, ArrowLeft, Palette, Type } from "lucide-react"
import Link from "next/link"

interface SiteSettingsProps {
  user: User
}

export function SiteSettings({ user }: SiteSettingsProps) {
  const [settings, setSettings] = useState({
    siteTitle: "Emily & Michael's Wedding",
    welcomeMessage: "Join us as we celebrate our love and begin our journey together as husband and wife!",
    primaryColor: "#be123c",
    secondaryColor: "#ec4899",
    contactEmail: "emily.michael.wedding@email.com",
    contactPhone: "(555) 123-4567",
    socialInstagram: "@emilyandmichael2024",
    socialFacebook: "EmilyAndMichael2024",
    weddingHashtag: "#EmilyAndMichael2024",
    countdownEnabled: true,
    rsvpEnabled: true,
    rsvpDeadline: "2024-05-01",
    galleryEnabled: true,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    alert("Site settings updated successfully!")
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Site Settings</h1>
          <p className="text-muted-foreground">Customize your wedding website appearance and features.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteTitle" className="text-foreground font-medium">
                  Site Title
                </Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) => handleInputChange("siteTitle", e.target.value)}
                  placeholder="Enter site title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage" className="text-foreground font-medium">
                  Welcome Message
                </Label>
                <Textarea
                  id="welcomeMessage"
                  value={settings.welcomeMessage}
                  onChange={(e) => handleInputChange("welcomeMessage", e.target.value)}
                  placeholder="Enter welcome message"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Color Scheme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-foreground font-medium">
                    Primary Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      placeholder="#be123c"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-foreground font-medium">
                    Secondary Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      placeholder="#ec4899"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-foreground font-medium">
                    Contact Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-foreground font-medium">
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="socialInstagram" className="text-foreground font-medium">
                    Instagram Handle
                  </Label>
                  <Input
                    id="socialInstagram"
                    value={settings.socialInstagram}
                    onChange={(e) => handleInputChange("socialInstagram", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialFacebook" className="text-foreground font-medium">
                    Facebook Page
                  </Label>
                  <Input
                    id="socialFacebook"
                    value={settings.socialFacebook}
                    onChange={(e) => handleInputChange("socialFacebook", e.target.value)}
                    placeholder="YourPageName"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weddingHashtag" className="text-foreground font-medium">
                  Wedding Hashtag
                </Label>
                <Input
                  id="weddingHashtag"
                  value={settings.weddingHashtag}
                  onChange={(e) => handleInputChange("weddingHashtag", e.target.value)}
                  placeholder="#YourWeddingHashtag"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Feature Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Wedding Countdown</Label>
                  <p className="text-sm text-muted-foreground">Show countdown timer on homepage</p>
                </div>
                <Switch
                  checked={settings.countdownEnabled}
                  onCheckedChange={(checked) => handleInputChange("countdownEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">RSVP Form</Label>
                  <p className="text-sm text-muted-foreground">Enable guest RSVP functionality</p>
                </div>
                <Switch
                  checked={settings.rsvpEnabled}
                  onCheckedChange={(checked) => handleInputChange("rsvpEnabled", checked)}
                />
              </div>

              {settings.rsvpEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="rsvpDeadline" className="text-foreground font-medium">
                    RSVP Deadline
                  </Label>
                  <Input
                    id="rsvpDeadline"
                    type="date"
                    value={settings.rsvpDeadline}
                    onChange={(e) => handleInputChange("rsvpDeadline", e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-medium">Photo Gallery</Label>
                  <p className="text-sm text-muted-foreground">Show photo gallery section</p>
                </div>
                <Switch
                  checked={settings.galleryEnabled}
                  onCheckedChange={(checked) => handleInputChange("galleryEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

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
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
