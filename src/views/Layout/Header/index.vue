<template>
  <div class="header">
    <div class="left">
      <div class="logo"><img src="@/assets/img/logoT.png" alt="" /></div>
      <div class="name">Election Management System</div>
    </div>
    <div class="right">
      <el-button type="primary" plain size="small" @click="toLogout"
        >Log Out</el-button
      >
    </div>
  </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
  data() {
    return {
      monShow: false,
    };
  },
  methods: {
    toLogout() {
      this.$msgbox
        .confirm(`Are you sure you want to logout?`, "System Info", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          logout().then((res) => {
            console.log("res", res);
            if (res.code == 200) {
              this.$router.push({ path: "/" });
            }
          });
        });
    },
  },
  created() {},
  mounted() {},
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
      line-height: 60px;
      color: #2d56a2;
      padding-left: 25px;
      img {
        height: 20px;
      }
    }
    .name {
      font-family: "思源黑体";
      font-size: 24px;
      font-weight: 900;
      line-height: 60px;
    }
  }
  .right {
    font-family: "思源黑体";
    font-size: 14px;
    font-weight: 400;
    line-height: 60px;
    margin-right: 10px;
  }
}
</style>
