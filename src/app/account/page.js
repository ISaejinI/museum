import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = { robots: { index: false, follow: false } };

export default async function AccountPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) redirect("/login");

    return (
        <>
            <section className="container header-spacer">
                <h1 className="text-3xl font-bold">Mon compte</h1>
                <p>Bienvenue, {session.user.name} !</p>

                <h2>Vos informations</h2>
                {/* Afficher le nom de l'utilisateur, il doit pouvoir le modifier */}
                {/* Afficher le mail de l'utilisateur */}
            </section>
            <section>
                <h2>Vos favoris</h2>
                {/* Afficher la liste des favoris de l'utilisateur avec le composant PaintingList */}
            </section>
        </>
    )
}