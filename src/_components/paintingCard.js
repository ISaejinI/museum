"use client";

export default function PaintingCard({ painting }) {

    return (
        <div>
            <a href={`/paintings/${painting.slug}`}>
                <h3>
                    {painting.title}
                </h3>
            </a>
        </div>
    );
}