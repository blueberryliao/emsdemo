<template>
  <div class="data-center">
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tab">
        <el-tab-pane name="first" class="tab-pane">
          <span slot="label"><i class="el-icon-user"></i> Voters</span>
          <Voters :toRender="toRenderVoters"></Voters>
        </el-tab-pane>
        <el-tab-pane name="second" class="tab-pane">
          <span slot="label"><i class="el-icon-s-ticket"></i> Ballots</span>
          <Ballots :toRender="toRenderBallots"></Ballots>
        </el-tab-pane>
        <el-tab-pane name="third" class="tab-pane">
          <span slot="label"><i class="el-icon-s-custom"></i> Candidates</span>
          <Candidates :toRender="toRenderCandidates"></Candidates>
        </el-tab-pane>
        <el-tab-pane name="fourth" class="tab-pane">
          <span slot="label"><i class="el-icon-s-data"></i> Results</span>
          <Results :toRender="toRenderResults"></Results>
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
      activeName: "fourth",
      toRenderVoters: 0,
      toRenderBallots: 0,
      toRenderCandidates: 0,
      toRenderResults: 0, //触发Result页面的echarts更新
    };
  },

  methods: {
    handleClick() {
      if (this.activeName == "first") this.toRenderVoters++;
      if (this.activeName == "second") this.toRenderBallots++;
      if (this.activeName == "third") this.toRenderCandidates++;
      if (this.activeName == "fourth") this.toRenderResults++;
    },
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
      height: calc(100% - 40px);
      .tab-pane {
        height: 100%;
        // height: calc(100% - 20px);
      }
    }
  }
  ::v-deep .el-tabs__content {
    // height: 100%;
    height: calc(100% - 20px);
  }
}
</style>
