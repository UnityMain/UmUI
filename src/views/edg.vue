<template>
  <!-- <h1 id="vip" :style="'lineHeight:' + clientHeight + 'px'">
    ！！我们是冠军！！
  </h1> -->
  <iframe frameborder="0" scrolling="no" style="width: 100%;height:1080px;">
    <center style="padding: 0;margin:0;list-style: none">
      <br /><a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=168xxxxxxx"
        >粤ICP备168xxxxxxx号</a
      >
    </center>
  </iframe>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: 0,
    };
  },
  watch: {},
  created() {
    this.clientHeight = document.documentElement.clientHeight;
  },
  mounted() {},
  updated() {},
};
</script>
<style scoped>
#vip {
  font-size: 100px;
  text-align: center;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
