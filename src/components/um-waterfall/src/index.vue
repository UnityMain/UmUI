<template>
  <div class="um-waterfall-container">
    <div class="um-waterfall-box"
         v-for="(item,index) in imgsArr"
         v-bind:key="index">
      <div class="um-waterfall-imgbox">
        <img :src="item.src" />
      </div>
      <div class="um-waterfall-textbox">
        <span class="um-waterfall-title">{{item.info}}</span>
        <i class="iconfont icon-huo"
           style="color:red"></i>
        <br />
        <span class="um-waterfall-info">你好吗？</span>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>

</template>

<script>
export default {
  name: 'um-waterfall',
  props: {
    imgsArr: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      waterfallList: null,
      screenWidth: document.body.clientWidth
    }
  },
  mounted () {
    window.addEventListener("resize", this.winChange);
    this.waterfallList = this.$el.getElementsByClassName("um-waterfall-box");
    this.waterfall()
  },
  computed: {

  },
  methods: {
    waterfall: function () {
      let offset = 10;
      let top = 0;
      let left = 0;
      //每一个的高度
      let height = 0;
      let width = this.waterfallList[0].offsetWidth + offset;
      //一行有几个,最小为1
      let cols = parseInt(this.screenWidth / width) == 0 ? 1 : parseInt(this.screenWidth / width);
      //所有的高度的数组
      let heightArr = [];
      for (let i = 0; i < this.waterfallList.length; i++) {
        //计算出第一行的最低高度
        if (height = this.waterfallList[i].offsetHeight, i < cols) {
          heightArr.push(height);
          left = width * i;
        }
        //把最新的卡片放到最低高度，并加上
        else {
          let minHeight = Math.min.apply(null, heightArr);
          let minIndex = heightArr.indexOf(minHeight);
          left = width * minIndex;
          top = minHeight + offset;
          heightArr[minIndex] = top + this.waterfallList[i].offsetHeight;
        }
        this.waterfallList[i].style.left = left + 'px';
        this.waterfallList[i].style.top = top + 'px';

      }
    },
    winChange: function () {
      this.screenWidth = document.body.clientWidth;
      this.waterfall();
    }
  }
}
</script>

<style scoped>
.um-waterfall-container {
  width: 95%;
  margin: 10px auto;
  position: relative;
}
.um-waterfall-container > .um-waterfall-box {
  background: white;
  width: 167px;
  margin: 10px;
  position: absolute;
  transition: left 0.5s, top 0.5s;
  transition-delay: 0.1s;
}
/* .um-waterfall-box {
  background: white;
  width: 167px;
  margin: 10px;
  position: absolute;
  transition: left 0.314s,  top 0.314s;
  transition-delay: 0.1s;
} */
.um-waterfall-imgbox {
  overflow: hidden;
  text-align: center;
}
.um-waterfall-imgbox img {
  width: 147px;
  vertical-align: middle;
  margin: 10px;
}
.um-waterfall-textbox {
  margin: 10px;
}
.um-waterfall-info {
  display: inherit;
  margin-top: 3px;
  color: red;
  font-size: 14px;
  text-align: center;
}

/* @keyframes mymove {
  50% {
    transform: translate(200px, 100px);
  }
}

@media (max-width: 1960px) {
  .um-waterfall-container {
    column-count: 9;
  }
}
@media (max-width: 1760px) {
  .um-waterfall-container {
    column-count: 8;
  }
}
@media (max-width: 1560px) {
  .um-waterfall-container {
    column-count: 7;
  }
}
@media (max-width: 1360px) {
  .um-waterfall-container {
    column-count: 6;
  }
}
@media (max-width: 1160px) {
  .um-waterfall-container {
    column-count: 5;
    animation-fill-mode: forwards;
    animation: mymove 5s 1;
  }
}
@media (max-width: 960px) {
  .um-waterfall-container {
    column-count: 4;
  }
}
@media (max-width: 760px) {
  .um-waterfall-container {
    column-count: 3;
  }
}
@media (max-width: 560px) {
  .um-waterfall-container {
    column-count: 2;
  }
}
@media (max-width: 360px) {
  .um-waterfall-container {
    column-count: 1;
  }
} */
</style>

