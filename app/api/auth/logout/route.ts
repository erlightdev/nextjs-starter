import { auth } from "@/lib/lucia";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const sessionCookie = req.cookies.get("auth_session");

    if (!sessionCookie) {
        return NextResponse.json({ error: "No active session" }, { status: 400 });
    }

    try {
        await auth.invalidateSession(sessionCookie.value); // Destroy session
        const sessionCookieDeleted = auth.createSessionCookie(null); // Clear cookie

        return NextResponse.json({ message: "Logged out" }, {
            headers: {
                "Set-Cookie": sessionCookieDeleted.serialize(),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
