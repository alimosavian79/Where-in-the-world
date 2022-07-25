const FilterByCountry = (countries, regionName) => {
    return countries.filter(country =>
        country.region
            .toLowerCase()
            .includes(regionName.toLowerCase())
    );
}

const SortArrayAlphabetically = (a, b) => {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
}

export { FilterByCountry, SortArrayAlphabetically }