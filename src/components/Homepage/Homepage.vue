<template>
  <Placeholder v-if="error" :title="error" hasError> </Placeholder>
  <div class="homepage" v-else>
    <div class="controllers">
      <div class="input-box">
        <i class="icon-search" />
        <input
          type="text"
          placeholder="Search for a country..."
          v-model="searchedCountry"
          @keyup="updatePageParams"
        />
      </div>
      <div class="select-boxes">
        <v-select
          :options="AvailableSortOptions"
          v-model="choosenSortOption"
          placeholder="Sort By"
        ></v-select>
        <v-select
          :options="AvailableRegions"
          v-model="choosenRegion"
          placeholder="Filter by Region"
        ></v-select>
      </div>
    </div>
    <div class="countries" v-if="loading">
      <CountryLoader v-for="loader in loaderArray" :key="loader" />
    </div>
    <div class="countries" v-else-if="retriveCountries.length">
      <Country
        v-for="country in retriveCountries"
        :key="country.name"
        :name="country.name"
        :population="country.population"
        :region="country.region"
        :capital="country.capital"
        :flag="country.flag"
      />
    </div>
    <Placeholder
      v-else
      title="Oops, we couldn't find anything related to your search result, please try
      something else."
    />
  </div>
</template>

<script>
import Country from "./Country";
import CountryLoader from "./CountryLoader";
import { getCountries } from "../../services";
import { regions, sortOptions } from "../../constants";

export default {
  name: "Homepage",
  components: { Country, CountryLoader },
  data() {
    return {
      mode: "dark",
      countries: [],
      searchedCountry: "",
      choosenRegion: null,
      AvailableRegions: regions,
      choosenSortOption: null,
      AvailableSortOptions: sortOptions,
      loading: true,
      loaderArray: [1, 2, 3, 4, 5, 6, 7, 8],
      error: null,
    };
  },
  props: {
    searchValue: { type: String, default: null },
    filteredRegion: { type: String, default: null },
    ChoosenSort: { type: String, default: null },
  },
  computed: {
    retriveCountries() {
      let filteredCountries = this.countries.filter(country =>
        this.fuzzyMatch(
          this.searchedCountry.toLowerCase(),
          country.name.toLowerCase()
        )
      );
      if (this.choosenRegion) {
        filteredCountries = this.choosenRegion.comparator(
          filteredCountries,
          this.choosenRegion.label
        );
      }
      if (this.choosenSortOption) {
        filteredCountries =
          this.choosenSortOption.comparator(filteredCountries);
      }
      return filteredCountries;
    },
  },
  methods: {
    fuzzyMatch(pattern, str) {
      pattern = ".*" + pattern.split("").join(".*") + ".*";
      const re = new RegExp(pattern);
      return re.test(str);
    },
    updatePageParams() {
      const queries = {};

      if (this.searchedCountry) {
        queries.searchValue = this.searchedCountry;
      }
      if (this.choosenRegion) {
        queries.filteredRegion = this.choosenRegion.label;
      }
      if (this.choosenSortOption) {
        queries.ChoosenSort = this.choosenSortOption.label;
      }

      this.$router.push({ path: this.$route.path, query: queries });
    },
    setFilters() {
      if (this.searchValue) {
        this.searchedCountry = this.searchValue;
      }
      if (this.filteredRegion) {
        this.choosenRegion = this.AvailableRegions.find(
          item => item.label === this.filteredRegion
        );
      }
      if (this.ChoosenSort) {
        this.choosenSortOption = this.AvailableSortOptions.find(
          item => item.label === this.ChoosenSort
        );
      }
    },
  },
  mounted() {
    getCountries
      .then(res => {
        this.error = null;
        this.countries = res;
        this.loading = false;
        this.setFilters();
      })
      .catch(error => {
        this.error = error.data.message;
        this.loading = false;
      });
  },
  watch: {
    choosenRegion: {
      handler() {
        this.updatePageParams();
      },
    },
    choosenSortOption: {
      handler() {
        this.updatePageParams();
      },
    },
  },
};
</script>

<style>
.homepage {
  padding: 40px 5%;
}
.homepage .input-box {
  display: flex;
  align-items: center;
  height: 55px;
  background: var(--White);
  width: 25%;
  box-shadow: 0 0 10px 0 #e1e1e1a8;
  border-radius: 4px;
  padding: 0 20px;
}
.homepage .input-box i {
  width: 35px;
  font-size: 18px;
  color: var(--VeryDarkBlueLT);
}
.homepage .input-box input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 14px;
  outline: none;
  color: var(--VeryDarkBlueLT);
  padding: 0;
}
.homepage .controllers {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.homepage .countries {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.homepage .select-boxes {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.homepage .v-select {
  width: 25%;
  height: 55px;
  margin-left: 20px;
}
.homepage .v-select .vs__dropdown-toggle {
  height: 100%;
  border: none;
  box-shadow: 0 0 10px 0 #e1e1e1a8;
  padding: 0 20px;
  border-radius: 4px;
}
.homepage .v-select .vs__actions {
  padding: 0;
}
.homepage .vs__dropdown-menu {
  border: none;
  top: 60px;
  padding: 15px 0;
}
.homepage .vs__dropdown-option--highlight {
  background: transparent;
  color: var(--VeryDarkBlueLT);
}
.homepage .v-select .vs__open-indicator,
.homepage .v-select .vs__clear {
  fill: var(--VeryDarkBlueLT);
}
</style>
