<template>
  <router-link class="country" :to="`/country?name=${name}`">
    <v-lazy-image :src="flag" :alt="name" />
    <div class="detail">
      <h4>{{ name }}</h4>
      <div class="info">
        <span class="primary">Population:</span>
        <span class="secondary">{{ population.toLocaleString() }}</span>
      </div>
      <div class="info">
        <span class="primary">Region:</span>
        <span class="secondary">{{ region }}</span>
      </div>
      <div class="info">
        <span class="primary">Capital:</span>
        <span class="secondary">{{ capital }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Country",
  props: {
    mode: { type: String },
    flag: { type: String },
    name: { type: String },
    region: { type: String },
    capital: { type: String },
    population: { type: Number },
  },
};
</script>

<style>
.country {
  display: flex;
  flex-direction: column;
  width: 22%;
  background: var(--White);
  box-shadow: 0 0 10px 0 #e1e1e1a8;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 50px;
  cursor: pointer;
  transition: 0.4s all;
  text-decoration: none;
}
.country img {
  aspect-ratio: 4/3;
  height: 200px;
  object-fit: cover;
}

.country .detail {
  padding: 20px;
  padding-bottom: 35px;
  color: var(--VeryDarkBlueLT);
}

.country .detail h4 {
  margin: 0;
  margin-bottom: 15px;
}
.country .detail .info {
  font-size: 14px;
  margin-bottom: 5px;
}
.country .detail .info .primary {
  font-weight: 600;
  margin-right: 4px;
}
</style>
