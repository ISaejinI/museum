"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { signUp } from "@/lib/auth-client";
import TransitionLink from "@/_components/transitionLink";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsPending(true);

        const formData = new FormData(e.currentTarget);

        await signUp.email(
            { name: formData.get("name"), email: formData.get("email"), password: formData.get("password") },
            {
                onSuccess: () => router.push("/account"),
                onError: (ctx) => {
                    setError(ctx.error.message);
                    setIsPending(false);
                },
            }
        );
    }

    return (
        <main className="header-spacer container px-8 pt-48 pb-32">
            <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2 lg:gap-24">
                <section className="flex flex-col justify-center">
                    <h1 className="text-6xl leading-none pb-12 lg:text-8xl">
                        Rejoignez<br /><em>les passionnés</em>
                    </h1>

                    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-10">
                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-widest text-(--hightlight-orange)">Nom</span>
                            <input
                                name="name"
                                autoComplete="name"
                                placeholder="Jeanne Dupont"
                                required
                                className="border-b border-foreground/30 bg-transparent py-3 font-rosarivo text-xl outline-none transition-colors placeholder:text-foreground/30 focus:border-(--hightlight-orange)"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-widest text-(--hightlight-orange)">Email</span>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="vous@exemple.fr"
                                required
                                className="border-b border-foreground/30 bg-transparent py-3 font-rosarivo text-xl outline-none transition-colors placeholder:text-foreground/30 focus:border-(--hightlight-orange)"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-widest text-(--hightlight-orange)">Mot de passe</span>
                            <input
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="8 caractères minimum"
                                minLength={8}
                                required
                                className="border-b border-foreground/30 bg-transparent py-3 font-rosarivo text-xl outline-none transition-colors placeholder:text-foreground/30 focus:border-(--hightlight-orange)"
                            />
                        </label>

                        {error && <p className="text-sm text-(--hightlight-color)" role="alert">{error}</p>}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="group flex w-fit cursor-pointer items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isPending ? "Création…" : "Je crée mon compte"}
                            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                    </form>

                    <p className="mt-8 text-sm">
                        <span className="opacity-60">Déjà un compte ?</span>{" "}
                        <TransitionLink href="/login" className="inline-flex items-center gap-1 uppercase tracking-widest text-(--hightlight-orange) hover:underline">
                            Se connecter
                            <ArrowUpRightIcon className="size-3" />
                        </TransitionLink>
                    </p>
                </section>

                <aside className="flex flex-col rounded-sm bg-(--secondary-bg) p-4 text-background">
                    <div className="flex flex-1 flex-col items-center justify-center gap-8 border border-(--hightlight-orange)/40 px-8 py-16">
                        <figure className="flex flex-col items-center">
                            <img
                                src="/paintings/LaPrimavera.jpg"
                                alt="Le Printemps"
                                className="max-h-112 w-auto shadow-[0_24px_40px_-12px_rgba(0,0,0,0.7)]"
                            />
                            <figcaption className="pt-6 text-center">
                                <p className="font-rosarivo text-lg">Le Printemps</p>
                                <p className="text-xs opacity-60">Sandro Botticelli - 1478</p>
                            </figcaption>
                        </figure>
                    </div>
                </aside>
            </div>
        </main>
    );
}
