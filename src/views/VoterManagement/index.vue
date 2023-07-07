<template>
  <div class="voter-case">
    <div class="princict-tree">
      <el-tree
        :data="treeData"
        class="filter-tree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
    <div class="voter-list">
      <div class="header">
        <div class="header-left">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-bottom"
              size="small"
              disabled
              >Import</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              size="small"
              disabled
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
          <el-button
            type="primary"
            size="small"
            icon="el-icon-download"
            disabled
            >Download Ballots</el-button
          >
          <el-button type="primary" size="small" icon="el-icon-top" disabled
            >Export</el-button
          >
        </div>
      </div>
      <div class="search">
        <!-- <div class="search-unit">
          <el-input
            v-model="userName"
            size="small"
            suffix-icon="el-icon-search"
            class="search-item"
            clearable
            @input="handleQuery"
            placeholder="search for voter by name and/or document number"
          >
          </el-input>
        </div> -->
        <div class="search-unit">
          <div class="search-title">Name</div>
          <el-input
            v-model="name"
            size="small"
            suffix-icon="el-icon-search"
            class="search-item"
            clearable
            @input="handleQuery"
          >
          </el-input>
        </div>
        <div class="search-unit">
          <div class="search-title">Document Number</div>
          <el-input
            v-model="documentNumber"
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
          ref="tableData"
          row-key="id"
          @selection-change="getCheckBoxList"
          @row-click="more"
          stripe
          max-width="100%"
          height="100%"
        >
          <el-table-column
            type="selection"
            min-width="2%"
            :reserve-selection="true"
          ></el-table-column>
          <el-table-column type="index" width="80px" label="SN" align="center">
          </el-table-column>
          <!-- <el-table-column
            prop="photo"
            label="Photo"
            width="80px"
            align="center"
            show-overflow-tooltip
          >
            <el-popover placement="right" width="80" trigger="click">
              <img src="@/assets/img/photo.jpg" alt="" class="avatar-pic" />
              <span class="view" slot="reference">view</span>
            </el-popover>
          </el-table-column> -->
          <el-table-column
            prop="fullName"
            label="Name"
            align="left"
            width="200px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            width="80px"
            align="center"
          >
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.status">
                {{ scope.row.status }}
              </span>
              <span v-else> / </span>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="gender"
            label="Gender"
            width="70px"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.gender == 0">female</span>
              <span v-if="scope.row.gender == 1">male</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="Birthday"
            width="120px"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="age"
            label="Age"
            align="center"
            width="60px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="adress"
            label="Address"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="votingMeathod"
            label="Voting Method"
            width="180px"
            align="center"
          >
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.jurisdiction">
                {{ scope.row.jurisdiction }}
              </span>
              <span v-else> / </span>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="jurisdiction"
            label="Jurisdiction"
            width="180px"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="pollingPlace"
            label="Polling Place"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="documentType"
            label="Document Type"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="documentNumber"
            label="Document Number"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="physicalCondition"
            label="Physical Condition"
            align="center"
            width="90px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="registrationTime"
            label="Registration Time"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="verificationTime"
            label="Verification Time"
            align="center"
            width="180px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            label="Ballots"
            prop="status"
            align="center"
            :show-overflow-tooltip="true"
            width="220px"
          >
            <template slot-scope="scope">
              <!-- <span class="more" @click="more(scope.row)"
                ><i class="el-icon-more"></i>
              </span> -->
              <span class="operation" @click="view(scope.row)"
                ><i class="el-icon-view"></i>
              </span>
              <span @click="download(scope.row)" class="operation"
                ><i class="el-icon-bottom"></i>
              </span>
              <span @click="refresh(scope.row)" class="operation"
                ><i class="el-icon-refresh-left"></i>
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
          @pagination="getVoterList"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { getGeographyList } from "@/api/geography.js";
import { getVoterList, deleteVoter } from "@/api/voter.js";
import { handleTree } from "@/utils/ruoyi";

export default {
  components: { Pagination },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "districtName",
      },
      name: "",
      documentNumber: "",
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log("data", data);
      this.jurisdiction = data.districtName + "," + data.id;
      this.handleQuery();
    },
    getVoterList() {
      this.loading = true;
      let query = {
        fullName: this.name,
        documentNumber: this.documentNumber,
        jurisdiction: this.jurisdiction,
      };
      getVoterList(query).then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.rows);
          // res.rows.map((row) => {
          //   row.roleName = "";
          //   row.roles.forEach((role) => {
          //     row.roleName += role.roleName + " ";
          //   });
          // });
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
        this.getVoterList();
      }, 300);
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    toAdd() {
      this.$router.push({ path: "/VoterManagement/AddVoter" });
    },
    more(row) {
      // alert(row);
      console.log("row", row);
      this.$router.push({ path: "/VoterManagement/AddVoter", query: row });
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

    /** 删除按钮操作 */
    handleDelete() {
      console.log("this.checkedIds", this.checkedIds);
      if (this.checkedIds.length == 0)
        return this.$message.info("please select from the list");
      this.$msgbox
        .confirm(`Are you sure you want to delete?`, "System Info", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          deleteVoter(this.checkedIds)
            .then((res) => {
              if (res.code == 200) {
                this.getVoterList();
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
  created() {
    this.getGeographyList();
    this.getVoterList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.voter-case {
  height: 100%;
  width: 100%;
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
  .voter-list {
    width: calc(100% - 260px);
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
      height: calc(100% - 120px - 32px - 20px);
      width: 100%;
      margin-bottom: 20px;
      // overflow-x: auto;
      // overflow: auto;
      .more {
        color: #5a9cf8;
        cursor: pointer;
        margin-right: 10px;
      }
      .view {
        color: #5a9cf8;
        cursor: pointer;
      }
      .operation {
        // color: #5a9cf8;
        color: #d4d4d7;
        cursor: not-allowed;
        margin-right: 10px;
      }
      ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
        overflow: auto !important;
      }
      ::v-deep .el-table__fixed-right-patch {
        background-color: #f5f7fa !important;
      }
    }
    .page {
      height: 32px;
    }
  }
  ::v-deep .el-tree-node:focus > .el-tree-node__content {
    border-right: 2px solid #3e82f4 !important;
  }
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
    height: 8px; /*滚动条高度*/
  }
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
    border-radius: 10px; /*滚动条的背景区域的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
    background-color: #eeeeee; /*滚动条的背景颜色*/
  }
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px; /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
    background-color: rgb(145, 143, 143); /*滚动条的背景颜色*/
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
