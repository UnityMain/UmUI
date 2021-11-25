<template>
  <div class="um-button">
    <button
      :class="[type ? 'um-button--' + type : '']"
      @click="handleClick"
      :disabled="disabled"
    >
      <i :class="icon" v-if="icon"></i>
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: "um-button",
  props: {
    type: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>

<style scoped>
.um-button button {
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 10px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #dcdfe6;
  float: left;
  width: 100%;
}
.um-button button[disabled] {
  cursor: not-allowed;
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}
.um-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.um-button--primary:active {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>
