import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import FavouriteButton from "@/_components/favouriteButton";
import PaintingHero from "@/_components/paintingHero";
import RelatedPaintings from "@/_components/relatedPaintings";
import TextReveal from "@/_components/textReveal";
import TransitionLink from "@/_components/transitionLink";
import { paintingTypeLabel } from "@/_helpers/PaintingHelpers";
import { singlePainting, allPaintings, relatedPaintings } from "@/lib/api";
import { auth } from "@/lib/auth";
import { isFavouritePainting } from "@/lib/favourites";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function singlePaintingPage({ params }) {
    const { slug } = await params;
    const [painting, session] = await Promise.all([
        singlePainting(slug),
        auth.api.getSession({ headers: await headers() }),
    ]);

    if (!painting)  notFound();

    const isFavourite = session ? await isFavouritePainting(session.user.id, painting.id) : false;

    const allPaintingsList = await allPaintings();
    const relatedPaintingsList = relatedPaintings(allPaintingsList, painting);
    const hasRelatedPaintings = relatedPaintingsList.length > 0;

    return (
        <>
            <PaintingHero painting={painting} />

            <section className="painting-details container grid grid-cols-1 gap-16 px-8 py-32 lg:grid-cols-12 lg:gap-8">
                <aside className="flex flex-col gap-10 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-6">Informations</p>
                        <table className="w-full">
                            <tbody className="text-left">
                                <tr className="border-t border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Titre</th>
                                    <td className="py-4 font-rosarivo text-lg">{painting.title}</td>
                                </tr>
                                <tr className="border-t border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Artiste</th>
                                    <td className="py-4 font-rosarivo text-lg">{painting.artist}</td>
                                </tr>
                                <tr className="border-t border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Année</th>
                                    <td className="py-4 font-rosarivo text-lg">{painting.year}</td>
                                </tr>
                                <tr className="border-t border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Technique</th>
                                    <td className="py-4 font-rosarivo text-lg">{paintingTypeLabel(painting.type)}</td>
                                </tr>
                                <tr className="border-t border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Mouvement</th>
                                    <td className="py-4 font-rosarivo text-lg">
                                        <TransitionLink href={`/paintings?movement=${encodeURIComponent(painting.movement)}`} className="hover:text-(--hightlight-orange) transition-colors">
                                            {painting.movement}
                                        </TransitionLink>
                                    </td>
                                </tr>
                                <tr className="border-y border-(--hightlight-orange)">
                                    <th className="w-32 py-4 pr-4 align-top text-xs font-normal uppercase tracking-widest opacity-60">Exposée à</th>
                                    <td className="py-4 font-rosarivo text-lg">
                                        <a href={painting.locationLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-2 hover:text-(--hightlight-orange) transition-colors">
                                            {painting.location}
                                            <ArrowUpRightIcon className="mt-1.5 size-3 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {session && <FavouriteButton paintingId={painting.id} initialFavourite={isFavourite} />}
                </aside>

                <div className="lg:col-span-7 lg:col-start-6">
                    <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-6">L'œuvre</p>
                    <div
                        dangerouslySetInnerHTML={{ __html: painting.description }}
                        className="text-lg/relaxed opacity-90 [&_p]:pb-6 [&_p:first-child]:font-rosarivo [&_p:first-child]:text-2xl/snug [&_p:first-child]:opacity-100 [&_strong]:font-normal [&_strong]:text-(--hightlight-color) [&_em]:font-rosarivo"
                    />
                </div>
            </section>

            {/* Galerie */}
            {painting.gallery.length > 0 && (
                <section className="painting-gallery bg-(--secondary-bg) py-32 text-background" data-header-theme="dark">
                    <div className="container px-8">
                        <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">En détail</p>
                        <TextReveal as="h2" className="text-6xl leading-[1.1] pb-24 lg:text-8xl">
                            Regarder
                            <br />
                            <em>de plus près</em>
                        </TextReveal>

                        <ul className={painting.gallery.length > 1 ? "grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24" : "flex justify-center"}>
                            {painting.gallery.map((src, index) => (
                                <li key={src} className={`flex flex-col ${painting.gallery.length > 1 && index % 2 === 1 ? "md:mt-48" : ""}`}>
                                    <figure className="border border-(--hightlight-orange)/40 p-4">
                                        <img
                                            src={src}
                                            alt={`${painting.title}, détail ${index + 1}`}
                                            className="max-h-[80vh] w-full object-cover"
                                        />
                                    </figure>
                                    <p className="flex items-baseline gap-4 pt-4 text-xs uppercase tracking-widest">
                                        <span className="font-rosarivo text-2xl text-(--hightlight-orange)">{String(index + 1).padStart(2, "0")}</span>
                                        <span className="opacity-60">Détail — {painting.title}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Œuvres liées */}
            <section className="related-paintings pt-32">
                <div className="container flex flex-col gap-8 px-8 mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">À découvrir</p>
                        {hasRelatedPaintings ? (
                            <>
                                <TextReveal as="h2" className="text-6xl leading-[1.1] pb-6">
                                    Dans la même <em>salle</em>
                                </TextReveal>
                                <p className="max-w-xl opacity-80">Retrouvez d'autres œuvres du mouvement {painting.movement} dans notre collection.</p>
                            </>
                        ) : (
                            <>
                                <TextReveal as="h2" className="text-6xl leading-[1.1] pb-6">
                                    Une salle <em>encore vide</em>
                                </TextReveal>
                                <p className="max-w-xl opacity-80">Aucune autre œuvre du mouvement {painting.movement} n'est exposée pour le moment dans notre collection.</p>
                            </>
                        )}
                    </div>
                    <TransitionLink
                        href={hasRelatedPaintings ? `/paintings?movement=${encodeURIComponent(painting.movement)}` : "/paintings"}
                        className="group flex w-fit items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
                    >
                        {hasRelatedPaintings ? "Voir tout le mouvement" : "Explorer les autres mouvements"}
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TransitionLink>
                </div>
                <RelatedPaintings relatedPaintings={relatedPaintingsList} />
            </section>
        </>
    )
}

export async function generateMetadata({ params}) {
    const { slug } = await params;
    const painting = await singlePainting(slug);

    if (!painting) {
        return {
            title: "Painting Not Found",
            description: "The requested painting was not found."
        };
    }

    return {
        title: `${painting.title} | Artheca`,
        description: `${painting.title} - ${painting.artist} (${painting.year})`
    }
}
