/*  */
function fixImageUrl(url) {
    if (!url?.includes('upload.wikimedia.org')) return url;

    return url.replace(/\/\d+px-/, '/1920px-');
}

export function normalizePainting(painting) {
    return {
        ...painting,
        image: fixImageUrl(painting.image),
        gallery: (painting.gallery ?? []).map(fixImageUrl),
    };
}

export async function AllPaintings() {
    const data = await fetch('https://api-museum.vercel.app/objects');
    const {objects} = await data.json();

    return (objects.map(normalizePainting));
}

export async function singlePainting(slug) {
    const data = await fetch(`https://api-museum.vercel.app/objects/${slug}`);

    if (!data.ok) return null;

    return normalizePainting(await data.json());
}
