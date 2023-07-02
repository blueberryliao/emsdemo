<template>
  <div class="test">
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
        class="demo-form-inline"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Name">
              <el-input
                v-model="formInline.userName"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password">
              <el-input
                v-model="formInline.password"
                style="width: 300px"
              ></el-input>
              <!-- <el-select v-model="formInline.password">
                
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Full Name">
              <el-input
                v-model="formInline.fullName"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Gender">
              <el-select v-model="formInline.gender" style="width: 300px">
                <el-option label="male" value="0"></el-option>
                <el-option label="female" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="User Type">
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
            <el-form-item label="Authority">
              <el-select v-model="formInline.authority" style="width: 300px">
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
            <el-form-item label="Position">
              <el-input
                v-model="formInline.position"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Jurisdiction">
              <el-input
                v-model="formInline.jurisdictionId"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Phone Number">
              <el-input
                v-model="formInline.phoneNumber"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Digital Certificates">
              <el-input
                v-model="formInline.digitalCertificates"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Status">
              <el-input
                v-model="formInline.status"
                style="width: 300px"
              ></el-input>
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
      formInline: {},
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
        // this.formInline.authority = "";
        if (nv == 1) {
          this.systemUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleName,
            });
          });
        } else if (nv == 2) {
          this.equipmentUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleName,
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
    cancel() {},
    saveForm() {
      console.log("this.formInline", this.formInline);
      addUser(this.formInline).then((res) => {
        console.log("res", res);
      });
    },
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
