import PaintingCard from "./paintingCard";

export default function PaintingList({ paintings }) {

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-background to-[#E9E5C3]">
            <ul className="relative z-10 grid grid-cols-2 gap-24 px-8 pt-24 container">
                {paintings.map((painting, index) => (
                    <li
                        key={painting.slug}
                        className="flex justify-center"
                        style={{ gridColumn: (index % 2) + 1, gridRow: `${index + 1} / span 2` }}
                    >
                        <PaintingCard painting={painting} imageClassName="h-96" />
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
