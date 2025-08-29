"use client"

import { requireAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, Users, Calendar, Settings, Heart, MapPin, Phone, Mail, Instagram, Facebook, Hash } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const user = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />
      <AdminPanelContent />
    </div>
  )
}

function AdminPanelContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [coupleData, setCoupleData] = useState({
    brideName: "Emily",
    groomName: "Michael",
    story: "We met at a coffee shop in downtown Seattle on a rainy Tuesday morning...",
    proposalStory: "Michael proposed during a sunset hike at Mount Rainier...",
    bridePhoto: null,
    groomPhoto: null,
    couplePhoto: null,
  })
  const [eventsData, setEventsData] = useState({
    ceremonyTime: "4:00 PM",
    ceremonyLocation: "St. Mary's Cathedral",
    ceremonyAddress: "1234 Cathedral Ave, Seattle, WA",
    receptionTime: "6:00 PM",
    receptionLocation: "Grand Ballroom",
    receptionAddress: "5678 Reception Blvd, Seattle, WA",
  })
  const [settingsData, setSettingsData] = useState({
    siteTitle: "Emily & Michael",
    welcomeMessage: "Join us as we celebrate our love",
    rsvpDeadline: "2024-05-01",
    maxGuests: 2,
    email: "emily.michael@wedding.com",
    phone: "+1 (555) 123-4567",
    instagram: "@emilymichael2024",
    facebook: "EmilyMichaelWedding",
    hashtag: "#EmilyAndMichael2024",
    coupleNames: "Emily & Michael",
    weddingDate: "June 15, 2024",
    footerText: "With love, Emily & Michael",
  })
  const [rsvpList] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      attending: "yes",
      guests: 2,
      dietaryRestrictions: "None",
      message: "So excited!",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      attending: "no",
      guests: 1,
      dietaryRestrictions: "Vegetarian",
      message: "Wish we could be there!",
    },
  ])

  const { toast } = useToast()

  const handlePhotoUpload = (type: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setCoupleData((prev) => ({
        ...prev,
        [type]: e.target?.result as string,
      }))
      toast({
        title: "Photo uploaded successfully",
        description: `${type} has been updated.`,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (section: string) => {
    toast({
      title: "Changes saved",
      description: `${section} has been updated successfully.`,
    })
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attending</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% acceptance rate</p>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Views</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your wedding website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setActiveTab("couple")} variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Couple Info
            </Button>
            <Button onClick={() => setActiveTab("events")} variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Events
            </Button>
            <Button onClick={() => setActiveTab("rsvp")} variant="outline" className="h-20 flex-col">
              <Heart className="h-6 w-6 mb-2" />
              RSVP List
            </Button>
            <Button onClick={() => setActiveTab("settings")} variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const PhotoUploadArea = ({
    type,
    currentPhoto,
    onUpload,
  }: { type: string; currentPhoto: string | null; onUpload: (type: string, file: File) => void }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      {currentPhoto ? (
        <div className="space-y-4">
          <img
            src={currentPhoto || "/placeholder.svg"}
            alt={type}
            className="w-32 h-32 object-cover rounded-lg mx-auto"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onUpload(type, e.target.files[0])}
              className="hidden"
              id={`${type}-upload`}
            />
            <label htmlFor={`${type}-upload`} className="cursor-pointer text-primary hover:underline">
              Change Photo
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onUpload(type, e.target.files[0])}
              className="hidden"
              id={`${type}-upload`}
            />
            <label htmlFor={`${type}-upload`} className="cursor-pointer text-primary hover:underline">
              Upload {type.replace(/([A-Z])/g, " $1").toLowerCase()}
            </label>
          </div>
        </div>
      )}
    </div>
  )

  const renderCoupleInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle>Couple Information</CardTitle>
        <CardDescription>Manage your personal information and photos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="brideName">Bride's Name</Label>
            <Input
              id="brideName"
              value={coupleData.brideName}
              onChange={(e) => setCoupleData((prev) => ({ ...prev, brideName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="groomName">Groom's Name</Label>
            <Input
              id="groomName"
              value={coupleData.groomName}
              onChange={(e) => setCoupleData((prev) => ({ ...prev, groomName: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Bride's Photo</Label>
            <PhotoUploadArea type="bridePhoto" currentPhoto={coupleData.bridePhoto} onUpload={handlePhotoUpload} />
          </div>
          <div>
            <Label>Groom's Photo</Label>
            <PhotoUploadArea type="groomPhoto" currentPhoto={coupleData.groomPhoto} onUpload={handlePhotoUpload} />
          </div>
          <div>
            <Label>Couple Photo</Label>
            <PhotoUploadArea type="couplePhoto" currentPhoto={coupleData.couplePhoto} onUpload={handlePhotoUpload} />
          </div>
        </div>

        <div>
          <Label htmlFor="story">How We Met</Label>
          <Textarea
            id="story"
            value={coupleData.story}
            onChange={(e) => setCoupleData((prev) => ({ ...prev, story: e.target.value }))}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="proposalStory">The Proposal</Label>
          <Textarea
            id="proposalStory"
            value={coupleData.proposalStory}
            onChange={(e) => setCoupleData((prev) => ({ ...prev, proposalStory: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
            Back to Dashboard
          </Button>
          <Button onClick={() => handleSave("Couple Information")}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderEvents = () => (
    <Card>
      <CardHeader>
        <CardTitle>Wedding Events</CardTitle>
        <CardDescription>Manage ceremony and reception details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Ceremony
            </h3>
            <div>
              <Label htmlFor="ceremonyTime">Time</Label>
              <Input
                id="ceremonyTime"
                value={eventsData.ceremonyTime}
                onChange={(e) => setEventsData((prev) => ({ ...prev, ceremonyTime: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="ceremonyLocation">Location</Label>
              <Input
                id="ceremonyLocation"
                value={eventsData.ceremonyLocation}
                onChange={(e) => setEventsData((prev) => ({ ...prev, ceremonyLocation: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="ceremonyAddress">Address</Label>
              <Input
                id="ceremonyAddress"
                value={eventsData.ceremonyAddress}
                onChange={(e) => setEventsData((prev) => ({ ...prev, ceremonyAddress: e.target.value }))}
              />
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Select on Map
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Reception
            </h3>
            <div>
              <Label htmlFor="receptionTime">Time</Label>
              <Input
                id="receptionTime"
                value={eventsData.receptionTime}
                onChange={(e) => setEventsData((prev) => ({ ...prev, receptionTime: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="receptionLocation">Location</Label>
              <Input
                id="receptionLocation"
                value={eventsData.receptionLocation}
                onChange={(e) => setEventsData((prev) => ({ ...prev, receptionLocation: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="receptionAddress">Address</Label>
              <Input
                id="receptionAddress"
                value={eventsData.receptionAddress}
                onChange={(e) => setEventsData((prev) => ({ ...prev, receptionAddress: e.target.value }))}
              />
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Select on Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
            Back to Dashboard
          </Button>
          <Button onClick={() => handleSave("Wedding Events")}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderRSVP = () => (
    <Card>
      <CardHeader>
        <CardTitle>RSVP Responses</CardTitle>
        <CardDescription>View and manage guest responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Attending</th>
                <th className="text-left p-2">Guests</th>
                <th className="text-left p-2">Dietary</th>
                <th className="text-left p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {rsvpList.map((rsvp) => (
                <tr key={rsvp.id} className="border-b">
                  <td className="p-2">{rsvp.name}</td>
                  <td className="p-2">{rsvp.email}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        rsvp.attending === "yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rsvp.attending === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-2">{rsvp.guests}</td>
                  <td className="p-2">{rsvp.dietaryRestrictions}</td>
                  <td className="p-2">{rsvp.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
            Back to Dashboard
          </Button>
          <Button>Export List</Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Configure your wedding website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              value={settingsData.siteTitle}
              onChange={(e) => setSettingsData((prev) => ({ ...prev, siteTitle: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Input
              id="welcomeMessage"
              value={settingsData.welcomeMessage}
              onChange={(e) => setSettingsData((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
              <Input
                id="rsvpDeadline"
                type="date"
                value={settingsData.rsvpDeadline}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, rsvpDeadline: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="maxGuests">Max Guests per RSVP</Label>
              <Input
                id="maxGuests"
                type="number"
                value={settingsData.maxGuests}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, maxGuests: Number.parseInt(e.target.value) }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update contact details displayed in footer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={settingsData.email}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                value={settingsData.phone}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              <Input
                id="instagram"
                value={settingsData.instagram}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, instagram: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook
              </Label>
              <Input
                id="facebook"
                value={settingsData.facebook}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, facebook: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="hashtag" className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Wedding Hashtag
              </Label>
              <Input
                id="hashtag"
                value={settingsData.hashtag}
                onChange={(e) => setSettingsData((prev) => ({ ...prev, hashtag: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
          <CardDescription>Customize footer information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="coupleNames">Couple Names</Label>
            <Input
              id="coupleNames"
              value={settingsData.coupleNames}
              onChange={(e) => setSettingsData((prev) => ({ ...prev, coupleNames: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="weddingDate">Wedding Date</Label>
            <Input
              id="weddingDate"
              value={settingsData.weddingDate}
              onChange={(e) => setSettingsData((prev) => ({ ...prev, weddingDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="footerText">Footer Text</Label>
            <Input
              id="footerText"
              value={settingsData.footerText}
              onChange={(e) => setSettingsData((prev) => ({ ...prev, footerText: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
          Back to Dashboard
        </Button>
        <Button onClick={() => handleSave("Settings")}>Save All Settings</Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <nav className="flex space-x-4">
          <Button variant={activeTab === "dashboard" ? "default" : "ghost"} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </Button>
          <Button variant={activeTab === "couple" ? "default" : "ghost"} onClick={() => setActiveTab("couple")}>
            Couple Info
          </Button>
          <Button variant={activeTab === "events" ? "default" : "ghost"} onClick={() => setActiveTab("events")}>
            Events
          </Button>
          <Button variant={activeTab === "rsvp" ? "default" : "ghost"} onClick={() => setActiveTab("rsvp")}>
            RSVP List
          </Button>
          <Button variant={activeTab === "settings" ? "default" : "ghost"} onClick={() => setActiveTab("settings")}>
            Settings
          </Button>
        </nav>
      </div>

      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "couple" && renderCoupleInfo()}
      {activeTab === "events" && renderEvents()}
      {activeTab === "rsvp" && renderRSVP()}
      {activeTab === "settings" && renderSettings()}
    </div>
  )
}
