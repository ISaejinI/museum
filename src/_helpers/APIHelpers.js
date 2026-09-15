export async function AllPaintings() {
    const data = await fetch('https://api-museum.vercel.app/objects');
    const {objects} = await data.json();

    return (objects);
}