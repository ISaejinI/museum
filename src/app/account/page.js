import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) redirect("/login");

    return (
        <section>
            <h1 className="text-3xl font-bold">Mon compte</h1>
            <p>Bienvenue, {session.user.name} !</p>
        </section>
    )
}