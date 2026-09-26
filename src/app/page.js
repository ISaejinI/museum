import Hero from "@/_components/hero";
import RelatedPaintings from "@/_components/relatedPaintings";
import TransitionLink from "@/_components/transitionLink";
import { allPaintings, randomPaintings } from "@/lib/api";

export default async function Page() {
    const allPaintingsList = await allPaintings();
    const relatedPaintingsList = randomPaintings(allPaintingsList);

    return (
        <main>
            <Hero />
            <section className="about container my-32 flex flex-col-reverse items-center gap-16 px-8 lg:flex-row lg:gap-24">
                <div className="flex-1 flex flex-col gap-8">
                    <h2 className="text-6xl leading-tight">Un musée sans murs, ouvert sur les siècles</h2>
                    <p className="font-rosarivo text-2xl leading-snug">
                        Artheca réunit les chefs-d'œuvre qui ont marqué l'histoire de la peinture, de la Renaissance à l'art moderne.
                    </p>
                    <p className="text-lg/relaxed opacity-80 max-w-xl">
                        Chaque œuvre est accompagnée de son histoire, de son contexte et des détails qui la rendent unique. Flânez de salle en salle, laissez-vous surprendre et découvrez les liens qui unissent les artistes à travers les époques.
                    </p>

                    <dl className="grid grid-cols-3 gap-8 border-y border-(--hightlight-orange) py-6">
                        <div className="flex flex-col items-center">
                            <dt className="text-sm opacity-60">Œuvres</dt>
                            <dd className="font-rosarivo text-5xl">39</dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <dt className="text-sm opacity-60">Mouvements</dt>
                            <dd className="font-rosarivo text-5xl">24</dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <dt className="text-sm opacity-60">Siècles d'art</dt>
                            <dd className="font-rosarivo text-5xl">6</dd>
                        </div>
                    </dl>

                    <TransitionLink href="/about" className="group flex w-fit items-center gap-3 text-lg text-(--hightlight-color) hover:text-(--hightlight-orange) transition-colors">
                        En savoir plus sur le musée
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </TransitionLink>
                </div>
                <div className="flex-1 flex justify-center">
                    <img src="/assets/diane_draw.png" alt="" className="w-auto h-[50vh] lg:h-[75vh] -scale-x-100" />
                </div>
            </section>
            <section className="related-paintings">
                <div className="container mb-12">
                    <h2 className="text-6xl pb-4">Les œuvres à découvrir</h2>
                    <p>Parcourez un aperçu des œuvres les plus emblématiques de notre collection.</p>
                </div>
                <RelatedPaintings relatedPaintings={relatedPaintingsList} />
            </section>
        </main>
    )
}