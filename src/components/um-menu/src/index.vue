<template>
  <div class="um-menu">
    <div class="um-menu-icon um-left">
      <i class="um-menu-icon-img"></i>
    </div>
    <!-- PC-->
    <div class="um-menu-item">
      <div class="um-search um-left">
        <input type="text" class="um-input" placeholder="请输入内容" />
        <button class="um-button">搜索</button>
      </div>
      <div class="um-item-group um-left">
        <ul class="um-h-list">
          <li v-for="(menu, index) in menuList" v-bind:key="index">
            <router-link
              style="background-color:#007bff"
              :to="'/' + menu.url"
              >{{ menu.name }}</router-link
            >
            <ul class="um-child-menu" style="border:1px solid #000">
              <li
                v-for="(c_menu, c_index) in menu.children"
                v-bind:key="c_index"
                class="um-child-menu-list"
              >
                <router-link :to="'/' + c_menu.url">{{
                  c_menu.name
                }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- 移动 -->
    <div class="um-mobile-menu">
      <ul class="um-h-list">
        <li v-on:click="closeMenu">
          <i class="left-bottom iconfont icon-caidan"></i>
        </li>
      </ul>
    </div>
    <div :class="'um-mobile-item ' + menuDisPlay">
      <ul class="um-v-list">
        <li>
          <div class="um-search">
            <input type="text" class="um-input" placeholder="请输入内容" />
            <button class="um-button">搜索</button>
          </div>
        </li>
        <li v-for="(menu, index) in menuList" v-bind:key="index">
          <router-link :to="'/' + menu.url">{{ menu.name }}</router-link>
        </li>
        <li v-on:click="closeMenu">
          <i
            class="white iconfont icon-guanbi"
            style="cursor: pointer;font-size:30px"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "um-menu",
  props: {
    menuList: Array,
  },
  data() {
    return {
      menuDisPlay: "hide",
    };
  },
  methods: {
    closeMenu: function(event) {
      if (this.menuDisPlay === "show") {
        this.menuDisPlay = "hide";
      } else {
        this.menuDisPlay = "show";
      }
    },
  },
};
</script>
<style scoped>
.white {
  color: #fff;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.um-left {
  float: left;
}
.um-menu {
  background: #f5f5f4;
  width: 100%;
  height: 60px;
}
.um-menu-icon {
  width: 180px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.um-menu-icon-img {
  width: 148px;
  height: 50px;
  background-image: url("./icon.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.um-item-group {
  height: 100%;
  text-align: center;
}
.um-h-list {
  position: relative;
  min-width: 6rem;
}
.um-child-menu {
  position: absolute;
  display: none;
  min-width: 6rem;
  cursor: pointer;
}
/* 在鼠标移上去后显示下拉菜单 */
.um-h-list:hover .um-child-menu {
  display: block;
}
.um-h-list a {
  line-height: 60px;
  padding: 22px 15px;
}

.um-search {
  display: inline-table;
  height: 100%;
}
.um-input {
  height: 35px;
  width: 180px;
  padding: 0 15px;
  background: none;
  outline: none;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.um-button {
  height: 35px;
  width: 50px;
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.um-mobile-item {
  position: fixed;
  z-index: 9000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.9;
}
.um-v-list {
  position: relative;
  top: 30%;
  text-align: center;
}

.um-v-list a {
  font-size: 32px;
  font-weight: 300;
  color: #fff;
  line-height: 2;
}
.left-bottom {
  position: fixed;
  left: 30px;
  bottom: 30px;
  font-size: 35px;
}

.um-mobile-menu {
  display: none;
}

@media only screen and (min-width: 760px) {
  .um-mobile-item {
    display: none;
  }
}

@media only screen and (max-width: 760px) {
  .um-menu-item {
    display: none;
  }
  .um-menu-icon {
    width: 210px;
  }
  .um-menu-icon-img {
    width: 210px;
    height: 60px;
    background-image: url("./logo1.png");
  }
  .um-menu {
    background-color: #febe00;
  }
  .um-input {
    background: #fff;
    border: 1px solid #fff;
  }
  .um-button {
    background: #fff;
    border: 1px solid #ccc;
  }
  .um-mobile-menu {
    display: block;
  }
}
</style>
