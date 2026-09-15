import Link from "next/link";
import { AllPaintings } from "@/_helpers/APIHelpers";
import PaintingsGrid from "@/_components/paintingsGrid";

export default async function Page() {
    const paintings = await AllPaintings();

    return (
        <main>
            <section>
                <h1>Toutes les peintures</h1>
                <PaintingsGrid paintings={paintings} />
            </section>
        </main>
    )
}