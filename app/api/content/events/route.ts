import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getEventsByCoupleId, updateEvent } from "@/lib/database"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const events = await getEventsByCoupleId(session.user.coupleId)
    return NextResponse.json(events)
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
    const { events } = data

    if (!Array.isArray(events)) {
      return NextResponse.json({ error: "Events must be an array" }, { status: 400 })
    }

    const updatedEvents = []
    for (const event of events) {
      const updated = await updateEvent(event.id, {
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        additionalInfo: event.additionalInfo,
      })
      updatedEvents.push(updated)
    }

    return NextResponse.json(updatedEvents)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
