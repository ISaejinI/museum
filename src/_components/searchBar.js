"use client";

import { useMemo, useState } from "react";
import { ArrowUpRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchableString } from "@/_helpers/NormalizeStringsHelpers";
import TransitionLink from "@/_components/transitionLink";

const MIN_LENGTH = 3;
const MAX_RESULTS = 6;

export default function SearchBar({ paintings }) {
    const [searchString, setSearchString] = useState("");

    const foundPaintings = useMemo(() => {
        if (searchString.length < MIN_LENGTH) return [];

        return paintings.filter((painting) =>
            searchableString(painting.title ?? "").includes(searchString) ||
            searchableString(painting.artist ?? "").includes(searchString)
        );
    }, [searchString, paintings]);

    const isSearching = searchString.length >= MIN_LENGTH;

    return (
        <div className="relative w-full lg:w-96">
            <label className="flex flex-col gap-2">
                {/* <span className="text-xs uppercase tracking-widest text-(--hightlight-orange)">Rechercher une œuvre</span> */}
                <span className="flex items-center gap-3 border-b border-foreground/30 transition-colors focus-within:border-(--hightlight-orange)">
                    <MagnifyingGlassIcon className="size-5 opacity-60" />
                    <input
                        type="search"
                        placeholder="Titre ou artiste"
                        onChange={(e) => setSearchString(searchableString(e.target.value))}
                        onKeyDown={(e) => { if (e.key === "Escape") { e.currentTarget.value = ""; setSearchString(""); } }}
                        className="w-full bg-transparent py-3 font-rosarivo text-xl outline-none placeholder:text-foreground/30"
                    />
                </span>
            </label>

            {isSearching && (
                <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-sm bg-(--secondary-bg) p-2 text-background shadow-[0_24px_40px_-12px_rgba(21,12,12,0.45)]">
                    {foundPaintings.length > 0 ? (
                        <ul>
                            {foundPaintings.slice(0, MAX_RESULTS).map((painting) => (
                                <li key={painting.id}>
                                    <TransitionLink
                                        href={`/paintings/${painting.slug}`}
                                        className="group flex items-center gap-4 rounded-sm p-2 transition-colors hover:bg-background/10"
                                    >
                                        <img src={painting.image} alt="" className="size-12 shrink-0 object-cover" />
                                        <span className="flex-1">
                                            <span className="block font-rosarivo">{painting.title}</span>
                                            <span className="block text-xs opacity-60">{painting.artist}, {painting.year}</span>
                                        </span>
                                        <ArrowUpRightIcon className="size-4 text-(--hightlight-orange) opacity-0 transition-opacity group-hover:opacity-100" />
                                    </TransitionLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-sm opacity-80">Aucune œuvre ne correspond à votre recherche.</p>
                    )}
                </div>
            )}
        </div>
    )
}
