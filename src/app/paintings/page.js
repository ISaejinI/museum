import { allPaintings } from "@/lib/api";
import PaintingsGrid from "@/_components/paintingsGrid";
import SearchBar from "@/_components/searchBar";

export default async function Page() {
    const paintings = await allPaintings();

    return (
        <main>
            <section className="header-spacer container px-8 pt-48 pb-16">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-6xl leading-none pb-8 lg:text-8xl">
                            Toutes<br /><em>les peintures</em>
                        </h1>
                        <p className="font-rosarivo text-2xl leading-snug max-w-2xl">
                            De la Renaissance à l'art moderne, parcourez les {paintings.length} œuvres de notre collection et laissez-vous guider d'une salle à l'autre.
                        </p>
                    </div>
                    <SearchBar paintings={paintings} />
                </div>
            </section>
            <PaintingsGrid paintings={paintings} />
        </main>
    )
}

export const metadata = {
  title: 'Toutes les peintures | Artheca',
  description: 'Découvrez notre collection complète de peintures. Explorez les œuvres d\'artistes renommés, et plongez dans l\'univers de la peinture à travers les âges.',
}
