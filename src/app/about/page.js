import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import MuseumBench from "@/_components/museumBench";
import TextReveal from "@/_components/textReveal";
import TransitionLink from "@/_components/transitionLink";
import { allPaintings } from "@/lib/api";

const ROMAN_CENTURIES = { 15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI" };

const VALUES = [
    {
        title: "Transmettre",
        text: "Rendre les chefs-d'œuvre accessibles à toutes et à tous, où que vous soyez, sans rien perdre de leur richesse.",
    },
    {
        title: "Contextualiser",
        text: "Raconter l'histoire derrière chaque toile : son époque, son artiste, et les détails qui la rendent unique.",
    },
    {
        title: "Émerveiller",
        text: "Inviter à la flânerie, de salle en salle, pour laisser place à la surprise et à la contemplation.",
    },
];

const OPENING_HOURS = [
    { days: "Mardi – Dimanche", hours: "10h – 18h" },
    { days: "Nocturne le jeudi", hours: "jusqu'à 21h" },
    { days: "Lundi", hours: "Fermé" },
];

// Regroupe les mouvements par siècle, du plus ancien au plus récent
function movementsTimeline(paintings) {
    const movements = new Map();

    for (const painting of paintings) {
        const movement = movements.get(painting.movement) ?? { name: painting.movement, year: painting.year, artists: new Set(), count: 0 };
        movement.year = Math.min(movement.year, painting.year);
        movement.artists.add(painting.artist);
        movement.count++;
        movements.set(painting.movement, movement);
    }

    const centuries = new Map();

    for (const movement of [...movements.values()].sort((a, b) => a.year - b.year)) {
        const century = Math.ceil(movement.year / 100);
        centuries.set(century, [...(centuries.get(century) ?? []), { ...movement, artists: [...movement.artists] }]);
    }

    return [...centuries.entries()].map(([century, list]) => ({ century, label: ROMAN_CENTURIES[century] ?? century, movements: list }));
}

export default async function Page() {
    const paintings = await allPaintings();
    const timeline = movementsTimeline(paintings);

    const stats = [
        { label: "Œuvres", value: paintings.length },
        { label: "Artistes", value: new Set(paintings.map((p) => p.artist)).size },
        { label: "Mouvements", value: timeline.reduce((sum, century) => sum + century.movements.length, 0) },
        { label: "Siècles d'art", value: timeline.length },
    ];

    return (
        <main>
            {/* Introduction */}
            <section className="header-spacer container grid grid-cols-1 items-center gap-16 px-8 pt-48 pb-32 lg:grid-cols-2 lg:gap-24">
                <div>
                    <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">À propos</p>
                    <TextReveal as="h1" onScroll={false} className="text-6xl leading-[1.1] pb-8 lg:text-8xl">
                        Un musée
                        <br />
                        <em>sans murs</em>
                    </TextReveal>
                    <p className="font-rosarivo text-2xl leading-snug max-w-xl pb-16">
                        Artheca est né d'une envie simple : réunir en un seul lieu, ouvert à toutes et à tous, les œuvres qui ont façonné l'histoire de la peinture.
                    </p>

                    <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col-reverse items-center text-center">
                                <dt className="pt-3 text-xs uppercase tracking-widest opacity-60">{stat.label}</dt>
                                <dd className="w-full border-b border-(--hightlight-orange) pb-3 font-rosarivo text-5xl">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <figure className="flex flex-col items-center">
                    <img
                        src="/paintings/LaNascitaDiVenere.jpg"
                        alt="La Naissance de Vénus, Sandro Botticelli"
                        className="h-[60vh] w-full object-cover mask-[url(/jar_mask.svg)] mask-contain mask-no-repeat mask-center lg:h-[75vh]"
                    />
                    <figcaption className="pt-6 text-center">
                        <p className="font-rosarivo text-lg">La Naissance de Vénus</p>
                        <p className="text-xs opacity-60">Sandro Botticelli - 1485</p>
                    </figcaption>
                </figure>
            </section>

            {/* Manifeste */}
            <section className="container px-8 pb-32">
                <div className="mx-auto max-w-5xl border-y border-(--hightlight-orange) py-24 text-center">
                    <TextReveal as="blockquote" stagger={0.08} className="font-rosarivo text-4xl leading-snug lg:text-5xl">
                        « Une œuvre ne se regarde jamais seule : elle dialogue avec son époque, avec ses voisines de salle, <em>et avec vous.</em> »
                    </TextReveal>
                    <p className="pt-10 text-xs uppercase tracking-widest opacity-60">L'équipe Artheca</p>
                </div>
            </section>

            {/* Mission */}
            <section className="container grid grid-cols-1 items-center gap-16 px-8 pb-32 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                    <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">Notre mission</p>
                    <TextReveal as="h2" className="text-6xl leading-[1.1] pb-16">
                        Faire vivre
                        <br />
                        <em>la peinture</em>
                    </TextReveal>

                    <ol className="flex flex-col">
                        {VALUES.map((value, index) => (
                            <li key={value.title} className="grid grid-cols-[4rem_1fr] gap-6 border-t border-(--hightlight-orange) py-8 last:border-b sm:grid-cols-[5rem_15rem_1fr]">
                                <span className="font-rosarivo text-4xl text-(--hightlight-orange)">{String(index + 1).padStart(2, "0")}</span>
                                <h3 className="text-3xl">{value.title}</h3>
                                <p className="col-start-2 opacity-80 sm:col-start-3">{value.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex justify-center lg:col-span-4 lg:col-start-9">
                    <img src="/assets/diane_draw.png" alt="" className="h-[50vh] w-auto lg:h-[70vh]" />
                </div>
            </section>

            {/* Frise des siècles */}
            <section className="bg-(--secondary-bg) py-32 text-background" data-header-theme="dark">
                <div className="container px-8">
                    <div className="flex flex-col gap-8 pb-24 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">La collection</p>
                            <TextReveal as="h2" className="text-6xl leading-[1.1] lg:text-8xl">
                                {timeline.length} siècles
                                <br />
                                <em>de peinture</em>
                            </TextReveal>
                        </div>
                        <p className="font-rosarivo text-2xl leading-snug max-w-md opacity-80">
                            Des primitifs flamands au réalisme américain, parcourez les mouvements réunis dans nos salles.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {timeline.map((century) => (
                            <div key={century.century} className="grid grid-cols-1 gap-6 border-t border-background/20 py-10 lg:grid-cols-12 lg:gap-8">
                                <p className="font-rosarivo text-6xl text-(--hightlight-orange) lg:col-span-3">
                                    {century.label}<sup className="text-2xl">e</sup>
                                    <span className="block pt-2 text-xs uppercase tracking-widest text-background opacity-60">siècle</span>
                                </p>
                                <ul className="flex flex-col lg:col-span-9">
                                    {century.movements.map((movement) => (
                                        <li key={movement.name}>
                                            <TransitionLink
                                                href={`/paintings?movement=${encodeURIComponent(movement.name)}`}
                                                className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-4 border-b border-background/10 py-4 transition-colors hover:text-(--hightlight-orange) sm:grid-cols-[5rem_1fr_1fr_auto]"
                                            >
                                                <span className="font-rosarivo text-lg opacity-60">{movement.year}</span>
                                                <span className="font-rosarivo text-2xl">{movement.name}</span>
                                                <span className="hidden text-sm opacity-60 sm:block">{movement.artists.join(", ")}</span>
                                                <span className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">
                                                    {movement.count} {movement.count > 1 ? "œuvres" : "œuvre"}
                                                    <ArrowUpRightIcon className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </span>
                                            </TransitionLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visiter */}
            <section className="container grid grid-cols-1 items-stretch gap-16 px-8 py-32 lg:grid-cols-2 lg:gap-24">
                <aside className="flex flex-col rounded-sm bg-(--secondary-bg) p-4 text-background">
                    <div className="flex flex-1 flex-col items-center justify-center border border-(--hightlight-orange)/40 px-8 py-16">
                        <figure className="flex flex-col items-center">
                            <img
                                src="/paintings/Nighthawks.jpg"
                                alt="Nighthawks, Edward Hopper"
                                className="max-h-112 w-auto shadow-[0_24px_40px_-12px_rgba(0,0,0,0.7)]"
                            />
                            <figcaption className="pt-6 text-center">
                                <p className="font-rosarivo text-lg">Nighthawks</p>
                                <p className="text-xs opacity-60">Edward Hopper - 1942</p>
                            </figcaption>
                        </figure>
                    </div>
                </aside>

                <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">Visiter</p>
                    <TextReveal as="h2" className="text-6xl leading-[1.1] pb-8">
                        Préparer
                        <br />
                        <em>votre visite</em>
                    </TextReveal>
                    <p className="font-rosarivo text-2xl leading-snug max-w-lg pb-12">
                        Nos nocturnes du jeudi sont l'occasion idéale pour découvrir la collection sous un autre jour.
                    </p>

                    <table className="w-full max-w-lg">
                        <tbody className="text-left">
                            {OPENING_HOURS.map((row) => (
                                <tr key={row.days} className="border-t border-(--hightlight-orange)">
                                    <th className="py-4 pr-4 text-xs font-normal uppercase tracking-widest opacity-60">{row.days}</th>
                                    <td className="py-4 text-right font-rosarivo text-lg">{row.hours}</td>
                                </tr>
                            ))}
                            <tr className="border-y border-(--hightlight-orange)">
                                <th className="py-4 pr-4 text-xs font-normal uppercase tracking-widest opacity-60">Adresse</th>
                                <td className="py-4 text-right font-rosarivo text-lg">12 rue des Beaux-Arts, 75006 Paris</td>
                            </tr>
                        </tbody>
                    </table>

                    <TransitionLink
                        href="/tickets"
                        className="group mt-12 flex w-fit items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
                    >
                        Réserver vos billets
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TransitionLink>
                </div>
            </section>

            {/* Invitation finale */}
            <section className="bg-linear-to-b from-background to-[#E9E5C3]">
                <div className="container flex flex-col items-center px-8 pt-16 text-center">
                    <TextReveal as="h2" className="text-6xl leading-[1.1] pb-10 lg:text-7xl">
                        Prenez le temps
                        <br />
                        <em>de contempler</em>
                    </TextReveal>
                    <TransitionLink
                        href="/paintings"
                        className="group flex w-fit items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
                    >
                        Explorer la collection
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TransitionLink>
                </div>
                <MuseumBench />
            </section>
        </main>
    );
}

export const metadata = {
  title: 'À propos | Artheca',
  description: 'Découvrez l\'histoire et la mission de notre musée, ainsi que les artistes et les mouvements qui ont façonné notre collection.',
}
