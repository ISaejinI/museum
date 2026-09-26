
export async function allPaintings() {
    const data = await fetch('https://api-museum.vercel.app/objects');
    const {objects} = await data.json();
    
    return (objects.map(normalizePainting));
}

export async function singlePainting(slug) {
    const data = await fetch(`https://api-museum.vercel.app/objects/${slug}`);
    
    if (!data.ok) return null;
    
    return normalizePainting(await data.json());
}

export function randomPaintings(paintings) {
    const shuffled = [...paintings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

export function relatedPaintings(paintings, currentPainting) {
    const related = paintings.filter(p => p.movement === currentPainting.movement && p.slug !== currentPainting.slug);
    return related.slice(0, 3);
}

/* FIX DES URLS D'IMAGES DE L'API - suprimer quand l'API est corrigée */
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