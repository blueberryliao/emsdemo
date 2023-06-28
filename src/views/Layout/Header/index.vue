<template>
  <div class="header">
    <div class="left">
      <div class="logo">INTEGELECT</div>
      <div class="name">Election Management System</div>
    </div>
    <div class="right">
      <el-button type="primary" plain size="mini">Log Out</el-button>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// const request = new Request();
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
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
* {
  box-sizing: border-box;
}
.header {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    .logo {
      width: 180px;
      height: 100%;
      font-family: "思源黑体";
      font-size: 18px;
      font-weight: 900;
      line-height: 40px;
      color: #2d56a2;
      padding-left: 60px;
      // border: 1px solid saddlebrown;
    }
    .name {
      font-family: "思源黑体";
      font-size: 18px;
      font-weight: 900;
      line-height: 40px;
    }
  }
  .right {
    // width: 50px;
    font-family: "思源黑体";
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
    margin-right: 10px;
  }
}
</style>
