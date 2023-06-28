import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "normalize.css";
import "@/assets/css/base.scss";
import "@/assets/font/iconfont.css"; // class
import "@/assets/font/iconfont.js"; // symbol

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
