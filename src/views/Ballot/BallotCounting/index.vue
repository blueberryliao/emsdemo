<template>
  <div class="ballot-counting">
    <div class="header">
      <div class="search-unit">
        <el-select
          v-model="contest"
          filterable
          size="small"
          class="search-item"
          clearable
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
    <div class="content">
      <div class="content-left">
        <div class="info">
          <div class="info-item">Image Name:</div>
          <div class="info-item">Image Scan Time:</div>
        </div>
        <div class="ballot-case"></div>
        <div class="btn">
          <div class="btn-left">
            <el-button type="primary" size="small">Submit</el-button>
          </div>
          <div class="btn-right">
            <el-button-group>
              <el-button icon="el-icon-arrow-left" size="small"
                >Previous</el-button
              >
              <el-button type="primary" size="small"
                >Next<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="info">
          <div class="info-item">Scanned by Device:</div>
          <div class="info-item">Precinct ID:</div>
        </div>
        <div class="contest-case">
          <div class="contest-header">
            <div class="contest">Contest</div>
            <div class="contest-btn">
              <el-button-group>
                <el-button icon="el-icon-arrow-left" size="small"
                  >Previous</el-button
                >
                <el-button type="primary" size="small"
                  >Next<i class="el-icon-arrow-right el-icon--right"></i
                ></el-button>
              </el-button-group>
            </div>
          </div>
          <div class="contest-content">
            <div class="content-title">State Representative Pos. 2</div>
            <div class="content-subtitle">Vote for One</div>
            <div class="contst-opt">
              <el-radio-group v-model="radio">
                <div>
                  <el-radio :label="3" class="opt-item"
                    >Teri Hichel (Prefer Republicaton Party)</el-radio
                  >
                </div>
                <div>
                  <el-radio :label="6" class="opt-item"
                    >Carol Gregory (Prefer Democratic Party)</el-radio
                  >
                </div>
                <div>
                  <el-radio :label="9" class="opt-item">Write-in</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
          <div class="contest-bottom">
            <el-button size="small">Back</el-button>
            <el-button type="primary" size="small">Save</el-button>
          </div>
        </div>
        <div class="detaile-case">
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content red">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content red">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>

          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content red">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content green">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content green">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
          <div class="detail-item">
            <div class="detail-title">State Representative Pos. 2</div>
            <div class="detail-content">
              Teri Hichel (Prefer Republicaton Party)
            </div>
            <div class="detail-content">
              Carol Gregory (Prefer Democratic Party)
            </div>
            <div class="detail-content">Write-in</div>
          </div>
        </div>
        <div class="bottom">6 ballots remain to be adjudicated</div>
      </div>
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
      contest: 1,
      typeOptions: [
        { label: "all", value: "" },
        {
          label: "Sample Election",
          value: 1,
        },
        {
          label: "President",
          value: 2,
        },
        {
          label: "Senator",
          value: 3,
        },
      ],
      radio: 3,
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
.ballot-counting {
  width: 100%;
  height: 100%;
  .red {
    color: #f56c6c;
  }
  .green {
    color: #67c23a;
  }
  .header {
    // background-color: #d4d4d7;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
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

  .content {
    height: calc(100% - 60px);
    display: flex;
    .content-left {
      width: 55%;
      height: 100%;
      // border: 1px springgreen solid;
      padding: 10px 20px;
      .ballot-case {
        height: calc(100% - 80px);
        border: 2px #d4d4d7 solid;
        padding: 10px;
      }
      .btn {
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .content-right {
      width: 45%;
      height: 100%;
      // border: 1px salmon solid;
      padding: 10px 20px;
      .contest-case {
        height: 350px;
        border: 2px #d4d4d7 solid;

        .contest-header {
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          border-bottom: 1px dashed #d4d4d7;
          .contest {
            color: #5a9cf8;
            font-size: 18px;
            font-weight: 900;
          }
        }
        .contest-content {
          height: calc(100% - 120px);
          overflow: auto;
          padding: 0 20px;
          .content-title {
            font-size: 16px;
            font-weight: 900;
            line-height: 30px;
            height: 30px;
          }
          .content-subtitle {
            font-size: 16px;
            // line-height: 15px;
            // height: 15px;
            padding-bottom: 10px;
          }
          .opt-item {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
          }
        }
        .contest-bottom {
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 10px;
          border-top: 1px dashed #d4d4d7;
        }
      }
      .detaile-case {
        height: calc(100% - 350px - 20px - 60px - 20px);
        border: 2px #d4d4d7 solid;
        overflow: auto;
        padding: 10px 20px;
        margin-top: 20px;
        .detail-item {
          margin-bottom: 20px;
          .detail-title {
            font-size: 18px;
            font-weight: 900;
            line-height: 30px;
            height: 30px;
            text-decoration: underline;
          }
          .detail-content {
            padding-left: 20px;
            font-size: 18px;
            line-height: 30px;
            height: 30px;
          }
        }
      }
      .bottom {
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: 900;
        text-align: right;
      }
    }
    .info {
      display: flex;
      height: 20px;
      line-height: 20px;
      margin-bottom: 10px;
      // font-weight: 900;

      .info-item {
        margin-right: 20px;
      }
    }
  }
}
</style>
