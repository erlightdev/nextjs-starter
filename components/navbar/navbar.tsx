import { cookies } from "next/headers";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function Navbar() {
    const sessionCookie = cookies().get("auth_session");
    const isAuthenticated = Boolean(sessionCookie?.value);

    return (
        <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
            <Link href="/" className="font-bold">
                My App
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard" className="mr-4">
                            Dashboard
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <Link href="/auth/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
