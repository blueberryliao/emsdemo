<template>
  <div class="event">
    <div class="header">
      <div class="header-left">
        <el-button-group>
          <!-- <el-button type="primary" icon="el-icon-bottom" size="small" disabled
            >Import</el-button
          > -->
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            disabled
            >Create event</el-button
          >
          <el-button type="primary" icon="el-icon-delete" size="small" disabled
            >Delete</el-button
          >
        </el-button-group>
      </div>
      <div class="header-right">
        <el-button type="primary" size="small" icon="el-icon-top" disabled
          >Export</el-button
        >
      </div>
    </div>
    <div class="event-type">
      <div class="title">1 Activated Event</div>
      <div class="event-case">
        <div class="event-title">Sample Election</div>
        <div class="event-content">
          <div class="status">
            <i class="el-icon-success success"></i>
            Ready to start working on this event
          </div>
          <div class="btn">
            <div class="btn-left">
              <el-button type="primary" size="small" disabled
                >Go to event</el-button
              >
            </div>
            <div class="btn-right">
              <el-button type="danger" size="small" @click="toInitialize"
                >Initialize election data</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="event-type">
      <div class="title">1 Unactivated Event</div>
      <div class="event-case">
        <div class="event-title">Sample Election</div>
        <div class="event-content">
          <div class="status">
            <i class="el-icon-success success"></i> Ready to start working on
            this event
          </div>
          <div class="btn">
            <div class="btn-left">
              <el-button type="primary" size="small" disabled
                >Activate event</el-button
              >
              <el-button type="primary" size="small" disabled
                >Go to event</el-button
              >
            </div>
            <div class="btn-right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// import Tab from "@/components/Tab/tabIncome.vue";
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
    toInitialize() {},
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
.success {
  color: #67c23a;
}
.event {
  width: 100%;
  height: 100%;
  .header {
    background-color: #d4d4d7;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .header-left {
      padding-left: 10px;
    }
    .header-right {
      padding-right: 10px;
    }
  }
  .event-type {
    width: 500px;
    height: 150px;
    margin-left: 40px;
    margin-bottom: 80px;

    .title {
      font-size: 20px;
    }
    .event-case {
      width: 500px;
      height: 120px;
      border: 1px solid black;
      margin-left: 40px;
      margin-top: 20px;
      .event-title {
        font-size: 12px;
        font-weight: 900;
        height: 40px;
        line-height: 40px;
        border-bottom: #d4d4d7 1px solid;
        padding-left: 10px;
      }
      .status {
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
      }
      .btn {
        display: flex;
        justify-content: space-between;
        padding: 10px;
      }
    }
  }
}
</style>
