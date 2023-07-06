<template>
  <div class="test">
    <div class="princict-tree">
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
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
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
                v-model="formInline.roleIds"
                multiple
                style="width: 300px"
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
  watch: {},
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
.test {
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
