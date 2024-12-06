"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const res = await fetch("/api/auth/logout", { method: "POST" });

        if (res.ok) {
            router.push("/auth/login");
        } else {
            alert("Logout failed");
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 disabled:opacity-50"
        >
            {loading ? "Logging out..." : "Logout"}
        </button>
    );
}
