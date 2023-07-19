<template>
  <div class="candidates">
    <div class="search">
      <div class="search-left"></div>
      <div class="search-right">
        <el-button type="primary" size="small" icon="el-icon-top" disabled
          >Export</el-button
        >
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
        height="100%"
        ref="tableData"
        row-key="userId"
        @selection-change="getCheckBoxList"
        stripe
      >
        <el-table-column
          prop="ageGroup"
          label="Contest"
          min-width="28%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="Candidates"
          min-width="28%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="recordedTime"
          label="Votes"
          align="center"
          min-width="30%"
          :show-overflow-tooltip="true"
        >
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
import { getUserList, changeStatus } from "@/api/user";
import { getRoleList, deleteUser } from "@/api/user";
import Pagination from "@/components/Pagination/index.vue";

export default {
  components: { Pagination },
  data() {
    return {
      date1: "",
      userName: "",
      fullName: "",
      type: "",
      typeOptions: [
        { label: "all", value: "" },
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
      authorityOptions: [{ label: "all", value: "" }],
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
  //   },
  watch: {
    //观察
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
      console.log("query", query);
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
    // selectable(row, index) {
    //   if (row.status == 0) return false;
    //   //禁用
    //   else return true; //可选
    // },
    //表格连续序号
    // indexMethod(index) {
    //   let curpage = this.pageNum; //单前页码，具体看组件取值
    //   let limitpage = this.pageSize; //每页条数，具体是组件取值
    //   return index + 1 + (curpage - 1) * limitpage;
    // },
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
      if (this.checkedIds.length == 0)
        return this.$message.info("please select from the list");
      // this.$modal.confirm(`Are you sure you want to delete?`);
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
    // this.getUserList();
    // this.getRoleList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.candidates {
  height: 100%;
  width: 100%;
  // padding-bottom: 20px;
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
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .search-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
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
    height: calc(100% - 120px);
    margin-bottom: 20px;
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
