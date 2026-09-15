export default function FilterBar({ filters }) {
    return (
        <div>
            <h2>Filtres</h2>
            {filters.map((filter) => (
                <div key={filter.name}>
                    <h3>{filter.name}</h3>
                    <ul>
                        {filter.options.map((option) => (
                            <li key={option}>
                                <button>{option}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}