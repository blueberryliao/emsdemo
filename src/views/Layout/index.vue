<template>
  <div class="layout">
    <!-- 顶部 -->
    <div class="top">
      <Header></Header>
    </div>
    <!-- 下部分 -->
    <div class="main">
      <!-- 左侧导航 -->
      <div class="menu"><Menu></Menu></div>

      <!-- 右侧内容 -->
      <div class="content">
        <Content></Content>
      </div>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// const request = new Request();
import Menu from "./Menu/index.vue";
import Content from "./Content/index.vue";
import Header from "./Header/index.vue";
export default {
  components: {
    //导入的组件
    Menu,
    Content,
    Header,
  },
  data() {
    return {
      monShow: false,
    };
  },
  //   computed: {
  //     //计算属性
  //     example: "",
  //     mainTabs: {
  //       get() {
  //         return this.$store.state.common.mainTabs;
  //       },
  //       set(val) {
  //         this.$store.commit("common/updateMainTabs", val);
  //       },
  //     },
  //   },
  //   watch: {
  //     //观察
  //     $route: "routeHandle",
  //     keywordSearch: {
  //       handler(nv) {},
  //     },
  //   },
  methods: {
    getTableYear() {},
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  .top {
    height: 60px;
    background-color: #e1e3e6;
  }
  .main {
    height: calc(100% - 60px);
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: stretch;
    .menu {
      width: 240px;
      min-width: 240px;
      height: 100%;
      background-color: #fff;
      border-right: 1px solid #d4d4d7;
    }
    .content {
      // flex: 1;
      width: calc(100vw - 240px);
      height: 100%;
    }
  }
}
</style>
