<template>
  <div class="contest">
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
        <div class="search-title">Contest Name</div>
        <el-input
          v-model="contestName"
          size="small"
          suffix-icon="el-icon-search"
          class="search-item"
          clearable
          @input="handleQuery"
        >
        </el-input>
      </div>
      <div class="search-unit">
        <div class="search-title">Contest Type</div>
        <el-select
          v-model="contestType"
          filterable
          size="small"
          class="search-item"
          clearable
          placeholder="All"
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
        row-key="id"
        default-expand-all
        :tree-props="treeProps"
        stripe
      >
        <el-table-column
          prop="electionEvent"
          label="Election Event"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="contestName"
          label="Contest Name"
          min-width="8%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="contestType"
          label="Contest Type"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
          <!-- <template slot-scope="scope">
            <span>
              {{ scope.row.fullName }}
            </span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="candidatesNumber"
          label="Candidates Number"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="voteFor"
          label="Vote For"
          min-width="15%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="writeIn"
          label="Write-in"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="Add"
          prop="Operation"
          align="center"
          :show-overflow-tooltip="true"
          min-width="5%"
        >
          <template slot-scope="scope" v-if="scope.row.parentId == 0">
            <span class="add" @click="add(scope.row)"
              ><i class="el-icon-circle-plus"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="page">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getContestList"
      ></Pagination>
    </div> -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { handleTree } from "@/utils/custom";
import { getContestList } from "@/api/contest.js";
export default {
  components: { Pagination },
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      contestName: "",
      contestType: "",
      typeOptions: [
        // { label: "All", value: "" },
        {
          label: "Candidate",
          value: "candidate",
        },
        {
          label: "Question",
          value: "question",
        },
      ],
      authority: "",
      authorityOptions: [{ label: "ll", value: "" }],
      tableData: [],
      treeProps: { children: "children", hasChildren: "hasChildren" },
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
    getContestList() {
      let query = {
        contestName: this.contestName,
        contestType: this.contestType,
      };
      getContestList(query).then((res) => {
        console.log("res", res);
        if (res.code == 200) {
          this.tableData = handleTree(res.data);
          console.log("tree", this.tableData);
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.pageNum = 1;
        this.getContestList();
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
    /** 添加按钮操作 */
    add() {},
  },
  created() {
    this.getContestList();
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
.contest {
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
    .add {
      cursor: not-allowed;
    }
  }
  .page {
    height: 32px;
  }
}
</style>
