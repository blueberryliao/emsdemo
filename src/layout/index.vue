<template>
  <div class="layout">
    <div class="menu">
      <div class="top">
        <img src="@/assets/img/logo.png" alt="" />
        <div class="title">
          <h1>贵州省人大</h1>
          <!-- <h2>任务管理及绩效评定系统</h2> -->
          <h2>任务分配及目标绩效考评系统</h2>
        </div>
      </div>
      <div class="changeYear">
        <!-- <div class="label margin-r-10">年度</div> -->
        <el-select
          popper-class="dropdown"
          :popper-append-to-body="false"
          placeholder=""
          class="cata margin-r-20"
          v-model="selectYear"
          @change="changeYear"
        >
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <Menu :menuList="menuList"></Menu>

      <div class="bottom">您好，欢迎{{ userName }}</div>
    </div>
    <div class="container_box">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
// import MenuData from "./components/menuData";
// import { slice } from "lodash";
// import { getYearList } from "./api";
export default {
  components: { Menu },
  data() {
    return {
      selectYear: "",
      yearList: [],
      menuList: [],
      userName: "",
    };
  },
  computed: {
    // newYear() {
    //   return this.$store.state.newYear;
    // },
  },
  watch: {
    // newYear() {
    //   //监听到newYear变化后，刷新年度列表
    //   getYearList().then((res) => {
    //     this.yearList = [...res.data];
    //   });
    // },
  },
  created() {
    //  给年度选择框赋默认值
    // this.selectYear = new Date().getFullYear();
    // 默认值传到vuex
    // this.$store.commit("initYear", this.selectYear);
    // 获取年度列表
    // getYearList().then((res) => {
    //   this.yearList = [...res.data];
    // });
    // if (
    //   sessionStorage.getItem("menuList") ||
    //   localStorage.getItem("menuList")
    // ) {
    //   let menuData = JSON.parse(
    //     sessionStorage.getItem("menuList") || localStorage.getItem("menuList")
    //   );
    //   console.log(menuData, "menuData123");
    //   this.menuList = menuData.map((item) => {
    //     let params = {
    //       name: item.menuName,
    //       path: item.menuLink,
    //       menuLevel: item.menuLevel,
    //       meta: {
    //         icon: null,
    //         isOpenNewTab: false,
    //         title: item.menuName,
    //       },
    //     };
    //     return params;
    //   });
    // } else {
    //   this.menuList = MenuData;
    // }
    // console.log("处理后的menuList", this.menuList);
    // if (sessionStorage.getItem("userName")) {
    //   this.userName = sessionStorage.getItem("userName");
    // }
    // /*
    //     新权限数据
    // */
    // return;
    // if (localStorage.getItem("role") != "超级管理员") {
    //   this.menuList = MenuData;
    // }
    // // 兼容处室管理员任务统计
    // if (localStorage.getItem("role") == "处室或支部管理员") {
    //   this.menuList = slice(MenuData, 1, MenuData.length);
    //   this.menuList.unshift({
    //     path: "/index/taskStatisticsDep",
    //     name: "任务统计",
    //     meta: {
    //       icon: null,
    //       isOpenNewTab: false,
    //       title: "处室任务统计",
    //     },
    //     menuLevel: 2,
    //     limit: ["TaskStatistical_chushi"],
    //   });
    // }
  },
  methods: {
    logout() {
      this.$router.push(`/?redirect=${this.$route.fullPath}`);
    },
    // changeYear() {
    //   sessionStorage.setItem("selectYear", this.selectYear);
    //   this.$store.commit("changeYear", this.selectYear);
    // },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  display: flex;
  align-items: stretch;
  .changeYear {
    width: 100%;
    height: 0.5rem;
    background-color: transparent;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-items: center;
    z-index: 9999;
    margin-bottom: 0.3rem;
    & > .keywords {
      width: 2.8rem;
    }
    & > .cata {
      width: 1.2rem;
      color: #cc2424;
      // background-color: rgb(76, 14, 219);
    }
    & > .point {
      width: 0.88rem;
    }
    // .el-input::v-deep,
    // .el-date-picker::v-deep,
    // .el-select::v-deep {
    //   @include input;
    // }
    ::v-deep .el-select {
      position: relative;
      margin: 0 auto;
      width: 1.3rem;
      .el-input {
        input {
          height: 40px;
          border-color: rgb(113, 113, 196);
          font-size: 0.16rem;
        }
      }
    }

    ::v-deep .el-scrollbar__bar {
      background-color: #01237a !important;
      opacity: 0;
    }
    ::v-deep.el-scrollbar__bar.is-horizontal {
      background-color: #01237a !important;
      opacity: 0;
    }
    ::v-deep .el-input__inner {
      background-color: #01237a;
      color: #fff;
      border: 1px solid #ffffff;
    }

    ::v-deep .el-select-dropdown__item {
      // font-size: 7px;
      // line-height: 19px;
      color: #fff;
      font-weight: 400;
      background-color: #01237a;
    }
    ::v-deep.el-popper .popper__arrow,
    ::v-deep.el-popper .popper__arrow::after {
      display: none;
    }
    .el-select-dropdown__item:hover {
      background-color: rgb(53, 95, 163);
    }
    ::v-deep.el-select-dropdown {
      background-color: #01237a;
      // margin: 5px;
      border: 1px solid #5175d1;
      // border-radius: 0.1rem;
    }
    ::v-deep .el-input__suffix {
      .el-input__suffix-inner {
        .el-icon-arrow-up:before {
          color: rgba(255, 255, 255);
        }
      }
    }

    ::v-deep .el-select-dropdown__wrap {
      background-color: #01237a !important;
      margin-bottom: -0.22rem !important;
      margin-right: -0.08rem !important;
      padding-bottom: 0.05rem;
    }
    ::v-deep .el-scrollbar__bar {
      background-color: #01237a !important;
    }
    ::v-deep .el-scrollbar {
      background-color: #01237a !important;
    }
    @media screen and (min-width: 1024px) and (max-width: 1280px) {
      ::v-deep .el-select-dropdown__wrap {
        background-color: #01237a !important;
        margin-bottom: -0.35rem !important;
        padding-bottom: 0.08rem;
        margin-right: -0.08rem !important;
      }
    }

    @media screen and (max-width: 1680px) {
      ::v-deep .el-select-dropdown__wrap {
        background-color: #01237a !important;
        margin-bottom: -0.22rem !important;
        margin-right: -0.08rem !important;
        padding-bottom: 0.03rem;
      }
    }
  }
  .menu {
    width: 2rem;
    min-width: 2rem;
    height: 100%;
    background-image: url("~@/assets/img/menu_bg.png");
    background-position: center;
    background-size: cover;
    position: relative;
    overflow: hidden;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 0.33rem;
      padding-bottom: 0.64rem;
      img {
        width: 0.64rem;
        margin-bottom: 0.1em;
      }
      h1 {
        font-size: 0.33rem;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        line-height: 0.43rem;
        color: #ffffff;
      }
      h2 {
        line-height: 0.2rem;
        font-size: 0.15rem;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .exit {
      position: absolute;
      bottom: 2rem;
      width: 1rem;
      left: 50%;
      transform: translateX(-50%);
      // color: #ffffff;
      font-size: 0.14rem;
    }
    .bottom {
      position: absolute;
      bottom: 0.14rem;
      width: 2rem;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      color: #ffffff;
      font-size: 0.14rem;
    }
  }
  .container_box {
    flex: 1 1 auto;
    height: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f6f6f6;
    .container {
      width: 100%;
      height: 100%;
      border-radius: 0.1rem;
      overflow: hidden;
      background-color: #fff;
    }
  }
}
</style>
