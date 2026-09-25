"use client";

import { singlePainting } from "@/lib/api";

export default function singlePainting() {
    const { slug } = useParams();

    const painting = singlePainting(slug);

    return (
        <>
            <section>
                <h1>{painting.title}</h1>
            </section>
        </>
    )
}