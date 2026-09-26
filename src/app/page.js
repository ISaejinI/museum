import Hero from "@/_components/hero";
import RelatedPaintings from "@/_components/relatedPaintings";
import { allPaintings, randomPaintings } from "@/lib/api";

export default async function Page() {
    const allPaintingsList = await allPaintings();
    const relatedPaintingsList = randomPaintings(allPaintingsList);

    return (
        <main>
            <Hero />
            <section className="about container mb-32">

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