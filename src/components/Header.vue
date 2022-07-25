<template>
  <header :class="mode">
    <h2>
      <router-link to="/"> Where in the world? </router-link>
    </h2>
    <div class="toggler" @click="$emit('toggle')">
      <i class="icon-emptyMoon" />
      Dark Mode
    </div>
  </header>
</template>

<script>
export default {
  name: "header",
  props: {
    mode: { type: String },
  },
};
</script>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  background: var(--White);
  box-shadow: 0 0 10px 0 var(--boxshadowGray);
  transition: 0.4s all;
}
header.dark {
  background: var(--DarkBlue);
  box-shadow: 0 0 10px 0 var(--boxShadowDark);
}
header h2 {
  color: var(--VeryDarkBlueLT);
}
header h2 a {
  all: unset;
  cursor: pointer;
}
header.dark h2 {
  color: var(--White);
}
header .toggler {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  color: var(--VeryDarkBlueLT);
}
header.dark .toggler {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  color: var(--White);
}
header .toggler i {
  margin-right: 8px;
  font-size: 16px;
  font-weight: 700;
}
header.dark .toggler i::before {
  color: var(--White);
}
</style>
