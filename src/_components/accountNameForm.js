"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AccountNameForm({ name }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const newName = new FormData(e.currentTarget).get("name").trim();

        if (!newName) return setError("Le nom ne peut pas être vide.");
        if (newName === name) return setIsEditing(false);

        setIsPending(true);
        await authClient.updateUser(
            { name: newName },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    router.refresh();
                },
                onError: (ctx) => setError(ctx.error.message),
            }
        );
        setIsPending(false);
    }

    if (!isEditing) {
        return (
            <div className="flex items-center justify-between gap-8">
                <span>{name}</span>
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer text-sm text-(--hightlight-orange) hover:underline"
                >
                    Modifier
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-8">
                <input
                    name="name"
                    type="text"
                    defaultValue={name}
                    aria-label="Nom"
                    required
                    ref={(input) => input?.focus()}
                    className="flex-1 border-b border-(--hightlight-orange) bg-transparent py-1 outline-none"
                />
                <div className="flex items-center gap-4 text-sm">
                    <button
                        type="button"
                        onClick={() => { setIsEditing(false); setError(null); }}
                        className="cursor-pointer opacity-60 hover:underline"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer bg-(--hightlight-color) text-background px-4 py-2 rounded-md hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {isPending ? "Enregistrement…" : "Enregistrer"}
                    </button>
                </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
    );
}
