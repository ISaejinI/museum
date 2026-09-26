"use client";

import { HeartIcon as HeartIconPlain } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function FavouriteButton({  }) {


    return (
        <button >
            <HeartIcon className="w-6 h-6" />
            <HeartIconPlain className="w-6 h-6" />
        </button>
    )
}

