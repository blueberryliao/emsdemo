/** * 分页（公共组件）---v3.0 */
<template>
  <div class="paginationCont">
    <div class="leftDiv">
      <div class="text">Total: {{ total }}</div>
    </div>
    <div class="smallDiv">
      <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="pageNum"
        :page-sizes="options"
        :page-size="pageSize"
        :page-count="10"
        layout="prev,pager,next,jumper,sizes,total"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    pageNum: {
      type: Number,
    },
    total: {
      type: Number,
    },
    pageSize: { type: Number },
    options: {
      type: Array,
      default: function () {
        return [10, 20, 30, 50];
      },
    },
  },
  data() {
    return {
      //   options: [{ value: 10 }, { value: 20 }, { value: 50 }],
      // sizeChange: 10, //默认10条
    };
  },
  watch: {
    // sizeChange(cur, old) {
    //   //   console.log(cur);
    //   this.$emit("page-change", 1, cur);
    // },
  },
  methods: {
    //分页当前页变化
    currentChange(val) {
      this.$emit("current-change", val, this.config.currentPage);
    },
    sizeChange(val) {
      this.$emit("page-change", val, this.config.pageSize);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginationCont {
  width: 100%;
  height: 32px;
  line-height: 32px;
  // background-color: #fff;
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-size: 14px;
  box-sizing: border-box;
  .leftDiv {
    width: 70%;
    display: flex;
    justify-content: left;
    .text {
      box-sizing: border-box;
      padding-left: 2%;
    }

    .el-select::v-deep {
      width: 30%;
    }
  }

  .smallDiv {
    position: relative;

    .el-pagination::v-deep {
      display: flex;
    }
    .el-pagination__total::v-deep {
      display: none;
    }

    .el-pagination__jump::v-deep {
      // position: absolute;
      // right: 3%;

      height: 32px;
      line-height: 32px;
      font-size: 14px;
      order: 5;
      margin: 0 20px 0 5px;
    }
    .el-pagination__sizes::v-deep {
      height: 32px;
      line-height: 32px;
      order: 4;
      margin-left: 5px;

      // display: none;
    }
    .el-pagination .btn-next::v-deep,
    .el-pagination .btn-prev::v-deep {
      background: none;
      color: #000000;
      height: 32px;
      line-height: 32px;
      width: 32px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 0;
    }
    .el-pagination .btn-next::v-deep {
      margin-left: 8px;
    }

    .el-pagination button:disabled::v-deep {
      background-color: none;
      color: #000000;
      height: 32px;
      line-height: 32px;
    }
    .el-pager li ::v-deep {
      background: none;
      color: #666666;
      height: 32px;
      line-height: 32px;
      font-size: 0.14rem14px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      width: 32px;
      padding: 0;
      margin-left: 8px;
    }
    .el-pager li.active ::v-deep {
      color: #fff;
      background-color: red;
    }
  }
  .el-input__inner ::v-deep {
    height: 0.32rem !important;
    font-size: 0.14rem;
  }
  .el-input__icon::v-deep {
    height: 0.32rem;
    line-height: 0.32rem;
  }
  .el-input--mini .el-input__inner ::v-deep {
    height: 0.32rem;
  }
  .el-pager li ::v-deep {
    width: auto !important;
    padding: 0 0.1rem !important;
  }
  .el-pagination__editor ::v-deep {
    line-height: inherit;
  }
}
// @media screen and (max-width: 1279px) {
//   .smallDiv{
//     width: 77%;
//   }
// }
// @media screen and (min-width: 1280px) {
//   .smallDiv{
//     width: 54%;
//   }
// }
// @media screen and (min-width: 1366px) {
//   .smallDiv{
//     width: 50%;
//   }
// }
// @media screen and (min-width: 1440px) {
//   .smallDiv{
//     width: 45%;
//   }
// }
// @media screen and (min-width: 1680px) {
//   .smallDiv{
//     width: 36%;
//   }
// }
// @media screen and (min-width: 1920px) {
//   .smallDiv{
//     width: 30%;
//   }
// }
</style>

<!--/*
“公共分页组件”，使用方式：
在父组件中引入分页组件
 import Pagination from '../../../components/common/pagination.vue'
  components: {Pagination},
  在父组件的template中直接使用
    <Pagination @page-change="pageChange" :config="configPage" ></Pagination>
    其中pageChange和configPage可自己命名,但pageTotal、pageSize、currentPage不可换名字
     configPage:{
          pageTotal:10,
          pageSize:10,
          currentPage:1
        } ------需在父组件的data设置configPage默认值，当每次请求tableList时，需给configPage重新复制，
     其他需要刷新表格的时候(如搜索， )传递的分页也更改为this.configPage.currentPage
     更改每页多少条时，也需要重新给configPage 赋值
     pageChange(current,pagesize){
        let that = this;
        that.getTableList(that.tableListService,{
          pageSize:current,
          pageNum:pagesize,
          输入框字段:that.searchForm.字段,//需要加，这样才能在搜索的不会重新刷新数据
        });
      },
     
*-->
