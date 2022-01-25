<template>
  <section class="um-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "um-container",
  props: {
    direction: String,
  },
  computed: {
    isVertical() {
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        return false;
      }
      return true;
    },
  },
  methods: {
    clearValue() {
      this.value = "";
    },
  },
};
</script>

<style scoped>
.um-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}
.is-vertical {
  flex-direction: column;
}
</style>
