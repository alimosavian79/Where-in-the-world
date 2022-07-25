import { FilterByCountry, SortArrayAlphabetically } from '../utils'

const regions = [
    {
        label: "Africa",
        comparator: (countries, regionName) => FilterByCountry(countries, regionName)
    },
    {
        label: "America",
        comparator: (countries, regionName) => FilterByCountry(countries, regionName)
    },
    {
        label: "Asia",
        comparator: (countries, regionName) => FilterByCountry(countries, regionName)
    },
    {
        label: "Europe",
        comparator: (countries, regionName) => FilterByCountry(countries, regionName)
    },
    {
        label: "Oceania",
        comparator: (countries, regionName) => FilterByCountry(countries, regionName)
    }

]

const sortOptions = [
    {
        label: 'Most populated',
        comparator: (countries) => countries.sort((a, b) => b.population - a.population)
    },
    {
        label: 'Least populated',
        comparator: (countries) => countries.sort((a, b) => a.population - b.population)
    },
    {
        label: 'Alphabetically',
        comparator: (countries) => countries.sort(SortArrayAlphabetically)
    },

]

export { regions, sortOptions }