import { auth } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    let user;

    try {
        // Fetch session cookie
        const sessionCookie = cookies().get("auth_session")?.value;

        if (!sessionCookie) {
            redirect("/auth/login"); // Redirect if no session cookie
        }

        // Validate session
        const session = await auth.validateSession(sessionCookie);
        user = session.user; // Get user details
    } catch (error) {
        redirect("/auth/login"); // Redirect if validation fails
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}!</h1>
            <p>This is your dashboard.</p>
        </div>
    );
}
