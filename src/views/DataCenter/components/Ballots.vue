<!-- @format -->

<template>
  <div class="ballots">
    <div class="search">
      <div class="search-left">
        <div class="search-unit">
          <div class="search-title">Jurisdiction</div>
          <el-cascader
            v-model="jurisdictionValue"
            :options="JurisdictionOptions"
            @change="handleQuery"
            placeholder="All"
            clearable
          ></el-cascader>
        </div>
        <div class="search-unit">
          <div class="search-title">Level</div>
          <el-select
            v-model="level"
            filterable
            size="small"
            class="search-item"
            placeholder="All"
            clearable
            @change="handleQuery"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
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
          label="Jurisdiction"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="Level"
          min-width="8%"
          align="center"
        >
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.password">
              {{ scope.row.password }}
            </span>
            <span v-else> ****** </span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="recordedTime"
          label="Device Type"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="voterNumber"
          label="Device ID"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="registeredVoters"
          label="Registered Voters"
          min-width="12%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="receivedBallots"
          label="Received Ballots"
          align="center"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="local"
          label="Forged Ballots"
          align="center"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="overseas"
          label="Pre-scanned Ballots"
          min-width="10%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="disabled"
          label="Valid-Vote Contests"
          min-width="10%"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="disabled"
          label="Under-Vote Contests"
          min-width="11%"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="disabled"
          label="Over-Vote Contests"
          min-width="10%"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="page">
			<Pagination
				:total="total"
				:page.sync="pageNum"
				:limit.sync="pageSize"
				@pagination="getDataCentreBallots"
			></Pagination>
		</div> -->
  </div>
</template>

<script>
import { getDataCentreBallots } from "@/api/ballot";
import Pagination from "@/components/Pagination/index.vue";
import { getGeographyList } from "@/api/geography.js";
import { handleTree } from "@/utils/custom";
export default {
  components: { Pagination },
  props: {
    toRender: {
      default: false,
    },
  },
  data() {
    return {
      level: "",
      levelOptions: [
        {
          label: "Nation",
          value: "Nation",
        },
        {
          label: "Province",
          value: "Province",
        },
        {
          label: "District",
          value: "District",
        },
        {
          label: "City",
          value: "City",
        },
        {
          label: "Municipal",
          value: "Municipal",
        },
        {
          label: "Barangy",
          value: "Barangy",
        },
        {
          label: "Clustered Precinct",
          value: "Clustered Precinct",
        },
        {
          label: "Precinct",
          value: "Precinct",
        },
        {
          label: "Special Grouping",
          value: "Special Grouping",
        },
        {
          label: "Post",
          value: "Post",
        },
        {
          label: "Embassy",
          value: "Embassy",
        },
        {
          label: "Polling Station",
          value: "Polling Station",
        },
      ],
      jurisdiction: "",
      //   jurisdictionOptions: [{ label: "all", value: "" }],
      jurisdictionValue: [],
      JurisdictionOptions: [],
      treeData: [],
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
    toRender(newV) {
      console.log("newV", newV);
      this.getDataCentreBallots();
    },
  },
  methods: {
    getDataCentreBallots() {
      this.loading = true;
      let query = {
        jurisdiction: this.jurisdiction,
        level: this.level,
      };
      console.log(query);
      getDataCentreBallots(query).then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.rows);
          this.tableData = res.rows;
          // this.total = res.total;
          this.loading = false;
        }
      });
    },
    getGeographyList() {
      getGeographyList().then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.geographyList = res.data;
          this.treeData = handleTree(res.data);
          this.treeData.forEach((node) => {
            this.getOps(node);
          });
          console.log("tree", this.treeData);
          this.JurisdictionOptions = this.treeData;
        }
      });
    },
    getOps(node) {
      node.label = `${node.districtName},${node.idNumber}`;
      node.value = `${node.districtName},${node.idNumber}`;
      if (node.children) {
        node.children.forEach((i) => {
          this.getOps(i);
        });
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.jurisdictionValue.length > 0)
        this.jurisdiction =
          this.jurisdictionValue[this.jurisdictionValue.length - 1];
      else this.jurisdiction = "";
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // this.pageNum = 1;
        this.getDataCentreBallots();
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
        if (res.code == 200) this.getDataCentreBallots();
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
                this.getDataCentreBallots();
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
    this.getDataCentreBallots();
    this.getGeographyList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.ballots {
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
