<template>
  <div class="test">
    <div class="princict-tree">
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        highlight-current
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Name" prop="userName">
              <el-input
                v-model="formInline.userName"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="formInline.password"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Full Name" prop="fullName">
              <el-input
                v-model="formInline.fullName"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Gender" prop="gender">
              <el-select v-model="formInline.gender" style="width: 300px">
                <el-option label="Male" value="1"></el-option>
                <el-option label="Female" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Type" prop="userType">
              <el-select v-model="formInline.userType" style="width: 300px">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Authority" prop="roleIds">
              <el-select
                v-if="formInline.userType == 1"
                v-model="formInline.roleId"
                style="width: 300px"
                @change="printAuthority"
              >
                <el-option
                  v-for="item in authorityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-else
                v-model="formInline.roleIds"
                style="width: 300px"
                multiple
                @change="printAuthority"
              >
                <el-option
                  v-for="item in authorityOptions"
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
                placeholder="Click on the left precinct list to enter"
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
        </el-row>
        <el-form-item class="form-button">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getGeographyList } from "@/api/geography.js";
import { getRoleList, addUser } from "@/api/user";
import { handleTree } from "@/utils/custom";

export default {
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "districtName",
      },
      formInline: {},
      rules: {
        userName: [
          {
            required: true,
            message: "please input user name",
            trigger: "blur",
          },
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
        // roleIds: [
        //   {
        //     required: true,
        //     message: "please set authority",
        //     trigger: "change",
        //   },
        // ],
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
      typeOptions: [
        {
          label: "System User",
          value: 1,
        },
        {
          label: "Equipment User",
          value: 2,
        },
      ],
      systemUserAuthorityList: [],
      equipmentUserAuthorityList: [],
      authorityOptions: [],
    };
  },
  watch: {
    "formInline.userType": {
      handler(nv) {
        this.getAuthority(nv);
      },
    },
  },
  methods: {
    printAuthority() {
      console.log(this.formInline);
    },
    initForm() {
      this.formInline = {
        userName: "",
        password: "",
        fullName: "",
        gender: "1",
        userType: 1,
        roleId: "",
        roleIds: [],
        position: "",
        jurisdictionId: `${this.treeData[0].districtName} , ${this.treeData[0].idNumber}`,
        phoneNumber: "",
        digitalCertificates: "",
        status: 0,
      };
      this.getAuthority(1);
      this.$refs.ruleForm.clearValidate();
    },
    getGeographyList() {
      return getGeographyList().then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.geographyList = res.data;
          this.treeData = handleTree(this.geographyList);
          console.log("tree", this.treeData);
        }
      });
    },
    //获取authority菜单
    getAuthority(nv) {
      this.authorityOptions = [];
      if (nv == 1) {
        this.systemUserAuthorityList.map((item) => {
          this.authorityOptions.push({
            label: item.roleName,
            value: item.roleId,
          });
        });
        this.formInline.roleId = this.authorityOptions[0].value;
        this.formInline.roleIds = [];
        this.rules.roleId = [
          {
            required: true,
            message: "please set authority",
            trigger: "change",
          },
        ];
        this.rules.roleIds = null;
      } else if (nv == 2) {
        this.equipmentUserAuthorityList.map((item) => {
          this.authorityOptions.push({
            label: item.roleName,
            value: item.roleId,
          });
        });
        this.formInline.roleId = "";
        this.formInline.roleIds = [this.authorityOptions[0].value];
        this.rules.roleIds = [
          {
            required: true,
            message: "please set authority",
            trigger: "change",
          },
        ];
        this.rules.roleId = null;
      }
      this.$refs.ruleForm.clearValidate();
      console.log("this.authorityOptions", this.authorityOptions);
    },
    getSystemUserAuthorityList() {
      return getRoleList({
        roleType: 1,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.systemUserAuthorityList = res.rows;
        }
      });
    },
    getEquipmentUserAuthorityList() {
      return getRoleList({
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
      this.$set(
        this.formInline,
        "jurisdictionId",
        `${data.districtName} , ${data.idNumber}`
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
          this.initForm();
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
          //判断是回系统管理页还是设备管理页
          let { info } = this.$route.query;
          if (info == "toAddEquipmentUser")
            this.$router.push({ path: "/EquipmentManagement/Add" });
          else this.$router.push({ path: "/SystemAdministration" });
        }
      });
    },
    changeStatus() {
      this.$set(this.formInline, "status", this.formInline.status == 0 ? 1 : 0);
    },
    toAddDigital() {},
  },
  async created() {
    await this.getGeographyList();
    await this.getSystemUserAuthorityList();
    await this.getEquipmentUserAuthorityList();
    this.initForm();
    if (this.$route.query) {
      let { info } = this.$route.query;
      console.log("info", info);
      if (info == "toAddEquipmentUser") this.formInline.userType = 2;
    }
  },
  mounted() {
    this.$nextTick(function () {});
  },
};
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
  display: flex;
  .princict-tree {
    width: 260px;
    height: 100%;
    border-right: 1px solid #d4d4d7;
    padding: 10px 0;
    .filter {
      //   width: 90%;
    }
  }

  .content {
    flex: 1;
    // border: 1px solid red;
    padding: 50px 20px;
    .form-button {
      display: flex;
      justify-content: center;
      margin-top: 40px;
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
  ::v-deep .el-tree-node:focus > .el-tree-node__content {
    border-right: 2px solid #3e82f4 !important;
  }

  ::v-deep .el-form-item .el-select {
    width: 100%;
  }

  ::v-deep .el-row {
    margin-bottom: 30px;
  }
  ::v-deep .el-tree-node__content {
    height: 40px;
  }
}
</style>
