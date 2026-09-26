import TransitionLink from "@/_components/transitionLink";
import { allPaintings } from "@/lib/api";

const commitments = [
    {
        title: "Transmettre",
        text: "Chaque œuvre est accompagnée de son histoire, de son contexte et des techniques de l'artiste, pour que chacun puisse la comprendre, quel que soit son niveau de connaissance.",
    },
    {
        title: "Relier",
        text: "Un tableau ne naît jamais seul. Nous mettons en lumière les liens entre les artistes, les mouvements et les époques qui ont façonné l'histoire de la peinture.",
    },
    {
        title: "Ouvrir",
        text: "Pas de murs, pas d'horaires : la collection est accessible à tous, partout, pour flâner d'une salle à l'autre au gré de sa curiosité.",
    },
];

export default async function Page() {
    const paintings = await allPaintings();

    const movements = Object.values(
        paintings.reduce((acc, { movement, year }) => {
            acc[movement] ??= { name: movement, from: year, to: year, count: 0 };
            acc[movement].from = Math.min(acc[movement].from, year);
            acc[movement].to = Math.max(acc[movement].to, year);
            acc[movement].count++;
            return acc;
        }, {})
    ).sort((a, b) => a.from - b.from);

    const artistsCount = new Set(paintings.map((p) => p.artist)).size;

    return (
        <main>
            <section className="header-spacer container px-8 pt-48 pb-24">
                <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">À propos</p>
                <h1 className="text-8xl leading-none max-w-5xl">L'art qui traverse les siècles.</h1>
                <p className="font-rosarivo text-2xl leading-snug max-w-2xl pt-12">
                    Artheca est un musée en ligne qui réunit les chefs-d'œuvre ayant marqué l'histoire de la peinture, du XV<sup>e</sup> au XX<sup>e</sup> siècle.
                </p>
            </section>

            <figure className="container px-8">
                <img src="/paintings/CreationOfAdam.jpg" alt="La Création d'Adam, Michel-Ange" className="w-full h-[70vh] object-cover rounded-sm" />
                <figcaption className="pt-3 text-xs opacity-60">La Création d'Adam — Michel-Ange, vers 1512</figcaption>
            </figure>

            <section className="container px-8 py-32 flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
                <div className="flex-1 flex flex-col gap-8">
                    <h2 className="text-6xl leading-tight">Notre histoire</h2>
                    <p className="text-lg/relaxed opacity-80">
                        Artheca est né d'une conviction simple : les grandes œuvres n'appartiennent pas seulement aux salles des musées, elles appartiennent à tous ceux qui prennent le temps de les regarder.
                    </p>
                    <p className="text-lg/relaxed opacity-80">
                        Nous avons rassemblé {paintings.length} tableaux signés par {artistsCount} artistes, de Jan van Eyck à Edward Hopper. Chacun a été choisi pour ce qu'il raconte de son époque, et pour la trace qu'il a laissée dans celles qui ont suivi.
                    </p>
                </div>
                <figure className="flex-1">
                    <img src="/paintings/LaNascitaDiVenere.jpg" alt="La Naissance de Vénus, Sandro Botticelli" className="w-full h-auto rounded-sm" />
                    <figcaption className="pt-3 text-xs opacity-60">La Naissance de Vénus — Sandro Botticelli, vers 1485</figcaption>
                </figure>
            </section>

            <section className="container px-8 pb-32">
                <h2 className="text-6xl pb-12">Nos engagements</h2>
                <ol className="grid gap-12 lg:grid-cols-3">
                    {commitments.map((commitment, index) => (
                        <li key={commitment.title} className="flex flex-col gap-4 border-t border-(--hightlight-orange) pt-6">
                            <span className="font-rosarivo text-4xl text-(--hightlight-orange)">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="text-3xl">{commitment.title}</h3>
                            <p className="text-lg/relaxed opacity-80">{commitment.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="container px-8 pb-32">
                <div className="flex flex-col gap-4 pb-12 lg:flex-row lg:items-end lg:justify-between">
                    <h2 className="text-6xl">Un parcours à travers les mouvements</h2>
                    <p className="opacity-60">{movements.length} mouvements, dans l'ordre chronologique</p>
                </div>
                <ul>
                    {movements.map((movement) => (
                        <li key={movement.name} className="border-t border-(--hightlight-orange) last:border-b">
                            <TransitionLink
                                href={`/paintings?movement=${encodeURIComponent(movement.name)}`}
                                className="group grid grid-cols-[8rem_1fr_auto] items-baseline gap-8 py-4 transition-colors hover:text-(--hightlight-orange)"
                            >
                                <span className="text-sm opacity-60">
                                    {movement.from === movement.to ? movement.from : `${movement.from} – ${movement.to}`}
                                </span>
                                <span className="font-rosarivo text-3xl transition-transform duration-300 group-hover:translate-x-2">{movement.name}</span>
                                <span className="text-sm opacity-60">{movement.count} {movement.count > 1 ? "œuvres" : "œuvre"}</span>
                            </TransitionLink>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="relative overflow-hidden bg-(--secondary-bg) text-background">
                <img src="/paintings/Nighthawks.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                <div className="relative container px-8 py-32 flex flex-col items-center gap-8 text-center">
                    <h2 className="text-6xl max-w-3xl leading-tight">Prêt à pousser la porte ?</h2>
                    <p className="text-lg/relaxed opacity-80 max-w-xl">
                        Parcourez la collection à votre rythme, ou réservez votre visite pour découvrir les œuvres autrement.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        <TransitionLink href="/paintings" className="rounded-sm bg-background px-8 py-4 text-foreground transition-colors hover:bg-(--hightlight-orange) hover:text-background">
                            Explorer la collection
                        </TransitionLink>
                        <TransitionLink href="/tickets" className="rounded-sm border border-background px-8 py-4 transition-colors hover:border-(--hightlight-orange) hover:text-(--hightlight-orange)">
                            Billetterie
                        </TransitionLink>
                    </div>
                </div>
            </section>
        </main>
    );
}

export const metadata = {
  title: 'À propos | Artheca',
  description: 'Découvrez l\'histoire et la mission de notre musée, ainsi que les artistes et les mouvements qui ont façonné notre collection.',
}
