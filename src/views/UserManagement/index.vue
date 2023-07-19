<template>
  <div class="user-list">
    <div class="header">
      <div class="header-left">
        <el-button-group>
          <el-button type="primary" icon="el-icon-bottom" size="small" disabled
            >Import</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="toAdd"
            >Add</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete"
            >Delete</el-button
          >
        </el-button-group>
      </div>
      <div class="header-right">
        <el-button type="primary" size="small" icon="el-icon-top" disabled
          >Export</el-button
        >
      </div>
    </div>
    <div class="search">
      <div class="search-unit">
        <div class="search-title">User Name</div>
        <el-input
          v-model="userName"
          size="small"
          suffix-icon="el-icon-search"
          class="search-item"
          clearable
          @input="handleQuery"
        >
        </el-input>
      </div>
      <div class="search-unit">
        <div class="search-title">Full Name</div>
        <el-input
          v-model="fullName"
          size="small"
          suffix-icon="el-icon-search"
          class="search-item"
          clearable
          @input="handleQuery"
        >
        </el-input>
      </div>

      <div class="search-unit">
        <div class="search-title">Type</div>
        <el-select
          v-model="type"
          filterable
          size="small"
          class="search-item"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-unit">
        <div class="search-title">Authority</div>
        <el-select
          v-model="authority"
          filterable
          size="small"
          class="search-item"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in authorityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
        :header-cell-style="{
          'background-color': '#f3f3f3',
        }"
        :data="tableData"
        style="width: 100%"
        ref="tableData"
        row-key="userId"
        @selection-change="getCheckBoxList"
        stripe
      >
        <el-table-column
          type="selection"
          min-width="2%"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column
          type="index"
          min-width="2%"
          width="80"
          label="SN"
          align="left"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="User Name"
          min-width="8%"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="Password"
          min-width="8%"
          align="left"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.password">
              {{ scope.row.password }}
            </span>
            <span v-else> ****** </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fullName"
          label="Full Name"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.fullName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="Gender"
          min-width="10%"
          align="left"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">female</span>
            <span v-if="scope.row.sex == 1">male</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="Authority"
          min-width="15%"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userType"
          label="User Type"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.userType == 1">Systerm user</span>
            <span v-if="scope.row.userType == 2">Equiment user</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="Positon"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.position">
              {{ scope.row.position }}
            </span>
            <span v-else> / </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="jurisdiction"
          label="Jurisdiction"
          min-width="8%"
          align="left"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.jurisdiction">
              {{ scope.row.jurisdiction }}
            </span>
            <span v-else> / </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="digitalCertificate"
          label="Digital Certificate"
          min-width="10%"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.digitalCertificate">
              {{ scope.row.digitalCertificate }}
            </span>
            <span v-else> / </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Status"
          prop="status"
          align="left"
          :show-overflow-tooltip="true"
          min-width="5%"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status == 1"
              class="status-lock"
              @click="changeStatus(scope.row)"
              ><i class="el-icon-lock"></i>
            </span>
            <span v-else @click="changeStatus(scope.row)" class="status-unlock"
              ><i class="el-icon-unlock"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getUserList"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { getUserList, changeStatus, getRoleList, deleteUser } from "@/api/user";
import Pagination from "@/components/Pagination/index.vue";

export default {
  components: { Pagination },
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      userName: "",
      fullName: "",
      type: "",
      typeOptions: [
        { label: "All", value: "" },
        {
          label: "System User",
          value: 1,
        },
        {
          label: "Equipment User",
          value: 2,
        },
      ],
      authority: "",
      authorityOptions: [{ label: "All", value: "" }],
      tableData: [],
      loading: false,
      checkBoxList: [],
      checkedIds: [],
      // 总条数
      total: 100,
      pageNum: 1,
      pageSize: 10,
      timer: null,
      systemUserAuthorityList: [],
      equipmentUserAuthorityList: [],
    };
  },
  watch: {
    //观察
    type: {
      handler(nv) {
        this.authorityOptions = [{ label: "All", value: "" }];
        this.authority = "";
        if (nv == 1) {
          this.systemUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleKey,
            });
          });
        } else if (nv == 2) {
          this.equipmentUserAuthorityList.map((item) => {
            this.authorityOptions.push({
              label: item.roleName,
              value: item.roleKey,
            });
          });
        }
      },
    },
  },
  methods: {
    getUserList() {
      this.loading = true;
      let query = {
        userName: this.userName,
        fullName: this.fullName,
        userType: this.type,
        authority: this.authority,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getUserList(query).then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.rows);
          res.rows.map((row) => {
            row.roleName = "";
            row.roles.forEach((role) => {
              row.roleName += role.roleName + " ";
            });
          });
          this.tableData = res.rows;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.pageNum = 1;
        this.getUserList();
      }, 300);
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    toAdd() {
      this.$router.push({ path: "/SystemAdministration/User" });
    },
    //获取选中的数据
    getCheckBoxList(val) {
      console.log(val);
      console.log("_____________________________");
      this.checkBoxList = val;
      this.checkedIds = [];
      this.checkBoxList.map((item) => {
        this.checkedIds.push(item.userId);
      });
    },
    //多选框的处理
    selectable(row, index) {
      if (row.status == 0) return false;
      //禁用
      else return true; //可选
    },
    //表格连续序号
    indexMethod(index) {
      let curpage = this.pageNum; //单前页码，具体看组件取值
      let limitpage = this.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    changeStatus(row) {
      console.log("row", row);
      let data = {
        userId: row.userId,
        status: row.status == 0 ? 1 : 0,
      };
      changeStatus(data).then((res) => {
        console.log("res", res);
        if (res.code == 200) this.getUserList();
      });
    },
    /** 删除按钮操作 */
    handleDelete() {
      console.log("this.checkedIds", this.checkedIds);
      // this.$modal.confirm(`Are you sure you want to delete?`);
      if (this.checkedIds.length == 0)
        return this.$message.info("please select from the list");
      this.$msgbox
        .confirm(`Are you sure you want to delete?`, "System Info", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          deleteUser(this.checkedIds)
            .then((res) => {
              if (res.code == 200) {
                this.getUserList();
                this.$message.success("deleted successfully");
                this.$refs.tableData.clearSelection();
                this.checkBoxList = [];
                this.checkedIds = [];
              }
            })
            .catch(() => {});
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
  },
  created() {
    this.getUserList();
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
// * {
//   box-sizing: border-box;
// }
.user-list {
  height: 100%;
  width: 100%;
  padding-bottom: 20px;
  .header {
    background-color: #d4d4d7;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      padding-left: 10px;
    }
    .header-right {
      padding-right: 10px;
    }
  }
  .search {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    .search-unit {
      margin-right: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-title {
        margin-right: 5px;
        // width: 100px;
      }
      .search-item {
        width: 200px;
      }
    }
  }
  .table {
    padding: 0 10px;
    height: calc(100% - 120px - 32px);
    overflow: auto;
    .status-lock {
      color: #ae3d2e;
      cursor: pointer;
    }
    .status-unlock {
      color: #5a9cf8;
      cursor: pointer;
    }
  }
  .page {
    height: 32px;
  }
}
</style>
