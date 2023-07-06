<template>
  <div class="data-center">
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tab">
        <el-tab-pane name="first" class="tab-pane">
          <span slot="label"><i class="el-icon-user"></i> Voters</span>
          <Voters></Voters>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-s-ticket"></i> Ballots</span>
          <Ballots></Ballots>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label"><i class="el-icon-s-custom"></i> Candidates</span>
          <Candidates></Candidates>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label" name="third"
            ><i class="el-icon-s-data"></i> Results</span
          >
          <Results></Results>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Voters from "./components/Voters.vue";
import Ballots from "./components/Ballots";
import Candidates from "./components/Candidates";
import Results from "./components/Results";
export default {
  components: {
    //导入的组件
    Voters,
    Ballots,
    Candidates,
    Results,
  },
  data() {
    return {
      activeName: "second",
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
    handleClick() {},
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
.data-center {
  padding: 10px;
  width: 100%;
  height: 100%;
  .tab {
    width: 100%;
    height: 100%;
    .el-tab {
      width: 100%;
      height: 100%;
      .tab-pane {
        height: 100%;
      }
    }
  }
  ::v-deep .el-tabs__content {
    height: 100%;
  }
}
</style>
