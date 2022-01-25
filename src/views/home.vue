<template>
  <div class="app">
    <um-container>
      <um-header>
        <um-menu :menuList="menuList"></um-menu>
      </um-header>
      <um-container>
        <um-aside>左侧菜单 </um-aside>
        <um-main>
          <router-view></router-view>
        </um-main>
      </um-container>
      <um-footer>
        赞助信息
      </um-footer>
    </um-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      demo: "你好吗？",
      menuList: [
        {
          url: "main",
          name: "主页",
          children: [
            {
              url: "main",
              name: "个人信息",
            },
            {
              url: "main",
              name: "编辑",
            },
            {
              url: "main",
              name: "入驻",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped></style>
