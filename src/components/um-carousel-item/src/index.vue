<template>
  <div
    class="um-carousel-item"
    :class="{ 'um-carousel-item-isAnime': isAnime }"
    :style="itemStyle"
  ></div>
</template>
<script>
export default {
  name: "um-carousel-item",
  data() {
    return {
      itemWidth: 0,
      translate: 0,
      color: "red",
      isAnime: false,
    };
  },
  computed: {
    itemStyle() {
      let translate = `transform:translateX(${this.translate}px);`;
      let color = `background-color:${this.color};`;
      let style = translate + color;
      return style;
    },
  },
  mounted: function() {},
  methods: {
    translateItem(item, index, oldVal) {
      const parentWidth = this.$parent.$el.offsetWidth;
      const itemSize = this.$parent.items.length;
      //改变世界的核心数值
      let hexin = index - oldVal;
      // console
      if (hexin == 0 || hexin == 1) {
        this.isAnime = true;
      } else {
        this.isAnime = false;
      }
      if (oldVal === 0) {
        this.translate = parentWidth * index;
      } else {
        if (index >= oldVal) {
          this.translate = this.translate - parentWidth;
        } else {
          this.translate = parentWidth * itemSize;
        }
      }

      console.log(this.translate);
    },
    colorItem(color) {
      this.color = color;
    },
  },
};
</script>

<style scoped>
.um-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}
.um-carousel-item-isAnime {
  transition: transform 0.3s ease-in-out;
}
</style>
