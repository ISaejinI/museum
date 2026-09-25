"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        await signUp.email(
            { name: formData.get("name"), email: formData.get("email"), password: formData.get("password") },
            {
                onSuccess: () => router.push("/account"),
                onError: (ctx) => setError(ctx.error.message),
            }
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-24 px-16 max-w-md mx-auto">
            <input name="name" placeholder="Nom" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Mot de passe (8+ car.)" required />
            <button className="bg-(--hightlight-color) text-(--foreground) px-4 py-2 rounded-md hover:opacity-80 transition-opacity">
                Je crée mon compte
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}