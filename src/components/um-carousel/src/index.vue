<template>
  <div class="um-carousel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "um-carousel",
  props: {
    enterButton: {
      type: Array,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
    },
    value: {},
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      interval: 3000,
      loop: true,
    };
  },
  watch: {
    items(val) {},
    activeIndex(val, oldVal) {
      this.initItemPosition(val);
    },
  },
  mounted() {
    this.updateItems();
    this.initItemPosition();
    this.colorItem();
    this.startTimer();
  },
  methods: {
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    startTimer() {
      setInterval(this.playSlides, this.interval);
    },
    updateItems() {
      this.items = this.$children.filter(
        (child) => child.$options.name === "um-carousel-item"
      );
    },
    initItemPosition() {
      this.items.forEach((item, index) => {
        item.translateItem(item, index, this.activeIndex);
      });
    },
    colorItem() {
      let color = ["red", "blue", "green", "yellow"];
      this.items.forEach((item, index) => {
        item.colorItem(color[index]);
      });
    },
  },
};
</script>

<style scoped>
.um-carousel {
  position: relative;
  height: 300px;
  /* overflow-x: hidden; */
}
</style>
