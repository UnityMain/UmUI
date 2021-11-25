<template>
  <header class="um-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "um-header",
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
.um-header {
  text-align: center;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
