export default function MuseumBench() {
    return (
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
    )
}
