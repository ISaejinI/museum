export async function AllPaintings() {
    const data = await fetch('https://api-museum.vercel.app/objects');
    const {objects} = await data.json();

    return (objects);
}

export async function singlePainting(slug) {
    const data = await fetch(`https://api-museum.vercel.app/objects/${slug}`);

    if (!data.ok) return null;

    return await data.json();
}