import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getRSVPsByCoupleId, createRSVP } from "@/lib/database"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rsvps = await getRSVPsByCoupleId(session.user.coupleId)
    return NextResponse.json(rsvps)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { guestName, guestEmail, guestPhone, attendanceStatus, numberOfGuests, dietaryRestrictions, message } = data

    if (!guestName || !attendanceStatus) {
      return NextResponse.json({ error: "Guest name and attendance status are required" }, { status: 400 })
    }

    // For public RSVP submissions, we use coupleId = 1 (in production, this would be dynamic)
    const newRSVP = await createRSVP({
      coupleId: 1,
      guestName,
      guestEmail,
      guestPhone,
      attendanceStatus,
      numberOfGuests: numberOfGuests || 1,
      dietaryRestrictions,
      message,
    })

    return NextResponse.json(newRSVP, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
