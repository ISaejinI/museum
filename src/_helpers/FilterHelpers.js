export async function Filters( paintingsArray ) {
    const filters = [
        {name: "Type", options: [...new Set(paintingsArray.map((p) => p.type))]},
        // {name: "Année", options: [...new Set(paintingsArray.map((p) => p.year))]},
        // {name: "Artiste", options: [...new Set(paintingsArray.map((p) => p.artist))]},
        // {name: "Lieu", options: [...new Set(paintingsArray.map((p) => p.location))]},
        {name: "Mouvement", options: [...new Set(paintingsArray.map((p) => p.movement))]}
    ];
    
    return filters;
}

export function FilteredPaintings( paintingsArray ) {
    
}