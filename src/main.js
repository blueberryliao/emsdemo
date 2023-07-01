import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "normalize.css";
import "@/assets/css/base.scss";
import "@/assets/font/iconfont.css"; // class
import "@/assets/font/iconfont.js"; // symbol
// import "./permission"; // permission control

// 分页组件
import Pagination from "@/components/Pagination";

Vue.config.productionTip = false;

// 全局组件挂载
Vue.component("Pagination", Pagination);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
