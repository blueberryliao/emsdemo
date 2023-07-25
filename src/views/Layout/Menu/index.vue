<template>
  <div class="menu">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :default-openeds="openeds"
      router
      highlight-current
    >
      <div v-for="item in authMenuList" :key="item.index">
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
import { getRouters } from "@/api/menu";
import MenuList from "./menu";
import { handleTree } from "@/utils/custom";
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      monShow: false,
      MenuList: [],
      authMenuList: [],
      openeds: ["/ElectionConfiguration"],
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
  watch: {
    //观察
    $route: {
      handler(nv) {
        console.log("nv", nv.path);
      },
    },
    // keywordSearch: {
    //   handler(nv) {},
    // },
  },
  methods: {
    getMenu() {
      getRouters().then((res) => {
        //获得当前权限的一级菜单
        console.log("getMenu res", res);
        //this.MenuList 是所有当前系统开放的菜单
        //遍历权限菜单，与MenuList相同的，放进当前菜单
        if (res.code == "200") {
          res.data.map((i) => {
            this.MenuList.map((j) => {
              if (i.meta.title == j.name) {
                this.authMenuList.push(j);
              }
            });
          });
        }

        console.log("this.authMenuList", this.authMenuList);
      });
    },
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
  created() {
    this.MenuList = MenuList;
    console.log("this.MenuList", this.MenuList);
    this.getMenu();
  },
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
  height: 100%;
  overflow-y: auto;
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
/*设置二级菜单选中时 父菜单字体颜色也改变*/
::v-deep .el-submenu.is-active .el-submenu__title {
  color: #3e82f4 !important;
}
</style>
