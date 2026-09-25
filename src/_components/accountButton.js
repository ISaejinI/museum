"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function AccountButton() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    if (isPending) return <span className="skeleton w-24 h-8 rounded-md bg-gray-500"></span>;

    if (!session) {
        return  (
            <Link href="/login" className="bg-(--hightlight-color) text-(--foreground) px-4 py-2 rounded-md hover:opacity-80 transition-opacity">
                Se connecter
            </Link>
        )
    }

    return (
        <div className="flex items-center gap-4">
            <Link href="/account" aria-label="Mon compte">
                {session.user.name}
            </Link>
            <button onClick={() => { signOut({ fetchOptions: {onSuccess: () => router.push("/")} }) }} >
                Déconnexion
            </button>
        </div>
    )
}