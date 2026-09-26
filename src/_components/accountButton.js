"use client";

import TransitionLink from "@/_components/transitionLink";
import { useSession } from "@/lib/auth-client";

export default function AccountButton() {
    const { data: session, isPending } = useSession();

    if (isPending) return <span className="skeleton w-24 h-8 rounded-md bg-gray-500"></span>;

    if (!session) {
        return  (
            <TransitionLink href="/login" className="bg-(--hightlight-color) text-foreground px-4 py-2 rounded-md hover:opacity-80 transition-opacity">
                Se connecter
            </TransitionLink>
        )
    }

    return (
        <TransitionLink href="/account" aria-label="Mon compte">
            Hi {session.user.name} !
        </TransitionLink>
    )
}