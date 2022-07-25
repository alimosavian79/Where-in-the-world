<template>
  <div class="app">
    <Header :mode="mode" @toggle="toggleMode" />
    <main :class="mode">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import "vue-select/dist/vue-select.css";
import "vue-skeletor/dist/vue-skeletor.css";
import "./styles/app.css";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      mode: "light",
    };
  },
  methods: {
    toggleMode() {
      this.mode === "light" ? (this.mode = "dark") : (this.mode = "light");
    },
  },
};
</script>

<style></style>
