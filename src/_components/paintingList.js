import MuseumBench from "./museumBench";
import PaintingCard from "./paintingCard";

export default function PaintingList({ paintings }) {

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-background to-[#E9E5C3]">
            <ul className="relative z-10 grid grid-cols-1 gap-x-24 gap-y-24 px-8 pt-24 pb-32 container md:grid-cols-2 xl:grid-cols-3">
                {paintings.map((painting) => (
                    <li
                        key={painting.slug}
                        className="flex justify-center md:even:translate-y-32 xl:even:translate-y-0 xl:nth-[3n+2]:translate-y-32"
                    >
                        <PaintingCard painting={painting} imageClassName="max-h-96 max-w-full" />
                    </li>
                ))}
            </ul>

            <MuseumBench />
        </div>
    )
}
