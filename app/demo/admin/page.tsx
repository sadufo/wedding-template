"use client"

import type React from "react"
import type { RefObject } from "react"

import { useState, useRef } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Users,
  Calendar,
  Settings,
  Eye,
  BarChart3,
  UserCheck,
  Upload,
  X,
  Menu,
  LogOut,
  Map,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Hash,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DemoAdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mockUser = {
    id: 1,
    email: "demo@wedding.com",
    name: "Demo User",
    coupleId: 1,
    role: "admin",
  }

  const [coupleData, setCoupleData] = useState({
    bride: "Emily",
    groom: "Michael",
    story:
      "We met in college during our first year and have been inseparable ever since. Our first date was at a small coffee shop where we talked for hours about our dreams and aspirations.",
    proposalStory:
      'On a beautiful sunset evening at our favorite park, Michael got down on one knee and asked Emily to be his forever. With tears of joy and an overwhelming "Yes!", we began planning our dream wedding.',
    bridePhotoUrl: "",
    groomPhotoUrl: "",
    couplePhotoUrl: "",
    ceremonyDate: "",
    ceremonyTime: "",
    ceremonyVenue: "",
    ceremonyAddress: "",
    receptionDate: "",
    receptionTime: "",
    receptionVenue: "",
    receptionAddress: "",
    rsvpList: [
      { id: 1, name: "John Doe", email: "john@example.com", attending: "Yes", guests: 2 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", attending: "No", guests: 0 },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", attending: "Yes", guests: 1 },
    ],
  })

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Emily & Michael's Wedding",
    welcomeMessage: "Join us as we celebrate our love and begin our journey together as husband and wife!",
    contactEmail: "emily.michael.wedding@email.com",
    contactPhone: "(555) 123-4567",
    socialInstagram: "@emilyandmichael2024",
    socialFacebook: "EmilyAndMichael2024",
    weddingHashtag: "#EmilyAndMichael2024",
  })

  const bridePhotoRef = useRef<HTMLInputElement>(null)
  const groomPhotoRef = useRef<HTMLInputElement>(null)
  const couplePhotoRef = useRef<HTMLInputElement>(null)

  const handleSave = (section: string) => {
    alert(`${section} settings saved! (Demo mode - changes won't persist)`)
  }

  const handleSelectOnMap = (addressField: string, currentAddress: string) => {
    const encodedAddress = encodeURIComponent(currentAddress || "New York, NY")
    const mapUrl = `https://www.google.com/maps/search/${encodedAddress}/@40.7128,-74.0060,15z`

    const mapWindow = window.open(mapUrl, "_blank", "width=800,height=600")

    alert(`Instructions:
1. Find your venue on the map that just opened
2. Right-click on the exact location
3. Select "What's here?" or copy the address
4. Come back and paste the address in the field below
    
Tip: You can also search for the venue name directly in the map.`)
  }

  const handleFileUpload = (field: string, file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCoupleData((prev) => ({ ...prev, [field]: result }))
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select a valid image file")
    }
  }

  const removePhoto = (field: string) => {
    setCoupleData((prev) => ({ ...prev, [field]: "" }))
  }

  const PhotoUploadArea = ({
    label,
    field,
    photoUrl,
    inputRef,
  }: {
    label: string
    field: string
    photoUrl: string
    inputRef: React.RefObject<HTMLInputElement>
  }) => (
    <div className="space-y-4">
      <Label className="text-foreground font-medium">{label}</Label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(field, file)
        }}
        className="hidden"
      />

      {photoUrl ? (
        <div className="relative border-2 border-border rounded-lg overflow-hidden">
          <Image
            src={photoUrl || "/placeholder.svg"}
            alt={label}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-1" />
              Change
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={() => removePhoto(field)}>
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Click to upload image</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  )

  const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <Link href="/demo" target="_blank">
        <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
          <Eye className="w-4 h-4 mr-2" />
          Preview Site
        </Button>
      </Link>
      <Link href="/">
        <Button variant="destructive" size="sm" className="w-full sm:w-auto">
          Exit Demo
        </Button>
      </Link>
    </div>
  )

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "couple", label: "Couple Info", icon: Heart },
    { id: "events", label: "Events", icon: Calendar },
    { id: "rsvp", label: "RSVP List", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={mockUser} />

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center text-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">
                🎉 You're in Demo Mode! Feel free to test all features. Changes won't be saved permanently.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white shadow-md"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`
          w-64 bg-white shadow-sm border-r min-h-screen
          lg:relative lg:translate-x-0
          fixed z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <nav className="p-4">
            <div className="lg:hidden mb-4 pb-4 border-b border-gray-200">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">Welcome, {mockUser.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" })
                      window.location.href = "/admin/login"
                    } catch (error) {
                      // Handle logout error silently
                    }
                  }}
                  className="w-full justify-center bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false) // Close mobile menu on selection
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-6 lg:ml-0">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <ActionButtons />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">2 attending, 1 declined</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Expected Guests</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Including plus ones</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Days Until Wedding</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">June 15, 2024</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      onClick={() => setActiveSection("couple")}
                    >
                      <Heart className="w-6 h-6" />
                      Edit Couple Info
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      onClick={() => setActiveSection("events")}
                    >
                      <Calendar className="w-6 h-6" />
                      Manage Events
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      onClick={() => setActiveSection("rsvp")}
                    >
                      <Users className="w-6 h-6" />
                      View RSVPs
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      onClick={() => setActiveSection("settings")}
                    >
                      <Settings className="w-6 h-6" />
                      Site Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "couple" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Couple Information</h1>
                <ActionButtons />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Edit Couple Details</CardTitle>
                  <CardDescription>Update the bride and groom information and love story</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bride">Bride's Name</Label>
                      <Input
                        id="bride"
                        value={coupleData.bride}
                        onChange={(e) => setCoupleData({ ...coupleData, bride: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="groom">Groom's Name</Label>
                      <Input
                        id="groom"
                        value={coupleData.groom}
                        onChange={(e) => setCoupleData({ ...coupleData, groom: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="story">How We Met</Label>
                    <Textarea
                      id="story"
                      rows={4}
                      value={coupleData.story}
                      onChange={(e) => setCoupleData({ ...coupleData, story: e.target.value })}
                      placeholder="Tell how you met..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="proposalStory">The Proposal</Label>
                    <Textarea
                      id="proposalStory"
                      rows={4}
                      value={coupleData.proposalStory}
                      onChange={(e) => setCoupleData({ ...coupleData, proposalStory: e.target.value })}
                      placeholder="Tell your proposal story..."
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Photos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      <PhotoUploadArea
                        label="Bride's Photo"
                        field="bridePhotoUrl"
                        photoUrl={coupleData.bridePhotoUrl}
                        inputRef={bridePhotoRef as RefObject<HTMLInputElement>}
                      />
                      <PhotoUploadArea
                        label="Groom's Photo"
                        field="groomPhotoUrl"
                        photoUrl={coupleData.groomPhotoUrl}
                        inputRef={groomPhotoRef as RefObject<HTMLInputElement>}
                      />
                      <PhotoUploadArea
                        label="Couple Photo"
                        field="couplePhotoUrl"
                        photoUrl={coupleData.couplePhotoUrl}
                        inputRef={couplePhotoRef as RefObject<HTMLInputElement>}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleSave("Couple")} className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "events" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Wedding Events</h1>
                <ActionButtons />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wedding Ceremony</CardTitle>
                    <CardDescription>Ceremony details and venue</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ceremonyDate">Date</Label>
                      <Input
                        id="ceremonyDate"
                        type="date"
                        value={coupleData.ceremonyDate}
                        onChange={(e) => setCoupleData({ ...coupleData, ceremonyDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ceremonyTime">Time</Label>
                      <Input
                        id="ceremonyTime"
                        type="time"
                        value={coupleData.ceremonyTime}
                        onChange={(e) => setCoupleData({ ...coupleData, ceremonyTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ceremonyVenue">Venue Name</Label>
                      <Input
                        id="ceremonyVenue"
                        value={coupleData.ceremonyVenue}
                        onChange={(e) => setCoupleData({ ...coupleData, ceremonyVenue: e.target.value })}
                        placeholder="Enter venue name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ceremonyAddress">Venue Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="ceremonyAddress"
                          value={coupleData.ceremonyAddress}
                          onChange={(e) => setCoupleData({ ...coupleData, ceremonyAddress: e.target.value })}
                          placeholder="Enter full address"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectOnMap("ceremonyAddress", coupleData.ceremonyAddress)}
                          className="shrink-0"
                        >
                          <Map className="w-4 h-4 mr-2" />
                          Select on Map
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click "Select on Map" to find the exact location and get the precise address
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wedding Reception</CardTitle>
                    <CardDescription>Reception details and venue</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="receptionDate">Date</Label>
                      <Input
                        id="receptionDate"
                        type="date"
                        value={coupleData.receptionDate}
                        onChange={(e) => setCoupleData({ ...coupleData, receptionDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionTime">Time</Label>
                      <Input
                        id="receptionTime"
                        type="time"
                        value={coupleData.receptionTime}
                        onChange={(e) => setCoupleData({ ...coupleData, receptionTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionVenue">Venue Name</Label>
                      <Input
                        id="receptionVenue"
                        value={coupleData.receptionVenue}
                        onChange={(e) => setCoupleData({ ...coupleData, receptionVenue: e.target.value })}
                        placeholder="Enter venue name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionAddress">Venue Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="receptionAddress"
                          value={coupleData.receptionAddress}
                          onChange={(e) => setCoupleData({ ...coupleData, receptionAddress: e.target.value })}
                          placeholder="Enter full address"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectOnMap("receptionAddress", coupleData.receptionAddress)}
                          className="shrink-0"
                        >
                          <Map className="w-4 h-4 mr-2" />
                          Select on Map
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click "Select on Map" to find the exact location and get the precise address
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button onClick={() => handleSave("Events")} className="w-full sm:w-auto">
                Save All Events
              </Button>
            </div>
          )}

          {activeSection === "rsvp" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">RSVP Management</h1>
                <ActionButtons />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Guest Responses</CardTitle>
                  <CardDescription>View and manage all RSVP responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coupleData.rsvpList.map((rsvp) => (
                      <div key={rsvp.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{rsvp.name}</h4>
                          <p className="text-sm text-muted-foreground">{rsvp.email}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 rounded text-sm ${
                              rsvp.attending === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {rsvp.attending}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rsvp.guests} guest{rsvp.guests !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
                <ActionButtons />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Website Configuration</CardTitle>
                  <CardDescription>Configure website appearance and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input
                      id="siteTitle"
                      value={siteSettings.siteTitle}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      rows={3}
                      value={siteSettings.welcomeMessage}
                      onChange={(e) => setSiteSettings({ ...siteSettings, welcomeMessage: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Manage contact details displayed in the footer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Contact Email
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={siteSettings.contactEmail}
                        onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contact Phone
                      </Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={siteSettings.contactPhone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="socialInstagram" className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram Handle
                      </Label>
                      <Input
                        id="socialInstagram"
                        value={siteSettings.socialInstagram}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialInstagram: e.target.value })}
                        placeholder="@yourusername"
                      />
                    </div>
                    <div>
                      <Label htmlFor="socialFacebook" className="flex items-center gap-2">
                        <Facebook className="w-4 h-4" />
                        Facebook Page
                      </Label>
                      <Input
                        id="socialFacebook"
                        value={siteSettings.socialFacebook}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialFacebook: e.target.value })}
                        placeholder="YourPageName"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="weddingHashtag" className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Wedding Hashtag
                    </Label>
                    <Input
                      id="weddingHashtag"
                      value={siteSettings.weddingHashtag}
                      onChange={(e) => setSiteSettings({ ...siteSettings, weddingHashtag: e.target.value })}
                      placeholder="#YourWeddingHashtag"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => handleSave("Settings")} className="w-full sm:w-auto">
                Save All Settings
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
