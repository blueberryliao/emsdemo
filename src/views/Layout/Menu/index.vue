<template>
  <div class="menu">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <div v-for="item in MenuList" :key="item.index">
        <el-submenu
          :index="item.path"
          :disabled="!item.isDeveloped"
          v-if="item.children"
          :class="$route.name === item.path ? 'is-active' : ''"
        >
          <template slot="title">
            <i :class="item.meta.icon" @click="clickMenu(item.path)"></i>
            <span slot="title" class="title" @click="clickMenu(item.path)">{{
              item.meta.title
            }}</span>
          </template>
          <div v-for="i in item.children" :key="i.index">
            <el-menu-item
              :index="i.path"
              :disabled="!i.isDeveloped"
              @click="clickMenu(i.path)"
              :class="$route.name === i.path ? 'is-active' : ''"
              >{{ i.meta.title }}</el-menu-item
            >
          </div>
        </el-submenu>
        <el-menu-item :index="item.path" :disabled="!item.isDeveloped" v-else>
          <i :class="item.meta.icon" @click="clickMenu(item.path)"></i>
          <span slot="title" @click="clickMenu(item.path)">{{
            item.meta.title
          }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// import Tab from "@/components/Tab/tabIncome.vue";
// const request = new Request();
import MenuList from "./menu";
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      monShow: false,
      MenuList: [],
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(url) {
      console.log("url", url);
      this.$router.push({
        path: url,
      });
    },
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      this.MenuList = MenuList;
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.menu {
  .title {
    padding: 20px 0;
  }
}
.el-menu {
  border-right: 0;
  .el-menu-item.is-active {
    border-right: 2px solid #3e82f4 !important;
    // background-color: #e9f6fe;
  }
}
</style>
