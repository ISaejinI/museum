"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const TICKETS = [
    { id: "adult", label: "Adulte", price: 24 },
    { id: "youth", label: "Jeune (12 – 25 ans)", price: 18, note: "Sur présentation d'un justificatif" },
    { id: "child", label: "Enfant (5 – 12 ans)", price: 12 },
    { id: "senior", label: "Senior", price: 18, note: "Sur présentation d'un justificatif" },
    { id: "jobseeker", label: "Personne en recherche d'emploi", price: 18, note: "Sur présentation d'un justificatif" },
    { id: "reduced-mobility", label: "Personne à mobilité réduite", price: 18, note: "Sur présentation d'un justificatif" },
    { id: "under-5", label: "Moins de 5 ans", price: 0 },
    { id: "group", label: "Groupe", price: 15, note: "À partir de 10 personnes, prix par personne", min: 10 },
];

const OPTIONS = [
    { id: "audioguide", label: "Audioguide", price: 2 },
    { id: "paper-guide", label: "Guide papier", price: 4 },
];

const formatPrice = (price) => (price === 0 ? "Gratuit" : `${price} €`);

function QuantityPicker({ label, value, onChange, min = 1, max = Infinity }) {
    const decrease = () => onChange(value <= min ? 0 : value - 1);
    const increase = () => onChange(value === 0 ? min : value + 1);

    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={decrease}
                disabled={value === 0}
                aria-label={`Retirer : ${label}`}
                className="flex size-10 items-center justify-center rounded-full border border-(--hightlight-orange) transition-colors hover:bg-(--hightlight-orange) hover:text-background disabled:pointer-events-none disabled:opacity-30"
            >
                <MinusIcon className="size-4" />
            </button>
            <span className="w-8 text-center font-rosarivo text-2xl" aria-live="polite">{value}</span>
            <button
                type="button"
                onClick={increase}
                disabled={value >= max}
                aria-label={`Ajouter : ${label}`}
                className="flex size-10 items-center justify-center rounded-full border border-(--hightlight-orange) transition-colors hover:bg-(--hightlight-orange) hover:text-background disabled:pointer-events-none disabled:opacity-30"
            >
                <PlusIcon className="size-4" />
            </button>
        </div>
    );
}

function PriceRow({ item, value, onChange, max }) {
    return (
        <li className="flex items-center justify-between gap-8 border-t border-(--hightlight-orange) py-6 last:border-b">
            <div>
                <p className="text-xl">{item.label}</p>
                {item.note && <p className="text-sm opacity-60">{item.note}</p>}
            </div>
            <div className="flex items-center gap-8">
                <span className="w-20 text-right font-rosarivo text-xl">{formatPrice(item.price)}</span>
                <QuantityPicker label={item.label} value={value} onChange={onChange} min={item.min} max={max} />
            </div>
        </li>
    );
}

export default function TicketBooking() {
    const [tickets, setTickets] = useState(() => Object.fromEntries(TICKETS.map((t) => [t.id, 0])));
    const [options, setOptions] = useState(() => Object.fromEntries(OPTIONS.map((o) => [o.id, 0])));

    const visitorsCount = Object.values(tickets).reduce((sum, qty) => sum + qty, 0);

    const updateTicket = (id, qty) => {
        const nextTickets = { ...tickets, [id]: qty };
        const nextVisitors = Object.values(nextTickets).reduce((sum, q) => sum + q, 0);

        setTickets(nextTickets);
        setOptions((current) => Object.fromEntries(Object.entries(current).map(([key, q]) => [key, Math.min(q, nextVisitors)])));
    };

    const lines = [
        ...TICKETS.map((t) => ({ ...t, qty: tickets[t.id] })),
        ...OPTIONS.map((o) => ({ ...o, qty: options[o.id] })),
    ].filter((line) => line.qty > 0);

    const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

    return (
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
            <div className="flex-1 flex flex-col gap-16">
                <section>
                    <h2 className="text-4xl pb-8">Billets</h2>
                    <ul>
                        {TICKETS.map((ticket) => (
                            <PriceRow key={ticket.id} item={ticket} value={tickets[ticket.id]} onChange={(qty) => updateTicket(ticket.id, qty)} />
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-4xl pb-2">Options</h2>
                    <p className="pb-8 opacity-60">Prix par personne, dans la limite du nombre de visiteurs.</p>
                    <ul>
                        {OPTIONS.map((option) => (
                            <PriceRow
                                key={option.id}
                                item={option}
                                value={options[option.id]}
                                onChange={(qty) => setOptions({ ...options, [option.id]: qty })}
                                max={visitorsCount}
                            />
                        ))}
                    </ul>
                    <p className="pt-6 text-sm opacity-60">Le plan du musée est gratuit et vous sera remis à l'accueil.</p>
                </section>
            </div>

            {/* Récapitulatif */}
            <aside className="lg:sticky lg:top-32 lg:w-96 rounded-sm bg-(--secondary-bg) p-8 text-background">
                <h2 className="text-3xl pb-6">Total</h2>

                {lines.length === 0 ? (
                    <p className="opacity-60 pb-6">Ajoutez des billets pour commencer votre commande.</p>
                ) : (
                    <ul className="flex flex-col gap-3 pb-6">
                        {lines.map((line) => (
                            <li key={line.id} className="flex justify-between gap-4 text-sm">
                                <span>{line.qty} × {line.label}</span>
                                <span>{formatPrice(line.price * line.qty)}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-baseline justify-between border-t border-(--hightlight-orange) pt-6">
                    <span className="opacity-60">{visitorsCount} {visitorsCount > 1 ? "visiteurs" : "visiteur"}</span>
                    <span className="font-rosarivo text-5xl">{total} €</span>
                </div>

                <button
                    type="button"
                    disabled={visitorsCount === 0}
                    className="mt-8 w-full rounded-sm bg-background px-8 py-4 text-foreground transition-colors hover:bg-(--hightlight-orange) hover:text-background disabled:pointer-events-none disabled:opacity-30"
                >
                    Valider ma commande
                </button>
            </aside>
        </div>
    );
}
