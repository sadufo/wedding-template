"use client"

import type { User } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { Heart, Users, Calendar, Settings, Edit, Eye, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [weddingDate, setWeddingDate] = useState<string>("June 15, 2024")
  const [daysUntilWedding, setDaysUntilWedding] = useState<number>(127)

  useEffect(() => {
    const fetchWeddingDate = async () => {
      try {
        const response = await fetch("/api/content/events")
        if (response.ok) {
          const data = await response.json()
          if (data.ceremony?.date) {
            const ceremonyDate = new Date(data.ceremony.date)
            const today = new Date()
            const timeDiff = ceremonyDate.getTime() - today.getTime()
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

            setWeddingDate(
              ceremonyDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            )
            setDaysUntilWedding(Math.max(0, daysDiff))
          }
        }
      } catch (error) {
        // Keep fallback values if API fails
      }
    }

    fetchWeddingDate()
  }, [])

  const stats = [
    {
      title: "RSVP Responses",
      value: "24",
      description: "Guests confirmed",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Days Until Wedding",
      value: daysUntilWedding.toString(),
      description: weddingDate,
      icon: Calendar,
      color: "text-secondary",
    },
    {
      title: "Website Views",
      value: "1,234",
      description: "This month",
      icon: Heart,
      color: "text-accent",
    },
    {
      title: "Settings Updated",
      value: "5",
      description: "This week",
      icon: Settings,
      color: "text-muted-foreground",
    },
  ]

  const quickActions = [
    {
      title: "Edit Couple Info",
      description: "Update names, photos, and love story",
      icon: Heart,
      href: "/admin/couple",
      color: "text-primary",
    },
    {
      title: "Manage Events",
      description: "Edit ceremony and reception details",
      icon: Calendar,
      href: "/admin/events",
      color: "text-secondary",
    },
    {
      title: "View RSVPs",
      description: "See guest responses and manage list",
      icon: Users,
      href: "/admin/rsvp",
      color: "text-accent",
    },
    {
      title: "Site Settings",
      description: "Customize colors, messages, and layout",
      icon: Settings,
      href: "/admin/settings",
      color: "text-muted-foreground",
    },
    {
      title: "Photo Gallery",
      description: "Upload and manage wedding photos",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "text-primary",
    },
    {
      title: "Preview Site",
      description: "See how your wedding site looks",
      icon: Eye,
      href: "/",
      color: "text-secondary",
      external: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Manage your wedding website and track your guests.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={action.href} target={action.external ? "_blank" : undefined}>
                        {action.external ? "Preview" : "Manage"}
                        <Edit className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
