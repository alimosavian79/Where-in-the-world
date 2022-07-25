<template>
  <Placeholder v-if="error" :title="error" hasError />
  <div class="country-page" v-else>
    <button class="back-link" @click="$router.back()">
      <i class="icon-arrow-left2" />
      Back
    </button>
    <div class="container">
      <div class="image">
        <Skeletor height="370" v-if="loading" />
        <v-lazy-image v-else :src="detail.flag" :alt="detail.name" />
      </div>
      <div class="country-detail">
        <Skeletor height="25" width="50%" pill v-if="loading" />
        <h1 v-else>
          {{ detail.name }}
        </h1>
        <div class="info-wrapper">
          <div class="info">
            <span class="primary">Native Name:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.nativeName }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Top Level Domain:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.topLevelDomain.join(", ") }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Population:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.population.toLocaleString() }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Currencies:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.currencies.map(item => item.name).join(", ") }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Region:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.region }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Languages:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.languages.map(item => item.name).join(", ") }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Sub Region:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.subregion }}
            </span>
          </div>
          <div class="info">
            <span class="primary">Capital:</span>
            <Skeletor width="120" v-if="loading" />
            <span class="secondary" v-else>
              {{ detail.capital }}
            </span>
          </div>
        </div>
        <div class="border-countries">
          <span> Border Countries: </span>
          <template v-if="loading">
            <Skeletor height="30" width="80" />
            <Skeletor height="30" width="80" />
            <Skeletor height="30" width="80" />
            <Skeletor height="30" width="80" />
          </template>
          <template v-else-if="detail.borders">
            <router-link
              v-for="border in detail.borders"
              :key="border"
              :to="`/country?code=${border}`"
              >{{ border }}
            </router-link>
          </template>
          <span v-else>No border countries found.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCountryDetail } from "../../services";
export default {
  name: "CountryPage",
  props: {
    countryName: { type: String, default: null },
    countryCode: { type: String, default: null },
  },
  data() {
    return {
      detail: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    getCountryInfo() {
      this.loading = true;
      getCountryDetail(this.countryName, this.countryCode)
        .then(res => {
          this.error = null;
          this.detail = res;
          this.loading = false;
        })
        .catch(error => {
          this.error = error.data.message;
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCountryInfo();
  },
  watch: {
    countryName: {
      handler() {
        this.getCountryInfo();
      },
    },
    countryCode: {
      handler() {
        this.getCountryInfo();
      },
    },
  },
};
</script>

<style>
.country-page {
  padding: 75px 5%;
  height: calc(100vh - 222px);
}
.country-page .back-link {
  all: unset;
  background: var(--White);
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 var(--boxshadowGray);
  border-radius: 4px;
  color: var(--VeryDarkBlueLT);
  margin-bottom: 50px;
  font-weight: 600;
  cursor: pointer;
}

.country-page .back-link i {
  color: var(--VeryDarkBlueLT);
  margin-right: 8px;
}
.country-page .container {
  display: flex;
  justify-content: space-between;
}
.country-page .container .image {
  width: 45%;
}
.country-page .container .image img {
  width: 100%;
  aspect-ratio: 4 /3;
}

.country-page .container .country-detail {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.country-page .container .country-detail h1 {
  margin: 0;
}
.country-page .container .info-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.country-page .container .info-wrapper .info {
  width: 50%;
  margin-bottom: 8px;
  color: var(--VeryDarkBlueLT);
  font-size: 14px;
}
.country-page .container .info-wrapper .info .primary {
  font-weight: 600;
  margin-right: 5px;
}
.country-page .container .border-countries {
  display: flex;
  color: var(--VeryDarkBlueLT);
  font-size: 14px;
  font-weight: 600;
  align-content: center;
  flex-wrap: wrap;
}
.country-page .container .border-countries a {
  all: unset;
  font-weight: 300;
  min-width: 80px;
  text-align: center;
  box-shadow: 0 0 10px 0 var(--boxshadowGray);
  border-radius: 4px;
  margin-right: 15px;
  padding: 0 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.country-page .container .border-countries span {
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 15px;
}

.country-page .container .border-countries .vue-skeletor {
  border-radius: 4px;
}
</style>
