"use client";

import { useQueryState } from "nuqs";
import { useMemo } from "react";

import PaintingCard from "./paintingCard";

export default function PaintingsGrid({ paintings }) {
    const [type, setType] = useQueryState("type");
    const [movement, setMovement] = useQueryState("movement");

    const types = useMemo(() => [...new Set(paintings.map((p) => p.type))], [paintings]);
    const movements = useMemo(() => [...new Set(paintings.map((p) => p.movement))], [paintings]);

    const filters = useMemo(() => [
        { name: "Type", options: types },
        { name: "Mouvement", options: movements }
    ], [types, movements]);

    const filteredPaintings = useMemo(
        () => paintings.filter((painting) =>
            (!type || painting.type === type) &&
            (!movement || painting.movement === movement)
        ),
        [paintings, type, movement]
    );

    return (
        <section>
            <div>
                <h2>Filtres</h2>
                {filters.map((filter) => (
                    <div key={filter.name}>
                        <h3>{filter.name}</h3>
                        <ul>
                            <li>
                                <button
                                    onClick={() => {filter.name == "Type" ? setType('') : setMovement('')}}
                                    className="cursor-pointer hover:underline"
                                >
                                    Tous les {filter.name.toLowerCase()}
                                </button>
                            </li>
                            {filter.options.map((option) => (
                                <li key={option}>
                                    <button
                                        onClick={() => {filter.name == "Type" ? setType(option) : setMovement(option)}}
                                        className="cursor-pointer hover:underline"
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
                {filteredPaintings.map((painting) => (
                    <PaintingCard key={painting.id} painting={painting} />
                ))}
            </div>
        </section>
    );
}