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
            align="center"
            :index="indexMethod"
          >
          </el-table-column>
          <el-table-column
            prop="photo"
            label="Photo"
            min-width="8%"
            align="center"
            show-overflow-tooltip
          >
            view
          </el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            min-width="8%"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status">
                {{ scope.row.password }}
              </span>
              <span v-else> ****** </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            align="left"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="sex"
            label="Gender"
            min-width="8%"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.sex == 0">female</span>
              <span v-if="scope.row.sex == 1">male</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="Birthday"
            min-width="15%"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="age"
            label="Age"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="Address"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="votingMethod"
            label="Voting Method"
            min-width="8%"
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
            prop="jurisdicton"
            label="Jurisdiction"
            min-width="10%"
            align="center"
            :show-overflow-tooltip="true"
          >
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.digitalCertificate">
                {{ scope.row.digitalCertificate }}
              </span>
              <span v-else> / </span>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="pollingPlace"
            label="Polling Place"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="documentType"
            label="Document Type"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="documentNumber"
            label="Document Number"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="physicalCondition"
            label="Physical Condition"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="registrationTime"
            label="Registration Time"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="verificationTime"
            label="Verification Time"
            align="center"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            fixed="right"
            label="Ballots"
            prop="status"
            align="center"
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
              <span
                v-else
                @click="changeStatus(scope.row)"
                class="status-unlock"
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
          @pagination="getVoterList"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { getGeographyList } from "@/api/geography.js";
import { getVoterList } from "@/api/voter.js";
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
  watch: {
    //观察
    // $route: "routeHandle",
    // type: {
    //   handler(nv) {
    //     this.authorityOptions = [{ label: "all", value: "" }];
    //     if (nv == 1) {
    //       this.systemUserAuthorityList.map((item) => {
    //         this.authorityOptions.push({
    //           label: item.roleName,
    //           value: item.roleKey,
    //         });
    //       });
    //     } else if (nv == 2) {
    //       this.equipmentUserAuthorityList.map((item) => {
    //         this.authorityOptions.push({
    //           label: item.roleName,
    //           value: item.roleKey,
    //         });
    //       });
    //     }
    //   },
    // },
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
    getVoterList() {
      this.loading = true;
      let query = {
        // userName: this.userName,
        // fullName: this.fullName,
        // userType: this.type,
        // authority: this.authority,
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
        if (res.code == 200) this.getVoterList();
      });
    },
    /** 删除按钮操作 */
    handleDelete() {
      console.log("this.checkedIds", this.checkedIds);
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
                this.getVoterList();
                this.$message.success("deleted successfully");
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
  padding-bottom: 20px;
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
  .voter-list {
    width: calc(100% - 260px);
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
      width: 100%;
      overflow-x: auto;
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
}
</style>
