<template>
  <div class="um-main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "um-main",
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
      this.value = "";
    },
  },
};
</script>

<style scoped>
.um-main {
  display: block;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  flex: 1;
  flex-basis: auto;
  padding: 20px;
}
</style>
