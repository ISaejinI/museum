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
                // useOptimistic revient automatiquement à l'état précédent
                console.error("Impossible de mettre à jour les favoris :", error);
            }
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={optimisticFavourite}
            aria-label={optimisticFavourite ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="cursor-pointer"
        >
            {optimisticFavourite
                ? <HeartIconPlain className="w-6 h-6" />
                : <HeartIcon className="w-6 h-6" />}
        </button>
    )
}
