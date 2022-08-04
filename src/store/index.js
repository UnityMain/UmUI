import { createStore } from 'vuex'
import { request } from "@/utils/request";
import common from "@/utils/common";
import { ElMessage } from "element-plus";

export default createStore({
  /**
   * 需要管理的数据存放在这里
   */
  state: {
    token: '',
    isLogin: false,
    routes: []
  },
  /**
   * 唯一可以同步修改state的地方
   */
  mutations: {
    logout(state) {
      state.isLogin = false;
      state.routes = [];
      localStorage.removeItem('token')
    },
    login(state, token) {
      localStorage.setItem("token", token)
      state.isLogin = true
    },
    setRoutes(state, routes) {
      state.routes = routes;
    },
    setToken(state, token) {
      // 变更登陆token
      state.token = token
    }
  },
  /**
   * 异步修改state,本质还是通过mutations修改
   */
  actions: {
    getRouterByRole(content) {
      return new Promise(resolve => {
        request({ method: "get", url: "/sysMenu" }).then(function (response) {
          if (response.status == -1) {
            ElMessage.error(response.msg);
            return null;
          }
          let router = common.createRouter(response.data);
          content.commit('setRoutes', router)
          resolve(true);
        });
      })
    },

  },
  /**
   * 类似组件中的计算属性
   */
  getters: {

  },
  /**
   * 如果需要vuex管理的数据多的话，可以拆分为一个个模块
   */
  modules: {
  }
})
