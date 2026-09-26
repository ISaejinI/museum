import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import TransitionLink from "@/_components/transitionLink";

export const metadata = {
    title: "Page introuvable | Artheca",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <main className="header-spacer container px-8 pt-48 pb-32">
            <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2 lg:gap-24">
                <section className="flex flex-col justify-center">

                   <div className="flex w-fit items-end pb-16">
                        <p className="font-rosarivo text-9xl leading-none pb-4">404</p>
                        <p className="w-full pt-3 text-center text-xs opacity-60 text-(--hightlight-orange)">salle introuvable</p>
                    </div>
                    
                    <h1 className="text-6xl leading-none pb-8 lg:text-8xl">
                        Cette page
                        <br />
                        <em>est introuvable</em>
                    </h1>
                    <p className="font-rosarivo text-2xl leading-snug max-w-lg pb-16">
                        Même Munch n'en revient pas. La page que vous cherchez a peut-être été décrochée des cimaises ou n'a jamais été exposée.
                    </p>

                    <TransitionLink
                        href="/"
                        className="group flex w-fit items-center gap-3 border border-foreground px-8 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
                    >
                        Revenir à l'accueil
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TransitionLink>
                </section>

                <aside className="flex flex-col rounded-sm bg-(--secondary-bg) p-4 text-background">
                    <div className="flex flex-1 flex-col items-center justify-center border border-(--hightlight-orange)/40 px-8 py-16">
                        <figure className="flex flex-col items-center">
                            <img
                                src="/paintings/TheScream.jpg"
                                alt="Le Cri, Edvard Munch"
                                className="max-h-144 w-auto shadow-[0_24px_40px_-12px_rgba(0,0,0,0.7)]"
                            />
                            <figcaption className="pt-6 text-center">
                                <p className="font-rosarivo text-lg">Le Cri</p>
                                <p className="text-xs opacity-60">Edvard Munch - 1893</p>
                            </figcaption>
                        </figure>
                    </div>
                </aside>
            </div>
        </main>
    )
}
