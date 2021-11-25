<template>
  <div id="content"></div>
</template>
<script>
import Player from "nplayer";
import Danmaku from "@nplayer/danmaku";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    getData() {},
  },
  mounted() {
    const danmakuOptions = {
      items: [{ time: 1, text: "弹幕～" }],
    };
    const player = new Player({
      src: "https://v-cdn.zjol.com.cn/280443.mp4",
      plugins: [new Danmaku(danmakuOptions)],
      controls: [
        [
          "play",
          "volume",
          "time",
          "spacer",
          "airplay",
          "settings",
          "web-fullscreen",
          "fullscreen",
        ],
        ["progress"],
      ],
    });
    player.mount(document.getElementById("content"));
    this.getData();
  },
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
