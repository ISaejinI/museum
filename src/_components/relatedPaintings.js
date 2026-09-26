import MuseumBench from "./museumBench";
import PaintingCard from "./paintingCard";

export default function RelatedPaintings({ relatedPaintings }) {
    const centerIndex = Math.floor(relatedPaintings.length / 2);

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-background to-[#E9E5C3]">
            <ul className="relative z-10 flex items-center justify-center gap-24 px-8 pt-24 container">
                {relatedPaintings.map((painting, index) => (
                    <li key={painting.slug}>
                        <PaintingCard painting={painting} index={index} centerIndex={centerIndex} />
                    </li>
                ))}
            </ul>

            <MuseumBench />
        </div>
    )
}
