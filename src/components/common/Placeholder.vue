<template>
  <div class="placeholder" :class="{ hasError }">
    <i class="icon-search"></i>
    <h3>
      {{ title }}
    </h3>
    <button v-if="hasError" class="back-link" @click="$router.back()">
      <i class="icon-arrow-left2" />
      Back
    </button>
  </div>
</template>

<script>
export default {
  name: "Placeholder",
  props: {
    title: { type: String },
    hasError: { type: Boolean, default: false },
  },
};
</script>

<style>
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 75vh;
}
.placeholder.hasError {
  height: calc(100vh - 72px);
}
.placeholder i {
  font-size: 50px;
  margin-bottom: 15px;
}
.placeholder h3 {
  font-weight: 200;
  line-height: 30px;
}
.placeholder .back-link {
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
  margin-top: 20px;
}

.placeholder .back-link i {
  color: var(--VeryDarkBlueLT);
  margin-right: 8px;
  font-size: 16px;
  margin-bottom: 0;
}
</style>
