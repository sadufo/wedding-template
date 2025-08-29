"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export function DemoAdminButton() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="relative">
        <Link href="/demo/admin">
          <Button
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            size="lg"
          >
            <Settings className="mr-2 h-5 w-5" />
            Try Demo Admin
          </Button>
        </Link>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Test admin features!
      </div>
    </div>
  )
}
