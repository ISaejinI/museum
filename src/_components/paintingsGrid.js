"use client";

import { useQueryState } from "nuqs";
import { useMemo } from "react";

import PaintingList from "./paintingList";

const TYPE_LABELS = {
    "painting": "Peinture",
    "woodblock print": "Estampe",
    "fresco": "Fresque",
    "triptych": "Triptyque",
    "mural": "Peinture murale",
};

function FilterChip({ isActive, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors ${
                isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 hover:border-(--hightlight-orange) hover:text-(--hightlight-orange)"
            }`}
        >
            {children}
        </button>
    );
}

export default function PaintingsGrid({ paintings }) {
    const [type, setType] = useQueryState("type");
    const [movement, setMovement] = useQueryState("movement");

    const types = useMemo(() => [...new Set(paintings.map((p) => p.type))], [paintings]);
    const movements = useMemo(() => [...new Set(paintings.map((p) => p.movement))].sort((a, b) => a.localeCompare(b, "fr")), [paintings]);

    const filters = [
        { name: "Type", value: type, setValue: setType, options: types, label: (option) => TYPE_LABELS[option] ?? option, allLabel: "Tous les types" },
        { name: "Mouvement", value: movement, setValue: setMovement, options: movements, label: (option) => option, allLabel: "Tous les mouvements" },
    ];

    const filteredPaintings = useMemo(
        () => paintings.filter((painting) =>
            (!type || painting.type === type) &&
            (!movement || painting.movement === movement)
        ),
        [paintings, type, movement]
    );

    const hasFilters = Boolean(type || movement);

    function resetFilters() {
        setType(null);
        setMovement(null);
    }

    return (
        <section>
            <div className="container px-8 pb-8">
                <h2 className="sr-only">Filtres</h2>
                <div className="flex flex-col">
                    {filters.map((filter) => (
                        <div key={filter.name} className="flex flex-col gap-4 border-t border-(--hightlight-orange) py-6 lg:flex-row lg:gap-8">
                            <h3 className="w-40 shrink-0 pt-1.5 text-xs uppercase tracking-widest text-(--hightlight-orange)">{filter.name}</h3>
                            <ul className="-mx-8 flex gap-2 overflow-x-auto px-8 pb-2 scrollbar-none lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 [&>li]:shrink-0">
                                <li>
                                    <FilterChip isActive={!filter.value} onClick={() => filter.setValue(null)}>
                                        {filter.allLabel}
                                    </FilterChip>
                                </li>
                                {filter.options.map((option) => (
                                    <li key={option}>
                                        <FilterChip isActive={filter.value === option} onClick={() => filter.setValue(option)}>
                                            {filter.label(option)}
                                        </FilterChip>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-(--hightlight-orange) pt-6 text-sm">
                    <p aria-live="polite">
                        <span className="font-rosarivo text-2xl">{filteredPaintings.length}</span>{" "}
                        <span className="opacity-60">{filteredPaintings.length > 1 ? "œuvres" : "œuvre"}</span>
                    </p>
                    {hasFilters && (
                        <button type="button" onClick={resetFilters} className="cursor-pointer uppercase tracking-widest text-(--hightlight-orange) hover:underline">
                            Réinitialiser les filtres
                        </button>
                    )}
                </div>
            </div>

            {filteredPaintings.length > 0 ? (
                <PaintingList paintings={filteredPaintings} />
            ) : (
                <div className="container px-8 py-32 text-center">
                    <p className="font-rosarivo text-4xl pb-4">Aucune œuvre <em>dans cette salle</em></p>
                    <p className="opacity-60">Essayez une autre combinaison de filtres.</p>
                </div>
            )}
        </section>
    );
}
