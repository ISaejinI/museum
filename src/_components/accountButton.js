"use client";

import { ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/outline";
import TransitionLink from "@/_components/transitionLink";
import { useSession } from "@/lib/auth-client";

export default function AccountButton({ isDark }) {
    const { data: session, isPending } = useSession();

    if (isPending) return <span className="h-9 w-32 animate-pulse bg-current opacity-10" aria-hidden="true"></span>;

    if (!session) {
        return  (
            <TransitionLink
                href="/login"
                aria-label="Se connecter"
                className={`group flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-xs uppercase tracking-widest transition-colors duration-500 lg:px-5 ${
                    isDark
                        ? "border-background hover:bg-background hover:text-foreground"
                        : "border-foreground hover:bg-foreground hover:text-background"
                }`}
            >
                <UserIcon className="size-4 sm:hidden" />
                <span className="hidden sm:inline">Se connecter</span>
                <ArrowUpRightIcon className="hidden size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
            </TransitionLink>
        )
    }

    return (
        <TransitionLink
            href="/account"
            aria-label="Mon compte"
            className="group flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-widest transition-colors hover:text-(--hightlight-orange)"
        >
            <UserIcon className="size-4" />
            <span className="hidden border-b border-transparent transition-colors group-hover:border-current sm:inline">Hi {session.user.name} !</span>
        </TransitionLink>
    )
}
