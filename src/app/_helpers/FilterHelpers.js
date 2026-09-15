import { AllPaintings } from "./APIHelpers";

export async function Filters() {
    const paintings = await AllPaintings();



    const filters = [
        {name: "Type", options: [...new Set(paintings.map((p) => p.type))]},
        // {name: "Année", options: [...new Set(paintings.map((p) => p.year))]},
        // {name: "Artiste", options: [...new Set(paintings.map((p) => p.artist))]},
        // {name: "Lieu", options: [...new Set(paintings.map((p) => p.location))]},
        // {name: "Mouvement", options: [...new Set(paintings.map((p) => p.movement))]}
    ];
    
    return filters;
}