"use client";

import { searchableString } from "@/_helpers/FilterHelpers";
import { useState, useEffect } from "react";

export default function SearchBar({paintings}) {

    const [searchString, setSearchString] = useState("");
    const [foundPaintings, setFoundPaintings] = useState([]);

    useEffect(() => {
        if (searchString.length < 3) {
            setFoundPaintings([]);
        } else {
            setFoundPaintings(
                paintings.filter((painting) => {
                    return painting.title?.toLowerCase().includes(searchString) || 
                    painting.artist?.toLowerCase().includes(searchString);
                })
            )
        }
    }, [searchString, paintings]);

    console.log(foundPaintings);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="searchBar">
                <input type="text" placeholder="Rechercher..." onChange={(e) => setSearchString(searchableString(e.target.value))} />
            </div>
            {searchString.length > 3 && (
                <div className="results">
                    {foundPaintings && foundPaintings.map((painting) => (
                        <div key={painting.id}>
                            <h3>{painting.title}</h3>
                            <p>{painting.artist}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}