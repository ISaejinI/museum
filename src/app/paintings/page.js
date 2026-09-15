import Link from "next/link";
import { AllPaintings } from "../_helpers/APIHelpers";
import { Filters } from "../_helpers/FilterHelpers";
import FilterBar from "@/_components/filterBar";

export default async function Page() {
    const paintings = await AllPaintings();

    return (
        <main>
            <section>
                <h1>Toutes les peintures</h1>
                <FilterBar filters={await Filters()} />
                {paintings.map((painting) => (
                    <ul key={painting.id}>
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