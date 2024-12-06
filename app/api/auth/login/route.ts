import { auth } from "@/lib/lucia";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        const user = await auth.useKey("email", email, password);

        const session = await auth.createSession(user.id);
        const sessionCookie = auth.createSessionCookie(session);

        return NextResponse.json({ user }, {
            headers: {
                "Set-Cookie": sessionCookie.serialize(),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }
}
