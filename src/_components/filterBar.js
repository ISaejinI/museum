"use client";

import { useQueryState } from "nuqs";

export default function FilterBar({ filters }) {
    const [type, setType] = useQueryState("type");

    return (
        <div>
            <h2>Filtres</h2>
            {filters.map((filter) => (
                <div key={filter.name}>
                    <h3>{filter.name}</h3>
                    <ul>
                        <li>
                            <button
                                onClick={() => setType("")}
                            >
                                Tous les {filter.name.toLowerCase()}
                            </button>
                        </li>
                        {filter.options.map((option) => (
                            <li key={option}>
                                <button
                                    onClick={() => setType(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}