import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getSettingsByCoupleId, updateSettings } from "@/lib/database"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await getSettingsByCoupleId(session.user.coupleId)
    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const {
      siteTitle,
      welcomeMessage,
      primaryColor,
      secondaryColor,
      countdownEnabled,
      rsvpEnabled,
      rsvpDeadline,
      galleryEnabled,
    } = data

    const updatedSettings = await updateSettings(session.user.coupleId, {
      siteTitle,
      welcomeMessage,
      primaryColor,
      secondaryColor,
      countdownEnabled,
      rsvpEnabled,
      rsvpDeadline,
      galleryEnabled,
    })

    return NextResponse.json(updatedSettings)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
