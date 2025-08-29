"use client"

import type { User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Heart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      // Handle logout error silently or show user notification
    }
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-bold text-foreground truncate">Wedding Admin</h1>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Emily & Michael's Wedding</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
