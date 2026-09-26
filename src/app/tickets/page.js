import TicketBooking from "@/_components/ticketBooking";

export default function Page () {
    return (
        <main className="header-spacer container px-8 pt-48 pb-32">
            <p className="text-xs uppercase tracking-widest text-(--hightlight-orange) pb-8">Billetterie</p>
            <h1 className="text-8xl leading-none pb-8">Réservez votre visite</h1>
            <p className="font-rosarivo text-2xl leading-snug max-w-2xl pb-24">
                Choisissez vos billets et vos options, le total se met à jour automatiquement.
            </p>

            <TicketBooking />
        </main>
    );
}

export const metadata = {
  title: 'Billets | Artheca',
  description: 'Commandez vos billets pour visiter notre musée et découvrir l\'art et la culture.',
}
