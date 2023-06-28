<template>
  <div class="login">
    <div class="top">
      <img src="../../assets/img/logo.jpeg" alt="" />
    </div>
    <div class="title">
      <div class="line1">Welcome to</div>
      <div class="line1">ELECTION MANAGEMENT SYSTEM</div>
    </div>
    <div class="main">
      <div class="pic">
        <img src="../../assets/img/login.png" alt="" />
      </div>
      <div class="login-case">
        <form class="box">
          <!-- <h1>Login</h1> -->
          <input type="text" name="usern" placeholder="Username" />
          <input type="password" name="psw" placeholder="Password" />
          <input type="submit" value="login" />
        </form>
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
.login {
  .top {
    height: 65px;
    width: 100%;
    img {
      height: 100%;
    }
  }
  .title {
    height: 150px;
    width: 100%;
    background-color: #487aab;
    color: #fff;
    margin-bottom: 40px;
  }
  .main {
    display: flex;
    justify-content: space-around;

    .pic {
      height: 500px;
      img {
        height: 100%;
      }
    }
    .login-case {
      height: 500px;
      width: 400px;
      border: 1px solid #e4e4e4;
      position: relative;
      .box {
        width: 400px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // background-color: #487aab;
        text-align: center;
      }

      .box input[type="text"],
      .box input[type="password"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #e4e4e4;
        padding: 14px 10px;
        width: 200px;
        outline: none;
        color: #fff;
        // border-radius: 24px;
        transition: 0.25s;
      }

      .box input[type="text"]:focus,
      .box input[type="password"]:focus {
        width: 280px;
        border-color: #e4e4e4;
      }

      .box input[type="submit"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #e4e4e4;
        padding: 14px 4px;
        width: 200px;
        outline: none;
        color: #e4e4e4;
        // border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
      }

      .box input[type="submit"]:hover {
        background-color: #e4e4e4;
      }
    }
  }
}
</style>
