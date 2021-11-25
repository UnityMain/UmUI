<template>
  <div class="um-input">
    <input type="text"
           :placeholder="placeholder"
           :disabled="disabled"
           v-model="value" />
    <span v-if="clearable">
      <i @click="clearValue"
         class="um-input-i iconfont icon-shanchu"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'um-input',
  props: {
    enterButton: {
      type: Array
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    value: {
    }
  },
  methods: {
    clearValue () {
      this.value = "";
    }
  }
}
</script>

<style scoped>
.um-input {
  position: relative;
  display: inline-block;
}
.um-input input {
  height: 35px;
  width: 180px;
  padding: 0 15px;
  background: none;
  outline: none;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-radius: 4px;
}
.um-input input[disabled] {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.um-input-i {
  height: 32px;
  width: 32px;
  position: absolute;
  right: 5px;
  text-align: center;
  line-height: 32px;
  color: #808695;
  cursor: pointer;
}
</style>