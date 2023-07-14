<template>
  <div class="geo-list">
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
    <div class="search"></div>
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
        lazy
        :tree-props="treeProps"
        stripe
      >
        <el-table-column
          prop="districtName"
          label="District Name"
          min-width="18%"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="idNumber"
          label="ID Number"
          min-width="8%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="Level"
          align="left"
          min-width="10%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="Location"
          min-width="8%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="electionEvent"
          label="Election Event"
          min-width="15%"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="Add"
          prop="status"
          align="center"
          :show-overflow-tooltip="true"
          width="220px"
        >
          <template slot-scope="scope">
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
        @pagination="getGeographyList"
      ></Pagination>
    </div> -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { getGeographyList } from "@/api/geography.js";
import { handleTree } from "@/utils/ruoyi";
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
    /** 添加按钮操作 */
    add() {},
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
.geo-list {
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
    height: 20px;
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
    height: calc(100% - 60px - 50px);
    overflow: auto;
    .status-lock {
      color: #ae3d2e;
      cursor: pointer;
    }
    .status-unlock {
      color: #5a9cf8;
      cursor: pointer;
    }
    .add {
      cursor: not-allowed;
    }
  }
  .page {
    height: 32px;
  }
}
</style>
