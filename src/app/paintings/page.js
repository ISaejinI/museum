import Link from "next/link";
import { AllPaintings } from "@/_helpers/APIHelpers";
import { Filters, FilteredPaintings } from "@/_helpers/FilterHelpers";
import FilterBar from "@/_components/filterBar";
import PaintingsGrid from "@/_components/paintingsGrid";

export default async function Page() {
    const paintings = await AllPaintings();

    return (
        <main>
            <section>
                <h1>Toutes les peintures</h1>
                <FilterBar filters={await Filters(paintings)} />
                <PaintingsGrid paintings={paintings} />
                {paintings.map((painting) => (
                    <ul key={painting.id} className="grid grid-cols-3 gap-4">
                        <li>
                            <Link href={`/paintings/${painting.id}`}>
                                <h2>{painting.title}</h2>
                            </Link>
                        </li>
                    </ul>
                ))}
            </section>
        </main>
    )
}