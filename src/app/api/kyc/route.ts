import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { kyc } from "@/db/schema"
import { eq } from "drizzle-orm"

// ✅ Save or update KYC
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { groupName, firstName, lastName, bvn, nin, phone } = body

    const existing = await db.select().from(kyc).where(eq(kyc.userId, userId))

    if (existing.length > 0) {
      await db
        .update(kyc)
        .set({
          groupName,
          firstName,
          lastName,
          bvn,
          nin,
          phone,
          updatedAt: new Date(),
        })
        .where(eq(kyc.userId, userId))
    } else {
      await db.insert(kyc).values({
        userId,
        groupName,
        firstName,
        lastName,
        bvn,
        nin,
        phone,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Error saving KYC:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// ✅ Fetch KYC for logged-in user
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const record = await db.select().from(kyc).where(eq(kyc.userId, userId))

    if (record.length === 0) {
      return NextResponse.json(null)
    }

    return NextResponse.json(record[0])
  } catch (err) {
    console.error("Error fetching KYC:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
