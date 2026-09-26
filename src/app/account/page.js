import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountNameForm from "@/_components/accountNameForm";
import PaintingList from "@/_components/paintingList";
import SignOutButton from "@/_components/signOutButton";
import TransitionLink from "@/_components/transitionLink";
import { allPaintings } from "@/lib/api";
import { auth } from "@/lib/auth";
import { getFavouritePaintingIds } from "@/lib/favourites";

export const metadata = { robots: { index: false, follow: false } };

export default async function AccountPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) redirect("/login");

    const [favouriteIds, paintings] = await Promise.all([
        getFavouritePaintingIds(session.user.id),
        allPaintings(),
    ]);

    const paintingsById = new Map(paintings.map((painting) => [painting.id, painting]));
    const favouritePaintings = favouriteIds.map((id) => paintingsById.get(id)).filter(Boolean);

    return (
        <main>
            <section className="header-spacer container px-8 pt-48 pb-32">
                <h1 className="text-8xl leading-none pb-8">Bienvenue, {session.user.name}</h1>
                <p className="font-rosarivo text-2xl leading-snug max-w-2xl pb-24">
                    Retrouvez vos informations personnelles et les œuvres que vous avez ajoutées à vos favoris.
                </p>

                <h2 className="text-6xl pb-12">Vos informations</h2>
                <table className="w-full max-w-3xl">
                    <tbody className="text-left">
                        <tr className="border-t border-(--hightlight-orange)">
                            <th className="w-64 pl-4 py-4 align-middle">Nom</th>
                            <td className="py-4">
                                <AccountNameForm name={session.user.name} />
                            </td>
                        </tr>
                        <tr className="border-y border-(--hightlight-orange)">
                            <th className="w-64 pl-4 py-4">Email</th>
                            <td className="py-4">{session.user.email}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="pt-12">
                    <SignOutButton />
                </div>
            </section>

            <section className="favourite-paintings">
                <div className="container px-8 mb-12">
                    <h2 className="text-6xl pb-4">Vos favoris</h2>
                    {favouritePaintings.length > 0 ? (
                        <p>
                            {favouritePaintings.length} {favouritePaintings.length > 1 ? "œuvres ajoutées" : "œuvre ajoutée"} à vos favoris.
                        </p>
                    ) : (
                        <p>
                            Vous n'avez encore aucune œuvre en favori.{" "}
                            <TransitionLink href="/paintings" className="text-(--hightlight-orange) hover:underline">
                                Découvrir la collection
                            </TransitionLink>
                        </p>
                    )}
                </div>
                {favouritePaintings.length > 0 && <PaintingList paintings={favouritePaintings} />}
            </section>
        </main>
    )
}
