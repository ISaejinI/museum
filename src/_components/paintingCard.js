"use client";

import TransitionLink from "@/_components/transitionLink";

export default function PaintingCard({ painting, index, centerIndex, imageClassName }) {
    const imageSize = imageClassName ?? (index === centerIndex ? "h-96" : "h-64");

    return (
        <TransitionLink href={`/paintings/${painting.slug}`} className="group block">
            <img
                src={painting.image}
                alt={painting.title}
                className={`${imageSize} w-auto shadow-[0_24px_40px_-12px_rgba(21,12,12,0.45)] transition-transform duration-500 group-hover:-translate-y-2`}
            />
            <p className="mt-6 text-sm font-bold">{painting.title}</p>
            <p className="text-sm opacity-60">{painting.artist}, {painting.year}.</p>
        </TransitionLink>
    );
}