<template>
  <div class="login">
    <div class="top">
      <img src="@/assets/img/loginlogo.jpg" alt="" />
    </div>
    <div class="title">
      <div class="line1">Welcome to</div>
      <div class="line2">ELECTION MANAGEMENT SYSTEM</div>
    </div>
    <div class="main">
      <div class="pic">
        <img src="@/assets/img/login.png" alt="" />
      </div>
      <div class="login-case">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="username"
              prefix-icon="el-icon-s-custom"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="password"
              @keyup.enter.native="handleLogin"
              prefix-icon="el-icon-lock"
            >
            </el-input>
          </el-form-item>
          <el-checkbox
            v-model="loginForm.rememberMe"
            style="margin: 0px 0px 25px 0px"
            >Remember me</el-checkbox
          >
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">Login</span>
              <span v-else>loading</span>
            </el-button>

            <!-- <div style="float: right" v-if="register">
              <router-link class="link-type" :to="'/register'"
                >立即注册</router-link
              >
            </div> -->
            <div style="float: right" v-if="register">
              <router-link class="link-type" :to="'/'"
                >Forgot password?</router-link
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { login } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        // code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "please input user name",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "please input password" },
        ],
        // code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      // captchaEnabled: true,
      // 注册开关
      register: true,
      redirect: undefined,
    };
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect;
    //   },
    //   immediate: true,
    // },
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("valid", valid);
          console.log("this.loginForm", this.loginForm);
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          login(this.loginForm.username, this.loginForm.password)
            .then((res) => {
              console.log("r", res);
              if (res.code == "200") {
                this.loading = false;
                // this.$router.push({ path: this.redirect || "/" });
                sessionStorage.setItem("token", res.token);
                this.$router.push({ path: "/ElectionConfiguration" });
              }
            })
            .catch((e) => {
              this.loading = false;
            });
          // console.log("res", res);

          // this.$store
          //   .dispatch("Login", this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || "/" }).catch(() => {});
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  height: 100%;
  width: 100%;
  .top {
    height: 80px;
    width: 100%;
    padding: 20px 30px;
    img {
      height: 100%;
    }
  }
  .title {
    height: 160px;
    width: 100%;
    background-color: #487aab;
    color: #fff;
    margin-bottom: 40px;
    padding: 20px;
    .line1 {
      font-size: 45px;
    }
    .line2 {
      font-size: 55px;
      font-weight: 900;
    }
  }
  .main {
    display: flex;
    justify-content: space-around;
    padding: 40px 100px;
    .pic {
      height: 560px;
      img {
        height: 100%;
      }
    }
    .login-case {
      height: 560px;
      width: 460px;
      border: 1px solid #e4e4e4;
      position: relative;
      padding-top: 50px;
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
// .title {
//   margin: 0px auto 30px auto;
//   text-align: center;
//   color: #707070;
// }

.login-form {
  border-radius: 6px;
  background: #ffffff;
  // width: 400px;
  padding: 80px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
