"use client";

import TransitionLink from "@/_components/transitionLink";

export default function PaintingCard({ painting }) {

    return (
        <div>
            <TransitionLink href={`/paintings/${painting.slug}`}>
                <h3>
                    {painting.title}
                </h3>
            </TransitionLink>
        </div>
    );
}