export default function Loading() {
    return (
        <main className="header-spacer container flex min-h-screen flex-col items-center justify-center gap-12 px-8">
            <div className="relative h-40 w-28 bg-foreground/10 mask-[url(/jar_mask.svg)] mask-contain mask-no-repeat mask-center" aria-hidden="true">
                <div className="animate-jar-fill absolute inset-x-0 bottom-0 bg-(--hightlight-orange)" />
            </div>

            <div role="status" className="flex flex-col items-center text-center">
                <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-4">Chargement</p>
                <p className="font-rosarivo text-4xl">
                    Préparation <em>de la salle</em>…
                </p>
            </div>
        </main>
    )
}
