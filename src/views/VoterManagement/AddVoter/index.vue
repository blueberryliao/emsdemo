<template>
  <div class="add-voter">
    <div class="citizenship">
      <div class="left">
        <div class="title">Citizenship</div>
        <el-avatar
          shape="square"
          fit="contain"
          src="../../../assets/img/phto.jpg"
          class="avatar-pic"
        ></el-avatar>
      </div>
      <div class="right">
        <div>
          <el-button type="primary" size="small" disabled
            >Voter Verification</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="fingerprint">
      <div class="left">
        <div class="title">Fingerprints</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="signature">
      <div class="left"><div class="title">Signature</div></div>
      <div class="right"></div>
    </div> -->
    <div class="form-button">
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="saveForm()">Save</el-button>
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

    cancel() {
      this.$msgbox
        .confirm(`Are you sure you want to clear form?`, "System Info", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          console.log("this.formInline", this.formInline);
          this.formInline = {
            userName: "",
            Password: "",
            fullName: "",
            gender: "",
            userType: "",
            roleIds: [],
            position: "",
            jurisdictionId: "",
            phoneNumber: "",
            digitalCertificates: "",
            status: 0,
          };
        });
    },
    saveForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return this.$message.error(
            "please finish the required form validation"
          );
        }
      });
      console.log("this.formInline", this.formInline);
      addUser(this.formInline).then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.$router.push({ path: "/SystemAdministration" });
        }
      });
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
.add-voter {
  width: 100%;
  height: 100px;
  .citizenship {
    width: 100%;
    height: 900px;
    border: 1px salmon solid;
    display: flex;
    .avatar-pic {
      width: 100%;
    }
  }
  .fingerprint {
    width: 100%;
    height: 150px;
    border: 1px salmon solid;
    display: flex;
  }
  .signature {
    width: 100%;
    height: 120px;
    border: 1px salmon solid;
    display: flex;
  }
  .form-button {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .left {
    width: 260px;
    height: 100px;
    padding: 10px;
    .title {
      font-size: 20px;
      font-weight: 900;
      height: 30px;
      line-height: 30px;
    }
  }
  .right {
    width: calc(100% - 260px);
    height: 100%;
    border: 1px springgreen solid;
    padding: 10px;
  }
}
</style>
