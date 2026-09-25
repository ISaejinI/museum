export default function Page () {
    return (
        <h1>Test</h1>
    );
}

export async function generateMetadata() {

    return {
        title: `À propos | Artheca`,
        description: `Découvrez l'histoire et la mission de notre musée, ainsi que les artistes et les mouvements qui ont façonné notre collection.`
    }
}