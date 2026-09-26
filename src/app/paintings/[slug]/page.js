import RelatedPaintings from "@/_components/relatedPaintings";
import { singlePainting, allPaintings, relatedPaintings } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function singlePaintingPage({ params }) {
    const { slug } = await params;
    const painting = await singlePainting(slug);
    
    if (!painting)  notFound();

    const allPaintingsList = await allPaintings();
    const relatedPaintingsList = relatedPaintings(allPaintingsList, painting);

    //Image descend un peu quand on scroll - passer de -mb-16 à -mb-32

    //à l'arrivée sur la page, image opacity 0 et clip-path où on ne la voit pas, puis le clip-path remonte vers le haut pour la faire apparaitre en entier en même temps que l'opacité passe à 1,et le texte apparait en fade-in. Ensuite, quand on scroll, l'image descend un peu et le texte reste fixe

    // faire un composant d'animation de text reveal

    return (
        <>
            <section className="hero-painting header-spacer h-screen flex flex-col items-center justify-end gap-8 pb-16">
                <img className="w-auto h-full /*-mb-12 rounded-sm" src={painting.image} alt={painting.title} />
                <h1 className="z-10 text-9xl font-bold text-[#212121] uppercase container text-center"> {painting.title}</h1>
            </section>
            <section className="painting-details container flex flex-col-reverse gap-16 mb-24">
                <div dangerouslySetInnerHTML={{ __html: painting.description }} className="w-2/3 text-xl/[1.5]"></div>
                <div>
                    <h2 className="text-6xl pb-12">Informations</h2>
                    <table className="painting-info-table">
                        <tbody className="text-left">
                            <tr className="border-t border-(--hightlight-orange)">
                                <th className="w-64 pl-4 py-2">Titre</th>
                                <td className="w-64">{painting.title}</td>
                            </tr>
                            <tr className="border-t border-(--hightlight-orange)">
                                <th className="w-64 pl-4 py-2">Artiste</th>
                                <td>{painting.artist}</td>
                            </tr>
                            <tr className="border-t border-(--hightlight-orange)">
                                <th className="w-64 pl-4 py-2">Année</th>
                                <td>{painting.year}</td>
                            </tr>
                            <tr className="border-t border-(--hightlight-orange)">
                                <th className="w-64 pl-4 py-2">Mouvement</th>
                                <td><a href={`/paintings?movement=${encodeURIComponent(painting.movement)}`}>{painting.movement}</a></td>
                            </tr>
                            <tr className="border-y border-(--hightlight-orange)">
                                <th className="pl-4 py-2">Lieu d'exposition</th>
                                <td><a href={painting.locationLink} target="_blank" rel="noopener noreferrer">{painting.location}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="painting-gallery container ">
                <h2 className="text-6xl pb-12">En détail</h2>
                <div className="grid grid-cols-2 gap-16">
                    {painting.gallery.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt=""
                            className="w-full h-auto rounded-sm"
                            style={{ gridColumn: (index % 2) + 1, gridRow: `${index + 1} / span 2` }}
                        />
                    ))}
                </div>
            </section>
            <section className="related-paintings container mb-24">
                <RelatedPaintings relatedPaintings={relatedPaintingsList} />
            </section>
        </>
    )
}

export async function generateMetadata({ params}) {
    const { slug } = await params;
    const painting = await singlePainting(slug);
    
    if (!painting) {
        return {
            title: "Painting Not Found",
            description: "The requested painting was not found."
        };
    }

    return {
        title: `${painting.title} | Artheca`,
        description: `${painting.title} - ${painting.artist} (${painting.year})`
    }
}