// Production-ready database functions - replace with actual database calls
// This would typically use your database client (e.g., Prisma, Drizzle, or direct SQL)

export interface Couple {
  id: number
  brideName: string
  groomName: string
  bridePhotoUrl?: string
  groomPhotoUrl?: string
  couplePhotoUrl?: string
  loveStory?: string
  proposalStory?: string
  createdAt: string
  updatedAt: string
}

export interface WeddingEvent {
  id: number
  coupleId: number
  eventType: string
  eventName: string
  eventDate: string
  eventTime: string
  venueName: string
  venueAddress: string
  venueMapUrl?: string
  dressCode?: string
  additionalInfo?: string
  createdAt: string
  updatedAt: string
}

export interface RSVPResponse {
  id: number
  coupleId: number
  guestName: string
  guestEmail?: string
  guestPhone?: string
  attendanceStatus: "attending" | "not_attending" | "maybe"
  numberOfGuests: number
  dietaryRestrictions?: string
  specialRequests?: string
  message?: string
  createdAt: string
}

export interface SiteSettings {
  id: number
  coupleId: number
  siteTitle: string
  welcomeMessage?: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  backgroundImageUrl?: string
  musicUrl?: string
  contactEmail?: string
  contactPhone?: string
  socialInstagram?: string
  socialFacebook?: string
  weddingHashtag?: string
  footerBrideName?: string
  footerGroomName?: string
  footerWeddingDate?: string
  footerBottomText?: string
  countdownEnabled: boolean
  rsvpEnabled: boolean
  rsvpDeadline?: string
  galleryEnabled: boolean
  createdAt: string
  updatedAt: string
}

const demoCouple: Couple = {
  id: 1,
  brideName: "Emily Johnson",
  groomName: "Michael Smith",
  loveStory:
    "We met in college during our first year and have been inseparable ever since. Our love story began in the library where we both reached for the same book - it was meant to be!",
  proposalStory:
    'On a beautiful sunset evening at our favorite park, Michael got down on one knee and asked Emily to be his forever. With tears of joy and an overwhelming "Yes!", we began planning our dream wedding.',
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
}

const demoEvents: WeddingEvent[] = [
  {
    id: 1,
    coupleId: 1,
    eventType: "ceremony",
    eventName: "Wedding Ceremony",
    eventDate: "2024-06-15",
    eventTime: "16:00",
    venueName: "St. Mary's Church",
    venueAddress: "123 Church Street, Downtown, NY 10001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    coupleId: 1,
    eventType: "reception",
    eventName: "Wedding Reception",
    eventDate: "2024-06-15",
    eventTime: "18:30",
    venueName: "Grand Ballroom Hotel",
    venueAddress: "456 Celebration Ave, Downtown, NY 10001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const demoRSVPs: RSVPResponse[] = [
  {
    id: 1,
    coupleId: 1,
    guestName: "Sarah Johnson",
    guestEmail: "sarah@email.com",
    guestPhone: "(555) 123-4567",
    attendanceStatus: "attending",
    numberOfGuests: 2,
    dietaryRestrictions: "Vegetarian",
    message: "So excited to celebrate with you both!",
    createdAt: "2024-03-15T00:00:00Z",
  },
  {
    id: 2,
    coupleId: 1,
    guestName: "Mark Wilson",
    guestEmail: "mark@email.com",
    guestPhone: "(555) 987-6543",
    attendanceStatus: "attending",
    numberOfGuests: 1,
    message: "Can't wait for the big day!",
    createdAt: "2024-03-14T00:00:00Z",
  },
  {
    id: 3,
    coupleId: 1,
    guestName: "Lisa Chen",
    guestEmail: "lisa@email.com",
    attendanceStatus: "not_attending",
    numberOfGuests: 0,
    message: "Sorry I can't make it, but sending love!",
    createdAt: "2024-03-13T00:00:00Z",
  },
]

const demoSettings: SiteSettings = {
  id: 1,
  coupleId: 1,
  siteTitle: "Emily & Michael's Wedding",
  welcomeMessage: "Join us as we celebrate our love and begin our journey together as husband and wife!",
  primaryColor: "#be123c",
  secondaryColor: "#ec4899",
  fontFamily: "Geist Sans",
  contactEmail: "emily.michael.wedding@email.com",
  contactPhone: "(555) 123-4567",
  socialInstagram: "@emilyandmichael2024",
  socialFacebook: "EmilyAndMichael2024",
  weddingHashtag: "#EmilyAndMichael2024",
  footerBrideName: "Emily",
  footerGroomName: "Michael",
  footerWeddingDate: "June 15, 2024",
  footerBottomText: "Made with love for our special day. Thank you for being part of our story.",
  countdownEnabled: true,
  rsvpEnabled: true,
  rsvpDeadline: "2024-05-01",
  galleryEnabled: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
}

// Database functions
export async function getCoupleById(id: number): Promise<Couple | null> {
  // In production: SELECT * FROM couples WHERE id = ?
  return demoCouple.id === id ? demoCouple : null
}

export async function updateCouple(id: number, data: Partial<Couple>): Promise<Couple> {
  // In production: UPDATE couples SET ... WHERE id = ?
  const updated = { ...demoCouple, ...data, updatedAt: new Date().toISOString() }
  return updated
}

export async function getEventsByCoupleId(coupleId: number): Promise<WeddingEvent[]> {
  // In production: SELECT * FROM wedding_events WHERE couple_id = ?
  return demoEvents.filter((event) => event.coupleId === coupleId)
}

export async function updateEvent(id: number, data: Partial<WeddingEvent>): Promise<WeddingEvent> {
  // In production: UPDATE wedding_events SET ... WHERE id = ?
  const event = demoEvents.find((e) => e.id === id)
  if (!event) throw new Error("Event not found")
  return { ...event, ...data, updatedAt: new Date().toISOString() }
}

export async function getRSVPsByCoupleId(coupleId: number): Promise<RSVPResponse[]> {
  // In production: SELECT * FROM rsvp_responses WHERE couple_id = ?
  return demoRSVPs.filter((rsvp) => rsvp.coupleId === coupleId)
}

export async function createRSVP(data: Omit<RSVPResponse, "id" | "createdAt">): Promise<RSVPResponse> {
  // In production: INSERT INTO rsvp_responses ...
  const newRSVP: RSVPResponse = {
    ...data,
    id: demoRSVPs.length + 1,
    createdAt: new Date().toISOString(),
  }
  demoRSVPs.push(newRSVP)
  return newRSVP
}

export async function getSettingsByCoupleId(coupleId: number): Promise<SiteSettings | null> {
  // In production: SELECT * FROM site_settings WHERE couple_id = ?
  return demoSettings.coupleId === coupleId ? demoSettings : null
}

export async function updateSettings(coupleId: number, data: Partial<SiteSettings>): Promise<SiteSettings> {
  // In production: UPDATE site_settings SET ... WHERE couple_id = ?
  const updated = { ...demoSettings, ...data, updatedAt: new Date().toISOString() }
  return updated
}
