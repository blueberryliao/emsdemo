<template>
  <div class="event">
    <div class="header">
      <div class="header-left">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="toAdd"
          >Create Event
        </el-button>
        <!-- <el-button type="primary" icon="el-icon-delete" size="small"
            >Delete</el-button
          > -->
        <!-- </el-button-group> -->
      </div>
      <!-- <div class="header-right">
        <el-button type="primary" size="small" icon="el-icon-top"
          >Export</el-button
        >
      </div> -->
    </div>
    <!-- <div class="search">
      <div class="search-unit">
        <div class="search-title">User Name</div>
        <el-input
          v-model="userName"
          size="small"
          suffix-icon="el-icon-search"
          class="search-item"
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
        >
        </el-input>
      </div>

      <div class="search-unit">
        <div class="search-title">Type</div>
        <el-select v-model="type" filterable size="small" class="search-item">
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
    </div> -->
    <div class="table">
      <div class="info">
        There is no content available. Please click on
        <span>"Create Event"</span> to add an election event.
      </div>

      <!-- <el-table
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
          align="center"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="User Name"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="Password"
          min-width="8%"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.password">
              {{ scope.row.password }}
            </span>
            <span v-else> / </span>
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
            <span @click="() => taskDetail(scope.row)" class="task_name">
              {{ scope.row.taskName }}
            </span>
          </template>
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
          prop="authority"
          label="Authority"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userType"
          sortable="custom"
          label="User Type"
          align="center"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.userType == '00'">systerm user</span>
            <span v-if="scope.row.userType == 1">equiment user</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="Positon"
          align="center"
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
          align="center"
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
          align="center"
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
          align="center"
          :show-overflow-tooltip="true"
          min-width="5%"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status == 0"
              class="status"
              @click="changeStatus"
              ><i class="el-icon-lock"></i>
            </span>
            <span v-else @click="changeStatus"
              ><i class="el-icon-unlock"></i>
            </span>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
    <!-- <div class="page">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getUserList"
      ></Pagination>
    </div> -->
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
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
        // { label: "All", value: "" }
      ],
      authority: "",
      authorityOptions: [
        // { label: "All", value: "" }
      ],
      tableData: [],
      loading: false,
      checkBoxList: [],
      // 总条数
      total: 100,
      pageNum: 1,
      pageSize: 10,
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
  //   watch: {
  //     //观察
  //     $route: "routeHandle",
  //     keywordSearch: {
  //       handler(nv) {},
  //     },
  //   },
  methods: {
    getUserList() {
      this.loading = true;
      getUserList().then((res) => {
        if (res.code == 200) {
          console.log("res.rows", res.rows);
          this.tableData = res.rows;
          this.total = res.rows.lenght;
          this.loading = false;
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getUserList();
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    toAdd() {
      this.$router.push({ path: "/ElectionConfiguration/ElectionEvents" });
    },
    //获取选中的数据
    getCheckBoxList(val) {
      console.log(val);
      console.log("_____________________________");
      this.checkBoxList = val;
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
    changeStatus() {},
  },
  created() {
    this.getUserList();
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
.event {
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
    .info {
      padding: 20px;
      font-size: 16px;
      font-weight: 900;
      span {
        color: #5a9cf8;
      }
    }
    .status {
      color: #5a9cf8;
      cursor: pointer;
    }
  }
  .page {
    height: 32px;
  }
}
</style>
