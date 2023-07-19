<template>
  <div class="add-voter">
    <div class="citizenship">
      <div class="left">
        <div class="title">Citizenship</div>
        <img :src="baseurl + info.voterPhotoUrl" alt="" class="avatar-pic" />
      </div>
      <div class="right">
        <div>
          <el-button type="primary" size="small" disabled
            >Voter Verification</el-button
          >
        </div>
        <div class="form">
          <el-row class="form-title">
            <el-col :span="6">Full Name</el-col>
            <el-col :span="6">Gender</el-col>
            <el-col :span="6">Birthday</el-col>
            <el-col :span="6">Age</el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.fullName }}</el-col>
            <el-col :span="6">
              <span v-if="info.gender == 1">male</span>
              <span v-else>female</span>
            </el-col>
            <el-col :span="6">{{ info.birthday }}</el-col>
            <el-col :span="6">{{ info.age }}</el-col>
          </el-row>
          <el-row class="form-title">
            <el-col :span="6">Nationality</el-col>
            <el-col :span="6">Address</el-col>
            <el-col :span="6">Document Type</el-col>
            <el-col :span="6">Document Number</el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.nationality }}</el-col>
            <el-col :span="6">{{ info.adress }}</el-col>
            <el-col :span="6">{{ info.documentType }}</el-col>
            <el-col :span="6">{{ info.documentNumber }}</el-col>
          </el-row>
          <el-row class="form-title">
            <el-col :span="6">Physical Condition</el-col>
            <el-col :span="6">Jurisdiction</el-col>
            <el-col :span="6">Voting Method</el-col>
            <el-col :span="6">Polling Place</el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.physicalCondition }}</el-col>
            <el-col :span="6">{{ info.jurisdiction }}</el-col>
            <el-col :span="6">{{ info.birthday }}</el-col>
            <el-col :span="6">{{ info.pollingPlace }}</el-col>
          </el-row>
          <el-row class="form-title">
            <el-col :span="6">Phone Number</el-col>
            <el-col :span="6">Finger Prints</el-col>
            <el-col :span="6">Signature</el-col>
            <el-col :span="6">Registration Time</el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.phoneNumber }}</el-col>
            <el-col :span="6">
              <span v-if="info.fingerprints != null">Collected</span>
              <span v-else>Not Collected</span>
            </el-col>
            <el-col :span="6">
              <span v-if="info.signature != null">Collected</span>
              <span v-else>Not Collected</span>
            </el-col>
            <el-col :span="6">{{ info.registrationTime }}</el-col>
          </el-row>
          <el-row class="form-title">
            <el-col :span="6">R-Receipt Number</el-col>
            <el-col :span="6">R-Device ID</el-col>
            <el-col :span="6">Verification Time</el-col>
            <el-col :span="6">V-Receipt Number</el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.rReceiptNumber }}</el-col>
            <el-col :span="6">{{ info.rDeviceId }}</el-col>
            <el-col :span="6">{{ info.verificationTime }}</el-col>
            <el-col :span="6">{{ info.vReceiptNumber }}</el-col>
          </el-row>
          <el-row class="form-title">
            <el-col :span="6">V-Device ID</el-col>
            <el-col :span="6">Status</el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row class="form-info">
            <el-col :span="6">{{ info.vDeviceId }}</el-col>
            <el-col :span="6">{{ info.status }}</el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </div>
        <div class="form-button">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Save</el-button>
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
  </div>
</template>

<script>
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      info: {},
      baseurl: "http://36.41.69.47:8899/prod-api",
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
      // this.$msgbox
      //   .confirm(`Are you sure you want to clear form?`, "System Info", {
      //     confirmButtonText: "Confirm",
      //     cancelButtonText: "Cancel",
      //     type: "warning",
      //   })
      //   .then(() => {
      //     console.log("this.formInline", this.formInline);
      //     this.formInline = {
      //       userName: "",
      //       Password: "",
      //       fullName: "",
      //       gender: "",
      //       userType: "",
      //       roleIds: [],
      //       position: "",
      //       jurisdictionId: "",
      //       phoneNumber: "",
      //       digitalCertificates: "",
      //       status: 0,
      //     };
      //   });
      this.$router.push({ path: "/VoterManagement" });
    },
    saveForm() {
      this.$router.push({ path: "/VoterManagement" });
      // this.$refs.ruleForm.validate((valid) => {
      //   if (!valid) {
      //     return this.$message.error(
      //       "please finish the required form validation"
      //     );
      //   }
      // });
      // console.log("this.formInline", this.formInline);
      // addUser(this.formInline).then((res) => {
      //   console.log("res", res);
      //   if (res.code == 200) {
      //     this.$router.push({ path: "/SystemAdministration" });
      //   }
      // });
    },
  },
  created() {
    console.log("this.$route.query", this.$route.query);
    this.info = this.$route.query;
  },
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
  height: 100%;
  .citizenship {
    width: 100%;
    height: 100%;
    // border: 1px salmon solid;
    display: flex;
    .avatar-pic {
      width: 100%;
      // height: 200px;
      // border: 1px salmon solid;
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
    height: 100%;
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 900;
      height: 30px;
      line-height: 30px;
      margin-bottom: 20px;
    }
  }
  .right {
    width: calc(100% - 260px);
    height: 100%;
    // border: 1px springgreen solid;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    .form {
      padding-top: 20px;
      height: calc(100% - 32px - 40px - 40px);
      overflow-y: auto;
      .form-title {
        background-color: #e1e3e6;
        font-size: 18px;
        font-weight: 900;
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
      }
      .form-info {
        font-size: 16px;
        height: 70px;
        line-height: 40px;
        padding-left: 10px;
      }
    }
  }
}
</style>
