<template>
  <div class="equipment">
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
        <div class="search-title">Device Type</div>
        <el-select
          v-model="deviceType"
          filterable
          size="small"
          class="search-item"
          placeholder="All"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-unit">
        <div class="search-title">Use</div>
        <el-select
          v-model="use"
          filterable
          size="small"
          class="search-item"
          placeholder="All"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in useOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="search-unit">
        <div class="search-title">Jurisdiction</div>
        <el-input
          v-model="jurisdiction"
          size="small"
          suffix-icon="el-icon-search"
          class="search-item"
          clearable
          @input="handleQuery"
        >
        </el-input>
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
        row-key="id"
        @selection-change="getCheckBoxList"
        @row-click="toEdit"
        stripe
        :highlight-current-row="true"
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
          align="center"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="Device Type"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="Device ID"
          min-width="8%"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.deviceId">
              {{ scope.row.deviceId }}
            </span>
            <span v-else> ****** </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="use"
          label="Use"
          align="left"
          min-width="15%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.use }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userList"
          label="User List"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="jurisdiction"
          label="Jurisdiction"
          min-width="15%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="Location"
          align="center"
          min-width="15%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="Edit"
          align="center"
          :show-overflow-tooltip="true"
          min-width="5%"
        >
          <template slot-scope="scope">
            <span @click="toEdit(scope.row)" class="edit"
              ><i class="el-icon-edit"></i>
            </span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="page">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getEquipmentList"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { getEquipmentList, deleteEquipment } from "@/api/equipment";
import { getRoleList } from "@/api/user";
import Pagination from "../../components/Pagination/index.vue";

export default {
  components: { Pagination },
  data() {
    return {
      deviceType: "",
      // deviceTypeOptions: [
      //   { label: "All", value: "" },
      //   {
      //     label: "VRVM",
      //     value: "VRVM",
      //   },
      //   {
      //     label: "DRE",
      //     value: "DRE",
      //   },
      //   {
      //     label: "PCOS",
      //     value: "PCOS",
      //   },
      //   {
      //     label: "CCOS",
      //     value: "CCOS",
      //   },
      //   {
      //     label: "BMD",
      //     value: "BMD",
      //   },
      //   {
      //     label: "MPVD",
      //     value: "MPVD",
      //   },
      // ],
      deviceTypeOptions: [
        // { label: "All", value: "" }
      ],
      use: "",
      useOptions: [
        // { label: "All", value: "" },
        {
          label: "Registration",
          value: "Registration",
        },
        {
          label: "Verification",
          value: "Verification",
        },
        {
          label: "Voting",
          value: "Voting",
        },
        {
          label: "Counting",
          value: "Counting",
        },
        {
          label: "Marking",
          value: "Marking",
        },
      ],
      jurisdiction: "",
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
    // $route: "routeHandle",
  },
  methods: {
    getEquipmentList() {
      this.loading = true;
      let query = {
        deviceType: this.deviceType,
        use: this.use,
        jurisdiction: this.jurisdiction,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getEquipmentList(query).then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.rows);
          res.rows.map((row) => {
            row.userList = "";
            row.sysUserList.forEach((role) => {
              row.userList += role.userName + " ";
            });
          });
          this.tableData = res.rows;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    getDeviceOption() {
      return getRoleList({
        roleType: 2,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          res.rows.map((item) => {
            this.deviceTypeOptions.push({
              label: item.roleName.split(" ")[0],
              value: item.roleName.split(" ")[0],
            });
          });
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.pageNum = 1;
        this.getEquipmentList();
      }, 300);
    },

    toEdit(row) {
      console.log("row", row);
      this.$router.push({ path: "/EquipmentManagement/Add", query: row });
    },
    toAdd() {
      this.$router.push({ path: "/EquipmentManagement/Add" });
    },
    //获取选中的数据
    getCheckBoxList(val) {
      console.log(val);
      console.log("_____________________________");
      this.checkBoxList = val;
      this.checkedIds = [];
      this.checkBoxList.map((item) => {
        this.checkedIds.push(item.id);
      });
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
          deleteEquipment(this.checkedIds)
            .then((res) => {
              if (res.code == 200) {
                this.getEquipmentList();
                this.$message.success("deleted successfully");
                this.$refs.tableData.clearSelection();
                this.checkBoxList = [];
                this.checkedIds = [];
              }
            })
            .catch(() => {});
        });
    },
  },
  async created() {
    await this.getDeviceOption();
    this.getEquipmentList();
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
// * {
//   box-sizing: border-box;
// }
.equipment {
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
    .edit {
      color: #5a9cf8;
      cursor: pointer;
    }
  }
  .page {
    height: 32px;
  }
}
</style>
