<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
body {
  font-family: Helvetica Neue, Helvetica, Arial, STHeiti-Light, STHeiti-Medium,
    Microsoft YaHei, Microsoft JhengHei, STHeiti, MingLiu;
  background-color: #eeeeeb;
}
#content {
  width: 100%;
}
.some-info {
  margin: 5px 10px;
  color: black;
}
</style>
