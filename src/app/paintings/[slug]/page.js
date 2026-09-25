import { singlePainting } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function singlePaintingPage({ params }) {
    const { slug } = await params;
    const painting = await singlePainting(slug);

    if (!painting)  notFound();

    return (
        <>
            <section className="hero-painting">
                <img src={painting.image} alt={painting.title} />
                <h1>{painting.title}</h1>
            </section>
            <section className="painting-details">
                <div dangerouslySetInnerHTML={{ __html: painting.description }}></div>
            </section>

            <p>{painting.year}</p>
            <p>{painting.type}</p>
            {painting.gallery.map((galleryItem, index) => (
                <img key={index} src={galleryItem.image} alt="" />
            ))}
            <p>{painting.artist}</p>
            <p>{painting.location}</p>
            <p>{painting.locationLink}</p>
            <p>{painting.movement}</p>
            <p>{painting.color}</p>
        </>
    )
}