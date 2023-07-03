<template>
  <div class="add-equipment">
    <div class="princict-tree">
      <!-- <div class="filter">
        <el-input
          placeholder=""
          v-model="filterText"
          clearable
          suffix-icon="el-icon-search"
        >
        </el-input>
      </div> -->

      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
    <div class="content">
      <el-form
        :inline="true"
        :model="formInline"
        :rules="rules"
        ref="ruleForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <div class="top">
          <div class="title-box">
            <div class="title">Basic Information</div>
            <div class="op">
              scan the bar code on the device to quickly input information
              <i class="el-icon-full-screen"></i>
            </div>
          </div>

          <el-row>
            <el-col :span="12">
              <el-form-item label="Device Type" prop="deviceType">
                <el-select v-model="formInline.deviceType" style="width: 300px">
                  <el-option
                    v-for="item in deviceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Device Id" prop="deviceId">
                <el-input
                  v-model="formInline.deviceId"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Use" prop="use">
                <el-select v-model="formInline.use" style="width: 300px">
                  <el-option
                    v-for="item in useOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ballot Type" prop="ballotType">
                <el-select v-model="formInline.ballotType" style="width: 300px">
                  <el-option
                    v-for="item in ballotTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Jurisdiction" prop="jurisdictionId">
                <el-input
                  v-model="formInline.jurisdictionId"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Location" prop="location">
                <el-input
                  v-model="formInline.location"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="Position" prop="position">
              <el-input
                v-model="formInline.position"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Jurisdiction" prop="jurisdictionId">
              <el-input
                v-model="formInline.jurisdictionId"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Phone Number" prop="phoneNumber">
              <el-input
                v-model="formInline.phoneNumber"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Digital Certificates"
              prop="digitalCertificates"
            >
              <span @click="toAddDigital" class="digital"
                ><i class="el-icon-circle-plus-outline"></i>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Status" prop="status">
              <span
                v-if="formInline.status == 1"
                class="status-lock"
                @click="changeStatus()"
                ><i class="el-icon-lock"></i>
              </span>
              <span v-else @click="changeStatus()" class="status-unlock"
                ><i class="el-icon-unlock"></i>
              </span>
            </el-form-item>
          </el-col>
        </el-row> -->
        <div class="middle">
          <div class="title-box">
            <div class="title">
              Authorized User
              <i class="el-icon-circle-plus-outline"></i>
            </div>
            <div class="op"></div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="User1" prop="user1">
                <el-input
                  v-model="formInline.user1"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="User2" prop="user2">
                <el-input
                  v-model="formInline.user2"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <div class="title-box">
            <div class="title">Fucntionalities Configuration</div>
            <div class="op"></div>
          </div>
          <div class="extra-info">
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="checked"
                  >Vote review in the screen</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                View period
                <span class="empty-block">**</span>
                s
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="checked"
                  >Printing of vote receipt</el-checkbox
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="checked"
                  >Ballot security mark detection</el-checkbox
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-checkbox v-model="checked"
                  >Ballot divert</el-checkbox
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="checked"
                  >Vote timeout locking</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                Voting period
                <span class="empty-block">**</span>
                s
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="checked"
                  >Pre-vote before official vote</el-checkbox
                ></el-col
              >
              <el-col :span="12">
                Voting period
                <span class="empty-block">**</span>
                s
              </el-col>
            </el-row>
          </div>
        </div>

        <el-form-item class="form-button">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getGeographyList } from "../../../api/geography.js";
import { getRoleList, addUser } from "@/api/user";
import { handleTree } from "@/utils/ruoyi";

export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "districtName",
      },
      formInline: {
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
      },
      rules: {
        userName: [
          {
            required: true,
            message: "please input user name",
            trigger: "blur",
          },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" },
        ],
        fullName: [
          {
            required: true,
            message: "please input full name",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "please choose user type",
            trigger: "change",
          },
        ],
        roleIds: [
          {
            required: true,
            message: "please set authority",
            trigger: "change",
          },
        ],
        position: [
          {
            required: true,
            message: "please input position",
            trigger: "blur",
          },
        ],
        jurisdictionId: [
          {
            required: true,
            message: "please click the jurisdiction ",
            trigger: "change",
          },
        ],
      },
      geographyList: [],
      deviceTypeOptions: [
        {
          label: "System User",
          value: 1,
        },
        {
          label: "Equipment User",
          value: 2,
        },
      ],
      useOptions: [],
      ballotTypeOptions: [],
      systemUserAuthorityList: [],
      equipmentUserAuthorityList: [],
      authorityOptions: [],
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
    //   $route: "routeHandle",
    "formInline.userType": {
      handler(nv) {
        this.authorityOptions = [];
        this.$set(this.formInline, "roleIds", []);
        // this.formInline.roleIds = "";
        if (nv == 1) {
          this.systemUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleId,
            });
          });
        } else if (nv == 2) {
          this.equipmentUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleId,
            });
          });
        }
        console.log("this.authorityOptions", this.authorityOptions);
      },
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    getGeographyList() {
      getGeographyList().then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.geographyList = res.data;
          this.treeData = handleTree(this.geographyList);
          console.log("tree", this.treeData);
        }
      });
    },
    //获取authority菜单
    getRoleList() {
      getRoleList({
        roleType: 1,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.systemUserAuthorityList = res.rows;
        }
      });
      getRoleList({
        roleType: 2,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.equipmentUserAuthorityList = res.rows;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log("data", data);
      // districtName id
      this.$set(
        this.formInline,
        "jurisdictionId",
        `${data.districtName} , ${data.id}`
      );
    },
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
    changeStatus() {
      this.$set(this.formInline, "status", this.formInline.status == 0 ? 1 : 0);
    },
    toAddDigital() {},
  },
  created() {
    this.getGeographyList();
    this.getRoleList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.add-equipment {
  width: 100%;
  height: 100%;
  display: flex;
  .princict-tree {
    width: 260px;
    height: 100%;
    border-right: 1px solid #d4d4d7;
    padding: 10px;
    .filter {
      //   width: 90%;
    }
  }
  .content {
    flex: 1;
    // border: 1px solid red;
    padding: 20px 40px;

    .top {
      height: 260px;
      // border: #5a9cf8 1px solid;
      padding-bottom: 20px;
    }
    .middle {
      height: 160px;
      // border: #5a9cf8 1px solid;
      padding-bottom: 20px;
      overflow: auto;
    }
    .bottom {
      height: 400px;
      border: #5a9cf8 1px solid;
    }
    .title-box {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      // justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: bold;
        width: 300px;
      }
      .op {
      }
    }
    .extra-info {
      padding: 0 30px;
      .empty-block {
        border: #5a9cf8 1px solid;
        width: 10px;
        height: 10px;
      }
    }
    .count {
      height: 15px;
      // width: 30px;
    }
    .form-button {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .digital {
      font-size: 22px;
      color: #d4d4d7;
      cursor: not-allowed;
    }
    .status-lock {
      font-size: 22px;
      color: #ae3d2e;
      cursor: pointer;
    }
    .status-unlock {
      font-size: 22px;
      color: #5a9cf8;
      cursor: pointer;
    }
  }

  ::v-deep .el-form-item .el-select {
    width: 100%;
  }

  ::v-deep .el-row {
    // margin-bottom: 10px;
  }
  ::v-deep .el-tree-node__content {
    height: 40px;
  }
}
</style>
