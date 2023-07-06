<template>
  <div class="candidate">
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
            disabled
            >Add</el-button
          >
          <el-button type="primary" icon="el-icon-delete" size="small" disabled
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
        <div class="search-title">Elective Position</div>
        <el-select
          v-model="position"
          filterable
          size="small"
          class="search-item"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in positionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-unit">
        <div class="search-title">Political Party</div>
        <el-select
          v-model="party"
          filterable
          size="small"
          class="search-item"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in partyOptions"
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
        <!-- <el-table-column
          type="selection"
          min-width="2%"
          :reserve-selection="true"
        ></el-table-column> -->
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
          prop="Name"
          label="Election Event"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="Gender"
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
          prop="fullName"
          label="Election Event"
          align="left"
          min-width="20%"
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
          label="Elective Position"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">female</span>
            <span v-if="scope.row.sex == 1">male</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="CandidatesOrder"
          label="Candidates Order"
          min-width="15%"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.authority == 0">female</span>
            <span v-if="scope.row.authority == 1">male</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="Political Party"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.authority == 0">female</span>
            <span v-if="scope.row.authority == 1">male</span>
          </template> -->
        </el-table-column>

        <el-table-column
          prop="roleName"
          label="Jurisdiction"
          min-width="10%"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.authority == 0">female</span>
            <span v-if="scope.row.authority == 1">male</span>
          </template> -->
        </el-table-column>

        <!-- <el-table-column
          label="Operation"
          prop="Operation"
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
            <span v-else @click="changeStatus(scope.row)" class="status-unlock"
              ><i class="el-icon-unlock"></i>
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
        @pagination="getGeographyList"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { getGeographyList } from "@/api/geography.js";
export default {
  components: { Pagination },
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      position: "",
      positionOptions: [
        { label: "all", value: "" },
        {
          label: "President",
          value: 1,
        },
        {
          label: "Vice-President",
          value: 2,
        },
        {
          label: "Party List",
          value: 3,
        },
      ],
      party: "",
      partyOptions: [
        { label: "all", value: "" },
        { label: "party1", value: "1" },
        { label: "party2", value: "2" },
      ],
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
  watch: {},
  methods: {
    getGeographyList() {
      getGeographyList().then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.geographyList = res.data;
          // this.treeData = handleTree(this.geographyList);
          // console.log("tree", this.treeData);
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
    /** 删除按钮操作 */
  },
  created() {
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
.candidate {
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
