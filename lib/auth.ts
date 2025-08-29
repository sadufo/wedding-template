import bcrypt from "bcryptjs"

export interface User {
  id: number
  email: string
  name: string
  coupleId: number
  role: string
}

export interface Session {
  user: User
  expires: string
}

// Production-ready user data - replace with actual database calls
const mockUsers = [
  {
    id: 1,
    email: "admin@wedding.com",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 'admin123'
    name: "Wedding Admin",
    couple_id: 1,
    role: "admin",
  },
]

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = mockUsers.find((u) => u.email === email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    coupleId: user.couple_id,
    role: user.role,
  }
}

// Helpers: парсинг cookie строки в объект
function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const result: Record<string, string> = {}
  if (!cookieHeader) return result
  cookieHeader.split(";").forEach((c) => {
    const [k, ...v] = c.split("=")
    if (!k) return
    result[k.trim()] = decodeURIComponent((v || []).join("=").trim())
  })
  return result
}

// Установка cookie: если передан ctx.res (SSR), ставим Set-Cookie, иначе ставим document.cookie (client)
export function createSession(user: User, ctx?: any): void {
  const expiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
  const session: Session = {
    user,
    expires: expiresDate.toISOString(),
  }
  const value = encodeURIComponent(JSON.stringify(session))
  const cookieStr = `session=${value}; Path=/; Expires=${expiresDate.toUTCString()}; SameSite=Lax;${process.env.NODE_ENV === "production" ? " Secure;" : ""}`

  if (ctx && ctx.res && typeof ctx.res.setHeader === "function") {
    // SSR: добавляем или дополняем заголовок Set-Cookie
    const prev = ctx.res.getHeader("Set-Cookie")
    if (!prev) {
      ctx.res.setHeader("Set-Cookie", cookieStr)
    } else if (Array.isArray(prev)) {
      ctx.res.setHeader("Set-Cookie", [...prev, cookieStr])
    } else {
      ctx.res.setHeader("Set-Cookie", [String(prev), cookieStr])
    }
  } else if (typeof document !== "undefined") {
    // Client
    document.cookie = cookieStr
  }
}

export function getSession(ctx?: any): Session | null {
  try {
    let cookieHeader: string | undefined
    if (ctx && ctx.req && typeof ctx.req.headers?.cookie === "string") {
      cookieHeader = ctx.req.headers.cookie
    } else if (typeof document !== "undefined") {
      cookieHeader = document.cookie
    }

    const cookies = parseCookies(cookieHeader)
    const raw = cookies["session"]
    if (!raw) return null

    const session: Session = JSON.parse(raw)
    if (new Date(session.expires) < new Date()) {
      destroySession(ctx)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function destroySession(ctx?: any): void {
  const expired = "Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  const cookieStr = `session=; Path=/; ${expired}; SameSite=Lax;`
  if (ctx && ctx.res && typeof ctx.res.setHeader === "function") {
    const prev = ctx.res.getHeader("Set-Cookie")
    if (!prev) {
      ctx.res.setHeader("Set-Cookie", cookieStr)
    } else if (Array.isArray(prev)) {
      ctx.res.setHeader("Set-Cookie", [...prev, cookieStr])
    } else {
      ctx.res.setHeader("Set-Cookie", [String(prev), cookieStr])
    }
  } else if (typeof document !== "undefined") {
    document.cookie = cookieStr
  }
}

// Проверка авторизации: если нет сессии - выполняем редирект по окружению или бросаем исключение
export function requireAuth(ctx?: any): User {
  const session = getSession(ctx)
  if (!session) {
    if (ctx && ctx.res && typeof ctx.res.writeHead === "function") {
      // SSR redirect
      try {
        ctx.res.writeHead(302, { Location: "/login" })
        ctx.res.end()
      } catch {
        // ignore
      }
      // после редиректа прерываем выполнение
      throw new Error("Redirecting to /login")
    }
    if (typeof window !== "undefined") {
      window.location.href = "/login"
      throw new Error("Redirecting to /login")
    }
    throw new Error("Unauthenticated")
  }
  return session.user
}
