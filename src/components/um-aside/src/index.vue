<template>
  <div id="ddd11" class="um-aside" v-on:click="clearValue">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "um-aside",
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
  methods: {
    clearValue() {
      document.getElementById("ddd11").style.left = "300px";
    },
  },
};
</script>

<style scoped>
.um-aside {
  position: relative;
  display: block;
  background-color: #d3dce6;
  text-align: center;
  line-height: 200px;
  left: 0px;
  transition: left 0.5s;
  transition-delay: 0.1s;
}
@media only screen and (min-width: 760px) {
  .um-aside {
    display: block;
  }
}

@media only screen and (max-width: 760px) {
  .um-aside {
    left: -65px;
  }
}
</style>
