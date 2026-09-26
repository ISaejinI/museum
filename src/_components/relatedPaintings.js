"use client";

export default function RelatedPaintings({ relatedPaintings }) {
    const relatedPaintingsList = relatedPaintings

    return (
        <div className="">
            <ul>
                {relatedPaintingsList.map((painting) => (
                    <li key={painting.slug}>
                        <a href={`/paintings/${painting.slug}`}>
                            <img src={painting.image} alt={painting.title} className="w-auto h-80 rounded-sm" />
                            <p>{painting.title}</p>
                        </a>
                    </li>
                ))}
            </ul>
            <img src="/assets/museum_bench.png" alt="" className="" />
        </div>
    )
}