"use client"

import { Heart, Instagram, Facebook, Mail, Phone } from "lucide-react"
import { useState, useEffect } from "react"

interface FooterSettings {
  contactEmail?: string
  contactPhone?: string
  socialInstagram?: string
  socialFacebook?: string
  weddingHashtag?: string
  footerBrideName?: string
  footerGroomName?: string
  footerWeddingDate?: string
  footerBottomText?: string
}

export function WeddingFooter() {
  const [settings, setSettings] = useState<FooterSettings>({
    contactEmail: "emily.michael.wedding@email.com",
    contactPhone: "(555) 123-4567",
    socialInstagram: "@emilyandmichael2024",
    socialFacebook: "EmilyAndMichael2024",
    weddingHashtag: "#EmilyAndMichael2024",
    footerBrideName: "Emily",
    footerGroomName: "Michael",
    footerWeddingDate: "June 15, 2024",
    footerBottomText: "Made with love for our special day. Thank you for being part of our story.",
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/content/settings")
        if (response.ok) {
          const data = await response.json()
          setSettings({
            contactEmail: data.contactEmail || "emily.michael.wedding@email.com",
            contactPhone: data.contactPhone || "(555) 123-4567",
            socialInstagram: data.socialInstagram || "@emilyandmichael2024",
            socialFacebook: data.socialFacebook || "EmilyAndMichael2024",
            weddingHashtag: data.weddingHashtag || "#EmilyAndMichael2024",
            footerBrideName: data.footerBrideName || "Emily",
            footerGroomName: data.footerGroomName || "Michael",
            footerWeddingDate: data.footerWeddingDate || "June 15, 2024",
            footerBottomText:
              data.footerBottomText || "Made with love for our special day. Thank you for being part of our story.",
          })
        }
      } catch (error) {
        // Используем значения по умолчанию при ошибке
      }
    }
    loadSettings()
  }, [])

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-4 text-primary fill-current animate-pulse hover:animate-bounce hover:scale-110 transition-transform duration-300" />
          <h3 className="text-3xl font-bold mb-2 animate-slide-up animation-delay-200">
            {settings.footerBrideName} & {settings.footerGroomName}
          </h3>
          <p className="text-lg opacity-90 animate-slide-up animation-delay-300">{settings.footerWeddingDate}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="animate-slide-up animation-delay-400">
            <h4 className="text-xl font-bold mb-4">Contact the Couple</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>{settings.contactEmail}</span>
              </div>
              <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>{settings.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="animate-slide-up animation-delay-500">
            <h4 className="text-xl font-bold mb-4">Follow Our Journey</h4>
            <div className="flex justify-center gap-4">
              <Instagram className="w-6 h-6 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
              <Facebook className="w-6 h-6 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" />
            </div>
            <p className="text-sm opacity-75 mt-2 hover:opacity-100 transition-opacity duration-300">
              {settings.weddingHashtag}
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 animate-fade-in animation-delay-600">
          <p className="text-sm opacity-75 hover:opacity-100 transition-opacity duration-300">
            {settings.footerBottomText}
          </p>
        </div>
      </div>
    </footer>
  )
}
