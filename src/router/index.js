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
  {
    path: "/overviewPanel",
    name: "overviewPanel",
    component: () => import("@/views/DataCenter/components/Results.vue"),
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
      {
        path: "/ElectionConfiguration",
        // component: () => import("@/views/EventManagement/index.vue"),
        redirect: "/ElectionConfiguration/ElectionEvents",
      },
      {
        path: "/ElectionConfiguration/ElectionEvents",
        component: () =>
          import("@/views/EventManagement/CreateEventSuccessful/index.vue"),
      },
      {
        path: "/ElectionConfiguration/Precincts",
        component: () =>
          import("@/views/EventManagement/AddGeographtSuccessful/index.vue"),
      },
      {
        path: "/ElectionConfiguration/Contests",
        component: () => import("@/views/EventManagement/Contests/index.vue"),
      },
      {
        path: "/ElectionConfiguration/Candidates",
        component: () => import("@/views/EventManagement/Cadidates/index.vue"),
      },
      {
        path: "/VoterManagement",
        component: () => import("@/views/VoterManagement/index.vue"),
      },
      {
        path: "/VoterManagement/AddVoter",
        component: () => import("@/views/VoterManagement/AddVoter/index.vue"),
      },
      // {
      //   path: "/BallotDesign",
      //   component: () => import("@/views/Ballot/index.vue"),
      // },
      {
        path: "/EquipmentManagement",
        component: () => import("@/views/EquipmentManagement/index.vue"),
      },
      {
        path: "/EquipmentManagement/Add",
        component: () =>
          import("@/views/EquipmentManagement/AddEquipment/index.vue"),
      },
      {
        path: "/BallotCounting",
        component: () => import("@/views/Ballot/BallotCounting/index.vue"),
      },
      {
        path: "/BallotCounting/BallotAdjudication",
        component: () => import("@/views/Ballot/BallotAdjudication/index.vue"),
      },
      {
        path: "/BallotCounting/DataCenter",
        component: () => import("@/views/DataCenter/index.vue"),
      },
    ],
  },
];

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 解决重复点击导航时，控制台出现报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

export default router;
