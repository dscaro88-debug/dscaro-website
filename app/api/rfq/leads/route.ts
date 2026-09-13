import { NextResponse } from "next/server"
import { readLatestLeads } from "@/lib/lead-storage"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const leads = await readLatestLeads()
    return NextResponse.json({ leads })
  } catch {
    return NextResponse.json({ leads: [] }, { status: 200 })
  }
}
