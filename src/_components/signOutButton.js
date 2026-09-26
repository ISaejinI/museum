"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => { signOut({ fetchOptions: { onSuccess: () => router.push("/") } }) }}
            className="cursor-pointer border border-(--hightlight-color) text-(--hightlight-color) px-4 py-2 rounded-md hover:bg-(--hightlight-color) hover:text-background transition-colors"
        >
            Déconnexion
        </button>
    )
}
