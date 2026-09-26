import { AllPaintings } from "@/lib/api";
import PaintingsGrid from "@/_components/paintingsGrid";
import SearchBar from "@/_components/searchBar";

export default async function Page() {
    const paintings = await AllPaintings();

    return (
        <main>
            <section>
                <SearchBar paintings={paintings} />
                <h1>Toutes les peintures</h1>
                <PaintingsGrid paintings={paintings} />
            </section>
        </main>
    )
}

export const metadata = {
  title: 'Toutes les peintures | Artheca',
  description: 'Découvrez notre collection complète de peintures. Explorez les œuvres d\'artistes renommés, et plongez dans l\'univers de la peinture à travers les âges.',
}