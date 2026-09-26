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

            {/* Banc */}
            <div className="relative h-96" aria-hidden="true">
                <div className="absolute inset-x-0 bottom-0 h-56 border-t border-[#D9D4AE] bg-linear-to-b from-[#DDD8B4] to-background" />
                <div className="absolute bottom-56 inset-x-0 h-8 bg-linear-to-t from-[#D9D4AE]/50 to-transparent" />
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
