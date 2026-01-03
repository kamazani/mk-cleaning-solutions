import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: send to your email using Resend/SendGrid OR store in a database
    // For now we just simulate success:
    console.log("Quote request:", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
