import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getCoupleById, updateCouple } from "@/lib/database"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const couple = await getCoupleById(session.user.coupleId)
    if (!couple) {
      return NextResponse.json({ error: "Couple not found" }, { status: 404 })
    }

    const response = NextResponse.json(couple)
    response.headers.set("Access-Control-Allow-Origin", "*")
    return response
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
    const { brideName, groomName, loveStory, proposalStory, bridePhotoUrl, groomPhotoUrl, couplePhotoUrl } = data

    const updatedCouple = await updateCouple(session.user.coupleId, {
      brideName,
      groomName,
      loveStory,
      proposalStory, // Added proposalStory field
      bridePhotoUrl,
      groomPhotoUrl,
      couplePhotoUrl,
    })

    const response = NextResponse.json(updatedCouple)
    response.headers.set("Access-Control-Allow-Origin", "*")
    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
