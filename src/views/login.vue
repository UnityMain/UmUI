<template>
  <div id="content">
    <div>
      <span>账号:</span>
      <input type="text" v-model="loginForm.username" />
    </div>
    <div>
      <span>密码:</span>
      <input type="text" v-model="loginForm.password" />
    </div>
    <button v-on:click="login">登录</button>
    <button v-on:click="index">访问首页</button>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login: function() {
      if (!this.loginForm.username) {
        alert("账号没有输入");
        return;
      }
      if (!this.loginForm.password) {
        alert("密码没有输入");
        return;
      }
      axios({
        method: "post",
        url: "/login",
        data: this.loginForm,
        headers: {
          "Content-Type": "application/x-www-form-urlencode; charset=utf-8;",
        },
      }).then((response) => {
        console.log(response);
      });
    },
    index: function() {
      axios({
        method: "post",
        url: "/user/index",
      }).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
