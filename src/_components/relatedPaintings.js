export default function RelatedPaintings({ relatedPaintings }) {
    const centerIndex = Math.floor(relatedPaintings.length / 2);

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-background to-[#E9E5C3]">
            <ul className="relative z-10 flex items-center justify-center gap-24 px-8 pt-24 container">
                {relatedPaintings.map((painting, index) => (
                    <li key={painting.slug}>
                        <a href={`/paintings/${painting.slug}`} className="group block">
                            <img
                                src={painting.image}
                                alt={painting.title}
                                className={`${index === centerIndex ? "h-96" : "h-64"} w-auto shadow-[0_24px_40px_-12px_rgba(21,12,12,0.45)] transition-transform duration-500 group-hover:-translate-y-2`}
                            />
                            <p className="mt-6 text-sm font-bold">{painting.title}</p>
                            <p className="text-sm opacity-60">{painting.artist}, {painting.year}.</p>
                        </a>
                    </li>
                ))}
            </ul>

            <div className="relative h-80">
                <div className="absolute inset-x-0 bottom-0 h-48 border-t border-[#D9D4AE] bg-linear-to-b from-[#DDD8B4] to-background" />
                <div className="absolute bottom-8 left-1/2 h-6 w-[min(44rem,55%)] -translate-x-1/2 rounded-[50%] bg-black/25 blur-xl" />
                <img
                    src="/assets/museum_bench.png"
                    alt=""
                    className="absolute bottom-10 left-1/2 w-[min(40rem,50%)] -translate-x-1/2"
                />
            </div>
        </div>
    )
}
