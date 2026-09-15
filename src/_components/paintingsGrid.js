import { useMemo } from "react";

import { Filters } from "@/_helpers/FilterHelpers";
import FilterBar from "@/_components/filterBar";

export default function PaintingsGrid({ paintings }) {
    const filters = useMemo(() => {
        return Filters(paintings);
    }, [paintings]);

    return (
        <section className="">
            <FilterBar filters={filters} />

        </section>
    )
}