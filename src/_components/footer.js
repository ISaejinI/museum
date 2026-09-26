import TransitionLink from "@/_components/transitionLink";

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/paintings", label: "Peintures" },
    { href: "/about", label: "À propos" },
    { href: "/tickets", label: "Billetterie" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-(--hightlight-color) px-16 pt-16 pb-8 text-foreground">
            <div className="flex flex-col gap-12 lg:flex-row lg:justify-between container">
                <div className="flex flex-col gap-4 max-w-md">
                    <img src="/logo.png" alt="Logo" className="w-fit" />
                    <p className="font-rosarivo text-3xl leading-snug">
                        L'art qui traverse les siècles.
                    </p>
                </div>

                <nav aria-label="Navigation du pied de page">
                    <h2 className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-4">Navigation</h2>
                    <ul className="flex flex-col gap-2 font-rosarivo text-xl">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <TransitionLink href={link.href} className="hover:text-(--hightlight-orange) transition-colors">
                                    {link.label}
                                </TransitionLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h2 className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-4">Horaires</h2>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li>Mardi – Dimanche : 10h – 18h</li>
                        <li>Nocturne le jeudi : jusqu'à 21h</li>
                        <li>Fermé le lundi</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-4">Contact</h2>
                    <address className="flex flex-col gap-2 text-sm not-italic">
                        <span>12 rue des Beaux-Arts</span>
                        <span>75006 Paris</span>
                        <TransitionLink href="mailto:contact@artheca.fr" className="hover:text-(--hightlight-orange) transition-colors">
                            contact@artheca.fr
                        </TransitionLink>
                    </address>
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-16 text-xs opacity-60 lg:flex-row lg:justify-between container">
                <p>© {year} Artheca. Tous droits réservés.</p>
                <TransitionLink href="/legal" className="hover:opacity-100">Mentions légales</TransitionLink>
            </div>
        </footer>
    )
}
