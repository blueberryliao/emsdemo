import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
  },
  // {
  //   path: "/index",
  //   component: () => import("@/layout/index.vue"),
  // },
  {
    path: "/index",
    name: "Layout",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "/SystemAdministration",
        component: () => import("@/views/UserManagement/index.vue"),
      },
      {
        path: "/SystemAdministration/User",
        component: () => import("@/views/UserManagement/AddUser/index.vue"),
      },
      {
        path: "/SystemAdministration/UserAuthority",
        component: () =>
          import("@/views/UserManagement/UserAuthority/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
