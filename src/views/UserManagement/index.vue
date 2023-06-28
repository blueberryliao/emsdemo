<template>
  <div class="user-list">
    <div class="header">
      <div class="header-left">
        <el-button-group>
          <el-button type="primary" icon="el-icon-bottom" size="mini"
            >Import</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            >Add</el-button
          >
          <el-button type="primary" icon="el-icon-delete" size="mini"
            >Delete</el-button
          >
        </el-button-group>
      </div>
      <div class="header-right">
        <el-button type="primary" size="mini" icon="el-icon-top"
          >Export</el-button
        >
      </div>
    </div>
    <div class="search">
      <el-form :inline="true">
        <el-form-item label="User Name" prop="userName">
          <el-input v-model="userName" size="mini" suffix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item label="Full Name" prop="fullName">
          <el-input v-model="fullName" size="mini" suffix-icon="el-icon-search">
          </el-input>
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-select v-model="type" filterable size="mini">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Authority" prop="authority">
          <el-select v-model="authority" filterable size="mini">
            <el-option
              v-for="item in authorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="search-right">
        <el-button type="primary" size="mini">Search</el-button>
      </div> -->
    <!-- </div> -->
    <div class="table">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/net/request.js";
// import Tab from "@/components/Tab/tabIncome.vue";
// const request = new Request();
export default {
  //   components: {
  //     //导入的组件
  //     Tab,
  //   },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      listTotal: 100,
      currentPage: 4,
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
    getTableYear() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.user-list {
  .header {
    background-color: #d4d4d7;
    height: 40px;
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
    // height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    // .search-left {
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: center;
    //   .search-item {

    //     margin-right: 10px;
    //     div {
    //       display: inline;
    //     }
    //     .search-label {
    //       width: 100px;
    //     }
    //   }
    // }
  }
  .table {
    padding: 0 10px;
  }
}
</style>
