"use client"

import type { User } from "@/lib/auth"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin/admin-header"
import { Users, ArrowLeft, Search, Download, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface RSVPManagerProps {
  user: User
}

interface RSVPResponse {
  id: number
  guestName: string
  email: string
  phone: string
  attendance: "attending" | "not_attending" | "maybe"
  numberOfGuests: number
  dietaryRestrictions: string
  message: string
  createdAt: string
}

export function RSVPManager({ user }: RSVPManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock RSVP data
  const rsvpResponses: RSVPResponse[] = [
    {
      id: 1,
      guestName: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "(555) 123-4567",
      attendance: "attending",
      numberOfGuests: 2,
      dietaryRestrictions: "Vegetarian",
      message: "So excited to celebrate with you both!",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      guestName: "Mark Wilson",
      email: "mark@email.com",
      phone: "(555) 987-6543",
      attendance: "attending",
      numberOfGuests: 1,
      dietaryRestrictions: "",
      message: "Can't wait for the big day!",
      createdAt: "2024-03-14",
    },
    {
      id: 3,
      guestName: "Lisa Chen",
      email: "lisa@email.com",
      phone: "",
      attendance: "not_attending",
      numberOfGuests: 0,
      dietaryRestrictions: "",
      message: "Sorry I can't make it, but sending love!",
      createdAt: "2024-03-13",
    },
  ]

  const filteredResponses = rsvpResponses.filter(
    (response) =>
      response.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAttendanceBadge = (attendance: string) => {
    switch (attendance) {
      case "attending":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Attending</Badge>
      case "not_attending":
        return <Badge variant="destructive">Not Attending</Badge>
      case "maybe":
        return <Badge variant="secondary">Maybe</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const totalAttending = rsvpResponses
    .filter((r) => r.attendance === "attending")
    .reduce((sum, r) => sum + r.numberOfGuests, 0)

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
          <h1 className="text-3xl font-bold text-foreground mb-2">RSVP Responses</h1>
          <p className="text-muted-foreground">Manage guest responses and track attendance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{rsvpResponses.length}</p>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalAttending}</p>
                  <p className="text-sm text-muted-foreground">Guests Attending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {rsvpResponses.filter((r) => r.attendance === "not_attending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Can't Attend</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Guest Responses</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResponses.map((response) => (
                <div key={response.id} className="border border-border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">{response.guestName}</h3>
                        {getAttendanceBadge(response.attendance)}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {response.email}
                        </div>
                        {response.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {response.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {response.numberOfGuests} guest{response.numberOfGuests !== 1 ? "s" : ""}
                        </div>
                      </div>
                      {response.dietaryRestrictions && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Dietary:</strong> {response.dietaryRestrictions}
                        </p>
                      )}
                      {response.message && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Message:</strong> {response.message}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(response.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
