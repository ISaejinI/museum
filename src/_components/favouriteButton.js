"use client";

import { startTransition, useOptimistic, useState } from "react";
import { HeartIcon as HeartIconPlain } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { setFavouritePainting } from "@/lib/actions/favourites";

export default function FavouriteButton({ paintingId, initialFavourite }) {
    const [isFavourite, setIsFavourite] = useState(initialFavourite);
    const [optimisticFavourite, setOptimisticFavourite] = useOptimistic(isFavourite);

    function handleClick() {
        const next = !optimisticFavourite;

        startTransition(async () => {
            setOptimisticFavourite(next);
            try {
                await setFavouritePainting(paintingId, next);
                startTransition(() => setIsFavourite(next));
            } catch (error) {
                console.error("Impossible de mettre à jour les favoris :", error);
            }
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={optimisticFavourite}
            className={`group flex w-fit cursor-pointer items-center gap-3 border px-8 py-4 text-sm uppercase tracking-widest transition-colors ${
                optimisticFavourite
                    ? "border-(--hightlight-color) bg-(--hightlight-color) text-background hover:bg-transparent hover:text-(--hightlight-color)"
                    : "border-foreground hover:bg-foreground hover:text-background"
            }`}
        >
            {optimisticFavourite ? "Dans vos favoris" : "Ajouter aux favoris"}
            {optimisticFavourite
                ? <HeartIconPlain className="size-4" />
                : <HeartIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />}
        </button>
    )
}
