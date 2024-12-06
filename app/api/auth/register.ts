import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/lucia";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    try {
        const user = await auth.createUser({
            primaryKey: {
                providerId: "email",
                providerUserId: email,
                password,
            },
            attributes: {
                email,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Registration failed" }, { status: 400 });
    }
}
