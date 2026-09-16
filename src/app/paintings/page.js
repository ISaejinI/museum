import { AllPaintings } from "@/_helpers/APIHelpers";
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